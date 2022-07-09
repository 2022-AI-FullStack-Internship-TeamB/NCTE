import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
//import Clipboard from '@react-native-clipboard/clipboard';
import { images } from '../images';
import { styles } from '../styles';
import IconButton from '../components/IconButton';
import TextArea from '../components/TextArea';

const NoteScreen = ({ navigation }) => {

    const [_title, _setTitle] = useState('');
    const [copiedText, setCopiedText] = useState('');

    const back = () => {
        console.log('back');
    }

    const copyToClipboard = () => {
        //Clipboard.setString('hello world');
        console.log('copy');
    }
    
    const _modify = () => {
        console.log('modify');
    }

    const _delete = () => {
        console.log('delete');
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <View style = {viewStyles.row}>
                    <IconButton
                        image = {images.back}
                        onPress = {back}
                        marginLeft = {10}
                        marginTop = {60}
                    />
                    <Text style = {textStyles.title}>
                        실리콘밸리 인턴십
                    </Text>
                    <View style = {{
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }}>
                        <IconButton 
                            image = {images.modify}
                            onPress = {_modify}
                            marginLeft = {30}
                        />
                        <IconButton 
                            image = {images.copy}
                            onPress = {copyToClipboard}
                            marginLeft = {10}
                        />
                        <IconButton 
                            image = {images.delete_}
                            onPress = {_delete}
                            marginLeft = {10}
                        />
                    </View>
                </View>
            </View>

            <View style = {viewStyles.center}>
                <Text style = {textStyles.textArea}></Text>
                <Text style = {textStyles.textArea}></Text>
            </View>
            <View style = {viewStyles.row}>
                <Text style = {textStyles.hashtag}>#Hashtag</Text>
                <Text style = {textStyles.hashtag}>#Keyword</Text>
                <Text style = {textStyles.hashtag}>#Hashtag</Text>
            </View>
        </View>
    );
}

export default NoteScreen;