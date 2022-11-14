import { View, Text, TextInput, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const [name, setName] = useState('');

  const subscribe = async () => {
    try {
      const response = await fetch('https://dpower-production.up.railway.app/pay', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
    } catch (error) {
      console.log(error);
      Alert.alert('¡Algo salió mal, inténtalo de nuevo más tarde!');
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder='Name'
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
  },
});

export default CheckoutForm;
