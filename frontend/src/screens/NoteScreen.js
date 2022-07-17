import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
//import Clipboard from '@react-native-clipboard/clipboard';
import { images } from '../images';
import { styles } from '../styles';
import IconButton from '../components/IconButton';
import TextArea from '../components/TextArea';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteScreen = ({ navigation }) => {

    const [note, setNote] = useState([]);
    const [noteId, setNoteId] = useState('');
    const [title, setTitle] = useState('');
    //const [copiedText, setCopiedText] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState('');

    const getNoteId = async () => {
        try {
            const note_id = AsyncStorage.getItem('note_id');
            setNoteId(note_id);
            console.log('getting id successed' + noteId);
        } catch (e) {
            console.error(e);
        }
    }

    const getNotes = async () => {
        try {
            await API.get(
                //`/notes/${noteId}`
                `/notes/1`
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    setNote(response.data);
                    setTitle(response.data.result[0]['title']);
                    setContents(response.data.result[0]['contents']);
                    setSummary(response.data.result[0]['summary']);
                    console.log(title);
                    console.log(contents);
                    console.log(summary);
                    console.log(response.data.result[0]['category']);
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
        //setNote('set note');
        //getNoteId();
        getNotes();
        //console.log(noteId);
        //console.log(note);
    }, []);

    const onBackPressed = () => {
        navigation.navigate('List');
    }

    const copyToClipboard = () => {
        Clipboard.setString('hello');
        console.log('copy');
    }
    
    const _modify = () => {
        navigation.navigate('Modify');
    }

    const onDeletePressed = () => {
        navigation.navigate('List');
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
                <Text style = {textStyles.textArea}>{contents}</Text>
                <Text style = {textStyles.textArea}>{summary}</Text>
            </View>
            <View style = {viewStyles.row}>
                <Text style = {textStyles.hashtag}>#Hashtag</Text>
                <Text style = {textStyles.hashtag}>#Keyword</Text>
                <Text style = {textStyles.hashtag}>#Hashtag</Text>
            </View>
        </View>
    );
}

export default NoteScreen;