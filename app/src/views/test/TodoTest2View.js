import React, { useEffect, useCallback, useRef } from 'react';
import { Calendar } from 'react-native-calendars';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import BackButton from '../../components/common/BackButton';

const TodoTest2View = (props) => {
    return(
        <View>
            <BackButton navigation={props.navigation} />
        </View>
    )
    // const [markedDates, setMarkedDates] = React.useState(null);
    // const [dates, setDates] = React.useState(['2022-05-13', '2022-05-17']);

    // useEffect(() => {
    //     addDates();
    //   }, []);
    
    // function addDates() {
    //     let obj = dates.reduce(
    //         (c, v) =>
    //             Object.assign(c, {
    //                 [v]: { marked: true, dotColor: 'red' },
    //             }),
    //         {},
    //     );
    //     console.log(obj);
    //     setMarkedDates(obj);
    //     }
        
    //     return (
    //         <>
    //             <View>
    //             <BackButton navigation={props.navigation} />
    //                 <Calendar
    //                     markedDates={markedDates}
    //                 />
    //             </View>
    //         </>
    //      )
}

export default TodoTest2View;