import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Share } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
//import Clipboard from '@react-native-clipboard/clipboard';
import { images } from '../images';
import { styles } from '../styles';
import IconButton from '../components/IconButton';
import TextArea from '../components/TextArea';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

const NoteScreen = ({ navigation, route }) => {

    const _keyword = [];
    const [noteId, setNoteId] = useState('');
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');
    const [keywords, setKeywords] = useState([]);

    const [copiedText, setCopiedText] = useState('');

    const getNoteId = async () => {
        try {
            const note_id = AsyncStorage.getItem('note_id');
            setNoteId(note_id);
            console.log('getting note id successed' + noteId);
        } catch (e) {
            console.error(e);
        }
    }

    const getNotes = async () => {
        try {
            await API.get(
                `/notes/${noteId}`
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    setTitle(response.data.result['title']);
                    setContents(response.data.result['contents']);
                    setSummary(response.data.result['summary']);
                    for(let i = 0; i < response.data.result.keywords.length; i++){
                        _keyword.push(response.data.result.keywords[i]['keyword']);
                    }
                    setKeywords(keywords.concat(_keyword));
                }
            })
            .catch(function (error) {
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setUserId(route.params.userId);
        setCategory(route.params.categoryName);
        setNoteId(route.params.noteId);
        getNotes();
    }, [noteId]);

    const onBackPressed = () => {
        navigation.navigate('List', {
            categoryName: category,
            userId: userId
        });
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
    // const copyToClipboard = async () => {
    //     await Clipboard.setStringAsync({contents});
    //     console.log('copy');
    //     //console.log(contents);
    // }
    
    const _modify = () => {
        navigation.navigate('Modify', {
            categoryName: category,
            userId: userId,
            noteId: noteId
        });
    }

    const onDeletePressed = () => {
        try{
            Alert.alert(
                'Delete',
                '삭제하시겠습니까 ?',
                [
                  {text: '취소', style: 'cancel'}, 
                  {
                    text: '삭제',
                    
                    onPress: () => { 
                        const response = API.delete(
                            `/notes/${noteId}`
                        )
                        .then(function(response) {
                            console.log('delete');
                            navigation.navigate('List', {
                                categoryName: category,
                                userId: userId
                            });
                        }
                            
                        )
                        .catch(function (error) {
                            console.log(error.response);
                        });
                    },
                    style: 'destructive',
                  },
                ],
                {
                  cancelable: true,
                },
              );
            
        } catch (error) {
            console.log(error);
        }
    }
    
    var hashtag = [];
    for(let i = 0; i < 5; i++){
        hashtag.push(
            <Text style = {textStyles.hashtag}>#{keywords[i]}</Text>
        )
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <View style = {viewStyles.row}>
                    <IconButton
                        image = {images.back}
                        onPress = {onBackPressed}
                        marginLeft = {10}
                        marginTop = {60}
                    />
                    <Text style = {textStyles.title}>
                        {title}
                    </Text>
                    <View style = {{
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }}>
                        <IconButton 
                            image = {images.modify}
                            onPress = {_modify}
                            marginLeft = {30}
                        />
                        <IconButton 
                            image = {images.copy}
                            onPress = {onShare}
                            marginLeft = {10}
                        />
                        <IconButton 
                            image = {images.delete_}
                            onPress = {onDeletePressed}
                            marginLeft = {10}
                        />
                    </View>
                </View>
            </View>
            <View style = {viewStyles.center}>
                <Text style = {textStyles.textArea}>{contents}</Text>
                <Text style = {textStyles.textArea}>{summary}</Text>
            </View>
            <View style = {{
                flexDirection: 'row',
                //flex: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
                marginLeft: 4
            }}>
                { hashtag }
            </View>
        </View>
    )
}

export default NoteScreen;