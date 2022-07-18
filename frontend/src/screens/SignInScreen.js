import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { textStyles, viewStyles, boxStyles, imageStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);

    const saveId = async id => {
        try {
            console.log('saving id');
            await AsyncStorage.setItem('user_id', JSON.stringify(id));
            setId(id);
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
                    console.log(response.data.id);
                    alert('로그인 완료');
                    setUserData(data);
                    //setIsLoggedIn(true);
                    saveId(response.data.id);
                    // AsyncStorage.setItem('user_id', JSON.stringify(
                    //     response.data.result.id
                    // ));
                    AsyncStorage.setItem('isLogin', JSON.stringify(true));
                    navigation.navigate('TabNavigator');
                    //AsyncStorage.setItem('login', isLoggedIn);
                } else {
                    alert('이메일 혹은 비밀번호가 일치하지 않습니다');
                }
            })
            .catch(function (error) {
                //console.log(error.response);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

   return ( 
        <View style = {{
            margin: 20,
        }}>
            <Image
                source = {images.logo}
                style={imageStyles.logo}
            />
            <Text>E-mail</Text>
                <View style = {viewStyles.row}>
                    <CustomInput 
                        value = {email}
                        setValue = {setEmail}
                        placeholder="E-mail address"
                    />
                </View>
            <Text>Password</Text>
                <View style = {viewStyles.row}>
                    <CustomInput 
                        value = {password}
                        setValue = {setPassword}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
                <View style = {viewStyles.row}>
                    <View style = {{
                        marginLeft: 110
                    }}>
                        <CustomButton
                            onPress = {onSignInPressed}
                            text = "Sign In"
                        />
                        <View style = {{
                            margin:10,                           
                        }}>
                        </View>
                        <CustomButton
                            onPress = {onSignUpPressed}
                            text = "Sign Up"
                        />
                    </View>
                </View>
        </View>
    );
}

  
export default SignInScreen;