import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';

function MarketPlace() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is the Market!</Text>
        <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://avatars.githubusercontent.com/u/1561955?v=4',
        }}
      />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default MarketPlace