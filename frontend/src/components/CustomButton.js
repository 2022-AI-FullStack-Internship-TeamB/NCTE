import React from 'react';
import { Text, Pressable } from 'react-native';
import { textStyles, boxStyles } from '../styles';

const customButton = ({ onPress, text }) => {
    return (
        <Pressable
            onPress = {onPress}
            style = {boxStyles.button}
        >
            <Text style = {textStyles.button}>
                {text}
            </Text>

        </Pressable>
    );
}

export default customButton;