import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { textStyles, viewStyles, boxStyles, imageStyles } from '../styles';
import { images } from '../images';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignInScreen = () => {

    const onSignInPressed = () => {
        console.warn("Sign In");
    };

    const onSignUpPressed = () => {
        console.warn("Sign Up");
    };

   return (

        <View style = {{
            margin: 20
        }}>

            <Image
                source = {images.logo}
                style={imageStyles.logo}
            />

          
            <Text>E-mail</Text>
                <View style = {viewStyles.row}>
                    <CustomInput 
                        E-mail
                        placeholder="Add a Text"
                    />
                </View>

            <Text>Password</Text>
                <View style = {viewStyles.row}>
                    <CustomInput 
                        Password
                        placeholder="Add a Text"
                    />
                </View>
            
            
                <View style = {viewStyles.row}>
                    <View style = {{
                        marginLeft: 110
                    }}>
                        
                        <CustomButton
                            onSignIn = {onSignInPressed}
                            text = "Sign In"
                        />

                        <View style = {{
                            margin:10,                           
                        }}>
                        </View>

                        <CustomButton
                            onSignUp = {onSignUpPressed}
                            text = "Sign Up"
                        />

                    </View>
                </View>
           
        </View>
        
    );
    
}

  
export default SignInScreen;