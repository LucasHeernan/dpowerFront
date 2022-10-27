import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Post from '../components/Post'
import perfiles from "./perfiles";






function HomeScreen() {
 
  return (

    <ScrollView>
      {perfiles?.map(p => 
      <View key={p.id}>
         <Post 
         fullName={p.fullName}
         forksCount={p.forksCount}
         stargazersCount={p.stargazersCount}
         reviewCount={p.reviewCount}
         avatar={p.avatar}
         />
        </View>
        )}
   
    
    
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container:{

    backgroundColor: "#7D7D7D",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#C7D31E",
    color: "000000",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
})


export default HomeScreen
