import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import * as ImagePicker from 'expo-image-picker';
import { images } from '../images';
import IconButton from '../components/IconButton';

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
                    onPress = {_onPress}
                    image = {images.check}
                    marginTop = {20}
                    //marginTop = {height/27}
                    //marginLeft = {width/5}
                />
            </View>
        </View>
    )
}
export default Camera;