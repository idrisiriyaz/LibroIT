
import { StyleSheet } from 'react-native'
import { Colors, Fonts,Constants } from '../../global/index'

export const styles = StyleSheet.create({
    TextInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: Fonts.MEDIUM,
        color: Colors.BLACK
    },
    acception: {
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptText: { color: Colors.BLACK, fontFamily: Fonts.BOLD, padding: 2 },
    conatainer: { backgroundColor: Colors.WHITE, flex: 1 },
    blockCon: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    chatCon: { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.MUNSELL, },
    messageCon: { flex: 1, justifyContent: "center", backgroundColor: Colors.WHITE, paddingTop: 20 },
    cross: { position: "absolute", zIndex: 100, right: 16, top: 16, height: 20, width: 20, backgroundColor: Colors.WHITE + 50, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    replyMessage:{ color: Colors.GRAY_DARK, fontFamily: Fonts.MEDIUM, maxWidth: Constants.SCREEN_WIDTH / 1.4 },
    replyCon:{ alignItems: "center", justifyContent: 'space-between', flexDirection: "row", backgroundColor: Colors.WHITE, marginHorizontal: 20, marginBottom: 20, },
    send:{ height: 50, width: 50, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.TERTIARY, justifyContent: 'center', alignItems: 'center' }
})