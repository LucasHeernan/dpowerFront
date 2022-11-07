import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

//screens
import HomeScreen from './src/components/HomeScreen';
import MarketPlace from './src/components/MarketPlace';
import Profile from './src/components/Profile';
import Cart from './src/components/Cart'
import ProductCard from './src/components/ProductCard';
import UploadPost from './src/components/UploadPost'
import ProductDetail from './src/components/ProductDetail';
import LandingPage from './src/components/LandingPage';
import ImagePicker from './src/components/ImagePicker'


const MarketStackNavigator = createNativeStackNavigator();
const LandingStackNavigator = createNativeStackNavigator();
const ProfileStackNavigator = createNativeStackNavigator();

function ProfileStack() {
  const { user } = useSelector(state => state)
  return (
    <ProfileStackNavigator.Navigator
      initialRouteName='My Profile'
    >
      <ProfileStackNavigator.Screen
        name="The Profile"
        children={() => <Profile
        key={user[0].data.id}
        name={user[0].data.name || user[0].data.username}
        sport="Natacion" 
        age={user[0].data.age} 
        nationality="Argentino"
        likes="65"
        powers="150"
        followers="1200"
        description="Hola mi nombre es Julian, tengo 18 años y soy nadador profesional."
        avatar={user[0].data.avatar}
        images={["https://www.rehagirona.com/wp-content/uploads/2021/07/atletismo_paralimpico_des.jpg", "https://billiken.lat/wp-content/uploads/2021/07/atle-para.jpg", "https://www.acnur.org/thumb1/60db219df.jpg", "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/mjdvlnu0gpflzhuvgkbw"]}
      />}
        
      />
      <ProfileStackNavigator.Screen
        name="Form"
        component={FormRegisterUser}
        
      />
    </ProfileStackNavigator.Navigator>
  )
}

function LandingStack() {
  return (
    <LandingStackNavigator.Navigator
      initialRouteName='Login'
    >
      <LandingStackNavigator.Screen
        name="Login"
        component={LandingPage}
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white"}
        }}
      />
    </LandingStackNavigator.Navigator>
  )
}

function MyStack() {
  return (
    <MarketStackNavigator.Navigator
      initialRouteName="MarketPlace"
    >
      <MarketStackNavigator.Screen
        name="MarketPlace"
        children={({item}) => <MarketPlace producto={item} />}
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white"}
        }}
      />
      <MarketStackNavigator.Screen
        name="Cart"
        component={Cart}
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white"}
        }}
      />
      <MarketStackNavigator.Screen
        name="Detail"
        component={ProductDetail}
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white"}
        }}
      />

    </MarketStackNavigator.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const MyTheme = {
   colors: {
    primary: '#F5F5F5',
    text: '#F5F5F5',
    notification: 'rgb(255, 69, 58)',
  },
}


function MyTabs() {
  const { user } = useSelector(state => state)
  return (
      
  <Tab.Navigator 
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor:"#4d4d4d", height: 60},
      headerStyle:{ },
      tabBarInactiveTintColor: "#F5F5F5",
      tabBarActiveTintColor: "#C7D31E"
    }}
  >

    <Tab.Screen name="Home"
      component={HomeScreen}
      options={{
        headerStyle: {backgroundColor:"#4d4d4d"},
        headerTitleStyle: {color: "white"},
        title: 'Home',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <MaterialIcons name="home" size={28} color={color}/>
          );
        },
      }}
    />

    <Tab.Screen name="Add Product"
      component={ImagePicker}
      options={{
        title: 'Add Product',
        tabBarIcon: ({size,focused,color}) => {
          return (                
            <Entypo name="squared-plus" size={24} color={color} />
          );
        },
      }}
    />

    <Tab.Screen name="Market"
      component={MyStack}
      options={{
        headerShown: false,
        tabBarIcon: ({size,focused,color}) => {
          return (                
            <Entypo name="shop" size={24} color={color} />
          );
        },
      }}
    />
    
    <Tab.Screen name="Profile"
      component={ProfileStack}
      options={{
        headerShown: false,
        title: 'My profile',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          );
        },
      }} 
    />

  </Tab.Navigator>
  );
}

export default function Navigation() {
  const user = useSelector(state => state.user);

  // useEffect(() =>{
  //   console.log('USER DESDE USEEFFECT :', user)
  // }, [user])

  // const verificador = async (user) => {
  //   try {
  //     if ( typeof user[0] !== 'object' ) {
  //       console.log("USER ===>", user)
  //       return false
  //     } else {
  //       console.log("USER DESDE ELSE ====>", user)
  //       const data = await axios.get(`https://dpower-production.up.railway.app/users/${user[0].id}`).then(e => e.data)
  //       console.log("DATA ===>", data)
  //       return data
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const resultGet = verificador(user);
  // console.log('CONSOLE DESDE NAV --> ', user)
  // console.log('CONSOLE DE RESULTGET', resultGet)
  
  //   return(
  //   <NavigationContainer style={MyTheme} >
  //     {
  //       Object.keys(resultGet).includes("id") ? (
  //         <MyTabs />
  //       ) : (
  //         <LandingStack />
  //       )
  //     }
  //   </NavigationContainer>
  // )}

  return(
    <NavigationContainer style={MyTheme} >
      {
        user.length ? (
          <MyTabs />
        ) : (
          <LandingStack />
        )
      }
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#7D7D7D",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#C7D31E",
    color: "000000",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
})
