import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';
import restart from '../restart';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { images } from '../images';
import { textStyles, viewStyles, boxStyles } from '../styles';

const MyPageScreen = ({ navigation, route, props }) => {
    const { width, height } = Dimensions.get('screen');

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
        } catch (e) {
            console.error(e);
        }
    }

    const getUser = async () => {
        try {
            await API.get(
                `/user/${userId}`
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    setEmail(response.data.result.email);
                    setUserName(response.data.result.username);
                }
            })
            .catch(function (error) {
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getId();
        getUser();
    }, [userId]);


    const onChangeProfile = async () => {
        try {
            const response = await API.put(
                `/user/${userId}`,
                {   
                    id: userId,
                    email: email,
                    username: userName,
                }
            )
            .then(function (response) {
                setUserName(userName);
                setEmail(email);
                alert('변경되었습니다.');
            })
            .catch(function (error) {
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            AsyncStorage.clear();
            restart();
        } catch (error) {
            console.log(error);
        }
    };
    
    const onLogoutPressed = () => {
        Alert.alert(
            'Logout',
            '로그아웃하시겠습니까 ?',
            [
                {text: '취소', style: 'cancel'}, 
                {
                    text: '로그아웃',    
                    onPress: logout,
                        style: 'destructive',
                },
            ],
                {
                    cancelable: true,
                },
        );
    }

   return (
       <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Profile
                </Text>
            </View>

            <View style = {viewStyles.container}>
                <View style = {{
                    marginTop: height/20,
                }}>
                    <View style = {viewStyles.row}>
                        <Image source = {images.nickname} />
                        <CustomInput
                            value = {userName}
                            setValue = {setUserName}
                            placeholder = 'Nickname'
                        />
                    </View>
                    <View style = {viewStyles.row}>
                        <Image source = {images.email} />
                        <CustomInput
                            value = {email}
                            setValue = {setEmail}
                            plaeholder = 'Email'
                        />
                    </View>
                </View>

                <View style = {{
                    marginTop: width/2.5,
                    marginLeft: 110
                }}>
                    <CustomButton
                        onPress = {onChangeProfile}
                        text = "Confirm Change"
                    />
                    <View style = {{
                        marginTop: 20,
                    }} />
                    <CustomButton
                        onPress = {onLogoutPressed}
                        text = "Logout"
                    />
                </View>
            </View>
        </View>
    );
}

export default MyPageScreen;