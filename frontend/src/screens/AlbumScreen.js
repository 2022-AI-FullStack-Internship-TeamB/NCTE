import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles, iconStyles } from '../styles';
import { images } from '../images';
import { theme } from '../theme';
import AlbumButton from '../components/AlbumButton';

const Album = () => {

    const _onPress = () => {
        console.log('pressed');
    }
    return (
        <View>
            <View style = {boxStyles.top}>
                <Image source = {images.add} style = {iconStyles.add} />
            </View>
            
            <View style = {viewStyles.container}>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {_onPress}
                        text = 'All'
                        color = {theme.light_blue}
                    />
                    <AlbumButton
                        onPress = {_onPress}
                        text = 'Diary'
                        color = {theme.light_pink}
                    />
                </View>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {_onPress}
                        text = 'Todo'
                        color = {theme.magenta_pink}
                    />
                    <AlbumButton
                        onPress = {_onPress}
                        text = 'Study'
                        color = {theme.light_blue}
                    />
                </View>
            </View>
        </View>
    )
}


export default Album;