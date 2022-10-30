import React from "react";

import { View, Text, StyleSheet, ScrollText, Button, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Title, Paragraph, Headline, Caption} from "react-native-paper";
import axios from "axios";

function Profile(props) {

  const {name, sport, age, nationality, description, post, powers} = props;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.titleBar}>
            <MaterialIcons name="more-vert" size={24} color="#52575D"></MaterialIcons>
        </View> */}

        <View style={{alignSelf: "center"}}>
          <View style={styles.profileImage}>
            <Image source={{uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"}} style={styles.image} resizeMode="center"></Image>
          </View>
          {/* <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8" />
          </View> */}
          {/* <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2}}></Ionicons>
          </View> */}
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "400", fontSize: 36 }]}>Julian</Text>
          <Text style={[styles.text, { color: "AEB5BC", fontSize: 14}]}>Deportista</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
            <Text style={[styles.text, { fontSize: 24 }]}>24</Text>
            <Text style={[styles.text, styles.subText]}>Likes</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderRightWidth: 1}]}>
            <Text style={[styles.text, { fontSize: 24 }]}>8</Text>
            <Text style={[styles.text, styles.subText]}>Powers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>13</Text>
            <Text style={[styles.text, styles.subText]}>Seguidores</Text>
          </View>
        </View>

        <View style={{ marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image source={{uri: "https://www.rehagirona.com/wp-content/uploads/2021/07/atletismo_paralimpico_des.jpg"}} style={styles.image} resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={{uri: "http://www.lima2019.pe/sites/default/files/2019-07/para-atletismo-banner.jpg"}} style={styles.image} resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={{uri: "https://www.argentina.gob.ar/sites/default/files/2019-08-24_para_athletics_gh_lima2019_1927.jpg"}} style={styles.image} resizeMode="cover"></Image>
            </View>
          </ScrollView>
        </View>

        <Text style={[styles.subText, styles.description]}>Descripcion</Text>


        <View style={{alignItems: "center"}}>
          <View style={styles.descripcion}>
            <View style={styles.descripcionIndicador}></View>
            <View style={{width: 250}}>
            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
            Hola mi nombre es Julian y soy deportista, me gusta mucho el basquet y la natacion
            </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    height: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    width: 200,
    height: 200,
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