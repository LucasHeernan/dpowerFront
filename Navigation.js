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
<<<<<<< HEAD
import LandingPage from './src/components/LandingPage'
import ImagePicker from './src/components/ImagePicker'


const MarketStackNavigator = createNativeStackNavigator();
const HomeStackNavigator = createNativeStackNavigator();
=======
import LandingPage from './src/components/LandingPage';
import FormRegisterUser from './src/components/FormRegisterUser';
import PostPicture from './src/components/ImagePicker';



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
        name="Profile"
        options={{
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
        children={() => <Profile
        key={user[0].data.id}
        name={user[0].data.name || user[0].data.username}
        age={user[0].data.age}
        likes="65"
        powers="150"
        followers="1200"
        avatar={user[0].data.avatar}
        images={["https://www.rehagirona.com/wp-content/uploads/2021/07/atletismo_paralimpico_des.jpg", "https://billiken.lat/wp-content/uploads/2021/07/atle-para.jpg", "https://www.acnur.org/thumb1/60db219df.jpg", "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/mjdvlnu0gpflzhuvgkbw"]}
      />}
        
      />
      <ProfileStackNavigator.Screen
        name="Form"
        component={FormRegisterUser}
        options={{
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
          headerStyle: {backgroundColor: "#4d4d4d"},
          headerTitleStyle: {color: "white", fontSize: 28}
        }}
      />
    </LandingStackNavigator.Navigator>
  )
}
>>>>>>> origin/dev

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
<<<<<<< HEAD
    </MarketStackNavigator.Navigator>







)}
=======

    </MarketStackNavigator.Navigator>
  )
}
>>>>>>> origin/dev


function MyHomeStack() {
  return (
    <HomeStackNavigator.Navigator
    initialRouteName="LogIn"
    >
      <HomeStackNavigator.Screen
      name="LogIn"
      component={LandingPage}
      options={{
        headerStyle: {backgroundColor: "#4d4d4d"},
        headerTitleStyle: {color: "white"}
      }}
      />
      <HomeStackNavigator.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerStyle: {backgroundColor: "#4d4d4d"},
        headerTitleStyle: {color: "white"}
      }}
      />
    </HomeStackNavigator.Navigator>
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
  const { user } = useSelector(state => state)
  return (
      
  <Tab.Navigator 
    screenOptions={{
<<<<<<< HEAD
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor:"#4d4d4d", height: 60,},
          headerStyle:{ },
          tabBarInactiveTintColor: "#F5F5F5",
          tabBarActiveTintColor: "#C7D31E",}}
    >
           
        <Tab.Screen name="Home"
            component={MyHomeStack}
            options={{
              headerShown: false,
              headerStyle: {backgroundColor:"#4d4d4d"},
              headerTitleStyle: {color: "white"},
              title: 'Homes',
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
        }}/>
  
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
            children={() => <Profile 
              name="Julian" 
              sport="Natacion" 
              age="24" 
              nationality="Argentino"
              post="3"
              likes="65"
              powers="150"
              followers="1200"
              description="Hola mi nombre es Julian, tengo 18 años y soy nadador profesional."
              avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
              images={["https://www.rehagirona.com/wp-content/uploads/2021/07/atletismo_paralimpico_des.jpg", "https://billiken.lat/wp-content/uploads/2021/07/atle-para.jpg", "https://www.acnur.org/thumb1/60db219df.jpg", "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/mjdvlnu0gpflzhuvgkbw"]}
            />}
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
=======
      backgroundColor: "#4d4d4d",
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor:"#4d4d4d", height: 60, fontSize: 28},
      headerStyle:{ },
      tabBarInactiveTintColor: "#F5F5F5",
      tabBarActiveTintColor: "#C7D31E"
    }}
  >

    <Tab.Screen name="Home"
      component={HomeScreen}
      options={{
        
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

    <Tab.Screen name="Add Product"

      component={PostPicture}
      options={{
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
>>>>>>> origin/dev
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
