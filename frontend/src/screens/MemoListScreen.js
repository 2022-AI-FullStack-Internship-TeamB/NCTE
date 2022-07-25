import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import API from '../api';
import IconButton from '../components/IconButton';
import { images } from '../images';
import { textStyles, viewStyles, boxStyles } from '../styles';

const MemoListScreen = ({ navigation, route }) => {

  const _title = [];
  const _date = [];
  const _noteId = [];
  const memos = [];
  const [userId, setUserId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const setMemos = (i) => {
    memos.push({
      id: _noteId[i],
      title: _title[i],
      date: _date[i]
    });
  }

  const getCategory = () => {
    if (categoryName == 'NCTE')
      setCategory('all');
    else {
      setCategory(categoryName);
    }
  }

  const getNotes = async () => {
    try {
      await API.get(
        `/notes/${userId}/all?category=${category}`
      )
        .then(function (response) {
          if (response.data['success'] == true) {
            console.log('getting notes successed');
            for (let i = 0; i < response.data.result.length; i++) {
              if (response.data.result[i]['title']) {
                _title.push(response.data.result[i]['title']);
                _date.push(response.data.result[i]['date']);
                _noteId.push(response.data.result[i]['note_id']);
                setMemos(i);
              }
            }
            setNotes(memos);
          }
        })
        .catch(function (error) {
          console.log(error.response);
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoryName(route.params.categoryName);
    getCategory();
    setUserId(route.params.userId);
    getNotes();
  }, [userId, category]);

  const add = () => {
    navigation.navigate('CameraStack');
  }

  const back = () => {
    navigation.navigate('Album');
  }

  const renderMemo = ({ item }) => {
    return (
      <TouchableOpacity style={boxStyles.memo}
        onPress={() => navigation.navigate('Note', {
          noteId: item.id,
          categoryName: category,
          userId: userId
        })}>
        <View style={boxStyles.InBox}>
          <View style={boxStyles.important}></View>
          <Text style={{
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
            {item.title}
          </Text>
        </View>

        <View>
          <Text
            style={{ marginLeft: 35, }}
          >
            {item.date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={boxStyles.top}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 10,
          marginRight: 10,
        }}>
          <IconButton
            image={images.back}
            onPress={back}
            marginLeft={10}
            marginTop={40}
          />
          <Text style={{
            fontSize: 30,
            marginTop: 35,
            marginLeft: 15,

          }}>
            {categoryName}
          </Text>
          <IconButton
            image={images.add}
            onPress={add}
            marginLeft={230}
            marginTop={40}
          />
        </View>
      </View>

      <View style={{
        alignItems: 'center'
      }}>
        <FlatList
          data={notes}
          renderItem={renderMemo}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default MemoListScreen;