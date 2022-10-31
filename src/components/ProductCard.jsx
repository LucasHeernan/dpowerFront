import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';




export default function ProductCard({image, name, price, category, description, id}) {

  const [count, setCount] = useState(1);
  const navigation = useNavigation();

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

            // <ScrollView>
            //   <View style={styles.view}>
            //     {products.map((product) => (
            //       <Pressable key={product.id} style={styles.product} onPress={() => navigation.navigate("Detail", {
            //         selectedProduct: product,
            //       })}>
            //         <Image source={{uri: product.image}} alt={product.name} style={styles.image} />
            //         <View style={styles.price}>
            //           <Headline style={{fontWeight: "bold"}}>
            //             ${product.price}
            //           </Headline>
            //           <Text style={{marginTop: 10}} numberOfLines={3}>{product.name}</Text>
            //         </View>
            //       </Pressable>
            //     ))}
            //   </View>
            // </ScrollView>

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
  }
});