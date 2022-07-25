import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
import TextArea from '../components/TextArea';
import { viewStyles, textStyles, boxStyles } from '../styles';

const UploadScreen = ({ navigation, route }) => {

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [noteId, setNoteId] = useState('');

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [items, setItems] = useState ([
        { label: 'Diary', value: 'Diary' },
        { label: 'Todo', value: 'Todo' },
        { label: 'Study', value: 'Study' },
    ]);
    const [categoryName, setCategoryName] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
            console.log('getting id successed' + userId);
        } catch (e) {
            console.error(e);
        }
    }
    
    const getText = async () => {
        try {
            await API.get(
                `/notes/textconversion`
            )
            .then(function (response) {
                setContents(response.data.result['text']);
            })
            .catch(function (error){
                console.log(error.response);
            })
        } catch (error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        getId();
        getText();
    }, []);

    const getIndex = (value) => {
        for (let i = 0; i < items.length; i++) { 
            let b = items.findIndex(item => item.value === value);
            setCategoryId(b);
        }
    }

    const saveNote = async () => {
        const data = {
            user_id: userId,
            title: title,
            date: new Date(),
            contents: contents,
            category_id: categoryId + 1,
        }

        try {
            const response = await API.post(
                `/notes`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    navigation.navigate('Note', {
                        noteId: response.data.result['note_id'],
                        categoryName: category,
                        userId: userId
                    })
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Note
                </Text>
            </View>
            
            <View style = {viewStyles.center}>
                <View style = {{
                    marginTop: 10,
                }}>
                    <View style = {viewStyles.row}>
                        <Text style = {textStyles.text, {
                            margin: 10,
                        }}>
                            Title
                        </Text>
                        <CustomInput
                            value = {title}
                            setValue = {setTitle}
                            placeholder = 'Add a text'
                        />
                    </View>
                </View>
                <View>
                    <Text style = {textStyles.text, {
                        margin: 5,
                    }}>
                        Contents
                    </Text>
                    <TextArea 
                        value = {contents}
                        setValue = {setContents}
                    />
                </View>
                <View>
                    <View style = {viewStyles.row}>
                        <Text style = {textStyles.text, {
                            marginLeft: 0,
                            marginRight: 15,
                            marginTop: 13
                        }}>
                            Category
                        </Text>
                        <CustomPicker
                            open = {open}
                            value = {category}
                            items = {items}
                            setOpen = {setOpen}
                            setValue = {setCategory}
                            setItems = {setItems}
                            onChangeValue = {() => getIndex(category)}
                            placeholder = "Select a category"
                        />
                    </View>
                </View>
                <View style = {{
                    marginTop: 10,
                }}>
                    <CustomButton 
                        onPress = {saveNote}
                        text = "Save"
                    />
                </View>
            </View> 
        </View>
    );
}

export default UploadScreen;