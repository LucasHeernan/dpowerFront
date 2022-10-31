import React from 'react';
 import { Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
 import axios from 'axios';

 const PostProducts = (values) => {
    //axios.get(`https://fakestoreapi.com/products`)
     axios.post(`http://192.168.100.47:3001/productos`, values)
      .then(resp => alert('Product created!'))
      .catch(error => alert(error))
      //.finally(() => console.log(values));
  };

 export default function UploadPost (props){
    return (
        
   <Formik
     initialValues={{ 
        name: '',
        category: '',
        price: 0,
        stock: 0,
        published: 0,
        image: '',
        description: '',
    
    }}
     onSubmit={values => PostProducts(values)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
         />
         <TextInput
           onChangeText={handleChange('category')}
           onBlur={handleBlur('category')}
           value={values.category}
         />
         <TextInput
           onChangeText={handleChange('price')}
           onBlur={handleBlur('price')}
           value={values.price}
         />
         <TextInput
           onChangeText={handleChange('stock')}
           onBlur={handleBlur('stock')}
           value={values.stock}
         />
         <TextInput
           onChangeText={handleChange('published')}
           onBlur={handleBlur('published')}
           value={values.published}
         />
         <TextInput
           onChangeText={handleChange('image')}
           onBlur={handleBlur('image')}
           value={values.image}
         />
         <TextInput
           onChangeText={handleChange('description')}
           onBlur={handleBlur('description')}
           value={values.description}
         />
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
 )};