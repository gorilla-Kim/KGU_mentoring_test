import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList } from "react-native";
import styled from "styled-components";
import AddInput from "./AddInputTest";
import TodoList from "./TodoList";
import Header from './Header';
import Empty from "./Empty";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { config } from '../../../../config'

const Todo = () => {
  const [user_Id, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [firstRecord, setFirstRecord] = useState(true); // 처음 todolist 사용하는 유저 구분

  let today = new Date().toISOString().slice(0, 10);

  React.useEffect(() => {
    // getData();
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo[0].user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    getItems();
  }, [user_Id]);

  const getItems = () => {
    let result = []
    axios.post(config.ip + ':5000/testTodoRouter/findOwn', {
      data: {
        user_id: user_Id
      }
    }).then((response) => {
      if (response.data[0] == null) {
        setFirstRecord(true)
      } else {
        result.push(response.data[0].to_do_list)
        setFirstRecord(false);
        console.log('---------------------------');
        console.log(result[0]);
        setData(result[0])
      }
    }).catch(function (error) {
      console.log(error);
      setFirstRecord(true)
    })
  }

  const submitHandler = (value) => {
    let random_key = Math.random().toString();

    addData({value, random_key})
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: random_key
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (key) => {

    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
    deleteData({key})
  };

  const deleteData = ({key}) => {
    axios.post(config.ip + ':5000/testTodoRouter/todoDelete', {
      data: {
          user_id: user_Id,
          key: key
      }
    })
      .then((response) => {
          if (response.data.status === 'success') {
              console.log('to do save');
              getItems();
      }}).catch(function (error) {
        console.log(error);
      });
  }

  const addData = ({value, random_key}) => {
    if(firstRecord){ // todo 기록 없는 유저
      axios.post(config.ip + ':5000/testTodoRouter/save', {
        data: {
          user_id: user_Id,
          to_do_list: {
            date: today,
            key: random_key,
            value: value
          }
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          setFirstRecord(false)
          console.log('to do save');
        }
      }).catch(function (error) {
        console.log(error);
      })
    } else { // todo 기록 있는 유저
      axios.post(config.ip + ':5000/testTodoRouter/todoSave', {
        data: {
          user_id: user_Id,
          to_do_list: {
            date: today,
            key: random_key,
            value: value
          }
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          console.log('to do save');
          setFirstRecord(false)
          getItems();
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

console.log(data);
 return (
  <ComponentContainer>
  <View>
    <StatusBar barStyle="light-content" 
      backgroundColor="midnightblue" />
  </View>

  <View>
  <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            ListEmptyComponent={() => <Empty />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
    <View>
      <AddInput submitHandler={submitHandler} />
    </View>
  </View>
</ComponentContainer>
    );
};

const ComponentContainer = styled.View`
  background-color: midnightblue;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoTest = () => {
  return (
        <Todo />
  )
}

export default TodoTest;

