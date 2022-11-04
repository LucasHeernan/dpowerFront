import React from 'react';
import { useState } from 'react';
 import { Button, TextInput, StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native';
 import { Formik } from 'formik';
 import axios from 'axios';
 import * as ImagePicker from 'expo-image-picker';


//  POST https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload

 export default function PostProducts () {
    const [image, setImage] = useState(null);

   
        const pickImage = async () => {
            // No permissions request is necessary for launching the image library


            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              
              
              quality: 1,
              title: 'Select Photo',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },

            });

            if (!result.cancelled) {
                setImage(result);
              }
        
            console.log('Result:', result);   

            console.log('Image:', image.uri)
        }

        const cloudinaryUpload = (photo) => {
            const data = new FormData()
            data.append('file', photo)
            data.append('upload_preset', 'depawer')
            data.append("cloud_name", "dr6vvkghv")
            fetch("https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setPhoto(data)
      }).catch(err => {
        Alert.alert("An Error Occured While Uploading")
      })
          }


        
    // ImagePicker.launchImageLibraryAsync(options, (response) => {
    //     console.log('Response = ', response);
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else {
    //       const uri = response.uri;
    //       const type = response.type;
    //       const name = response.fileName;
    //       const source = {
    //         uri,
    //         type,
    //         name,
    //       }
    //       console.log("Image ", source)
    //     }
    //   });

    return (
     <View>   
   


 <TouchableOpacity onPress={pickImage} >
            <Text >Pick a photo</Text>
        </TouchableOpacity>   

        <TouchableOpacity onPress={cloudinaryUpload} >
            <Text >upload</Text>
        </TouchableOpacity> 

       
<View>
 <Image source={{ uri: 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' }} style={styles.tinyLogo}>
        </Image>
</View>



</View>

 )};

 const styles = StyleSheet.create({
    tinyLogo: {
          width: 280,
          height: 280, 
          borderRadius: 35,
        },
   
  });