import { StyleSheet } from "react-native";
import { Fonts, Colors, Constants } from "../../global";

//global variables
const IMAGE_HEIGHT = 270;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    cont: { backgroundColor: Colors.SECONDARY, bottom: 0, width: Constants.SCREEN_WIDTH, height: Constants.SCREEN_HEIGHT / 1.6, position: 'absolute', borderWidth: 2, borderTopLeftRadius: 40, alignItems: 'center' },
    contain:{ borderWidth: 2, margin: 20, padding: 20, borderRadius: 20, position: 'absolute', bottom: Constants.SCREEN_HEIGHT / 2, justifyContent: 'center', alignContent: "center", alignItems: 'center', backgroundColor: Colors.WHITE, },
    userName:{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_20, color: Colors.BLACK },
    phoneNumber:{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_18, color: Colors.GRAY_DARK }
});