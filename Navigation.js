import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//screens
import HomeScreen from './src/components/HomeScreen';
import MarketPlace from './src/components/MarketPlace';
import Profile from './src/components/Profile';
import Cart from './src/components/Cart'
import ProductCard from './src/components/ProductCard';
import UploadPost from './src/components/UploadPost'


const MarketStackNavigator = createNativeStackNavigator();


function MyStack() {
  return (
    <MarketStackNavigator.Navigator
    initialRouteName="MarketPlace"
    >
      <MarketStackNavigator.Screen
      name="MarketPlace"
      component={MarketPlace}
      />
      <MarketStackNavigator.Screen
      name="Cart"
      component={Cart}
      />

      <MarketStackNavigator.Screen
      name="Detail"
      component={ProductCard}
      />

    </MarketStackNavigator.Navigator>
)}

const Tab = createBottomTabNavigator();

const MyTheme = {
   colors: {
    primary: '#F5F5F5',
    text: '#F5F5F5',
    notification: 'rgb(255, 69, 58)',
  },
}


function MyTabs() {
    return (
       
    <Tab.Navigator 
    screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor:"#4d4d4d", height: 60,},
          headerStyle:{ },
          tabBarInactiveTintColor: "#F5F5F5",
          tabBarActiveTintColor: "#C7D31E",}}
    >
           
        <Tab.Screen name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({size,focused,color}) => {
                return (
                 <MaterialIcons name="home" size={28} color={color}/>
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
  
        <Tab.Screen name="Upload"
            component={UploadPost}
            options={{
              title: 'UploadPost',
              tabBarIcon: ({size,focused,color}) => {
                return (                
                  <Entypo name="squared-plus" size={24} color={color} />
                );
              },
        }}/>
          
        <Tab.Screen name="Profile"
            component={Profile}
            options={{
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

export default function Navigation(){
    return(
    <NavigationContainer style={MyTheme} >
        <MyTabs />
    </NavigationContainer>
)}

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