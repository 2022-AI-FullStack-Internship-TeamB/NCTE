import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TextInput } from 'react-native';
import CustomInput from './CustomInput';
import IconButton from './IconButton';
import { images } from '../images';
import { theme } from '../theme';

const InputModal = ({ id, modalVisible, value, setValue1, setValue2, setValue3, onPress, onBackPressed }) => {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        카테고리를 수정하세요!
                    </Text>
                    { (id === 1) ? (
                        <CustomInput 
                            value = {value}
                            setValue = {setValue1}
                        />
                    ) : ( (id === 2) ? (
                        <CustomInput 
                                value = {value}
                                setValue = {setValue2}
                            />
                        ) : (
                        <CustomInput 
                                value = {value}
                                setValue = {setValue3}
                            />
                        )
                    )}
                    <View style = {{
                        flexDirection: 'row',
                    }}>
                    <IconButton
                            image = {images.back}
                            onPress = {onBackPressed}
                            marginTop = {10}
                        />
                    <IconButton
                        onPress = {onPress}
                        image = {images.check}
                        marginTop = {10}
                        marginLeft = {100}
                    />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 100
    },
    modalView: {
        margin: 15,
        backgroundColor: theme.light_green,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
    }
})

export default InputModal;