import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment, useStripe  } from "@stripe/stripe-react-native";




// export default function StripeApp() {
//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [loading, setLoading] = useState(false);
  
//     const fetchPaymentSheetParams = async () => {
//       const response = await fetch(`https://dpower-production.up.railway.app/products/pay`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const { paymentIntent, ephemeralKey, customer} = await response.json();
  
//       return {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//       };
//     };
  
//     const initializePaymentSheet = async () => {
//       const {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//         publishableKey,
//       } = await fetchPaymentSheetParams();
  
//       const { error } = await initPaymentSheet({
//         merchantDisplayName: "Example, Inc.",
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
//         //methods that complete payment after a delay, like SEPA Debit and Sofort.
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: 'Jane Doe',
//         }
//       });
//       if (!error) {
//         setLoading(true);
//       }
//     };

//     const openPaymentSheet = async () => {
//         const { error } = await presentPaymentSheet();
    
//         if (error) {
//           alert(`Error code: ${error.code}`, error.message);
//         } else {
//           alert('Success', 'Your order is confirmed!');
//         }
//       };

//     useEffect(() => {
//         initializePaymentSheet();
//       }, []);
    
//       return (
//         <View>
//           <Button
//             variant="primary"
//             disabled={!loading}
//             title="Checkout"
//             onPress={openPaymentSheet}
//           />
//         </View>
//       );
// }
