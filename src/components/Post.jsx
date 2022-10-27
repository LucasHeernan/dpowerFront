import React from "react";
import { View, Text, Image } from 'react-native';

function Post(first_name, avatar) {
    return (
        <View>
            <Text>{first_name}</Text>
            <Image source={avatar} />
        </View>
    )
}

export default Post;