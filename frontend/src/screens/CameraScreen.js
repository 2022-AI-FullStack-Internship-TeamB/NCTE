import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import * as ImagePicker from 'expo-image-picker';
import { images } from '../images';
import IconButton from '../components/IconButton';

const Camera = ({ navigation }) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [pickedImagePath, setPickedImagePath] = useState('');
    const _onPress = () => {
        navigation.navigate('Upload');
    }

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        if(result.uri != null) {
            if (!result.cancelled) {
                setPickedImagePath(result.uri);
                console.log(result.uri);
                //setImageURL(result.uri);
            }
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        console.log(result);
        if(!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
            //setImageURL(result.uri);
        }
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Picture
                </Text>
            </View>
            <View>
                { pickedImagePath !== (null) ? (
                    <Image source = {{ uri: pickedImagePath }}
                        style = {{
                            width: width,
                            height: height - 250,
                        }}
                    />
                ) : (
                    <View>
                       <Text style = {textStyles.title}>
                            Upload your picture!
                        </Text>
                    </View>
                )}
            </View>
            <View style = {viewStyles.row}>
                <IconButton
                    onPress = {showImagePicker}
                    image = {images.album}
                    marginTop = {height/30}
                    marginLeft = {width/8.5}
                />
                <IconButton
                    onPress = {openCamera}
                    image = {images.camera_green}
                    marginTop = {height/46}
                    marginLeft = {83}
                />        
                <IconButton
                    onPress = {_onPress}
                    image = {images.check}
                    marginTop = {height/27}
                    marginLeft = {width/5}
                />                
            </View>
        </View>
    )
}
export default Camera;