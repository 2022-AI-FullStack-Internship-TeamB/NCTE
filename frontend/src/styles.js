import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const textStyles = StyleSheet.create ({
    title : {
        fontSize: 30,
        // fontWeight: 'bold',
        color: 'black',
        alignItems: 'flex-start',
        marginTop: 40,
        marginLeft: 20,
    },

    input: {
        fontSize: 15,
        fontWeight: '300',
        color: theme.light_grey,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: theme.light_grey,
        borderBottomWidth: 1,
        margin: 10,
        width: 240,
    },

    button: {
        color: theme.light_grey,
        fontSize: 15,
    },

    album: {
        fontSize: 25,
        color: '#727272',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 15,
        color: 'black',
    },

    textArea: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: 300,
        padding: 15,
    },

    hashtag: {
        fontSize: 20,
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: 10
    }
})

export const viewStyles = StyleSheet.create ({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 15,
        padding: 15,
    },

    row: {
        flexDirection: 'row',
        margin: 10,
    },

    center: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    }
})

export const iconStyles = StyleSheet.create ({
    add: {
        width: 15,
        height: 15,
        marginTop: 60,
        marginLeft: 20,
    }
})

export const boxStyles = StyleSheet.create ({
    top: {
        height: 100,
        backgroundColor: theme.light_green,
    },

    button: {
        width: 100,
        height: 40,
        backgroundColor: theme.light_green,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: theme.light_grey,
        borderWidth: 1,
        borderRadius: 15,
    },

    textbox: {

    }
})