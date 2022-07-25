import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './TabNavigator';
import { SignInStack } from './StackNavigator';
import { theme } from '../theme';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {

    const [isLogin, setIsLogin] = useState(false);

    const getLogin = async () => {
        if(await AsyncStorage.getItem('user_id')!== null){
            setIsLogin(true);
        }
    }

    useEffect(() => {
        getLogin();
    });

    return (
        <NavigationContainer
            independent = {true}
        >
            <Stack.Navigator
                screenOptions = {({ route }) => ({ headerShown: false })}
                initialRouteName = {SignInStack}
            >
            {
                isLogin ? (
                    <>
                    <Stack.Screen name = 'TabNavigator' component = {TabNavigator} /> 
                    </>   
                ) : (
                    <>
                    <Stack.Screen name = 'SignInStack' component = {SignInStack} />
                    <Stack.Screen name = 'TabNavigator' component = {TabNavigator} />
                    </>
                )
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}