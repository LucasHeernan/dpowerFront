import React from 'react';
import { useState } from 'react';
 import { Button, TextInput, StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native';
 import { Formik } from 'formik';
 import axios from 'axios';
 import * as ImagePicker from 'expo-image-picker';


//  POST https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload

 export default function PostProducts () {
    const [image, setImage] = useState("");

   
        const pickImage = async () => {
            // No permissions request is necessary for launching the image library


            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              
              base64: true,
              quality: 1,
              title: 'Select Photo',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },

            });

            if (!result.cancelled) {
                
              
            let base64image = `data:image/jpg;base64,${result.base64}`

            

            let data = {
              "file": base64image,
              "upload_preset": "depawer",

              
            }
           setImage(data);
          }
           

              console.log(result)
        
            
        }

        const cloudinaryUpload = () => {
          
          console.log('upload console:     ', image)


            fetch("https://api.cloudinary.com/v1_1/dr6vvkghv/image/upload", { 
      method: "POST",
      body: JSON.stringify(image),
      headers: {
        'content-type': 'application/json'
      },

    }).then( async (res) => {
        let imagenurl = await res.json()
        console.log(imagenurl)
    })
      .catch(err => {
       console.log('Error del fetch:     ', err)
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
 <Image source={{ uri: image.uri }} style={styles.tinyLogo}>
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