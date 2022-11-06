import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { TextInput, HelperText, Button } from "react-native-paper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {updateUser} from "../redux/actions/index"

// name, imagen, edad, deporte, descripcion, nacionalidad


export default function FormRegisterUser() {
    const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    const regexName = /^[a-zA-Z ]+$/;
    const dispatch = useDispatch()
    const { user } = useSelector(state => state)
    const mail = user[0].data.id

    return (
        <Formik
        initialValues={{ 
        name: '',
        avatar: "",
        age: 0,
        sport: "",
        nationality: '',
        description: '',
    
    }}
     onSubmit={values => dispatch(updateUser({...values, mail}))}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
            label="Name"
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
           placeholder={user[0].data.name}
         />
         <TextInput
            label="Avatar"
           onChangeText={handleChange('avatar')}
           onBlur={handleBlur('avatar')}
           value={values.avatar}
         />
         <TextInput
            label="Age"
           onChangeText={handleChange('age')}
           onBlur={handleBlur('age')}
           value={values.age}
         />
         <TextInput
            label="Sport"
           onChangeText={handleChange('sport')}
           onBlur={handleBlur('sport')}
           value={values.sport}
         />
         <TextInput
            label="Nationality"
           onChangeText={handleChange('nationality')}
           onBlur={handleBlur('nationality')}
           value={values.nationality}
         />
         <TextInput
            label="Description"
           onChangeText={handleChange('description')}
           onBlur={handleBlur('description')}
           value={values.description}
         />
         <Button mode="contained" onPress={handleSubmit}>
            Submit!
         </Button>
       </View>
     )}
   </Formik>
    )
}