import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { textStyles, boxStyles } from '../styles';
import { theme } from '../theme';

//const { width, height, scale, fontScale } = Dimensions.get('screen');

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
        //flex: 1,
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