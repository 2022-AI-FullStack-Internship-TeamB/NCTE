import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const IconButton = ({ onPress, image, marginTop, marginLeft }) => {
    return (
        <TouchableOpacity onPress = {onPress}
            style = {styles(marginTop, marginLeft).button}>
            <Image source = {image} />
        </TouchableOpacity>
    );
}

const styles = (marginTop, marginLeft) => StyleSheet.create ({
    button: {
        marginTop: marginTop,
        marginLeft: marginLeft,
    }
})

export default IconButton;