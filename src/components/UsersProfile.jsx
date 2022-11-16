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
import { TouchableOpacity } from "react-native";

const auth0ClientId = "R7NnYEPxs5lx6uWZCLvcaSe1vNFAAiUf";
const authorizationEndpoint = "https://dpwr.us.auth0.com/v2/logout";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy }); // <-- must be set in allowed logout urls

let update = true;
let updatePosteos = true;

function UsersProfile({route}) {
  const [powers, setPowers] = React.useState(0)
  const [likes, setLikes] = React.useState(0)
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [imagenes, setImagenes] = React.useState([]);
  const [posteos, setPosteos] = React.useState([]);

  const { user } = route.params
  console.log(user)
  let userIdProfile = { userId: user[0].id }
  const dispatch = useDispatch()


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  let getFilteredPosts = async function() {
    let posts = await axios.get("https://dpower-production.up.railway.app/post").then(e => e.data)
    let filteredPosts = posts.filter(e => e.UserInfoId === user[0].id)
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
  console.log(likes)

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

  console.log(posteos)

  let getImagenes = async function () {
    let likesId = await axios.get('https://dpower-production.up.railway.app/post/likes')
    likesId = likesId.data
    let posteos = await axios.get('https://dpower-production.up.railway.app/post')
    posteos = posteos.data

    if (userIdProfile.userId) likesId = likesId.filter(el => el.UserInfoId === userIdProfile.userId);
    if (user[0].id) likesId = likesId.filter(el => el.UserInfoId === user[0].id);
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


  const actualUser = user[0].id;

  const navigation = useNavigation()


  const avatar = user.avatar ? "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" : user[0].avatar
  return (

      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={{ backgroundColor: 'white' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getPosteos}
          />
        }
      >
      <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 25,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                    name="chevron-back"
                    style={{
                        fontSize: 18,
                        color: '#777777',
                        padding: 12,
                        backgroundColor: '#F0F0F3',
                        borderRadius: 12,
                    }}
                    />
                </TouchableOpacity>
            </View>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                {user.length ? user[0].name : "No name"}
              </Text>
              <Text style={[styles.text, styles.subText]}>
                {user.length ? user[0].age : ""}
              </Text>
              <Text style={[styles.text, styles.subText]}>
                {user.length ? user[0].nationality : ""}
              </Text>
              <Text style={[styles.text, { color: "AEB5BC", fontSize: 14 }]}>
                {user.length ? user[0].sport : ""}
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
              {user[0].validated ? <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1 }]}>
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

            <Text style={[styles.subText, styles.description]}>Description</Text>

            <View style={{ alignItems: "center" }}>
              <View style={styles.descripcion}>
                <View style={styles.descripcionIndicador}></View>
                <View style={{ width: 250 }}>
                  <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    {!user[0].description ? 'There is no description' : user[0].description}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
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


export default UsersProfile