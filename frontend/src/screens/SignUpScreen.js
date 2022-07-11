import React, { useState } from 'react';
import axios from "axios";
import Constants from "expo-constants";
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignUpScreen = ({ navigation }) => {

    const { manifest } = Constants;

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const onBackPressed = () => {
        //console.warn("Back");
        navigation.navigate('SignIn');
    };
    const data = {
        //id: id,c
        username: nickname,
        email: email,
        password: password,
    }

<<<<<<< HEAD
    const emulator = 'http://127.0.0.1:8000'
    const onConfirmPressed = async () => {
        // console.warn("Confirm");
        if (email == "" || nickname == "" || password == "") {
            alert('빈칸없이 다 입력해주세요😊');
        }

        try {
            const response = await axios.post(
                //`${emulator}/api/signup`,
                `http://127.0.0.1:8000/api/signup`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    alert('회원가입되었습니다.');
                    navigation.navigate('SignIn');
                } else {
                    alert('중복된 아이디가 존재합니다.');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    // device id로 로그인하는 방법 찾아보기
    // user verification도 진행
    // user의 불편함을 줄여주는 방식으로 고민

	return (
    	<View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Register
                </Text>
            </View>

            <View style = {viewStyles.container}>
                <View style = {{
                    marginTop: 100,
                }}>
                    <View style = {viewStyles.row}>
                        <Image source = {images.email} />
                        <CustomInput
                            value={email}
                            setValue={setEmail}
                            placeholder="E-mail address"
                        />
                    </View>
                    <View style = {viewStyles.row}>
                        <Image source = {images.nickname} />
                        <CustomInput
                            value={nickname}
                            setValue={setNickname}
                            placeholder="Nickname"
                        />
                    </View>
                    <View style = {viewStyles.row}>
                        <Image source = {images.password} />
                        <CustomInput
                            value={password}
                            setValue={setPassword}
                            placeholder="Password"
                            secureTextEntry
                        />
                    </View>
                </View>

                <View style = {{
                    marginTop: 200,
                }}>
                    <View style = {viewStyles.row}>
                        
                            <CustomButton
                                onPress = {onBackPressed}
                                text = "Back"
                            />
                        
                        <View style = {{
                            marginLeft: 100,
                        }}>
                            <CustomButton
                                onPress = {onConfirmPressed}
                                text = "Confirm"
                            />
                        </View>
                    </View>
                </View>
                
                
            </View>
        </View>
    );
}

export default SignUpScreen;