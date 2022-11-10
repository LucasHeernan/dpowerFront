import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { getAllProducts, getCategories, getProductByName, clearMarket } from "../redux/actions";
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import ProductCard from "./ProductCard"
import Filter from "./Filter";

export default function MarketPlace({producto}) {

  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const { allProducts, filterProducts, categories, detail } = useSelector(store => store);

  //console.log('allproducts:    ', allProducts )

  useEffect(() => {
    !categories.length && dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch, filterProducts])

  function onSubmit(e) {
    dispatch(getProductByName(e));
  }

  function clear() {
    dispatch(clearMarket());
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {
        allProducts.length < 1 ? <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />
        :
        <View style={styles.container}>

          <Searchbar
            placeholder="Search"
            style={styles.input}
            onChangeText={setText}
            value={text}
            onSubmitEditing={() => onSubmit(text)}
          />

          <View syles={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart") }
              style={styles.btncart}
            >
              <Entypo name="shopping-cart" size={30} color={"#4D4D4D"} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={clear}
              style={styles.clear}
            >
              <Text styles={styles.cleartext}> Clear</Text>
            </TouchableOpacity>
          </View>

          <Filter />

          {
            detail.length > 0 ?
            <FlatList
              data={detail}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <ProductCard
                  producto={item}
                />
              )}
            /> :
            <View style={styles.container}>
              {
                filterProducts.length > 0 ?
                <FlatList
                  data={filterProducts}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => (
                    <ProductCard
                      producto={item}
                    />
                  )}
                /> :
                <FlatList
                  data={allProducts}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => (
                    <ProductCard
                      producto={item}
                    />
                  )}
                />
              }
            </View>
          }
        </View>
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
    height: 30,
    padding: 4,
    borderRadius: 10,
    width: 290,
    margin: 8,
    fontSize: 14,
  },
  btncart:{
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#C7D31E',
    marginRight: 15,
    alignSelf: 'flex-end',
    marginTop: -38,
  },
  view: {
    display: "flex", 
    flexWrap: "wrap", 
    flexDirection: "row", 
    justifyContent:"space-between", 
    paddingLeft: 6, 
    paddingRight: 6
  },
  product: {
    width: "47%", 
    backgroundColor: "white", 
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
  image: {
    width: "100%", 
    height: 240, 
    resizeMode: "contain"
  },
  price: {
    paddingLeft: 40, 
    paddingRight: 40, 
    paddingTop: 10
  },
  header:{
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  clear:{
    backgroundColor: '#F6F5F5',
    width: 45,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    
  },
  cleartext:{
    fontSize: 24,
  }
});
