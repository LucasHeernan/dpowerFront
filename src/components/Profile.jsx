import React from "react";
import jwtDecode from "jwt-decode";
import * as AuthSession from "expo-auth-session"
import { openAuthSessionAsync } from "expo-web-browser";
import { View, Text, StyleSheet, ScrollText, ScrollView, Image, SafeAreaView, Alert, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Button, IconButton, Menu, Provider } from "react-native-paper";
import { cleanLogin } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const auth0ClientId = "R7NnYEPxs5lx6uWZCLvcaSe1vNFAAiUf";
const authorizationEndpoint = "https://dpwr.us.auth0.com/v2/logout";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy }); // <-- must be set in allowed logout urls


function Profile(props) {
  const [visible, setVisible] = React.useState(false);
  const { user } = useSelector(state => state)
  const dispatch = useDispatch()
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const {name, sport, age, nationality, description, post, powers, likes, followers, images, avatar} = props;

  const logout = async () => {
    try {
      dispatch(cleanLogin())

      console.log(user)
      await openAuthSessionAsync(`${authorizationEndpoint}?client_id=${auth0ClientId}&returnTo=${redirectUri}`, 'redirectUrl');
      // handle unsetting your user from store / context / memory
      
    } catch (err) {
       console.error(err)    
    }
  }

  return (
    <Provider>

    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-vertical" size={24} color="#52575D" onPress={openMenu} />}
              >
                <Menu.Item onPress={logout} title="LogOut" />
              </Menu>
        </View>

        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={{uri: avatar}} style={styles.image} resizeMode="center"></Image>
          </View>
          {/* <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8" />
          </View> */}
          {/* <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2}}></Ionicons>
          </View> */}
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "400", fontSize: 36 }]}>{name}</Text>
          <Text style={[styles.text, styles.subText]}>{age} Años</Text>
          <Text style={[styles.text, styles.subText]}>{nationality}</Text>
          <Text style={[styles.text, { color: "AEB5BC", fontSize: 14}]}>{sport}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>{images.length}</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
            <Text style={[styles.text, { fontSize: 24 }]}>{likes}</Text>
            <Text style={[styles.text, styles.subText]}>Likes</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1}]}>
            <Text style={[styles.text, { fontSize: 24 }]}>{powers}</Text>
            <Text style={[styles.text, styles.subText]}>Powers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>{followers}</Text>
            <Text style={[styles.text, styles.subText]}>Seguidores</Text>
          </View>
        </View>

        <View style={{ marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {images.map(imagen => 
              <View style={styles.mediaImageContainer}>
              <Image source={{uri: imagen}} style={styles.image} resizeMode="cover"></Image>
            </View>
            )}
          </ScrollView>
        </View>

        <Text style={[styles.subText, styles.description]}>Descripcion</Text>


        <View style={{alignItems: "center"}}>
          <View style={styles.descripcion}>
            <View style={styles.descripcionIndicador}></View>
            <View style={{width: 250}}>
            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
            {description}
            </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  subText:{
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
    justifyContent: "flex-end",
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: "hidden"
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