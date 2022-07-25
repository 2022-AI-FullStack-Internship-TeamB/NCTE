import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

const CustomModal = ({ modalVisible, text }) => {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {text}
                    </Text>
                    <ActivityIndicator 
                        style = {{ marginTop: 5 }} 
                        size = 'small'
                        />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default CustomModal;