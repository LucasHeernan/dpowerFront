import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { Pressable } from "react-native";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Headline, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getProducts = (setProducts, setLoading) => {
    //axios.get(`https://fakestoreapi.com/products`)
     axios.get(`http://192.168.1.34:3001/productos`)
      .then(resp => setProducts(resp.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProducts(setProducts, setLoading)
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TextInput
        style={styles.input}
        >Search...</TextInput>
       
        <TouchableOpacity
        onPress={() => navigation.navigate("Cart") }
        style={styles.btncart}
        >
          <Entypo name="shopping-cart" size={30} color={"#4D4D4D"} />
        </TouchableOpacity>
      </View>

      {
        loading ? <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />
        : (
            <ScrollView>
              <View style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent:"space-between", paddingLeft: 6, paddingRight: 6}}>
                {products.map((product) => (
                  <Pressable key={product.id} style={{width: "47%", backgroundColor: "white", borderRadius: 6, shadowColor: "#000", shadowOffset: {
	                    width: 0,
	                    height: 6,
                    }, shadowOpacity: 0.37, shadowRadius: 7.49, elevation: 12, paddingTop: 3, marginTop: 30, marginBottom: 30, paddingBottom: 20, overflow: "hidden"}}>
                    <Image source={{uri: product.image}} alt={product.name} style={{width: "100%", height: 240, resizeMode: "contain"}} />
                    <View style={{paddingLeft: 40, paddingRight: 40, paddingTop: 10}}>
                      <Headline style={{fontWeight: "bold", fontSize: 19}}>
                        {product.name}
                      </Headline>
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          )
      }
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d4d4d'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header:{
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  input: {
    height: 25,
    padding: 4,
    borderRadius: 10,
    width: 280,
  },
  btncart:{
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#C7D31E',
    marginRight: 15,
  }
  
})


// return (
  //   <ScrollView >
  //     <Text style={styles.advice}>listo</Text>
  //     <Button title="Get Advice"
  //       onPress={getAdvice} color="green" />
  //     <View >
  //         {
  //           advice && advice.length ?
  //             advice.map(a =>
  //               <View style={styles.container} key={a.id}>
  //                 <Image
  //                   style={styles.tinyLogo}
  //                   source={{ uri: a.image }} />
  //                 <View>
  //                   <Text style={styles.title}>{a.title}</Text>
  //                   <Text style={styles.subtitle}>{a.price}</Text>
  //                 </View>
  //               </View>
  //           ) : <Text>No hay info</Text>
  //         }
  //     </View>
  //   </ScrollView>
  // );

// import React from "react";
// import { View, Text } from 'react-native';

// function MarketPlace() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>This is the Market!</Text>
//       </View>
//     );
// }

// export default MarketPlace
