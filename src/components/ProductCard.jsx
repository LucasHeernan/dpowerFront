import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Headline } from 'react-native-paper';
import axios from 'axios';
import { getProductById } from '../redux/actions/index';
import { useDispatch } from 'react-redux';



export default function ProductCard({producto}) {
  
  // console.log(producto)
  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const { name, id, image, price } = producto

  return (
          <ScrollView>
            <View style={styles.view}>
                <Pressable key={id} style={styles.product} 
                onPress={() => { 
                  //dispatch(getProductById(id))
                  navigation.navigate("Detail", {selectedProduct: producto})
                  }}>
                  <Image source={{uri: image}} alt={name} style={styles.image} />
                  <View style={styles.price}>
                     <Headline style={{fontWeight: "bold"}}>
                       ${price}
                     </Headline>
                     <Text style={{marginTop: 10}} numberOfLines={3}>{name}</Text>
                  </View>
                 </Pressable>
            </View>
          </ScrollView>
  );
}

            

const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 380,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    marginTop: 30,
    overflow: "hidden"
  },
  image: {
    width: "85%", 
    height: 220, 
    resizeMode: "contain",
    alignSelf: 'center',
  },
  text: {
    marginTop: 9,
    width: '100%',
    height: '38%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
  },
  containerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: "center",
    marginVertical: 5
  },
  price:{
    fontWeight: 'bold',
    fontSize: 25,
    alignItems: "center"
  },
  cart: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 6,
    width: '70%',
    alignSelf: 'center',
    marginTop: 5
  },
  addCart: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  },
  view: {
    marginLeft: 25,
    
    justifyContent:"center", 
    paddingLeft: 6, 
    paddingRight: 6
  },
  product: {
    width: "60%", 
    backgroundColor: "white", 
    alignSelf: 'center',
    borderRadius: 6, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 6,
    }, 
    shadowOpacity: 0.37, 
    shadowRadius: 7.49, 
    elevation: 12, 
    paddingTop: 3, 
    marginTop: 30, 
    marginBottom: 30, 
    paddingBottom: 20, 
    overflow: "hidden"
  },
  price: {
    paddingLeft: 40, 
    paddingRight: 40, 
    paddingTop: 10
  }
});