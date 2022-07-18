import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = ({ navigation, route, props }) => {

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    //const [id, setId] = useState('');  
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
            //console.log('getting id successed' + userId);
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
                    //console.log('getting user successed');
                    setUser(response.data);
                    setEmail(response.data.result.email);
                    setUserName(response.data.result.username);
                    //console.log(userId);
                    //console.log(email);
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
                console.log('프로필 수정 성공');
                setEmail(email);
            })
            .catch(function (error) {
                console.log('갱신 실패');
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const onLogoutPressed = async () => {
        try {
            //AsyncStorage.removeItem('user_id');
            //AsyncStorage.setItem('isLogin', JSON.stringify(false));
            //navigation.navigate('SignInStack');
            navigation.navigate('SignInStack', {
                screen: 'SignIn'
            });
        } catch (error) {
            console.log(error);
        }
    };

   return (
       <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Profile
                </Text>
            </View>

            <View style = {viewStyles.container}>
                <View style = {{
                    marginTop: 30,
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
                    marginTop: 100,
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