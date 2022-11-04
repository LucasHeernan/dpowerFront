import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Alert, Platform, StyleSheet, Image, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginData } from '../redux/actions';

// you need to swap out these details with your auth0 credientals
const auth0ClientId = "R7NnYEPxs5lx6uWZCLvcaSe1vNFAAiUf";
const authorizationEndpoint = "https://dpwr.us.auth0.com/authorize";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

console.log("URI: ",redirectUri)  // <-- you will need to add this to your auth0 callbacks / logout configs

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
        console.log("Result: ", result);
        dispatch(loginData(userInfo))
    }
    }, [result])
  return (
      <Button
        title='Login prueba'
        onPress={() => {
          prueba()
          }} // <-- will open the universal login 
       />
  );
}