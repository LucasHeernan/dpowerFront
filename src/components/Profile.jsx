import React, { useState } from "react";
import * as AuthSession from "expo-auth-session"
import { openAuthSessionAsync } from "expo-web-browser";
import { View, Text, StyleSheet, ScrollText, ScrollView, Image, SafeAreaView, Alert, Platform, RefreshControl } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Button, Divider, IconButton, Menu, Provider } from "react-native-paper";
import { cleanUser, getPosts } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getUserById } from "../redux/actions";
import axios from 'axios'

const auth0ClientId = "R7NnYEPxs5lx6uWZCLvcaSe1vNFAAiUf";
const authorizationEndpoint = "https://dpwr.us.auth0.com/v2/logout";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy }); // <-- must be set in allowed logout urls

let update = true;
let updatePosteos = true;

function Profile(props) {
  const [powers, setPowers] = React.useState(0)
  const [likes, setLikes] = React.useState(0)
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [imagenes, setImagenes] = React.useState([]);
  const [posteos, setPosteos] = React.useState([]);

  const { user, userById } = useSelector(state => state)
  let userIdProfile = { userId: user[0].data.id }
  let UserById = userById[0]?.data?.id
  const dispatch = useDispatch()

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  let getFilteredPosts = async function() {
    let posts = await axios.get("https://dpower-production.up.railway.app/post").then(e => e.data)
    let filteredPosts = posts.filter(e => e.UserInfoId === userById[0]?.data?.id)
    let likes = filteredPosts.map(e => e.likes)
    let totalLikes = likes.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
    let powers = filteredPosts.map(e => e.powersGained)
    let totalPowers = powers.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0)
    setPowers(totalPowers)
    setLikes(totalLikes)
    return (totalLikes, totalPowers)
  }

  const totalLikes = getFilteredPosts()

  let getPosteos = async function() {
    let finalPosteos = await axios.get('https://dpower-production.up.railway.app/post')
    finalPosteos = finalPosteos.data

    finalPosteos = finalPosteos.filter(el => el.UserInfoId === userIdProfile.userId)
    let final = [];

    finalPosteos.map(el => final.push(el.multimedia))
    setPosteos(final)
    updatePosteos = false
    return final;
  }

  let getImagenes = async function () {
    let likesId = await axios.get('https://dpower-production.up.railway.app/post/likes')
    likesId = likesId.data
    let posteos = await axios.get('https://dpower-production.up.railway.app/post')
    posteos = posteos.data

    if (userIdProfile.userId) likesId = likesId.filter(el => el.UserInfoId === userIdProfile.userId);
    if (UserById.userId) likesId = likesId.filter(el => el.UserInfoId === UserById.userId);
    let posteosId = []
    likesId.map(el => posteosId.push(el.PostId))

    let final = []
    posteosId.map(el => {
      for (let i = 0; i < posteos.length; i++) {
        if (el === posteos[i].id) {
          return final.push(posteos[i])
        }
      }
    })

    let enlaces = []
    final.map(el => enlaces.push(el.multimedia))
    setImagenes(enlaces)
    update = false
    return enlaces
  }

  if (update) getImagenes()
  if (updatePosteos) getPosteos()


  const actualUser = user[0].data.id;

  useEffect(() => {
    dispatch(getUserById(actualUser))
  }, [user])

  const navigation = useNavigation()

  const logout = async () => {
    try {
      dispatch(cleanUser())
      await openAuthSessionAsync(`${authorizationEndpoint}?client_id=${auth0ClientId}&returnTo=${redirectUri}`, 'redirectUrl');
      // handle unsetting your user from store / context / memory
    } catch (err) {
      console.error(err)
    }
  }
  //!userById.length  ? user[0].data.name : userById[0]?.data.name
  const avatar = !userById.length ? user[0]?.data.avatar : userById[0]?.data.avatar
  return (
    <Provider>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={{ backgroundColor: 'white' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={(getImagenes,
              getPosteos)
            }
          />
        }
      >
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
              <FontAwesome5 name="bolt" size={20} color="black">
                <Text> {userById[0]?.data.powers}</Text>
              </FontAwesome5>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-vertical" size={24} color="#52575D" onPress={openMenu} />}
              >
                <Menu.Item onPress={logout} title="LogOut" />
                <Divider />
                <Menu.Item onPress={() => navigation.navigate("Form")} title="Edit profile" />
              </Menu>
            </View>

            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{ uri: avatar }}
                  style={styles.image}
                  resizeMode="center"
                />
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "400", fontSize: 24 }]}>
                {!userById.length ? user[0].data.name : userById[0]?.data.name}
              </Text>
              <Text style={[styles.text, { fontWeight: "400", fontSize: 18, fontWeight: '700', textDecorationLine: 'underline',  }]}>
                {(userById.validated === true) ? 'Athlete' : null}
              </Text>
              <Text style={[styles.text, styles.subText]}>
                {!userById.length ? user[0].data.age : userById[0]?.data.age}
              </Text>
              <Text style={[styles.text, styles.subText]}>
                {!userById.length ? user[0].data.nationality : userById[0]?.data.nationality}
              </Text>
              <Text style={[styles.text, { color: "AEB5BC", fontSize: 14 }]}>
                {!userById.length ? user[0].data.sport : userById[0]?.data.sport}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{posteos.length}</Text>
                <Text style={[styles.text, styles.subText]}>Posts</Text>
              </View>
              <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                <Text style={[styles.text, { fontSize: 24 }]}>{likes}</Text>
                <Text style={[styles.text, styles.subText]}>Likes</Text>
              </View>
              {userById[0]?.data.validated ? <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
                <Text style={[styles.text, { fontSize: 24 }]}>{powers >= 0 ? powers : 0}</Text>
                <Text style={[styles.text, styles.subText]}>Powers</Text>
              </View> : <Text></Text>}
              {/* <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 24 }]}>{followers}</Text>
                <Text style={[styles.text, styles.subText]}>Seguidores</Text>
              </View> */}
            </View>

            <Text style={[styles.subText, styles.description]}>My Posts</Text>
            <View style={{ marginTop: 32 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {posteos.slice(0).reverse().map((imagen, index) =>
                  <View style={styles.mediaImageContainer} key={index} >
                    <Image source={{ uri: imagen }} style={styles.image} resizeMode="cover"></Image>
                  </View>
                )}
              </ScrollView>
            </View>

            <Text style={[styles.subText, styles.description]}>My Favorites</Text>
            <View style={{ marginTop: 32 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {imagenes.slice(0).reverse().map((imagen, index) =>
                  <View style={styles.mediaImageContainer} key={index} >
                    <Image source={{ uri: imagen }} style={styles.image} resizeMode="cover"></Image>
                  </View>
                )}
              </ScrollView>
            </View>

            <Text style={[styles.subText, styles.description]}>Description</Text>

            <View style={{ alignItems: "center" }}>
              <View style={styles.descripcion}>
                <View style={styles.descripcionIndicador}></View>
                <View style={{ width: 250 }}>
                  <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    {!userById.length ? 'Please fill in your description ...' : userById[0]?.data.description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#52575D"
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  description: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  descripcion: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  descripcionIndicador: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  }
})


export default Profile