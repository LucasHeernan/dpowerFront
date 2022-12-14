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


//screens
import HomeScreen from './src/components/HomeScreen';
import MarketPlace from './src/components/MarketPlace';
import Profile from './src/components/Profile';
import Cart from './src/components/Cart'
import ProductCard from './src/components/ProductCard';
import UploadPost from './src/components/UploadPost'
import ProductDetail from './src/components/ProductDetail';
import LandingPage from './src/components/LandingPage';
import FormRegisterUser from './src/components/FormRegisterUser';
import PostPicture from './src/components/ImagePicker';
import Comments from './src/components/Comments';
// import StripeApp from './src/components/CheckOutForm';



const MarketStackNavigator = createNativeStackNavigator();
const LandingStackNavigator = createNativeStackNavigator();
const ProfileStackNavigator = createNativeStackNavigator();
const HomeStackNavigator = createNativeStackNavigator();

function HomePost() {
  return (
    <HomeStackNavigator.Navigator
    initialRouteName='HomePost'
    >
      <HomeStackNavigator.Screen
        name="HomeLanding"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerStyle: {backgroundColor:"#4d4d4d"},
        headerTitleStyle: {color: "white", fontSize: 28},
        title: 'Home',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <MaterialIcons name="home" size={28} color={color}/>
          );
        },
      }}
        />
    
      <HomeStackNavigator.Screen
      name="Comments"
      component={Comments}
    />
    </HomeStackNavigator.Navigator>
  )
}

function ProfileStack() {
  const { user } = useSelector(state => state)
  return (
    <ProfileStackNavigator.Navigator
      initialRouteName='My Profile'
    >
      <ProfileStackNavigator.Screen
        name="Profile"
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: "#F0F0F3"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
        component={Profile}
        
      />
      <ProfileStackNavigator.Screen
        name="Form"
        component={FormRegisterUser}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
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
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
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
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
      />
      <MarketStackNavigator.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
      />
      <MarketStackNavigator.Screen
        name="Detail"
        component={ProductDetail}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
      />
      {/* <MarketStackNavigator.Screen
        name="CheckOut"
        component={StripeApp}
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
      /> */}



      {/* <MarketStackNavigator.Screen
        name="Comments"
        component={Comments}
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white"}
        }}
      /> */}
      
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
      backgroundColor: "#4d4d4d",
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor:"#4d4d4d", height: 60, fontSize: 28},
      headerStyle:{ },
      tabBarInactiveTintColor: "#F5F5F5",
      tabBarActiveTintColor: "#C7D31E"
    }}
  >

    <Tab.Screen name="Home"
      component={HomePost}
      options={{
        headerShown: false,
        headerStyle: {backgroundColor: "#4d4d4d"},
        headerTitleStyle: {color: "white"},
        tabBarIcon: ({size,focused,color}) => {
          return (                
    
            <MaterialIcons name="home" size={28} color={color}/>
          );
        },
      }}
    />

    <Tab.Screen name="Add Product"
      component={PostPicture}
      options={{
        headerShown: false,
        headerStyle: {backgroundColor:"#4d4d4d"},
        headerTitleStyle: {color: "white", fontSize: 28},
        title: 'New Post',
        tabBarIcon: ({size,focused,color}) => {
          return (                
            <Entypo name="squared-plus" size={28} color={color} />
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
            <Entypo name="shop" size={28} color={color} />
          );
        },
      }}
    />
    
    <Tab.Screen name="Profile"
      component={ProfileStack}
      options={{
        headerStyle: {backgroundColor:"#4d4d4d"},
        headerTitleStyle: {color: "white", fontSize: 28},
        headerShown: false,
        title: 'My profile',
        tabBarIcon: ({size,focused,color}) => {
          return (
            <FontAwesome5 name="user-alt" size={28} color={color} />
          );
        },
      }} 
    />

  </Tab.Navigator>
  );
}

export default function Navigation() {
  const user = useSelector(state => state.user);

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
