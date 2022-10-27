import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from "./Post";

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Post></Post>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center' 
  }
})
export default HomeScreen