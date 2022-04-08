import { StyleSheet } from "react-native";
import { Constants, Fonts } from '../../global/index';

const maxWidth = Constants.SCREEN_WIDTH * 0.8;
const top = Constants.SCREEN_HEIGHT * 0.85;
const fromLeft = Constants.SCREEN_WIDTH * 0.30;

export const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: '#666666',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        borderRadius: 8,
        maxWidth,
        // top: '85%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignSelf: 'center'
        // left: '30%',
    },
    text: {
        color: '#ffffff',
        fontFamily: Fonts.MEDIUM,
        fontSize: 13,
    }
});