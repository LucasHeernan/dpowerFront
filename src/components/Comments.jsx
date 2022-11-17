import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Button, RefreshControl} from 'react-native';
import { getCommentsById, getpostById, removeState } from '../redux/actions';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { postComments } from '../redux/actions';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';



// let updateComments = true;

    export default function CommentsPost({route, navigation}){
      const {id} = route.params;
      // console.log('soy id =>', id);
      // if (updateComments) getCommentsById()

      const [refreshing, setRefreshing] = useState(false);

    const { comments } = useSelector(state => state);
    const { postbyid } = useSelector(state => state)
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(removeState())
      dispatch(getCommentsById(id));
      dispatch(getpostById(id));
    }, [])

   

    // console.log('COMENTARIOS (comments) => ',comments)

   // usefeect con postbyid, consologear postby id, poner postbyid.data.(imagen), y centrarlan
    
      // console.log('lo que hay en user => ',user[0].data.name);
      

      // console.log('post by id =>', postbyid)

    const [text, setText] = useState('');
    
      function handleSubmit(){
        let crear = {
          content: text,
          PostId: id,
          UserInfoId: user[0].data.id
        };
        console.log(crear);
        dispatch(postComments(crear));
        setText('');
        dispatch(getCommentsById(id));
      }

      
      
      const multimedia = postbyid.multimedia;


 
    // console.log('usuario =>', user[0].data.name)
      return (
        <ScrollView style={styles.todo}
        //   refreshControl={
        //     <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={getCommentsById}
        //   />
        // }
      >
          <View style={styles.container}>
          <View style={styles.imagen}>

              <TouchableOpacity>
                <Image
                  style={styles.tinyLogo}
                  source={{uri: multimedia}}
                ></Image>
              </TouchableOpacity>
            </View>
          <View>
            <View style={styles.contenedorComments}>  
            <Text key={'comentario'} style={styles.titulo}>Comments:</Text>
              </View>
              {
              comments?.map((e)=>(e.content)) !== undefined ? 
              (comments.map((e)=>
              <Text style={styles.name} key={e.id}>{e.UserInfoId.split('@')[0]} : <Text style={styles.text} key={e.id}>{e.content}</Text></Text>)
              
              ) : (
              
              <Text key={'soyKey'} style={styles.else}>Write the first comment!</Text>)
              }
              </View> 
              <View>
              <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    placeholder={"Add New Comment..."}
                    value={text}
                />
                  <View style={styles.contenedorTouch}>
                  <TouchableOpacity
                    style={styles.button}
                    type='submit'
                    title="Enviar"
                    onPress={handleSubmit}>
                      <Text style={styles.buttonTxt}>
                      Send </Text>
                    </TouchableOpacity>
                    </View>
              </View>
              </View>
              
           
        
        </ScrollView>
      );
}

const styles = StyleSheet.create({
  todo: {
    backgroundColor: '#F0F0F3',
    fontFamily: "sans-serif",
  },
  container: {
      margin: 0,
      background: '#444753',
      borderRadius: 5,
  },
  contenedorComments: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  titulo: {
    fontSize: 25,
    color: '#C7D31E',
    paddingBottom: 2,
  },
  name: {
    color: '#9ad31e',
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    margin: 8,
    backgroundColor: 'white',//#B9B9B9
    borderRadius: 10,
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 12,
  },
  contenedorTouch: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 160,
    height: 40,
    backgroundColor: "#9ad31e",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    fontsize: 0.9,  
    backgroundColor: '#C7D31E',
    border: 'none',
    borderbottom: 'black',
    width: '100%',
    height: 50,
  },
  else: {
    fontSize: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    marginHorizontal: 80,
    marginTop: 15,
    marginVertical: 8,
  },
  imagen: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  tinyLogo: {
    display: 'flex',
    width: 360,
    height: 360,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
})