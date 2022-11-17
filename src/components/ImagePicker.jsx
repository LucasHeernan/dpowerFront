import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import { createIconSetFromFontello } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getUserById } from '../redux/actions';

//  POST https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload

export default function PostImage() {
    const { user, userById } = useSelector(store => store)
    const dispatch = useDispatch()
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

    useEffect(() => {
        dispatch(getUserById(user[0]?.data.id))
      }, [] )

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
                if (userById[0]?.data?.validated === true) {
                    publicacion = {
                        likes: 0,
                        powersGained: 0,
                        description: descr,
                        UserInfoId: userById[0]?.data?.id,
                        multimedia: imagenurl.secure_url
                    }
                } else {
                    publicacion = {
                        likes: 0,
                        powersGained: -1,
                        description: descr,
                        UserInfoId: userById[0]?.data?.id,
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
                <Text style={styles.textdescr}>Photo description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescr}
                    placeholder={"  White a caption ..."}
                    value={descr}
                />
            </View>
            <View style={styles.imagecontainer}>
                <Image source={img ? ({ uri: img.uri }) : { uri: null }} style={styles.tinyLogo} />
            </View>

            <Button style={styles.pick} icon="camera" color='#C7D31E' mode="elevated" onPress={pickImage}>
                Pick a photo
            </Button>

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
        backgroundColor: 'white',
    },
    container1: {
        alignItems: 'center',
        backgroundColor: '#F0F0F3',
        justifyContent: 'center',
        paddingVertical: 39,
        marginBottom: 20,
        height: '100%'
    },
    formContainer: {
        padding: 8,
    },
    imagecontainer: {
        borderRadius: 35,
        alignSelf: 'center',
        borderColor: '#F0F0F3',
        borderWidth: 5,
        margin: 18,
        marginTop: 20,
    },
    pick: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        borderColor: "#d9ed92",
        borderWidth: 1.5
    },
    picktext: {
        color: '#777777'
    },
    postear: {
        marginTop: 50,
        backgroundColor: '#C7D31E',
        color: '#C7D31E',
        width: '65%',
        borderRadius: 19,
        alignItems: 'center',
        margin: 20,
    },
    posteartext: {
        padding: 13,
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
        color: 'white',
        textTransform: 'uppercase',
    },
    input: {
        width: 300,
        margin: 15,
        borderWidth: 5,
        borderColor: '#EDEDED',
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    textdescr: {
        marginTop: 10,
        fontSize: 22,
        color: 'black',
        alignSelf: 'center'
    }
});