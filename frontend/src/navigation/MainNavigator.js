import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSwtichNavigator } from 'react-navigation';
import { images } from '../images';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import { SignInStack } from './StackNavigator';

const Stack = createNativeStackNavigator();
//const Switch = createSwtichNavigator();

export default function MainNavigator() {
    
    const [isLogin, setIsLogin] = useState(false);

    // const getLogin = async () => {
    //     try {
    //         const login = AsyncStorage.getItem('isLogin');
    //         setIsLogin(login);
    //         console.log(isLogin);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // useEffect(() => {
    //     getLogin();
    // })

    const getLogin = async () => {
        if(AsyncStorage.getItem('user_id')!== null){
            setIsLogin(true);
        }
    }

    return (
        <NavigationContainer
            independent = {true}
        >
            <Stack.Navigator
                screenOptions = {({ route }) => ({ headerShown: false })}
                initialRouteName = {SignInStack}
            >
                <Stack.Screen name = 'SignInStack' component = {SignInStack} />
                <Stack.Screen name = 'TabNavigator' component = {TabNavigator} />  
            {/* {
                isLogin ? (
                    <>
                    <Stack.Screen name = 'TabNavigator' component = {TabNavigator} /> 
                    </>   
                ) : (
                    <>
                    <Stack.Screen name = 'SignInStack' component = {SignInStack} />
                    </>
                )
            } */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}