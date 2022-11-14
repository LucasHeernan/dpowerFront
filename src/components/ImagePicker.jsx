import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextInput, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { createIconSetFromFontello } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

//  POST https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload

export default function PostImage() {
    const { user } = useSelector(store => store)

    const [image, setImage] = useState(null);
    const [img, setImg] = useState(null)
    const [descr, setDescr] = useState('')


    const [mediaurl, setmediaurl] = useState({});
    const [postdescription, setpostdescription] = useState('')

    const [post, setPost] = useState({
        likes: 0,
        powersGained: 0,
        multimedia: '',
        description: postdescription,
        UserInfoId: user[0].data.id

    })

    const navigation = useNavigation();

    function handleChange(e) {
        setPost((post) => ({
            ...post,
            description: e
        }))
    }

    function handleselectmedia(e) {
        setPost((post) => ({
            ...post,
            multimedia: e
        }))
    }

    let imagenurl = {}

    // useEffect(() => {
    //     if (imagenurl) {
    //         setmediaurl(imagenurl)
    //         console.log(mediaurl)
    //     }
    //     return () => {
    //     };
    // }, [imagenurl]); //eslint-disable-line




    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
            quality: 1,
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        });
        setImg(result);


        if (!result.cancelled) {
            let base64image = `data:image/jpg;base64,${result.base64}`
            let data = {
                "file": base64image,
                "upload_preset": "depawer",
            }
            setImage(data);

        } //console.log('img:       ', img)
    }

    const cloudinaryUpload = () => {

        //console.log('upload console:     ', image)

        fetch("https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload", {
            method: "POST",
            body: JSON.stringify(image),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(async (res) => {
                let imagenurl = await res.json()
                let publicacion = {}
                if (user[0].data.validated === true) {
                    publicacion = {
                        likes: 0,
                        powersGained: 0,
                        description: descr,
                        UserInfoId: user[0].data.id,
                        multimedia: imagenurl.secure_url
                    }
                } else {
                    publicacion = {
                        likes: 0,
                        powersGained: -1,
                        description: descr,
                        UserInfoId: user[0].data.id,
                        multimedia: imagenurl.secure_url
                    }
                }
                console.log('publicacion:   ', publicacion)


                axios.post(`https://dpower-production.up.railway.app/post`, publicacion)
                //.then(resp => alert('Post created!'))
                //.catch(error => console.log(JSON.stringify(error)))

                //handleselectmedia(imagenurl.secure_url)
                // handleselectmedia(imagenurl.secure_url)
                //console.log('media     :', imagenurl.secure_url ) 
            })
            .then(() => {
                console.log(user[0])
                setImg(null)
                setDescr('')
            })

            .finally(() => navigation.navigate("Home"))
            .catch(err => {
                console.log('Error del fetch:     ', err)
            })
    }








    return (

        <View style={styles.container1}>
            <View>

                <Text style={styles.textdescr}>Description: (optional)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescr}
                    placeholder={"..."}
                    value={descr}
                />
            </View>
            <View style={styles.imagecontainer}>
                <Image source={img ? ({ uri: img.uri }) : { uri: null }} style={styles.tinyLogo} />
            </View>


            <TouchableOpacity style={styles.pick} onPress={pickImage} >

                <Text style={styles.picktext}>Pick a photo</Text>
            </TouchableOpacity>



            <TouchableOpacity style={styles.postear} onPress={cloudinaryUpload}>
                <Text style={styles.posteartext}>Post</Text>
            </TouchableOpacity>


        </View>

    )
};








const styles = StyleSheet.create({
    tinyLogo: {
        width: 300,
        height: 300,
        borderRadius: 35,
    },
    container1: {
        alignItems: 'center',
        backgroundColor: '#4d4d4d',
        paddingVertical: 39,
        marginBottom: 20,

    },
    formContainer: {
        padding: 8,
    },

    imagecontainer: {
        borderRadius: 35,
        alignSelf: 'center',
        borderColor: '#EDEDED',
        borderWidth: 5,
        margin: 18,
        marginTop: 20,
    },

    pick: {
        margin: 10,
        marginTop: -5,
        fontSize: 22,
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
        width: 150,
        alignItems: 'center',
    },
    picktext: {
        marginHorizontal: 10,
        fontSize: 22,

    },
    postear: {
        marginTop: 35,
        backgroundColor: '#C7D31E',
        color: '#C7D31E',
        borderRadius: 8,
        width: 180,
        alignItems: 'center',
        margin: 20,


    },
    posteartext: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 8,
        marginHorizontal: 30,
    },

    input: {
        width: 300,
        margin: 15,
        borderWidth: 5,
        borderColor: '#EDEDED',
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 15,

    },
    textdescr: {
        marginTop: 10,
        marginLeft: 22,
        marginBottom: -8,
        fontSize: 22,
        color: '#EDEDED'
    }



});