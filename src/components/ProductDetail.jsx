import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function ProductCard({image, name, price, category, description}) {

  return (
    <View style={styles.container}>
     
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      
      <View style={styles.text}>

        <Text style={styles.type}>{category}</Text>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.containerPrice}>
          <View style={styles.state}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {if(count > 1) setCount(count -1)}}
            >
              <Text style={styles.lessMore}>-</Text>
            </TouchableOpacity >
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setCount(count + 1)}
            >
              <Text style={styles.lessMore}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${price * count}</Text>
        </View>
        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {description}
        </Text>
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
    height: 560,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    marginTop: 30
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
  count: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  type: {
    fontSize: 15,
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
  },
  containerPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  state: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',


  },
  lessMore: {
    color: 'white',
    fontSize:18,
  },
  price:{
    fontWeight: 'bold',
    fontSize: 25,
  },
  description: {
    fontSize: 15,
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