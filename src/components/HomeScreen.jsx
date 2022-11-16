import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { TextInput } from "react-native-paper";
import Post from '../components/Post'
import { getUserById } from "../redux/actions";

import axios from 'axios'
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

let updateHome = true;

function HomeScreen() {
 if (updateHome) allPost()

const { user, userById } = useSelector(state => state)
const [posteos, setPosteos ] = useState([])
const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
const dispatch = useDispatch();

// useEffect(() => {
//   !posteos.length && dispatch(allPost());
  
// }, [])


  async function allPost() {
    let res = await axios.get('https://dpower-production.up.railway.app/post');
    setPosteos(res.data)
    dispatch(getUserById(user[0].data.id))
    updateHome = false;
    return posteos
  }

  return (
    <View style={styles.bg1}>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={allPost}
          />
        }
      >

        {posteos.length ? (
          posteos.slice(0).reverse().map(p =>
            <View key={p.id}>
              <Post
                UserInfoId={p.UserInfoId}
                powersGained={p.powersGained}
                likes={p.likes}
                multimedia={p.multimedia}
                description={p.description}
                id={p.id}
                userById={!userById ? user : userById}
              />
            </View>
          )

        ) :
          <View style={styles.bg}>
            <View style={styles.start2}>

            </View>
            <View style={styles.start}>
              <Text style={styles.title}>Swipe down to start!</Text>
            </View>
            <View style={styles.start2}>

            </View>
          </View>

        }



      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#7D7D7D",

    alignItems: 'center',
    height: '100%',
    padding: 30,

    justifyContent: 'space-around',
  },
  title: {
    margin: 16,
    paddingVertical: 8,
    backgroundColor: "#C7D31E",
    color: "000000",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  input: {
    height: 25,
    margin: 8,
    borderWidth: .51,
    padding: 0,
    borderRadius: 10,
    width: 90,
  },
  inputview: {
    alignItems: 'flex-end',

  },
  start: {
    backgroundColor: '#C7D31E',
    height: '18%',
    width: '100%',
    alignItems: 'center',
    margin: 88,
    borderRadius: 50,
    justifyContent: 'center',
  },
  start2: {
    backgroundColor: "#7D7D7D",
    height: '18%',
    width: '100%',
    alignItems: 'center',
    margin: 88,
    borderRadius: 50,
    justifyContent: 'center',
  },
  bg1: {
    backgroundColor: "#7D7D7D",
    width: '100%',
    margin: 0
  }

})


export default HomeScreen