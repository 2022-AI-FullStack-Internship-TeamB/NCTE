import React, { useState } from 'react';
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import TextArea from '../components/TextArea';
//import { Picker } from '@react-native-picker/picker';

const UploadScreen = () => {
    const width = Dimensions.get('window').width;

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [category, setCategory] = useState('diary');

    const _onPress = () => {
        console.log('saved');
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Note
                </Text>
            </View>
            <View style = {viewStyles.container}>
                <View style = {{
                    marginTop: 30,
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
                    <TextArea />
                </View>
                <View>
                    <View style = {viewStyles.row}>
                        <Text style = {textStyles.text, {
                            margin: 5,
                        }}>
                            Category
                        </Text>
                        <Picker
                            selectedValue = {category}
                            onValueChange = {(itemValue, itemIndex) => 
                                setCategory(itemValue)
                            }
                            style = {{
                                width: 200,
                                height: 50,
                            }}>
                            <Picker.item label = 'Diary' value = 'diary' />
                            <Picker.item label = 'Todo' value = 'todo' />
                            <Picker.item label = 'Study' value = 'study' />
                        </Picker>
                    </View>
                </View>
                <View style = {{
                    alignItems: 'center'
                }}>
                    <CustomButton 
                        onPress = {_onPress}
                        text = "Save"
                    />
                </View>
            </View>
            
            
        </View>
    );
}

export default UploadScreen;