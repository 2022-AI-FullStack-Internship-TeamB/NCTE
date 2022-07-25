import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { textStyles, viewStyles, boxStyles, iconStyles } from '../styles';
import { images } from '../images';
import { theme } from '../theme';
import AlbumButton from '../components/AlbumButton';
import IconButton from '../components/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Album = ({ navigation }) => {
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    const [categoryName, setCategoryName] = useState('');
    const [userId, setUserId] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
            //console.log('getting id successed in album screen', userId);
        } catch (e) {
            console.error(e);
        }
    }
    
    useEffect(() => {
        getId();
        //console.log('userid: ', userId);
    }, []);

    const _onPress = () => {
        console.log('pressed');
    }
    
    const onAllPressed = () => {
        navigation.navigate('List', {
            categoryName: 'NCTE',
            userId: userId
        });
    }

    const onDiaryPressed = () => {
        navigation.navigate('List', {
            categoryName: 'Diary',
            userId: userId
        });
    }

    const onTodoPressed = () => {
        navigation.navigate('List', {
            categoryName: 'Todo',
            userId: userId
        });
    }

    const onStudyPressed = () => {
        navigation.navigate('List', {
            categoryName: 'Study',
            userId: userId
        });
    }
    
    const onAlbumPressed = () => {
        navigation.navigate('List');
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>NCTE</Text>
            </View>
            
            <View style = {{
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {onAllPressed}
                        text = 'All'
                        color = {theme.light_blue}
                    />
                    <AlbumButton
                        onPress = {onDiaryPressed}
                        text = 'Diary'
                        color = {theme.light_pink}
                    />
                </View>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {onTodoPressed}
                        text = 'Todo'
                        color = {theme.magenta_pink}
                    />
                    <AlbumButton
                        onPress = {onStudyPressed}
                        text = 'Study'
                        color = {theme.light_blue}
                    />
                </View>
            </View>
        </View>
    )
}


export default Album;