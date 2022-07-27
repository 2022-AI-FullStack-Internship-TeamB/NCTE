import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { images } from '../images';
import { theme } from '../theme';

import { CameraStack, AlbumStack, MypageStack } from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <NavigationContainer
            independent = {true}
        >
            <Tab.Navigator
                screenOptions = {({ route }) => ({ headerShown: false })}
                initialRouteName = 'AlbumStack'
            >
                <Tab.Screen name = 'CameraStack' component = {CameraStack} 
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.camera} />
                        ),
                        unmountOnBlur: true,
                    }} />
                <Tab.Screen name = 'AlbumStack' component = {AlbumStack} 
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.list} />
                        ),
                        unmountOnBlur: true,
                    }} />
                <Tab.Screen name = 'MyPageStack' component = {MypageStack}
                    options = {{
                        tabBarShowLabel: false,
                        tabBarIcon: () => (
                            <Image source = {images.mypage} />
                        ),
                        unmountOnBlur: true,
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}