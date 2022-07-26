import React from 'react';
import { ScrollView, View, TextInput } from 'react-native';
import { textStyles, boxStyles } from '../styles';

const TextArea = ({ value, setValue }) => {
    return (
            <View style = {boxStyles.textArea}>
                <ScrollView>
                    <TextInput
                        multiline = {true}
                        numberOfLines = {5}
                        style = {textStyles.textArea}
                        value = {value}
                        onChangeText = {setValue}
                        autoCapitalize = {'none'}
                        autoCorrect = {false}
                    />
                </ScrollView>
            </View>        
    );
}

export default TextArea;