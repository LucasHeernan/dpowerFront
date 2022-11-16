import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { getCommentsById } from '../redux/actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { postComments } from '../redux/actions';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';


    export default function CommentsPost({route, navigation}){
      const {id} = route.params;
      // console.log('soy id =>', id);

    const { comments } = useSelector(state => state);
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getCommentsById(id))
    }, [])
    // console.log('COMENTARIOS (comments) => ',comments)
    
      // console.log('lo que hay en user => ',user[0].data.name);

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
        <ScrollView style={styles.todo}>
          <View style={styles.container}>
          <View>   
            <Text key={'comentario'} style={styles.titulo}>Commentarios:</Text>
              {
              comments?.map((e)=>(e.content)) !== undefined ? 
              (comments.map((e)=>
              <Text style={styles.name} key={e.id}>{user[0].data.name}: 
              
              <Text style={styles.text} key={e.id}>{e.content}</Text></Text>)
              
              ) : (
              
              <Text key={'soyKey'} style={styles.else}>Todavia No hay comentarios</Text>)
              }
              </View> 
              <View>
              <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    placeholder={"..."}
                    value={text}
                />
                  
                  <Button
                    style={styles.button}
                    type='submit'
                    title="Enviar"
                    onPress={handleSubmit}>
                      Enviar
                    </Button>
              </View>
              </View>
              
           
        
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  todo: {
    backgroundColor: 'white',
    fontFamily: "sans-serif",
  },
  container: {
      margin: 0,
      background: '#444753',
      borderRadius: 5,
  },
  titulo: {
    fontSize: 20,
    color: '#C7D31E',
    paddingBottom: 2,
    marginHorizontal: 18,
    backfaceVisibility: ( 12 ),
    webkitbackdropfilter: ( 12 ),
    borderRadius: 10,
  },
  name: {
    fontSize: 8,
    paddingBottom: 15,
    fontWeight: 600,
    marginHorizontal: 10,
    marginTop: 15,
    marginVertical: 8,
    backgroundColor: '#444753',
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    paddingBottom: 15,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 15,
    marginVertical: 8,
    backgroundColor: '#f5eded',
    borderRadius: 12,
  },
  button: {
    color: '#090909',
    padding: 0.7,
    fontsize: 18,
    borderradius: 0.5,
    backgroundColor: '#EDEDED',
    border: 1,
    transition: 0.3,
  },
  input: {
    fontsize: 0.9,  
    backgroundColor: '#C7D31E',
    paddinginline: 0.5,
    paddingblock: 0.7,
    marginTop: 363,
    border: 'none',
    borderbottom: 'black',
  },
  else: {
    fontSize: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    marginHorizontal: 80,
    marginTop: 15,
    marginVertical: 8,
  }
})