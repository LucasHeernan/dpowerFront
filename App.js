// import React from 'react';
// import Navigation from './Navigation'
// import { Provider } from 'react-redux';
// import store from './src/redux';
// import { useAuth0, Auth0Provider } from 'react-native-auth0';

// export default function App() {
//   return (
//     <Auth0Provider
//       domain={"dev-tgmuj241vtx0h7yl.us.auth0.com"}
//       clientId={"ynhyOp9owQFIT8qYy1JBDtpT7wgdfc2I"}
//     >
//       <Provider store={store}>
//         <Navigation/>
//       </Provider>
//     </Auth0Provider>
//   );
// }

import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
// import { Auth0Provider } from "@auth0/auth0-react";
import Navigation from './Navigation'
import { Provider } from 'react-redux';
import store from './src/redux';

// ReactDOM.render(
//   <Provider store={store}>
//     <Auth0Provider
//       domain="dev-tgmuj241vtx0h7yl.us.auth0.com"
//       clientId="2VbDucD7TVu3lDDxPm7VoIDr5NrlrGP7"
//       // redirectUri={window.location.origin}
//     >
//       <Navigation/>
//     </Auth0Provider>
//   </Provider>,
//   document.getElementById("root")
// );
export default function App() {
  return (
    // <Auth0Provider
    //   domain={"dev-tgmuj241vtx0h7yl.us.auth0.com"}
    //   clientId={"2VbDucD7TVu3lDDxPm7VoIDr5NrlrGP7"}
    // >
      <Provider store={store}>
        <Navigation/>
      </Provider>
    // </Auth0Provider>
  );
}