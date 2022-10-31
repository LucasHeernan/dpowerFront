import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategories, getProductByName, clearMarket } from "../redux/actions";
import { Searchbar } from 'react-native-paper';

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
    backgroundColor: 'gray',
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
    margin: 8,
    alignItems: "center",
    borderWidth: .51,
    padding: 4,
    borderRadius: 10,
  },
})
