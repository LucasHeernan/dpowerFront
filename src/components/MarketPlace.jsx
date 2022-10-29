import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, } from "react-native";
import axios from "axios";
import ProductCard from "./ProductCard";
import { TextInput } from "react-native-paper";

export default function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getProducts = (setProducts, setLoading) => {
    // axios.get(`http://192.168.0.77:3001/productos`)
    axios.get(`https://fakestoreapi.com/products`)
      .then(resp => setProducts(resp.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProducts(setProducts, setLoading)
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      >Search...</TextInput>
      {
        loading ? <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />
        : (
            <FlatList
              data={products}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <ProductCard
                  image={item.image}
                  name={item.title}
                  category={item.category}
                  // name={item.name}
                  price={item.price}
                  description={item.description}
                />
              )}
              // contentContainerStyle={{
              //   paddingHorizontal: 15,
              // }}
            />
          )
      }
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
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
  input: {
    height: 25,
    margin: 12,
    borderWidth: .51,
    padding: 4,
    borderRadius: 10,
  },
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
