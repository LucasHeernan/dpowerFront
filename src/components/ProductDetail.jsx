import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Caption, Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";


export default function ProductDetail({route}) {

    const dispatch = useDispatch();
    const { image, price, name, description, category, id, stock } = route.params.selectedProduct;
    const [product, setProduct] = useState(null)

    useEffect(() => {
        setProduct({
            id: id,
            name: name,
            price: price,
            image: image,
            stock: stock
        });
    }, []);

    const handleSubmit = () => {
        dispatch(addToCart(product));
        console.log('PRODUC SUBMIT - ', product)
        alert("Producto añadido al carrito!");
    }

    // console.log('QUE LLEGA -', route.params.selectedProduct);

    // const handleSubmit = (e) => {
    //     dispatch(addToCart(e))
    // }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image source={{uri: image}} style={styles.image} alt="Image" />
                <Caption style={{letterSpacing: 2, alignItems: "center", marginBottom:2, marginTop: 20}}>{category}</Caption>
                <Headline style={styles.name}>{name}</Headline>
                <Headline style={styles.price}>${price}</Headline>
                <Button icon="cash" mode="contained" style={styles.carting} onPress={handleSubmit}>ADD TO CART</Button>
                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 50,
        paddingRight: 50,
        padding: 12,
        backgroundColor: '#7d7d7d'
    },
    image: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        borderRadius: 12
    },
    name: {
        lineHeight: 20,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 18,
    },
    price: {
        fontWeight: "bold",
        color: "green",
        fontSize: 19
    },
    description: {
        lineHeight: 24,
        fontSize: 16
    },
    carting: {
        backgroundColor: "#C7D31E",
        color: "white",
        marginTop: 15,
        marginBottom: 15
    }
});
