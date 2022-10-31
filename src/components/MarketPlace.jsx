
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategories, getProductByName, clearMarket } from "../redux/actions";
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { Pressable } from "react-native";
import axios from "axios";
import { Headline, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function MarketPlace() {

  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const { allProducts, filterProducts, categories, detail } = useSelector(store => store);


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

            <Filter />

            <TouchableOpacity onPress={clear}>
              <Text>Clear</Text>
            </TouchableOpacity>

            {
              detail.length > 0 ?
              <FlatList
                data={detail}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                  <ProductCard
                    image={item.image}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    description={item.description}
                  />
                )}
              /> :
              <View style={styles.container}>
                {
                  filterProducts.length > 0 ?
                  <FlatList
                    data={filterProducts}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                      <ProductCard
                        image={item.image}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        description={item.description}
                      />
                    )}
                  /> :
                  <FlatList
                    data={allProducts}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                      <ProductCard
                        image={item.image}
                        name={item.name}
                        category={item.category}
                        price={item.price}
                        description={item.description}
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
})
