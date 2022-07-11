import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import IconButton from '../components/IconButton';

const MemoListScreen = ({ navigation }) => {

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '년 ' + month  + '월 ' + day + '일';

  const orimemo = [
    {
      id: '1',
      memo: '실리콘밸리 AI 인턴십'
    }
  ];

  const [memos, setMemos] = useState(orimemo);

  const add = () => {
    navigation.navigate('CameraStack');
  }

  const back = () => {
    navigation.navigate('Album');
  }

  const _onPress = () => {
    navigation.navigate('Note');
  }

  const renderMemo = ({ item }) => {
    return(
      <TouchableOpacity style = {boxStyles.memo} onPress = {_onPress}>
        <View style ={textStyles.InBox}>
          <TouchableOpacity style = {boxStyles.important}></TouchableOpacity>
          <Text style = {{
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
            {item.memo}
          </Text>
        </View>

        <View>
          <Text 
            style = {{ marginLeft: 35, }}
          >
            {dateString}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
        <View style={boxStyles.top}>
          <View style = {viewStyles.row}>
            <IconButton
              image = {images.back}
              onPress = {back}
              marginLeft = {10}
              marginTop = {50}
            />
            <Text style = {textStyles.title} onPress={()=>setWriteMode(true)}>
              Diary
            </Text>
            <IconButton
              image = {images.add}
              onPress = {add}
              marginLeft = {240}
              marginTop = {50}
            />
          </View>
        </View>
        
        <View>
            <FlatList
                data={memos}
                renderItem = {renderMemo}
                keyExtractor={(item) => item.id}
            />
        </View>
    </View> 
  );
}

export default MemoListScreen;