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

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if(result.uri != null) {
            if (!result.cancelled) {
                setPickedImagePath(result.uri);
                console.log(result.uri);
                //setImageURL(result.uri);
            }
        }

        //handleImagePicked(result);
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

        console.log(result);
        if(!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
            //setImageURL(result.uri);
        }

        //handleImagePicked(result);
    }

    // const blobToBase64 = blob => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     return new Promise(resolve => {
    //       reader.onloadend = () => {
    //         resolve(reader.result);
    //       };
    //     });
    //   };

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
        // const base64 = await blobToBase64(pickedImagePath);
        // formData.append('image', base64);
        
        // let formData = new FormData();
        // formData.append('photo', {
        //     uri: pickedImagePath,
        //     name: `photo upload`,
        //     type: `image/jpg`,
        // });

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
                    console.log('image saved');
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
                { pickedImagePath !== (null) ? (
                    <Image source = {{ uri: pickedImagePath }}
                        // style = {{
                        //     width: width,
                        //     height: height * 0.6,
                        // }}
                        style = {{
                            width: width,
                            height: height,
                            //height: undefined,
                            //aspectRatio: 1,
                            resizeMode: 'contain',
                            flex: 1,
                        }}
                        // style = {{
                        //     width: width,
                        //     height: height - 250,
                        // }}
                    />
                ) : (
                    <View>
                       <Text style = {textStyles.title}>
                            Upload your picture!
                        </Text>
                    </View>
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
                    //marginTop = {height/30}
                    //marginLeft = {width/8.5}
                />
                <IconButton
                    onPress = {openCamera}
                    image = {images.camera_green}
                    //marginTop = {height/46}
                    //marginLeft = {83}
                />        
                <IconButton
                    onPress = {saveImage}
                    image = {images.check}
                    marginTop = {20}
                    //marginTop = {height/27}
                    //marginLeft = {width/5}
                />
            </View>
        </View>
    )
}

// async function uploadImageAsync(uri) {
//     let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
//     let uriParts = uri.split('.');
//     let fileType = uriParts[uriParts.length - 1];
  
//     let formData = new FormData();
//     formData.append('photo', {
//         uri,
//         name: `photo.${fileType}`,
//         type: `image/${fileType}`,
//     });
  
//     let options = {
//         method: 'POST',
//         body: formData,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//         },
//     };
  
//     return fetch(apiUrl, options);
// }

export default Camera;