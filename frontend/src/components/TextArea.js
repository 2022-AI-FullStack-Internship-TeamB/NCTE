import React from 'react';
import { View, TextInput } from 'react-native';
import { textStyles, boxStyles } from '../styles';

const TextArea = ({ value, setValue }) => {
    return (
            <View style = {{
                height: 180,
            }}>
            <TextInput
                multiline
                numberOfLines = {5}
                style = {textStyles.textArea}
                value = {value}
                onChangeText = {setValue}
            />
            </View>        
    );
}

export default TextArea;