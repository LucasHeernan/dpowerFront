import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import useAxios from 'axios-hooks';
import Post from "./Post";


function HomeScreen() {
  
  // const [array, setArray] = useState([]) /* 'https://reqres.in/api/users?delay=1' */
  
  // async function getInfo() {
    const [{ data, loading, error }, refetch] = useAxios('https://reqres.in/api/users?delay=1')
    // return data;
    // const result = await useAxios('https://reqres.in/api/users?delay=1').then(e => e.data);
    // return result;
  // }
  // useEffect(() => {
  //   setArray(getInfo())
  // }, [])
  if (loading) return <Text>Loading...</Text>
  if (error) return <ScrollText>{JSON.stringify(error, null, 2)}</ScrollText>

  return (
    <FlatList
      data={data}
      renderItem={({item}) =>
        <>
          <Text>{item.first_name}</Text>
          <Image source={item.avatar}/>
        </>
      }
    />
  );
}

export default HomeScreen


// import React from "react";
// import { View, Text } from 'react-native';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container:{
//     backgroundColor: "#7D7D7D",
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center' 
//   },
//   title: {
//     marginTop: 16,
//     paddingVertical: 8,
//     borderWidth: 4,
//     borderColor: "#20232a",
//     borderRadius: 6,
//     backgroundColor: "#C7D31E",
//     color: "000000",
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold"
//   },
// })
// export default HomeScreen

// return (
//   <View>
//     {
//       array.length < 1 ? <Text>Cargando</Text> :
//       <FlatList
//         data={array}
//         renderItem={({item}) =>
//           <Post
//             first_name={item.first_name}
//             avatar={item.avatar}
//           />
//         }
//         keyExtractor={(item) => item.id}
//       />
//     }
//   </View>
// );