import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart, updateCart, getUserById} from '../redux/actions';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartItem from './CartItem';
import { } from './CheckOutForm';
import { CardField, useConfirmPayment, useStripe  } from "@stripe/stripe-react-native";
import  axios  from 'axios';



export default function Cart() {

  const { user, userInfo, userById } = useSelector(store => store)
  const dispatch = useDispatch();
  const cart = useSelector(store => store.cart);
  const [total, setTotal] = useState(0)
  const [pawers, setPawers] = useState(0)
  const navigation = useNavigation();

  const handleTotal = () => {
    setTotal(cart.filter(e => e.total).reduce((acc, curr) => {
      acc += curr.price * curr.total;
      return acc;
    }, 0));
  }

  const handlepawers = () => {
    setPawers(cart.filter(e => e.total).reduce((acc, curr) => {
      acc += curr.price * curr.total;
      return acc;
    }, 0));
  }

  const handleClean = () => {
    let clean = cart.map(e => typeof e);
    if (clean.length && !clean.includes('object')) { dispatch(cleanCart()) } else null;
  }

  useEffect(() => {
    handleClean();
    handleTotal();
  }, [cart])

  useEffect(() => {
    dispatch(getUserById(user[0]?.data.id))
  }, [] )

  
  // const sumpowers = ()  => {
  //   const pawers50 = cart.filter((e)=> e.name === '50 pawers to sponsor athletes')
  //   const pawers100 = cart.filter((e)=> e.name === '100 pawers to sponsor athletes')

  //   console.log('powers50', pawers50)
  //   console.log('powers100', pawers100)

  //   let count = 0
  //   if (pawers50.length && pawers100.length) {
  //   count = 150} else if (pawers50.length){
  //   count = 50} else if (pawers100.length){
  //     count = 100
  //   }
  //   editpowers(count)
  // }

  const editpowers = async () => {
    const newpowers = userById[0]?.data.powers + total
    try {
   await axios.put(
    `https://dpower-production.up.railway.app/users/${userById[0]?.data.id}`,
    {
      ...userById[0]?.data,
      powers: newpowers
    }
  );
    } catch (err) {
      console.log(err)
    }
  }

  // ------ PAYMENT!!!! --------------
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`https://dpower-production.up.railway.app/products/pay/${(total * 100 )}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "DPWR",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        defaultBillingDetails: {
          name: 'name'
        }
      });
      if (!error) {
        setLoading(true);
      }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
          alert(`Error code: ${error.code}`, error.message);
        } else {
          (alert('Success, Your order is confirmed!'), 
          editpowers(),
          dispatch(updateCart()));
        }
      };
      
    initializePaymentSheet();    
    useEffect(() => {
      }, []);
 // ------------ Termina PAyment ---------------------------------------
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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              style={{
                fontSize: 18,
                color: '#777777',
                padding: 12,
                backgroundColor: 'white',
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '500',
            }}>
            Order Details
          </Text>
          <View></View>
        </View>

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
          Cart
        </Text>

        {/* --- RENDERIZADO DE PRODUCTOS --- */}
        <View style={{paddingHorizontal: 16}}>
          {
            cart.length ? (
              cart.map(item => {
                return typeof item !== 'object' ? null :
                  (
                    <CartItem
                      key={item.id}
                      data={item}
                    />
                  )
                }
              )
            ) : null
          }
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
                $ {total}
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
              {/* <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: 'black',
                  opacity: 0.5,
                }}
              >
                Welcome Discount  10%
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                  opacity: 0.8,
                }}
              >
                -   {total * 10 / 100}
              </Text> */}
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
                $ {total}
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
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
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
