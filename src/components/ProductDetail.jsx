import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Button, Caption, Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";
import { useNavigation } from '@react-navigation/native';


export default function ProductDetail({route}) {

    const dispatch = useDispatch();
    const cart = useSelector(store => store.cart)
    const { image, price, name, description, category, id, stock } = route.params.selectedProduct;
    const [product, setProduct] = useState(null)
    const navigation = useNavigation();

    useEffect(() => {
        setProduct({
            id: id,
            name: name,
            price: price,
            image: image,
            stock: stock,
            description: description,
            category: category,
            total: 1
        });
    }, []);

    const handleSubmit = () => {
        const exists = cart.find(e => e.id === id)
        if (!exists) {
            dispatch(addToCart(product));
            alert("Product added to cart!");
        } else { alert("This product is already in the cart") }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                    name="chevron-back"
                    style={{
                        fontSize: 18,
                        color: '#777777',
                        padding: 12,
                        backgroundColor: '#F0F0F3',
                        borderRadius: 12,
                    }}
                    />
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'white'
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
