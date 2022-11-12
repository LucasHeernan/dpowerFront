import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart, removeItemFromCart } from '../redux/actions';


export default function Cart() {

  const dispatch = useDispatch()
  const cart = useSelector(store => store.cart);
  
  useEffect(() => {
    console.log('KELOKE ES LOOP O NO');
  }, [cart])

  const handleDelete = (e) => {
    dispatch(removeItemFromCart(e));
    alert('PRODUCTO ELIMINADO');
  }

  
  const renderProducts = (data) => {
    
    const [change, setChange] = useState(1)
    
    const handleMinus = () => {
      return change > 1 ? setChange(change - 1) : alert('NO PUEDE SER MENOS DE UNO');
    }
  
    const handlePlus = () => {
      return change < data.stock ? setChange(change + 1) : alert('NO HAY MAS STOCK')
    }
    

    return (
      <TouchableOpacity
        key={data.id}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 20
        }}
      >
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            marginRight: 22,
          }}
        >
          <Image
            source={{uri: data.image}}
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
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: '#000000',
                fontWeight: '600',
                letterSpacing: 1,
              }}
            >
              {data.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
                justifyContent: 'space-between'
              }}
            >
              
              {/* --- MINUS && PLUS --- */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={handleMinus}
                  style={{
                    borderRadius: 100,
                    marginRight: 10,
                    padding: 5
                  }}
                >
                  <Feather
                    name="minus-circle"
                    style={{
                      fontSize: 22,
                      color: 'black',
                    }}
                  />
                </TouchableOpacity>
                <Text> {change} </Text>
                <TouchableOpacity
                  onPress={handlePlus}
                  style={{
                    borderRadius: 100,
                    marginLeft: 10,
                    padding: 5
                  }}
                >
                  <Feather
                    name="plus-circle"
                    style={{
                      fontSize: 22,
                      color: 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>
              
              {/* --- PRICE --- */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  maxWidth: '85%',
                  marginRight: 4,
                  color: 'black'
                }}
              >
                $ {change * data.price}
              </Text>

              {/* --- DELETE --- */}
              <TouchableOpacity
                onPress={() => handleDelete(data.id)}
              >
                <Feather
                  name="x-circle"
                  style={{
                    fontSize: 22,
                    color: 'black',
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
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
        backgroundColor: '#F0F0F3',
        position: 'relative',
      }}
    >
      <ScrollView style={{ marginBottom: 15 }} >
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          Order Details
        </Text>

        <View style={{paddingHorizontal: 16}}>
          {cart ? cart.map(renderProducts) : null}
        </View>

        {/* --- ORDER INFO --- */}
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 40,
            marginBottom: 80,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            Order Info
          </Text>

          {/* --- BACKGROUND WHITE --- */}
          <View 
            style={{
              paddingHorizontal: 16,
              backgroundColor: 'white',
              borderRadius: 20,
              paddingVertical: 16
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 7
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                  opacity: 0.5,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                  opacity: 0.8,
                }}
              >
                $ 666.00
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 7
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                  opacity: 0.5,
                }}
              >
                Shipping Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                  opacity: 0.8,
                }}
              >
                +  10%
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 7
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  maxWidth: '80%',
                  color: 'black'
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'black',
                }}>
                $ 722.00
              </Text>
            </View>

          </View>


        </View>

      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 15,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: "#C7D31E",
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 1,
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
