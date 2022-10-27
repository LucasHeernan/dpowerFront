import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function ProductCard({image, name, price}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{price}</Text>
        {/* <Text>{description}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  // container: {
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: 'flex-start',
  //   flexDirection: 'row', 
  //   padding: 5,
  //   marginLeft: 15,
  // },
  advice: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  subtitle:{
    textDecorationLine: 'underline',
    color: 'blue',
  }
});