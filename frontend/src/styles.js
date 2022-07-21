import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from './theme';

const { width, height, scale, fontScale } = Dimensions.get('screen');

export const textStyles = StyleSheet.create ({
    title : {
        fontSize: 30,
        // fontWeight: 'bold',
        color: 'black',
        alignItems: 'flex-start',
        marginTop: width/10,
        marginLeft: width/20,
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
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        fontSize: Platform.OS == 'ios'? 17 : 15,
        width: width * 0.7
    },

    hashtag: {
        fontSize: 20,
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: 10
    },
})

export const viewStyles = StyleSheet.create ({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: width/20,
        marginLeft: width/30,
        padding: width/16,
    },

    row: {
        flexDirection: 'row',
        margin: height/55,
    },

    center: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
    },

    SI_row: {
        alignItems: 'center',
        flexDirection: 'row',
        height: height/10,
        width: width/20,
        marginLeft: width/18
    }
})

export const boxStyles = StyleSheet.create ({
    top: {        
        height: height/7,
        backgroundColor: theme.light_green,
        justifyContent: 'center',
        // marginBottom: 10,
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
        width: width-70,
        height: 80,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: theme.light_pink,
        margin:10
    },

    important: {
        width: 25,
        height: 16,
        backgroundColor: theme.magenta_pink,
        opacity: 0.4,
    },

    InBox: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    textArea: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: width * 0.75,
        height: height * 0.3,
        padding: 15,
    },

})

export const imageStyles = StyleSheet.create ({
    logo: {
        height: height/8,
        width: width/1.15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/5,
        marginBottom: height/10
    
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

export const noteStyles = StyleSheet.create ({
    contents: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: width * 0.8,
        height: Platform.OS === 'ios' ? height * 0.52 : height * 0.45,
        padding: 15,
    },

    summary: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        margin: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        width: width * 0.8,
        height: height * 0.1,
        padding: 15,
    }
})