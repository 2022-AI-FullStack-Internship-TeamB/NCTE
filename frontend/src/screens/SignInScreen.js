import React, { useState } from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { images } from '../images';
import { textStyles, viewStyles, boxStyles, imageStyles } from '../styles';

const SignInScreen = ({ navigation }) => {
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const saveId = async id => {
        try {
            console.log('saving id');
            await AsyncStorage.setItem('user_id', JSON.stringify(id));
        } catch (e) {
            console.error(e);
        }
    }

    const onSignInPressed = async () => {
        if (email == "" || password == "") {
            alert('빈칸없이 다 입력해주세요😊');
        }

        const data = {
            email: email,
            password: password,
        }

        try {
            const response = await API.post(
                `/login`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    console.log("SignUp");
                    alert('로그인 완료');
                    saveId(response.data.id);
                    navigation.navigate('TabNavigator');
                } else {
                    alert('이메일 혹은 비밀번호가 일치하지 않습니다');
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

   return ( 
        <View style ={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Image
                source = {images.logo}
                style={imageStyles.logo}
            />
            <View style = {{
                alignItems: 'flex-start',
            }}>
            <Text style={textStyles.text}>E-mail</Text>
                <View style = {viewStyles.SI_row}>
                    <CustomInput 
                        value = {email}
                        setValue = {setEmail}
                        placeholder="E-mail address"
                    />
                </View>
            <Text style={textStyles.text}>Password</Text>
                <View style = {viewStyles.SI_row}>
                    <CustomInput 
                        value = {password}
                        setValue = {setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
            </View>
                <View style = {viewStyles.center}>
                    <CustomButton
                        onPress = {onSignInPressed}
                        text = "Sign In"
                        />
                    <View style = {{
                        margin: 10,
                    }} />
                    <CustomButton
                        onPress = {onSignUpPressed}
                        text = "Sign Up"
                    />
                </View>
        </View>
    );
}

export default SignInScreen;