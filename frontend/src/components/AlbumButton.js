import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyles } from '../styles';
import { theme } from '../theme';

const AlbumButton = ({ onPress, text, color }) => {
    return (
        <TouchableOpacity 
            onPress = {onPress}
            style = {styles(color).album}
        >
            <Text style = {textStyles.album}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = (color) => StyleSheet.create({
    album: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: color,
        margin: 25,
    }
})

export default AlbumButton;