import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function ProductCard({image, name, price}) {

  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.containerPrice}>
          <Text style={styles.price}>${price}</Text>
        </View>
        <TouchableOpacity style={styles.cart}>
          <Text style={styles.addCart}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 400,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    marginTop: 30,
    overflow: "hidden"
  },
  image: {
    width: '95%',
    height: '60%',
    resizeMode: 'contain',
  },
  text: {
    marginTop: 9,
    width: '100%',
    height: '38%',
    // width: '95%',
    // alignItems: 'center',
    backgroundColor: 'white',
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
  }
});