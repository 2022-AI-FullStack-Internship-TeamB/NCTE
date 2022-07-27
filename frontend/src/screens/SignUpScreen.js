import React, { useState } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import API from '../api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { images } from '../images';
import { textStyles, viewStyles, boxStyles } from '../styles';

const SignUpScreen = ({ navigation }) => {

    const { width, height, scale, fontScale } = Dimensions.get('screen');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);

    const onBackPressed = () => {
        navigation.navigate('SignIn');
    };

    const onSignUpPressed = async () => {
        if (email == "" || username == "" || password == "") {
            alert('빈칸없이 다 입력해주세요😊');
        }

        const data = {
            email: email,
            username: username,
            password: password,
        }

        try {
            const response = await API.post(
                `/signup`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    alert('회원가입되었습니다.');
                    setUserData(data);
                    navigation.navigate('SignIn');
                } else {
                    alert('중복된 아이디가 존재합니다.');
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        } catch (error) {
            console.log(error);
        }
    }

	return (
    	<View style = {{
            flex: 1
        }}>
            <ScrollView>
                <View style = {boxStyles.top}>
                    <Text style = {textStyles.title}>
                        Register
                    </Text>
                </View>

                <View style = {viewStyles.container}>
                    <View style = {{
                        marginTop: height / 12,
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
                                value={username}
                                setValue={setUsername}
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
                </View>
            </ScrollView>
            <View style = {viewStyles.container}>
                <View style = {viewStyles.row}>    
                    <CustomButton
                        onPress = {onBackPressed}
                        text = "Back"
                    />
                    <View style = {{
                        marginLeft: 100,
                    }}>
                        <CustomButton
                            onPress = {onSignUpPressed}
                            text = "SignUp"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SignUpScreen;