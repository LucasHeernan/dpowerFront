// import React from "react";
// import { View, TouchableOpacity, Text, Button } from "react-native";
// import { useAuth0 } from 'react-native-auth0';

// export default function LandingPage() {
//     const { authorize } = useAuth0();
//     const onPress = async () => {
//         try {
//             await authorize();
//         } catch (e) {
//             console.log(e);
//         }
//     };
    
//     return <Button onPress={onPress} title="LOG IN" />
// }

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;