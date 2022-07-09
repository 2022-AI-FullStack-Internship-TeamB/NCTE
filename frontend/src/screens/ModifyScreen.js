import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import InputScrollView from 'react-native-input-scroll-view';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import TextArea from '../components/TextArea';
import CustomPicker from '../components/CustomPicker';

const UploadScreen = () => {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [items, setItems] = useState ([
        { label: 'Diary', value: 'diary' },
        { label: 'Todo', value: 'todo' },
        { label: 'Study', value: 'study' },
    ]);

    const _onPress = () => {
        console.log('saved');
    }

    return (
        <InputScrollView nestedScrollEnabled = {true}>
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
                            placeholder = "Select a category"
                        />
                    </View>
                </View>
                <View style = {{
                    marginTop: 10,
                }}>
                    <View style = {viewStyles.row}>
                        <CustomButton 
                            onPress = {_onPress}
                            text = "Back"
                        />
                        <View style = {{
                            marginLeft: 100,
                        }}>
                            <CustomButton
                                onPress = {_onPress}
                                text = "Confirm"
                            />
                        </View>
                    </View>
                </View>
            </View> 
        </InputScrollView>
    );
}

export default UploadScreen;