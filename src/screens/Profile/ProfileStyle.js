import { StyleSheet } from "react-native";
import { Fonts, Colors, Constants } from "../../global";

//global variables
const IMAGE_HEIGHT = 270;

export const styles = StyleSheet.create({
    editButton: { marginTop: 15, borderColor: Colors.PRIMARY, borderWidth: 1.5, alignItems: "center", borderRadius: 5 },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    editBtnText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: Fonts.SIZE_14,
        color: Fonts.BLACK,
    },
    header: {
        height: 60,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        fontSize: Fonts.SIZE_22,
        fontFamily: Fonts.LIGHT,
        color: Colors.BLACK
    },
    backButtonContainer: {
        paddingLeft: 20,
        backgroundColor: Colors.PRIMARY,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backButton: {
        backgroundColor: Colors.TRANSPARENT,
        paddingBottom: 20,
        paddingTop: 20,
        width: 40
    },
    profileContainer: {
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 20,
        alignItems: 'center',
        // backgroundColor: Colors.PRIMARY
    },
    roundedGradient: {
        borderRadius: 94 / 2,
        backgroundColor: Colors.PRIMARY,
        width: 94,
        height: 94,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImageContainer: {
        height: 90,
        width: 90,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 40,
    },
    userNameContainer: {
        width: Constants.SCREEN_WIDTH - 140,
        paddingBottom: 8
    },
    userName: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_22,
        color: Fonts.BLACK,
        letterSpacing: 0.3
    },
    followButtonContainer: {
        backgroundColor: Colors.TRANSPARENT,
        flexDirection: 'row'
    },
    followButton: {
        // width: 68,
        backgroundColor: Colors.BLACK,
        borderRadius: 5,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingHorizontal: 15
    },
    followButtonText: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_16,
        color: Colors.PRIMARY,
        letterSpacing: 0.3
    },
    followersText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: 20,
        letterSpacing: 0.2,
        paddingBottom: 5,
        color: Colors.BLACK
    },
    followersCount: {
        fontFamily: Fonts.LIGHT,
        fontSize: 14,
        letterSpacing: 0.2,
        color: Colors.BLACK
    },
    userFollowingDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 20
    },
    followersContainer: {
        alignItems: 'center',
        backgroundColor: Colors.TRANSPARENT
    },
    optionContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15
    },
    iconContainer: {
        paddingLeft: 20,
        paddingRight: 15,
        justifyContent: 'center',
    },
    line: { width: 1.5, height: 25, backgroundColor: Colors.BLACK },
    option: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 20
    },
    optionText: {
        fontFamily: Fonts.MEDIUM,
        fontSize: Fonts.SIZE_15,
        color: Fonts.BLACK,
    },
    referralContainer: {
        flex: 0.5,
    },
    referralButton: {
        width: 83,
        backgroundColor: '#faf3d6',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    referralText: {
        fontFamily: Fonts.LIGHT,
        fontSize: Fonts.SIZE_10,
        color: Fonts.BLACK,
    },
    secondLine: {
        height: 1,
        backgroundColor: Colors.GRAY_LIGHT,
        // marginHorizontal: 20
    },
    chatContainer: {
        position: 'absolute',
        zIndex: 2,
        bottom: 40,
        right: 30,
        height: 31,
        width: 31,
        borderRadius: 31 / 2,
        elevation: 2,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    }
});