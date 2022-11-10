import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import * as Sharing from 'expo-sharing';
import { setNestedObjectValues } from "formik";

function Post({UserInfoId, id, powersGained, likes, multimedia, description}) {

  let openShareDialogAsync = async () => {
    // if (Platform.OS === 'web') {
    //   alert(`Uh oh, sharing isn't available on your platform`);
    //   return;
    // }
    const imageTmp  = await Sharing.shareAsync(multimedia);
  };

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
                <TouchableOpacity onPress={() => alert('Dar Power')}>
                <Entypo style={styles.signos} name="battery" size={28} color="#C7D31E" />
                </TouchableOpacity>
                <Text style={styles.numbers}>{powersGained}</Text>
              </View> ) : (<Text>                 </Text>)
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
