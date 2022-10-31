import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Caption, Headline } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

export default function ProductDetail({route}) {
    // const {id, name, price, description, image, category} = props;
    const {category, description, id, image, name, price} = (route.params.selectedProduct)

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image source={{uri: image}} style={styles.image} alt="Image" />
                <Caption style={{letterSpacing: 2, alignItems: "center", marginBottom:5, marginTop: 25}}>{category}</Caption>
                <Headline style={styles.name}>{name}</Headline>
                <Headline style={styles.price}>${price}</Headline>
                <Button icon="cash" mode="contained" style={styles.carting} onPress={() => alert("Añadido al carrito!")}>ADD TO CART</Button>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 50,
        paddingRight: 50
    },
    image: {
        width: "100%",
        height: 350,
        resizeMode: "contain"
    },
    name: {
        lineHeight: 20,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20
    },
    price: {
        fontWeight: "bold",
        color: "green",
        fontSize: 19
    },
    description: {
        lineHeight: 24,
        fontSize: 12
    },
    carting: {
        backgroundColor: "#C7D31E",
        color: "white",
        marginTop: 15,
        marginBottom: 15
    }
})

