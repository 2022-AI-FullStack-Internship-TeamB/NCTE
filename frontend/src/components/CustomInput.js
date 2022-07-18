import React from 'react';
import { TextInput } from 'react-native';
import { textStyles } from '../styles';
import { theme } from '../theme';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <TextInput
            value = {value}
            onChangeText = {setValue}
            selectionColor = {theme.light_grey}
            placeholder = {placeholder}
            style = {textStyles.input}
            secureTextEntry = {secureTextEntry}
            autoCapitalize = {'none'}
        />
    );
}

export default CustomInput;