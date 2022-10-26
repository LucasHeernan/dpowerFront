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

    return (
        <ScrollView>
          <Button onPress={()=> refetch({
            data: {
              delay: 2
            }
          })} title="Refetch" />
          <Text style={styles.paragraph}>{JSON.stringify(data, null, 2)}</Text>
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
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      marginTop: 8,
    },
});

export default Profile