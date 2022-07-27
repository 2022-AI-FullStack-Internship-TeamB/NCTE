import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
import CustomModal from '../components/CustomModal';
import TextArea from '../components/TextArea';
import { viewStyles, textStyles, boxStyles } from '../styles';

const UploadScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [noteId, setNoteId] = useState('');

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const _categoryName = [];
    const [items, setItems] = useState ([]);
    const [categoryName, setCategoryName] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
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

    const getCategory = async (j) => {
        try {
            for (let i = (j-1)*3+1; i <= (j-1)*3+3; i++){
                await API.get(
                    `category/${userId}/${i}`
                )
                .then(function (response) {
                    _categoryName.push(response.data.result[0].category);
                })
                .catch(function (error) {
                    console.log(error.response);
                })
            }
            setItems([
                { label: _categoryName[0], value: _categoryName[0] },
                { label: _categoryName[1], value: _categoryName[1] },
                { label: _categoryName[2], value: _categoryName[2] }
            ])
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getId();
        getText();
        getCategory(userId);
    }, [userId]);

    const getIndex = (value) => {
        for (let i = 0; i < items.length; i++) { 
            let b = items.findIndex(item => item.value === value);
            setCategoryId(b);
        }
    }

    const saveNote = async (j) => {
        setModalVisible(true);
        const data = {
            user_id: userId,
            title: title,
            date: new Date(),
            contents: contents,
            category_id: categoryId + 3*(j-1) + 1,
        }

        try {
            const response = await API.post(
                `/notes`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    setModalVisible(false);
                    navigation.navigate('Note', {
                        noteId: response.data.result['note_id'],
                        categoryName: category,
                        userId: userId,
                        fromUpload: true
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
                <CustomModal 
                    modalVisible = {modalVisible ? true : false}
                    text = '메모 저장 중입니다! 잠시만 기다려주세요😉'
                />
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
                        onPress = {() => saveNote(userId)}
                        text = "Save"
                    />
                </View>
            </View> 
        </View>
    );
}

export default UploadScreen;