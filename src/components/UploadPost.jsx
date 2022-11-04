import React from 'react';
 import { Button, TextInput, View, Text } from 'react-native';
 import { Formik } from 'formik';
 import axios from 'axios';

 const PostProducts = (values) => {
    //axios.get(`https://fakestoreapi.com/products`)
     axios.post(`https://dpower-production.up.railway.app/products`, values)
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
        <Text>Name</Text>
         <TextInput
         
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
         />
          <Text>Category</Text>
         <TextInput
           onChangeText={handleChange('category')}
           onBlur={handleBlur('category')}
           value={values.category}
         />
         <Text>Price</Text>
         <TextInput
           onChangeText={handleChange('price')}
           onBlur={handleBlur('price')}
           value={values.price}
         />
         <Text>Stock</Text>
         <TextInput
           onChangeText={handleChange('stock')}
           onBlur={handleBlur('stock')}
           value={values.stock}
         />
         <Text>Published</Text>
         <TextInput
           onChangeText={handleChange('published')}
           onBlur={handleBlur('published')}
           value={values.published}
         />
         <Text>Image URL</Text>
         <TextInput
           onChangeText={handleChange('image')}
           onBlur={handleBlur('image')}
           value={values.image}
         />
         <Text>Description</Text>
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