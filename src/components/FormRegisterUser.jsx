import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { TextInput, HelperText } from "react-native-paper";
import axios from "axios";

export default function FormRegisterUser() {
    const [text, setText] = useState("");

    const onChangeText = text => setText(text);

    const hasErrors = () => {
        return !text.includes("@");
    }  

    return (
        <View>
            <TextInput label="Email" value={text} onChangeText={onChangeText} />
            <HelperText type="error" visible={hasErrors()}>
                Email address is invalid!
            </HelperText>
        </View>
    )
}