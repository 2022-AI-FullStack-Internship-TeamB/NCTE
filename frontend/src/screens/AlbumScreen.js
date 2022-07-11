import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles, iconStyles } from '../styles';
import { images } from '../images';
import { theme } from '../theme';
import AlbumButton from '../components/AlbumButton';
import IconButton from '../components/IconButton';

const Album = ({ navigation }) => {

    const _onPress = () => {
        console.log('pressed');
    }

    const onAlbumPressed = () => {
        navigation.navigate('List');
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <IconButton 
                    image = {images.add} 
                    onPress = {_onPress}
                    marginLeft = {20}
                    marginTop = {50}
                    />
            </View>
            
            <View style = {viewStyles.container}>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {onAlbumPressed}
                        text = 'All'
                        color = {theme.light_blue}
                    />
                    <AlbumButton
                        onPress = {onAlbumPressed}
                        text = 'Diary'
                        color = {theme.light_pink}
                    />
                </View>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {onAlbumPressed}
                        text = 'Todo'
                        color = {theme.magenta_pink}
                    />
                    <AlbumButton
                        onPress = {onAlbumPressed}
                        text = 'Study'
                        color = {theme.light_blue}
                    />
                </View>
            </View>
        </View>
    )
}


export default Album;