import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert, Dimensions, Platform } from 'react-native';
import { viewStyles, textStyles, boxStyles, noteStyles } from '../styles';
//import Clipboard from '@react-native-clipboard/clipboard';
import { images } from '../images';
import { styles } from '../styles';
import IconButton from '../components/IconButton';
import TextArea from '../components/TextArea';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

const NoteScreen = ({ navigation, route }) => {
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    const [noteId, setNoteId] = useState('');
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');

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
                    setTitle(response.data.result[0]['title']);
                    setContents(response.data.result[0]['contents']);
                    setSummary(response.data.result[0]['summary']);
                    //setCategory(response.data.result[0]['category']);
                    //console.log(title);
                    //console.log(contents);
                    //console.log(summary);
                    //console.log(category);
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

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync('클립보드 복사');
        console.log('copy');
        //console.log(contents);
    }
    
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

    return (
        <View>
            <View style = {boxStyles.top}>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    padding: 10,
                    alignSelf: 'stretch'
                }}>
                    <IconButton
                        image = {images.back}
                        onPress = {onBackPressed}
                        marginLeft = {10}
                        marginTop = {47}
                    />
                    <Text style = {{
                        fontSize: Platform.OS == 'ios' ? 30 : 26,
                        justifyContent: 'center',
                        marginTop: 35,
                        marginLeft: 10,
                    }}>
                        {title}
                    </Text>
                    <View style = {{
                        flex: 1,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        paddingRight: 10,
                        marginTop: 45,
                    }}>
                        <IconButton 
                            image = {images.modify}
                            onPress = {_modify}
                            marginLeft = {10}
                        />
                        <IconButton 
                            image = {images.copy}
                            onPress = {copyToClipboard}
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
                <View style = {noteStyles.contents}>
                    <ScrollView>
                        <Text style = {textStyles.textArea}>{contents}</Text>
                    </ScrollView>
                </View>
                <View style = {noteStyles.summary}>
                    <ScrollView>
                        <Text style = {textStyles.textArea}>{summary}</Text>
                    </ScrollView>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    width: width * 0.8,
                    padding: 10,
                    marginBottom: 10,
                }}>
                    <Text style = {textStyles.hashtag}>#Hashtag</Text>
                    <Text style = {textStyles.hashtag}>#Keyword</Text>
                    <Text style = {textStyles.hashtag}>#Hashtag</Text>
                </View>
            </View>
        </View>
    )
}

export default NoteScreen;