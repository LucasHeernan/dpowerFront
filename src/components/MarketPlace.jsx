import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Text, StatusBar, ScrollView } from "react-native";
import { getAllProducts, getCategories, getProductByName, clearMarket } from "../redux/actions";
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import ProductCard from "./ProductCard"
import Filter from "./Filter";

export default function MarketPlace() {

  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const { allProducts, filterProducts, detail, cart } = useSelector(store => store);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch, filterProducts, cart])

  function onSubmit(e) {
    dispatch(getProductByName(e));
  }

  function clear() {
    dispatch(clearMarket());
  }


  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16
          }}
        >
          <Searchbar
            placeholder="Search"
            onChangeText={setText}
            value={text}
            onSubmitEditing={() => onSubmit(text)}
            style={{
              fontSize: 18,
              color: COLOURS.black,
              borderRadius: 15,
              width: 200
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.black,
                padding: 13,
                borderRadius: 13,
                borderWidth: 1,
                borderColor: COLOURS.black,
                backgroundColor: COLOURS.greenDpwer
              }}
            />
          </TouchableOpacity>
        </View>
        
        <Filter />

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}
              >
                Products
              </Text>
            </View>
            <TouchableOpacity
              onPress={clear}
              style={{
                padding: 6,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLOURS.backgroundLight,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: COLOURS.blue,
                  fontWeight: '400',
                }}
              >
                SeeAll
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1
            }}
          >
            {
              detail.length > 0 ? detail.map(item => {
                return (
                  <ProductCard
                    key={item.id}
                    producto={item}
                  />
                )
              }) :
              <View>
                {
                  filterProducts.length > 0 ? filterProducts?.map(item => {
                    return (
                      <ProductCard
                        key={item.id}
                        producto={item}
                      />
                    )
                  }) :
                  allProducts?.map(item => {
                    return (
                      <ProductCard
                        key={item.id}
                        producto={item}
                      />
                    )
                  })
                }
              </View>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  greenDpwer: '#C7D31E',
  red: '#C04345',
  blue: '#0043F9',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};
