import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../../styles';
import { images } from '../../images';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const onBackPressed = () => {
        console.warn("Back");
    };

    const onConfirmPressed = () => {
        console.warn("Confirm");
    };

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