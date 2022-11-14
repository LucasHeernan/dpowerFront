import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { getCommentsById } from '../redux/actions';
import { useDispatch, useState, useSelector, useEffect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { postComments } from '../redux/actions';
import { TextInput } from 'react-native-paper';

    export default function CommentsPost({id}){

    const { comments } = useSelector(state => state)
    const dispatch = useDispatch();

    
    const navigation = useNavigation();
  
    id = 30;
    React.useEffect(() => {
      dispatch(getCommentsById(id))
    }, [])
    console.log('COMENTARIOS (comments) => ',comments)
    


      const [input, setInput] = React.useState({
        comentario: "",
      });

      function handleSubmit(e){
        let crear = {
          comentario: input.comentario
        };
        dispatch(postComments(crear));
        setInput({
          comentario: "",
        });
        <Text>Gracias por comentar!</Text>
      }

      function handleChange(e){
        setInput({
          ...input,
          [e.target.comentario]: e.target.value,
        })  
      }


      return (
        <ScrollView >
          <View >
        
            <Text>Commentarios:</Text>
              <Text>{comments[0].content}</Text>
              </View> 
              
              <View>
                <TextInput
                  type="text"
                  name="comentario"
                  value={input.comentario}
                  onChange={(e) => handleChange(e)}
                  ></TextInput>
                  
                  <Button
                    type='submit'
                    title="Enviar"
                    onPress={(e) => handleSubmit(e)}>
                      Enviar
                    </Button>
              </View>
              
           
        
        </ScrollView>
      );
}