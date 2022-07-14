import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = ({ navigation }) => {
    
    //const getId = AsyncStorage.getItem('id');
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setId(user_id);
            //console.log('getting id successed' + id);
        } catch (e) {
            console.error(e);
        }
    }

    const getUser = async () => {
        try {
            await API.get(
                `/user/${id}`
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    console.log('getting user successed');
                    setUser(response.data);
                    setEmail(response.data.result.email);
                    //setId(response.data.result.id);
                    console.log(id);
                    console.log(email);
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
    }, []);


    const onChangeEmail = async () => {
        try {
            const response = await API.put(
                `/user/${id}`,
                {
                    email: email
                }
            )
            .then(function (response) {
                setEmail(email);
            })
            .catch(function (error) {
                console.log('갱신 실패');
                //console.log(error.response);
            })
        } catch (error) {
            //console.log(error);
        }
    }

    const onLogoutPressed = async () => {
        try {
            AsyncStorage.removeItem('user_id');
            AsyncStorage.setItem('isLogin', JSON.stringify(false));
            //navigation.navigate('SignInStack');
            navigation.navigate('SignIn');
        } catch (error) {
            console.log(error);
        }
    };

   return (
       <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    <Image source = {images.nickname} />
                    Nickname
                </Text>    
            </View>

            <View style = {viewStyles.container}>
                <View style = {{
                    marginTop: 30,
                }}>
                    <View style = {viewStyles.row}>
                        <Image source = {images.email} />
                        <CustomInput
                            value = {email}
                            setValue = {setEmail}
                        />
                    </View>
                </View>

                <View style = {{
                    marginTop: 150,
                    marginLeft: 110
                }}>
                    <CustomButton
                        onPress = {onChangeEmail}
                        text = "Confirm Change"
                    />
                    <View style = {{
                        marginTop: 40,
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