import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import TextArea from '../components/TextArea';
import CustomPicker from '../components/CustomPicker';
import API from '../api';

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

    const getIndex = (value) => {
        for (let i = 0; i < items.length; i++) { 
            let b = items.findIndex(item => item.value === value);
            setCategoryId(b);
            console.log(value);
            console.log(b);
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
                    setCategory(response.data.result['category_id']);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const modifyNote = async () => {
        const data = {
            user_id: userId,
            //noteId: noteId,
            title: title,
            date: new Date(),
            contents: contents,
            //category: category,
            category_id: categoryId + 1,
        }

        try {
            const response = await API.put(
                `/notes/${noteId}`,
                {
                    user_id: userId,
                    note_id: noteId,
                    title: title,
                    contents: contents,
                    date: new Date(),
                    category: category,
                    category_id: categoryId + 1,
                }
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    console.log('수정 성공');
                    setTitle(title);
                    setContents(contents);
                    setCategory(category);
                    navigation.navigate('Note', {
                        noteId: noteId,
                        categoryName: category,
                        userId: userId
                    });
                }
            })
            .catch(function (error) {
                console.log('수정 실패');
                console.log(error.response);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setUserId(route.params.userId);
        setNoteId(route.params.noteId);
        setCategoryName(route.params.categoryName);
        getNotes();
    }, [noteId]);

    const onBackPressed = () => {
        navigation.navigate('Note', {
            categoryName: category,
            userId: userId,
            noteId: noteId
        });
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    {title}
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
                            defaultValue = {categoryName}
                            //placeholder = {category}
                        />
                    </View>
                </View>
                <View style = {{
                    marginTop: 10,
                }}>
                    <View style = {viewStyles.row}>
                        <CustomButton 
                            onPress = {onBackPressed}
                            text = "Back"
                        />
                        <View style = {{
                            marginLeft: 100,
                        }}>
                            <CustomButton
                                onPress = {modifyNote}
                                text = "Confirm"
                            />
                        </View>
                    </View>
                </View>
            </View> 
        </View>
    );
}

export default UploadScreen;