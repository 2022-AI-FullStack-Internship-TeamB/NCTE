import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';
import AlbumButton from '../components/AlbumButton';
import IconButton from '../components/IconButton';
import { images } from '../images';
import { textStyles, viewStyles, boxStyles, iconStyles } from '../styles';
import { theme } from '../theme';
import InputModal from '../components/InputModal';

const Album = ({ navigation }) => {

    const [userId, setUserId] = useState('');
    const _categoryName = [];
    const _categoryId = [];
    const [modalVisible, setModalVisible] = useState(false);

    const [one, setOne] = useState('');
    const [two, setTwo] = useState('');
    const [three, setThree] = useState('');
    const [categoryId, setCategoryId] = useState([]);
    const [ctId, setCtId] = useState('');

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
        } catch (e) {
            console.error(e);
        }
    }

    const getCategory = async (j) => {
        try {
            for (let i = (j-1)*3+1; i <= (j-1)*3+3; i++){
                await API.get(
                    `category/${userId}/${i}`
                )
                .then(function (response) {
                    _categoryId.push(response.data.result[0].category_id);
                    _categoryName.push(response.data.result[0].category);
                })
                .catch(function (error) {
                    console.log(error.response);
                })
            }
            setOne(_categoryName[0]);
            setTwo(_categoryName[1]);
            setThree(_categoryName[2]);
            setCategoryId(categoryId.concat(_categoryId));
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getId();
        getCategory(userId);
    }, [userId]);

    const getCtId = (i) => {
        switch (i) {
            case 1:
                return one;
            case 2:
                return two;
            case 3:
                return three;
        }
    }

    async function modifyCategory(id, name) {
        const data = {
            user_id: userId,
            category_id: id,
            category: name
        }

        try {
            await API.put(
                `/category/${userId}/${id}`,
                data
            )
            .then(function(response) {
                setOne(one);
                setTwo(two);
                setThree(three);
                setModalVisible(false);
            })
            .catch(function (error) {
                console.log(error.response);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onAllPressed = () => {
        navigation.navigate('List', {
            categoryName: 'NCTE',
            userId: userId
        });
    }

    return (
        <View>
            <View style = {boxStyles.top}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginRight: 10,
                    }}>
                    <Text style = {textStyles.title}>NCTE</Text>
                </View>
            </View>
            
            <View style = {{
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {onAllPressed}
                        text = 'All'
                        color = {theme.light_blue}
                    />
                    <AlbumButton
                        onPress = {() => {
                            navigation.navigate('List', {
                            categoryName: one,
                            userId: userId
                        })}}
                        onLongPress = {() => {
                            setModalVisible(true)
                            setCtId(1)
                        }}
                        text = {one}
                        color = {theme.light_pink}
                    />
                </View>
                <View style = {viewStyles.row}>
                    <AlbumButton
                        onPress = {() => {
                            navigation.navigate('List', {
                            categoryName: two,
                            userId: userId
                        })}}
                        onLongPress = {() => {
                            setModalVisible(true)
                            setCtId(2)
                        }}
                        text = {two}
                        color = {theme.magenta_pink}
                    />
                    <AlbumButton
                        onPress = {() => {
                            navigation.navigate('List', {
                            categoryName: three,
                            userId: userId
                        })}}
                        onLongPress = {() => {
                            setModalVisible(true)
                            setCtId(3)
                        }}
                        text = {three}
                        color = {theme.light_blue}
                    />
                </View>
                <InputModal 
                    modalVisible = {modalVisible ? true : false}
                    id = {ctId}
                    value = {getCtId(ctId)}
                    setValue1 = {setOne}
                    setValue2 = {setTwo}
                    setValue3 = {setThree}
                    onPress = {() => modifyCategory(ctId, getCtId(ctId))}
                    onBackPressed = {() => setModalVisible(false)}
                />
            </View>
        </View>
    )
}

export default Album;