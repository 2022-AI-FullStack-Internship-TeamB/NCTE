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
        width: 250,
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

    InBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',

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

    SI_row: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 40,
    }
})

export const lineStyles = StyleSheet.create ({
    line: {
        width: 70,
        color: theme.light_grey,
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

    memo: {
        width: 311,
        height: 77,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: '#EBDFE5',
        marginLeft: 40,
        margin:10
    },

    important: {
        width: 25,
        height: 16,
        backgroundColor: '#9CA4A3',
        opacity: 0.4,
    },

})

export const imageStyles = StyleSheet.create ({

    logo: {
        height: 100,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 190,
        marginLeft: 40,
        margin:50
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