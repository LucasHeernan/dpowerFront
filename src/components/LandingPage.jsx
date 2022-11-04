import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Platform, StyleSheet, Image, Button, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginData } from '../redux/actions';

// you need to swap out these details with your auth0 credientals
const auth0ClientId = "R7NnYEPxs5lx6uWZCLvcaSe1vNFAAiUf";
const authorizationEndpoint = "https://dpwr.us.auth0.com/authorize";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

// console.log("URI: ",redirectUri)  // <-- you will need to add this to your auth0 callbacks / logout configs

export default function Login() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  const prueba = async () => {
    try {
      var loginPrueba = await promptAsync({ useProxy })
      return loginPrueba
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    if (result) {
      const token = result.params.id_token;
      const userInfo = jwtDecode(token);
      // console.log("userInfo", userInfo);
      // console.log("Result: ", result);
      dispatch(loginData(userInfo))
    }
  }, [result])

  return (
    <View style={{flex:1}} >

      <ImageBackground source={require('../images/fondo_login.jpg')}
        style={{width:'100%', height: '100%', justifyContent: 'space-around'}}
      >

        <View style={{flexDirection:'column', alignItems:'center'}} >
          <Text style={{color: '#FFF', fontSize:30, fontWeight: 'bold'}} >Welcome to Dpower</Text>
          <Text style={{maxWidth:'50%', color:"#E6E6E6", fontSize:14, textAlign:'center', paddingTop:15}}>The application to support paralympic athletes</Text>
        </View>

        <View style={{flexDirection:'column', alignItems:'center'}} >
          <TouchableOpacity style={{justifyContent:'center', width:'90%', backgroundColor: '#6E6E6E', height:50, borderRadius:13 }}
            onPress={() => { prueba() }}
            >
            <Text style={{fontSize:18, letterSpacing:1.5, textAlign:'center', position:'relative', color: 'white'}} >Get Started</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({})