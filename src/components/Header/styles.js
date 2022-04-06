import { Colors, Constants, Fonts } from "../../global/index";

const { StyleSheet } = require("react-native");



export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    headerLeftContainer: {
        flex: 1.1,
        // backgroundColor: Colors.PRIMARY
    },

    headerLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
        borderRadius: 40,
        height: 40,
        width: 40,
        borderWidth: 2

    },

    headerCenterContainer: {
        flex: 6,
        // backgroundColor: Colors.PRIMARY
    },

    headerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerRightContainer: {
        flex: 1.1,
        // backgroundColor: Colors.WHITE
    },

    headerRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 0,
    },

    headerText: {
        fontSize: Fonts.SIZE_18,
        fontFamily: Fonts.BOLD,
        color: Colors.BLACK
    }
});