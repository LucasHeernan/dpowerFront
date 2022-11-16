import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { getCommentsById, getpostById } from '../redux/actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { postComments } from '../redux/actions';
import { TextInput } from 'react-native-paper';


    export default function CommentsPost({route, navigation}){
      const {id} = route.params;
      // console.log('soy id =>', id);

    const { comments } = useSelector(state => state);
    const { postbyid } = useSelector(state => state)
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getCommentsById(id))
    }, [])
    // console.log('COMENTARIOS (comments) => ',comments)
    useEffect(() => {
      dispatch(getpostById(id))
    }, [])

      console.log(postbyid)
    const [text, setText] = useState('');
    
      function handleSubmit(){
        let crear = {
          content: text,
          PostId: id,
          UserInfoId: user[0].data.id
        };
        console.log(crear);
        dispatch(postComments(crear));
      }

    
      return (
        <ScrollView >
          <View >   
            <Text key={'comentario'} style={styles.titulo}>Commentarios:</Text>
              {
              comments?.map((e)=>(e.content)) !== undefined ? 
              (comments.map((e)=><Text key={e.id}>{e.content}</Text>)) : (<Text key={'soyKey'}>No hay comentarios</Text>)
              }
              </View> 
              <View>
              <TextInput
                    onChangeText={setText}
                    placeholder={"..."}
                    value={text}
                />
                  
                  <Button
                    type='submit'
                    title="Enviar"
                    onPress={handleSubmit}>
                      Enviar
                    </Button>
              </View>
              
           
        
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
  },
  

})