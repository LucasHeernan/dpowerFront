import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Platform, StyleSheet, Image, Button, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { createUser, getUserById } from '../redux/actions';

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
      console.log("userInfo", userInfo);
      // console.log("Result: ", result);
      dispatch(createUser(userInfo))
      dispatch(getUserById(userInfo.email))
    }
  }, [result])

  return (
    <View style={{flex:1}} >

      <ImageBackground source={require('../images/fondo_login.jpg')}
        style={{width:'100%', height: '100%', justifyContent: 'space-between'}}
      >

        <View></View>

        <View style={{flexDirection:'column', alignItems:'center'}} >
          <View style={{flexDirection:'row'}} >
            <Image source={require('../images/Dlogo.png')} style={{ width: 50, height: 50 }} />
            <Text style={{color: '#FFF', fontSize:30, fontWeight: 'bold', bottom: -7}} >POWER APP</Text>
          </View>
          <Text style={{maxWidth:'50%', color:"#E6E6E6", fontSize:17, textAlign:'center', paddingTop:15, fontWeight:'500'}}>The application to support paralympic athletes</Text>
        </View>

        <View style={{flexDirection:'column', alignItems:'center'}} >
          <TouchableOpacity style={{justifyContent:'center', width:'90%', backgroundColor: '#93b515', height:50, borderRadius: 10 }}
            onPress={() => { prueba() }}
            >
            <Text style={{fontSize:18, letterSpacing:1.5, fontWeight: '500', textAlign:'center', position:'relative', color: 'white', textTransform: 'uppercase'}} >Get Started</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight:'500', marginVertical: 20, color: '#93b515', fontSize: 17}} >Log in to your account</Text>
        </View>

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({})