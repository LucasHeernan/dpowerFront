import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/components/HomeScreen';
import MarketPlace from './src/components/MarketPlace';
import Profile from './src/components/Profile';
import Cart from './src/components/Cart'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import store from './src/redux';

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: '#F5F5F5',
    background: '#4D4D4D',
    card: 'rgb(255, 255, 255)',
    text: '#F5F5F5',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme} >
        <Tab.Navigator screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor:"#4d4d4d", height: 60,},
          headerStyle:{backgroundColor:"#4d4d4d", height: 70, },
          tabBarInactiveTintColor: "#F5F5F5",
          tabBarActiveTintColor: "#C7D31E",
        }}>
        <Tab.Screen name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({size,focused,color}) => {
                return (
                  // <Image
                  //   style={{ width: size, height: size, }}
                  //   source={{
                  //     uri:
                  //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                  //   }}
                  // />
                  <MaterialIcons name="home" size={28} color={color}/>
                );
              },
            }}/>

          <Tab.Screen name="Marketplace"
            component={MarketPlace}
            options={{
              title: 'Marketplace',
              tabBarIcon: ({size,focused,color}) => {
                return (                
                  <Entypo name="shop" size={24} color={color} />
                );
              },
            }}/>

          <Tab.Screen name="Cart"
            component={Cart}
            options={{
              title: 'Cart',
              tabBarIcon: ({size,focused,color}) => {
                return (                
                  <Entypo name="shopping-cart" size={24} color={color} />
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
            }} />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
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