import React from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { textStyles, boxStyles } from '../styles';

const TextArea = ({ value, onChangeText }) => {
    return (
        <TextInput
            multiline
            numberOfLines = {200}
            style = {textStyles.textArea}
            value = {value}
            onChangeText = {onChangeText}
        />
    );
}

export default TextArea;