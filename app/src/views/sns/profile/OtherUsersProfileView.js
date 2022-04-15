import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios'
import { config } from '../../../../config'

export default function OtherUsersProfileView(props) {
  const [following, setFollowing] = useState();
  const [profileImg, setProfileImg] = useState();

  console.log(props.user_id);

  const callback = (data) => {
    setFollowing(data.following);
    setProfileImg(data.profile_image)
  }

  useEffect(()=>{
    axios.get(config.ip+':5000/usersRouter/findOne/',{
      params: {
        user_id: props.user_id,
      }
    })
  .then((response) => {
    callback(response.data);
  }).catch(function (error) {
    console.log(error);
  });
},[])
        return (
            <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar} source={{uri: profileImg}}/>
                  <Text style={styles.name}>{props.user_id}</Text>
              </View>
            </View>
  
            <View style={styles.body} >
            <FlatList 
                style={styles.container} 
                enableEmptySections={true}
                data={following}
                keyExtractor= {(item) => {
                  return item.user_id;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => props.navigation.navigate('DmRead', {
                        userName: item.name
                    })} >
                      <View style={styles.box} >
                        <Image style={styles.image} source={{uri: item.img}}/>
                         <Text style={styles.username}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
              }}/>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0abde3",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom:10,
  },
  image:{
    width: 60,
    height: 60,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
    marginBottom:20
  },
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
});