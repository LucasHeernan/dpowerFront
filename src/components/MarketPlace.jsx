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
  const { allProducts, filterProducts, detail } = useSelector(store => store);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
  }, [dispatch, filterProducts])

  function onSubmit(e) {
    dispatch(getProductByName(e));
  }

  function clear() {
    dispatch(clearMarket());
  }


  // return (
  //   <View style={styles.container}>
  //     {
  //       allProducts.length < 1 ? <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />
  //       :
  //       <View style={styles.container}>

  //         <Searchbar
  //           placeholder="Search"
  //           style={styles.input}
  //           onChangeText={setText}
  //           value={text}
  //           onSubmitEditing={() => onSubmit(text)}
  //         />

  //         <View syles={styles.header}>
  //           <TouchableOpacity
  //             onPress={() => navigation.navigate("Cart") }
  //             style={styles.btncart}
  //           >
  //             <Entypo name="shopping-cart" size={30} color={"#4D4D4D"} />
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             onPress={clear}
  //             style={styles.clear}
  //           >
  //             <Text styles={styles.cleartext}> Clear</Text>
  //           </TouchableOpacity>
  //         </View>

  //         <Filter />

  //         {
  //           detail.length > 0 ?
  //           <FlatList
  //             data={detail}
  //             keyExtractor={({ id }) => id}
  //             renderItem={({ item }) => (
  //               <ProductCard
  //                 producto={item}
  //               />
  //             )}
  //           /> :
  //           <View style={styles.container}>
  //             {
  //               filterProducts.length > 0 ?
  //               <FlatList
  //                 data={filterProducts}
  //                 keyExtractor={({ id }) => id}
  //                 renderItem={({ item }) => (
  //                   <ProductCard
  //                     producto={item}
  //                   />
  //                 )}
  //               /> :
  //               <FlatList
  //                 data={allProducts}
  //                 keyExtractor={({ id }) => id}
  //                 renderItem={({ item }) => (
  //                   <ProductCard
  //                     producto={item}
  //                   />
  //                 )}
  //               />
  //             }
  //           </View>
  //         }
  //       </View>
  //     }
  //   </View>
  // );
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
                  filterProducts.length > 0 ? filterProducts.map(item => {
                    return item.stock !== 0 ? (
                      <ProductCard
                        key={item.id}
                        producto={item}
                      />
                    ) : null
                  }) :
                  allProducts.map(item => {
                    return item.stock !== 0 ? (
                      <ProductCard
                        key={item.id}
                        producto={item}
                      />
                    ) : null
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4d4d4d'
//   },
//   loading: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   header:{
//     flexDirection: 'row',
//     margin: 10,
//     justifyContent: 'space-between',
//   },
//   input: {
//     height: 30,
//     padding: 4,
//     borderRadius: 10,
//     width: 290,
//     margin: 8,
//     fontSize: 14,
//   },
//   btncart:{
//     padding: 8,
//     borderRadius: 100,
//     backgroundColor: '#C7D31E',
//     marginRight: 15,
//     alignSelf: 'flex-end',
//     marginTop: -38,
//   },
//   view: {
//     display: "flex", 
//     flexWrap: "wrap", 
//     flexDirection: "row", 
//     justifyContent:"space-between", 
//     paddingLeft: 6, 
//     paddingRight: 6
//   },
//   product: {
//     width: "47%", 
//     backgroundColor: "white", 
//     borderRadius: 6, 
//     shadowColor: "#000", 
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     }, 
//     shadowOpacity: 0.37, 
//     shadowRadius: 7.49, 
//     elevation: 12, 
//     paddingTop: 3, 
//     marginTop: 30, 
//     marginBottom: 30, 
//     paddingBottom: 20, 
//     overflow: "hidden"
//   },
//   image: {
//     width: "100%", 
//     height: 240, 
//     resizeMode: "contain"
//   },
//   price: {
//     paddingLeft: 40, 
//     paddingRight: 40, 
//     paddingTop: 10
//   },
//   header:{
//     flexDirection: 'row',
//     alignContent: 'space-around',
//   },
//   clear:{
//     backgroundColor: '#F6F5F5',
//     width: 45,
//     borderRadius: 5,
//     margin: 5,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   cleartext:{
//     fontSize: 24,
//   }
// });
