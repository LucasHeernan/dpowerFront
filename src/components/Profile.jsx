import React from "react";
import { View, Text, StyleSheet, ScrollText, Button, ScrollView } from 'react-native';
import useAxios from 'axios-hooks';

  
function Profile() {

    const [{ data, loading, error }, refetch] = useAxios('https://reqres.in/api/users?delay=1'
        // {
        //     manual: true,
        // }
    )
    

    if (loading) return <Text>Loading...</Text>
    if (error) return <ScrollText>{JSON.stringify(error, null, 2)}</ScrollText>
    

    const perfiles2 = data
    console.log("esto es lo que tiene data..........."+data.data.length)
    

    return (
        // <ScrollView contentContainerStyle={styles.container}>
        //   {/* <Button onPress={()=> refetch({
        //     data: {
        //       delay: 2
        //     }
        //   })} title="Refetch" /> */}
        //   <Text style={styles.paragraph}>{perfiles2}</Text>
        // </ScrollView>

        <ScrollView>
           
                <View >
               
              <Text>Hola</Text>
                
                </View>
 
        
       
        </ScrollView>

    );  
    // return (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Text>This is the Profile!</Text>
    //     </View>
    // );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: "#7D7D7D",
      padding: 8,
    },
    paragraph: {
      marginTop: 8,
    },
    title:{
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#C7D31E",
      color: "000000",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    
});

export default Profile