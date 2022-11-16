import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Headline } from 'react-native-paper';


export default function ProductCard({producto}) {

  const navigation = useNavigation();
  const { name, id, image, price, stock } = producto

  return (
    // <ScrollView style={{ backgroundColor: 'black' }} >
      <View style={styles.view}>
        <Pressable key={id} style={styles.product}
          onPress={() => {
            navigation.navigate("Detail", {
            selectedProduct: producto
          })
        }}>
          {
            stock ? <Image source={{uri: image}} alt={name} style={styles.image} /> :
            <Image source={{uri: image}} alt={name} style={styles.noStock} />
          }
          <View style={styles.price}>
            <Headline style={ stock ? ({fontWeight: "bold"}) : {fontWeight: "bold", opacity: 0.3}}>
              ${price}
            </Headline>
            <Text style={{marginTop: 10}} numberOfLines={3}>{name}</Text>
          </View>
        </Pressable>
      </View>
    // </ScrollView>
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
    alignSelf: 'center'
  },
  noStock: {
    width: "85%", 
    height: 220, 
    resizeMode: "contain",
    alignSelf: 'center',
    opacity: 0.3
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
    width: "65%",
    backgroundColor: "white",
    alignSelf: 'center',
    borderRadius: 12,
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