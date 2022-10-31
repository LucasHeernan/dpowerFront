import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet,ScrollView, Button  } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


function Post({fullName, id, forksCount, stargazersCount, reviewCount, avatar, description}) {
    return (
       <ScrollView >
		
		
            <View style={styles.bg} >


                    <View style={styles.posts}>
                    <Text style={styles.title}>{fullName}</Text>
                    
                    <View style={styles.contain} > 
                              
                     <Image 
                    style={styles.tinyLogo}
                    source={{ uri: avatar }} />  
                                        
                    <View>
                    <View style={styles.container}>
                    <MaterialIcons name="favorite" size={28} color="#C7D31E" />
                      <Text style={styles.numbers}>{forksCount}</Text>
                      
                      </View> 
                  
                    <View style={styles.container}>
                    <Entypo name="thunder-cloud" size={28} color="#C7D31E" />
                    <Text style={styles.numbers}>{stargazersCount}</Text>
                    </View> 
                    
                    <View style={styles.container}>
                    <FontAwesome name="commenting" size={28} color="#C7D31E" />
                    <Text style={styles.numbers}>{reviewCount}</Text>
                    
                    </View>
                    

                    <View style={styles.container}>
                    <Fontisto name="share" size={28} color="#C7D31E" />
                    </View>
                     </View> 

                     
                    </View> 
                    <Text style={styles.coments}>coments: {description}</Text>

                    
                    </View>
            </View> 
          
           
               
		</ScrollView>

    );
}


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
    fontSize: 24,
    marginBottom: 12,
    marginTop: 12,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    
  },
  tinyLogo: {
        width: 280,
        height: 280,
        
        borderRadius: 35,
      },
  title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: -7,
        marginLeft: -69,
        color: '#F5F5F5',
    },
  numbers:{
        textDecorationLine: 'underline',
        color: '#F5F5F5',
        fontSize: 14,
    },
  subtitle:{
      justifyContent: 'flex-start',
      fontSize: 24,
    },
    coments: {
      width: 290,
      fontSize: 24,
      color: '#F5F5F5',
      marginBottom: 60,
      marginLeft: -40,
      fontSize:18,
      
    }
});
    
 
export default Post;