import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import * as ImagePicker from 'expo-image-picker';
import { images } from '../images';
import IconButton from '../components/IconButton';
import API from '../api';
import axios from 'axios';

const Camera = ({ navigation }) => {
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    const [pickedImagePath, setPickedImagePath] = useState(null);
    const [textId, setTextId] = useState('');

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if(result.uri != null) {
            if (!result.cancelled) {
                setPickedImagePath(result.uri);
            }
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if(!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    const saveImage = async () => {

        const fileName = pickedImagePath.split('/').pop();
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;
        
        const formData = new FormData();
        formData.append('image', {
            uri: Platform.OS === 'android' ? pickedImagePath : pickedImagePath.replace('file://', ''),
            name: fileName,
            type: type
        })

        try {
            const response = await API.post(
                `/notes/textconversion`,
                formData, {
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'multipart/form-data',
                    },
                    transformRequest: (data, headers) => {
                        return formData;
                    }
                }
            )
            .then(function (response) {
                if(response.data['success'] == true) {
                    navigation.navigate('Upload');
                }
            })
            .catch(function (error) {
                console.log(error.response);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Picture
                </Text>
            </View>
            <View style = {{
                width: width,
                height: Platform.OS == 'ios' ? height * 0.65 : height * 0.6
            }}>
                { pickedImagePath === (null) ? (
                    <View style = {{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        marginBottom: 20
                    }}>
                        <Text style = {textStyles.title}>
                            Upload your picture!
                        </Text>
                    </View>
                ) : (
                    <Image source = {{ uri: pickedImagePath }}
                        style = {{
                            width: width,
                            height: height,
                            resizeMode: 'contain',
                            flex: 1,
                        }}
                    />
                )}
            </View>
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
            }}>
                <IconButton
                    onPress = {showImagePicker}
                    image = {images.album}
                    marginTop = {20}
                />
                <IconButton
                    onPress = {openCamera}
                    image = {images.camera_green}
                />        
                <IconButton
                    onPress = {saveImage}
                    image = {images.check}
                    marginTop = {20}
                />
            </View>
        </View>
    )
}

export default Camera;