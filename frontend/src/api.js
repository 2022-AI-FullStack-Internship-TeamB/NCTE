import { Platform } from 'react-native';
import axios from 'axios';

const API = axios.create({
    baseURL: 
        Platform.OS === 'ios' ? 
            'http://127.0.0.1:8000/api' : 'http://10.0.2.2:8000/api',
    headers: {
        'Content-Type' : 'application/json',
    },
});

export default API;