import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const MyPageScreen = () => {


    const onDeleteAccountPressed = () => {
        console.warn("Delete Account");
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
                            placeholder="E-mail address"
                        />
                    </View>
                </View>

                    <View style = {{
                        marginTop: 150,
                        marginLeft: 110
                    }}>
                        
                            <CustomButton
                                onPress = {onDeleteAccountPressed}
                                text = "Delete Account"
                            />
                    </View>
            </View>
        </View>
    );
}

export default MyPageScreen;