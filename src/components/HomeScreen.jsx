import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import { TextInput } from "react-native-paper";
import Post from '../components/Post'
import perfiles from "./perfiles";
import axios from 'axios'
import { useState } from 'react';



function HomeScreen() {
 
const [posteos, setPosteos ] = useState([])


async function allPost () {
  let res = await axios.get('https://dpower-production.up.railway.app/post');
 setPosteos( res.data)
  
  console.log('datallpost', posteos)
}








  return (
    <View>
      <Button onPress={allPost}title={'Refresh'}/>


    <ScrollView>
      

      {posteos?.slice(0).reverse().map(p => 


      <View key={p.id}>
        <TouchableOpacity 
        onPress={() => alert(p.id + p.description) }
        >
         <Post 
         UserInfoId={p.UserInfoId}
         powersGained={p.powersGained}
         likes={p.likes}
         multimedia={p.multimedia}
         description={p.description}
         /> 
         </TouchableOpacity>
        </View>
        )}
   
    
    
    </ScrollView>
    </View>
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
  input: {
    height: 25,
    margin: 8,
    borderWidth: .51,
    padding: 0,
    borderRadius: 10,
    width:90,
  },
  inputview:{
    alignItems: 'flex-end',

  }
})


export default HomeScreen
