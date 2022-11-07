import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { Button, TextInput, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
 import { Formik } from 'formik';
 import * as ImagePicker from 'expo-image-picker';
import { createIconSetFromFontello } from '@expo/vector-icons';
import axios from 'axios';


//  POST https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload

 export default function PostProducts () {
    const { user } = useSelector(store => store )
    
    const [image, setImage] = useState(null);
    const [img, setImg] = useState(null)


    const [mediaurl, setmediaurl] = useState({});
    const [ postdescription, setpostdescription ] = useState('')
    
    const [ post, setPost ] = useState({
        likes: 0,
        powersGained: 0,
        multimedia: '',
        description: postdescription,
        userId: user[0].email
    })

    // function handleChange(e) {
    //     setPost((post) => ({
    //         ...post,
    //         description: e
    //     }))
    // }

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
                
        } console.log('img:       ', img)
    }

    const cloudinaryUpload = () => {
          
        console.log('upload console:     ', image)

          fetch("https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload", { 
            method: "POST",
            body: JSON.stringify(image),
            headers: {
                'content-type': 'application/json'
            },
            })
            .then( async (res) => {
                let imagenurl = await res.json()
                let publicacion = {
                    likes: 1,
                    powersGained: 1,
                    description: ' ',
                    UserInfoId: user[0].email,
                    multimedia: imagenurl.secure_url
                }
                console.log('RESJSON:   ', imagenurl)
                console.log('estado', publicacion)
                
                axios.post(`https://dpower-production.up.railway.app/post`, publicacion)
                //.then(resp => alert('Post created!'))
                //.catch(error => console.log(JSON.stringify(error)))
                
                //handleselectmedia(imagenurl.secure_url)
                // handleselectmedia(imagenurl.secure_url)
                //console.log('media     :', imagenurl.secure_url ) 
            })
            .catch(err => {
            console.log('Error del fetch:     ', err)
            })  
            
           
    }


    const verificacion =  () => {
        console.log('imagenurl2:  ', mediaurl.secure_url)
      handleselectmedia(mediaurl.secure_url)
      
    }

   
    



    const submitphoto =  () => {
        console.log('mediaurl:  ', mediaurl)
        handleselectmedia(mediaurl)
         console.log('POST2:       ', post)
         
    }

    const postear = ()=>{
        console.log(post)
    }


    
        return (
     
        <View style={styles.container1}>             
        <View>
            <Image source={ img ? ( {uri:img.uri}) : { uri: null }} style={styles.tinyLogo}/>
        </View> 

        <TouchableOpacity onPress={pickImage} >
            <Text >Pick a photo</Text>
        </TouchableOpacity>   

        <TouchableOpacity onPress={cloudinaryUpload} >
            <Text >upload</Text>
        </TouchableOpacity> 

        <View>
        <TextInput
        style={{height: 40}}
        placeholder="Add a description!"
        onChangepostdescription={newpostdescription => setpostdescription(newpostdescription)}
        value={postdescription}
      />
     

        </View>



        <Button onPress={cloudinaryUpload} title={'Submit photo'}/>
    

        <Button onPress={verificacion} title={'verificacion'}/>

        <Button onPress={postear} title={'postear'}/>
</View>

) 
}; 

   
         
            
            
       
    

 const styles = StyleSheet.create({
    tinyLogo: {
          width: 280,
          height: 280, 
          borderRadius: 35,
          alignSelf: 'center',
        },
    container1:{
        alignItems: 'center',  
    },
    formContainer: {
        padding: 8,
    },
   
  });