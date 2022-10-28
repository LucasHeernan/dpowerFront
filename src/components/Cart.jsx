import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Cart() {
  return (
   
    <View style={styles.container}>

      <View style={styles.cartitems}> 
      <Text style={styles.title}>
        Image
      </Text>
      <Text style={styles.title}>
        Item
      </Text>
      <Text style={styles.title}>
        Qty
      </Text>
      <Text style={styles.title}>
        Subtotal
      </Text>
    </View> 

    <View style={styles.cartitems}> 
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
      <Text style={styles.paragraph}>
        Item
      </Text>
      <Text style={styles.paragraph}>
        Qty
      </Text>
      <Text style={styles.paragraph}>
        Subtotal
      </Text>
    </View>

    <View style={styles.cartitems}> 
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
      <Text style={styles.paragraph}>
        Item
      </Text>
      <Text style={styles.paragraph}>
        Qty
      </Text>
      <Text style={styles.paragraph}>
        Subtotal
      </Text>
    </View>

    <View style={styles.cartitems}> 
      <Image style={styles.logo} source={require('../../assets/icon.png')} />
      <Text style={styles.paragraph}>
        Item
      </Text>
      <Text style={styles.paragraph}>
        Qty
      </Text>
      <Text style={styles.paragraph}>
        Subtotal
      </Text>
    </View>

    <View style={styles.cartitemstotal}> 
     
     <Text style={styles.title}>
       Total
      </Text>
      <Text style={styles.title}>
        $$$$
      </Text>
    </View>

      
  
    <View style={styles.btnview}>
    <TouchableOpacity style={styles.buybutton}>
        <Text style={styles.button}>Buy now!</Text>
      </TouchableOpacity>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 24,
    backgroundColor: "#8B8B8B",
    margin: 12,
    borderRadius: 40,

  },
  title: {
    margin: 19,
    marginTop: 19,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph:{
    margin: 24,
    marginTop: 8,
    fontSize: 18,
    
    textAlign: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
    margin: 2,
    borderRadius: 10,
  },
  cartitems:{
    flexDirection: 'row',
    
  },
  cartitemstotal:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 135,
  },
  buybutton:{
    width: 150,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 110,
    
  },
  btnview: {
    backgroundColor:"#C7D31E",
    
    alignContent: 'center',
    alignItems: 'center',
    borderRadius:40,
    marginTop: 150,
  },
  button:{
    fontSize:32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg:{
    backgroundColor: "red"
  }
});