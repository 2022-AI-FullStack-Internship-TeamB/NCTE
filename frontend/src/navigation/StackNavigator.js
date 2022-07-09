import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AlbumScreen from '../screens/AlbumScreen';
import CameraScreen from '../screens/CameraScreen';
import UploadScreen from '../screens/UploadScreen';
import NoteScreen from '../screens/NoteScreen';
import MemoListScreen from '../screens/MemoListScreen';
import ModifyScreen from '../screens/ModifyScreen';

const SignInName = 'SignIn';
const SignUpName = 'SignUp';
const AlbumName = 'Album';
const CameraName = 'Camera';
const UploadName = 'Upload';
const NoteName = 'Note';
const ListName = 'List';
const ModifyName = 'Modify';

const Stack = createNativeStackNavigator();

export function SignInStack() {
    return (
        <Stack.Navigator
            screenOptions = {{ headerShown: false }}
        >
            <Stack.Screen name = {SignInName} component = {SignInScreen} />
            <Stack.Screen name = {SignUpName} component = {SignUpScreen} />
        </Stack.Navigator>
    )
}

export function CameraStack() {
    return (
        <Stack.Navigator
            screenOptions = {{ headerShown: false }}
        >
            <Stack.Screen name = {CameraName} component = {CameraScreen} />
            <Stack.Screen name = {UploadName} component = {UploadScreen} />
            <Stack.Screen name = {NoteName} component = {NoteScreen} />
            <Stack.Screen name = {ListName} component = {MemoListScreen} />
        </Stack.Navigator>
    )
}

export function AlbumStack() {
    return (
        <Stack.Navigator
            screenOptions = {{ headerShown: false }}
        >
            <Stack.Screen name = {AlbumName} component = {AlbumScreen} />
            <Stack.Screen name = {ListName} component = {MemoListScreen} />
            <Stack.Screen name = 'CameraStack' component = {CameraStack} />
            <Stack.Screen name = {NoteName} component = {NoteScreen} />
            <Stack.Screen name = {ModifyName} component = {ModifyScreen} />
        </Stack.Navigator>
    )
}