import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";

const Post = () => {

    return (

        <Card style={style.container}>
            <Card.Content>
                <Title>Carlos</Title>
            </Card.Content>
            <Card.Cover source={{ uri: "https://www.blogdelfotografo.com/wp-content/uploads/2022/01/retrato-anillo-luz.jpg"}} />
            <Card.Content>
                <Paragraph>Hola este es el primer post!</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Like</Button>
                <Button>Power</Button>
                <Button>Comments</Button>
                <Button>Share</Button>
            </Card.Actions>
        </Card>
    )
}

export default Post;

const style = StyleSheet.create({
    container :{
        margin: 60,
        paddingVertical: 0.25,
        borderRadius: 23,
        textAlign: "center",
         fontSize: 30,
         fontWeight: "bold"
    }
})