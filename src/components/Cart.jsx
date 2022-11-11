import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart } from '../redux/actions';


export default function Cart() {

  const dispatch = useDispatch()
  const cart = useSelector(store => store.cart);
  console.log('ESTO SERIA CART - ', cart);

  // useEffect(() => {
  //   dispatch(cleanCart())
  // }, [])

  const renderProducts = (data) => {
    return (
      <TouchableOpacity
        key={data.id}
        // onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F0F3',
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={data.image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: '#000000',
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                ${data.price}
              </Text>
              <Text>
                (${data.price + data.price / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#B9B9B9',
                  opacity: 0.5,
                }}>
                <Feather
                  name="minus-circle"
                  style={{
                    fontSize: 16,
                    color: '#777777',
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: '#B9B9B9',
                  opacity: 0.5,
                }}>
                <Feather
                  name="plus-circle"
                  style={{
                    fontSize: 16,
                    color: '#777777',
                  }}
                />
              </View>
            </View>
            <TouchableOpacity /* onPress={() => removeItemFromCart(data.id)} */>
              <MaterialCommunityIcons
                name="delete-circle-outline"
                style={{
                  fontSize: 16,
                  color: '#777777',
                  backgroundColor: '#F0F0F3',
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <ScrollView>
      <View style={{paddingHorizontal: 16}}>
        {cart ? renderProducts(cart) : null}
      </View>
      </ScrollView>
    </View>
  )
}
