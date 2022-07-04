import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { textStyles, boxStyles } from '../styles';
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
        width: 120,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: color,
        margin: 15,
    }
})

export default AlbumButton;