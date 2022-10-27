import React from "react";

import { View, Text, Image, StyleSheet,ScrollView, Button  } from 'react-native';


function Post({fullName, id, forksCount, stargazersCount, reviewCount, avatar}) {
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
                      <Text style={styles.subtitle}>♡</Text>
                      <Text style={styles.numbers}>{forksCount}</Text>
                      
                      </View> 
                  
                    <View style={styles.container}>
                    <Text style={styles.subtitle}>⚡</Text>
                    <Text style={styles.numbers}>{stargazersCount}</Text>
                    
                    </View> 
                    
                    <View style={styles.container}>
                    <Text style={styles.subtitle}>💬</Text>
                    <Text style={styles.numbers}>{reviewCount}</Text>
                    
                    </View> 
                    

                    <View style={styles.container}>
                    <Text style={styles.subtitle}>🔄</Text>
                    </View>
                     </View> 
                    </View> 


               
            </View>
            </View> 
          
           
               
		</ScrollView>

    );
}


const styles = StyleSheet.create({
  bg:{
  backgroundColor: "#7D7D7D",
  },
	contain:{
		alignItems: "center",
		justifyContent: 'center',
        flexDirection: 'row', 
        margin: 30,
        
	},
  posts:{
    alignItems: "center",
		justifyContent: 'center',
    
    
  },
  container:{
    fontSize: 24,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  tinyLogo: {
        width: 280,
        height: 280,
        
        borderRadius: 35,
      },
  title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: -25,
        color: '#C7D31E',
    },
  numbers:{
        textDecorationLine: 'underline',
        color: 'blue',
        fontSize: 16,
    },
  subtitle:{
      justifyContent: 'flex-start',
      fontSize: 24,
    }
});
    
 
export default Post;
