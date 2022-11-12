import React, { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { Dialog, Button, CheckBox } from "@rneui/themed";
import * as Sharing from 'expo-sharing';
import { setNestedObjectValues } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, updateUser } from "../redux/actions";
import { useEffect } from "react";
import { Alert } from "react-native";

function Post({UserInfoId, id, powersGained, likes, multimedia, description, userById}) {

  const [transaction, setTransaction] = useState(0)

  const dispatch = useDispatch()

  const [checked, setChecked] = useState(0);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  let openShareDialogAsync = async () => {
    // if (Platform.OS === 'web') {
    //   alert(`Uh oh, sharing isn't available on your platform`);
    //   return;
    // }
    const imageTmp  = await Sharing.shareAsync(multimedia);
  };

  useEffect(() => {
    // getPostById()
  }, [transaction])

  const Errores = () => {
    if(userById[0].data.powers < 10) return (<Text>You dont have enough Powers!</Text>)

    return (
      ["10 Powers", "25 Powers", "50 Powers", "100 Powers"].map((l, i) => 
                    <CheckBox
                      key={i}
                      title={l}
                      containerStyle={{backgroundColor: "white", borderWidth: 0}}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={checked === i + 1}
                      onPress={() => setChecked(i + 1)}
                    />
                  )
    )
  }

  return (
    <ScrollView >
		  <View style={styles.bg} >

        <View style={styles.posts}>

          
          <Text style={styles.title}>{UserInfoId.split('@')[0]}</Text>
          <View style={styles.contain} >
            
            <View>
           
           <TouchableOpacity onPress={() => alert('Ir a PostDetail')}>
            <Image
              style={styles.tinyLogo}
              source={{ uri: multimedia }}
            />
            </TouchableOpacity>
            </View>

            <Text style={styles.description}>Esta es la descripcion {description}</Text>
            <View style={styles.logos}>
              {/* logica para el renderizado condicional de los powers  */}
              { powersGained > 0 ? (
              <View style={styles.container}>
                <TouchableOpacity onPress={showDialog}>
                <Entypo style={styles.signos} name="battery" size={28} color="#C7D31E" />
                </TouchableOpacity>

                {transaction === 0 ? <Dialog
                  isVisible={visible}
                  onBackdropPress={hideDialog}
                >
                  <Dialog.Title title="Give Powers"/>
                  <Text>You have {!userById[0].data.powers ? 0 : userById[0].data.powers} Powers</Text>
                  <Errores />

                  <Dialog.Actions>
                    <Dialog.Button
                      title="CONFIRM"
                      onPress={() => {
                        if (checked === 1) {
                          dispatch(updatePost({id, powers: powersGained + 10, likes}))
                          dispatch(updateUser({...userById[0].data, powers: userById[0].data.powers - 10}))
                          setTransaction(10)
                          }
                        if (checked === 2) {
                          dispatch(updatePost({id, powers: powersGained + 25, likes}))
                          dispatch(updateUser({...userById[0].data, powers: userById[0].data.powers - 25}))
                          setTransaction(25)
                          }
                        if (checked === 3) {
                          dispatch(updatePost({id, powers: powersGained + 50, likes}))
                          dispatch(updateUser({...userById[0].data, powers: userById[0].data.powers - 50}))
                          setTransaction(50)
                          }
                        if (checked === 4) {
                          dispatch(updatePost({id, powers: powersGained + 100, likes}))
                          dispatch(updateUser({...userById[0].data, powers: userById[0].data.powers - 100}))
                          setTransaction(100)
                          }
                        hideDialog()
                      }}
                    />
                    <Dialog.Button title="CANCEL" onPress={hideDialog} />
                  </Dialog.Actions>
                </Dialog> : <Dialog
                              isVisible={visible}
                              onBackdropPress={hideDialog}
                            >
                <Dialog.Title title="Cancel Transaction"/>
                  <Text>You already gave Powers, you want to cancel the transaction?</Text>
                  <Dialog.Actions>
                    <Dialog.Button title="Yes" onPress={() => {
                      dispatch(updatePost({id, powers: powersGained - transaction, likes}))
                      dispatch(updateUser({...userById[0].data, powers: userById[0].data.powers + transaction}))
                      setTransaction(0)
                      hideDialog()
                      }}/>
                    <Dialog.Button title="No" onPress={() => hideDialog()}/>
                  </Dialog.Actions>
              </Dialog>}
                <Text style={styles.numbers}>{powersGained}</Text>
              </View>
               ) : (<Text>                 </Text>)
              }


              <View style={styles.container}>
                <TouchableOpacity onPress={() => alert('dar like')}>
                <MaterialIcons style={styles.signos} name="favorite" size={28} color="#C7D31E" />
                </TouchableOpacity>
                <Text style={styles.numbers}>{likes}</Text>
              </View>



              <View style={styles.container}>
                <TouchableOpacity onPress={() => alert('Comentar/Ver Comentarios')}>
                <Entypo style={styles.signos} name="chat" size={28} color="#C7D31E" />
                </TouchableOpacity>
                </View>

              {/* <View style={styles.container}>
                <FontAwesome name="commenting" size={28} color="#C7D31E" />
                <Text style={styles.numbers}>{reviewCount}</Text>
              </View> */}

              {/* <View style={styles.container}>
                <TouchableOpacity onPress={() => openShareDialogAsync}>
                <Fontisto name="share" size={28} color="#C7D31E" />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>

          
        </View>
      </View>
		</ScrollView>
  );
};

const styles = StyleSheet.create({
  bg:{
    backgroundColor: "#4d4d4d",
  },
	contain:{
		alignItems: "center",
		justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
	},
  posts:{
    alignItems: "center",
		justifyContent: 'center',
  },
  container:{
    marginTop: 10,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tinyLogo: {
    width: 350,
    height: 350,
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 3,
    marginLeft: 40,
    alignSelf: 'flex-start',
    color: '#F5F5F5',
  },
  numbers:{
    color: '#F5F5F5',
    fontSize: 26,
   
    justifyContent: 'center',
    alignSelf: 'center',
  },
  subtitle:{
    justifyContent: 'center',
    fontSize: 24,
   
  },
  description: {
    width: 290,
    fontSize: 24,
    color: '#F5F5F5',
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 6,
    fontSize:18,
  },
  contain: {
    marginBottom: 0,
  },
  logos:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: -2,
    marginBottom: 50,
  },
  signos:{
      marginTop: 3,
      marginRight: 4,
  },
 
});

 export default Post;
