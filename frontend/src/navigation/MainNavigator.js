import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { images } from '../images';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import { SignInStack } from './StackNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        //AsyncStorage.getItem('isLogin');
        if (AsyncStorage.getItem('isLogin') === true){
            setIsLogin(true);
        }
    })

    return (
        <NavigationContainer
            independent = {true}
        >
            <Stack.Navigator
                screenOptions = {{ headerShown: false }}
                initialRouteName = {SignInStack}
            >
            {
                isLogin ? (
                    <Stack.Screen name = 'TabNavigator' component = {TabNavigator} />    
                ) : (
                    <Stack.Screen name = 'SignInStack' component = {SignInStack} />
                )
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}