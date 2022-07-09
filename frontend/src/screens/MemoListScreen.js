import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import IconButton from '../components/IconButton';

const MemoListScreen = ({ navigation }) => {

  const [writeMode, setWriteMode] = useState(false); 
  const [txt, setTxt] = useState(''); 

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  //console.log(today)  
  var dateString = year + '년 ' + month  + '월 ' + day + '일';

  const orimemo = [];

  const [memos, setMemos] = useState(orimemo); 
  const [Idx, setIdx] = useState(1); 

  const add = () => {
    navigation.navigate('Camera');
    //console.log('add');
  }

  const back = () => {
    navigation.navigate('Album');
  }

  const _onPress = () => {
    navigation.navigate('Note');
  }

  const addMemo = () =>{
    let a = {Id:Idx, memo:txt};
    setMemos(prev=>[...prev,a]); 
    setWriteMode(false); 
    setIdx(prev=>prev+1); 
  }

  const renderMemo = ({item}) => {
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

  if(writeMode){
    return (
      <View style={boxStyles.top}>        
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity style={{padding:15, }} onPress={()=>setWriteMode(false)}>
            <Text style={{fontSize:18, }} >취소</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{padding:15, }}     onPress={()=>addMemo()} >
            <Text style={{fontSize:18, }}>저장</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex:1, backgroundColor:'#fff', }}>
        <TextInput
            style={{  backgroundColor: '#eee',flex:1, padding:10,  }}
            onChangeText={text => setTxt(text)}
            multiline 
            
          />
        </View>
      </View>
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