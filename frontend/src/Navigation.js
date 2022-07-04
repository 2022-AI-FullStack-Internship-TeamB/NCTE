import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from './images';
import { theme } from './theme';

import CameraScreen from './screens/CameraScreen';
import AlbumScreen from './screens/AlbumScreen';
import MyPageScreen from './screens/MyPageScreen';
import Album from './screens/AlbumScreen';

const CameraName = 'Camera';
const AlbumName = 'Album';
const MyPageName = 'MyPage';

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions = {{ headerShown: false }}
                initialRouteName = {AlbumName}
            >
                <Tab.Screen name = {CameraName} component = {CameraScreen} 
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.camera} />
                        ),
                        tabBarActiveTintColor: theme.light_green,
                        tabBarActiveBackgroundColor: theme.light_green,
                    }} />
                <Tab.Screen name = {AlbumName} component = {AlbumScreen} 
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.list} />
                        )
                    }} />
                <Tab.Screen name = {MyPageName} component = {MyPageScreen}
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.mypage} />
                        )
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}