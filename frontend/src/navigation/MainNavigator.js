import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { images } from '../images';
import { theme } from '../theme';

import TabNavigator from './TabNavigator';
import { SignInStack } from './StackNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
        <NavigationContainer
            independent = {true}
        >
            <Stack.Navigator
                screenOptions = {{ headerShown: false }}
            >
                <Stack.Screen name = 'SignInStack' component = {SignInStack} />
                <Stack.Screen name = 'TabNavigator' component = {TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}