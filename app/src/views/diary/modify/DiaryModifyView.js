import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, HStack } from 'react-native';
import { Box, Input, Button, Divider, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import React, { useState, useCallback, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioDisclosure from "../../../components/diary/RadioDisclosure";
import InputTitle from "../../../components/diary/InputTitle";
import InputContent from "../../../components/diary/InputContent";
import axios from 'axios';
import { config } from '../../../../config'
import { useNavigationState } from "@react-navigation/native";

const DiaryModifyView = (props) => {
  // const diary = props.navigation.getState().routes[1].params.diary;
  const defaultData = {
    "__v": 0,
    "_id": "626f78c19ee18cdc829a10de",
    "accessible_user": [],
    "comments": [],
    "content": "dafault_content",
    "date": "2022-05-02T00:00:00.000Z",
    "disclosure": "private",
    "likes": 0,
    "stickers": [],
    "tags": [],
    "title": "default_title",
    "user_id": "error",
  };
  const [Date, setDate] = useState(defaultData.date);
  const [Title, setTitle] = useState(defaultData.title);
  const [Content, setContent] = useState(defaultData.content);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = useState(defaultData.disclosure);

  const new_routes = useNavigationState(state => state.routes);
  const [diary, setDiary] = React.useState(defaultData);
  React.useEffect(() => {
    //초기 일기 수신부
    try {
        const idx = new_routes.findIndex(r => r.name === "DiaryModify")
        const new_diary = new_routes[idx].params.diary;
        setDiary(new_diary);
        console.log(new_diary);
        setDate(new_diary.date);
        setTitle(new_diary.title);
        setContent(new_diary.content);
        setDisclosure(new_diary.disclosure);
    } catch (error) {
        // console.log(error);
    }
},[Date]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
    hideDatePicker();
    setDate(date.format("yyyy-MM-dd"))
  };

  const modifyDiary = () => {

    axios.post(config.ip + ':5000/diariesRouter/modify', {
      data: {
        _id: diary._id,
        user_id: diary.user_id,
        date: Date,
        title: Title,
        content: Content,
        disclosure: disclosure
      }
    }).then((response) => {
      props.navigation.replace('DiaryRead', {
        diary: response.data,
      });
      // if (response.data.status !== 'fail') {
      //   props.navigation.replace('DiaryRead', {
      //     diary : diary,
      // });
      //   // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
      // }
    }).catch(function (error) {
      console.log(error);
    })
  }

  const ModifyDiaryHeader = () => {
    return (
      <Box style={styles.row} justifyContent="center" display="flex">
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }} >
          <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateText} onPress={showDatePicker}>{Date.substr(0, 10)}</Text>
        <Box alignItems="center">
          <Button onPress={() => { modifyDiary(); }} colorScheme="green">수정하기</Button>
        </Box>
      </Box>
    )
  }

  const WriteDiaryButton = () => {
    return (
      <Box alignItems="center">
        <Button onPress={() => { modifyDiary(); }} >수정하기</Button>
      </Box>
    );
  };

  return (
    <>
      <ModifyDiaryHeader />
      <ScrollView backgroundColor="white">
        <InputTitle setTitle={setTitle} Title={Title} />
        <Divider />
        <InputContent setContent={setContent} content={Content} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <RadioDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
      </ScrollView>
    </>


  )
}
export default DiaryModifyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dateText: {
    fontSize: 20,
    flex: 5,
    flexDirection: 'row',
    fontWeight: 'bold',
    width: 'auto',
    alignSelf: 'center'
  },
  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
  allowIcon: {
    width: 'auto',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 15,
    // borderWidth:1
  },
});