import React from 'react'
import { Modal, StyleSheet, Text, View, } from 'react-native'
import { Colors, Constants, Fonts, ScreenNames } from '../../global'
import { globalStyles } from '../../global/globalStyles'
import CrossSvg from "../../assets/svg/cross"
import { useNavigation } from '@react-navigation/native';
import TouchableResize from '../util/TouchableResize'

const SignInModal = ({ isSignInModalVisible, toggleIsSignInModalVisibility, navigateFrom, navigateTo }) => {

    const navigation = useNavigation();

    const handleSignInPress = () => {
        navigation.navigate(ScreenNames.LOGIN)
        toggleIsSignInModalVisibility()
    }
    const handleSignUpPress = () => {
        navigation.navigate(ScreenNames.REGISTER)
        toggleIsSignInModalVisibility()
    }
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isSignInModalVisible}>
            <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: "flex-end", justifyContent: "center", alignItems: "center" }}>
                < View style={{ justifyContent: "flex-end", backgroundColor: Colors.WHITE, padding: 10, borderWidth: 2, marginHorizontal: 20, borderRadius: 10 }}>
                    <View style={{}}>
                        <View style={{ flexDirection: "row", padding: 10, justifyContent: "flex-end", }}>
                            <TouchableResize
                                hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
                                onPress={toggleIsSignInModalVisibility} >
                                <CrossSvg />
                            </TouchableResize>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20, }}>
                        <Text style={styles.font1}>Please Sign In to Continue.</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                        <TouchableResize onPress={handleSignInPress} style={[globalStyles.Btn, { marginRight: 10, elevation: 2, width: (Constants.SCREEN_WIDTH - 80) / 2, }]}>
                            <Text style={globalStyles.buttonText}>OK</Text>
                        </TouchableResize>
                        <TouchableResize onPress={toggleIsSignInModalVisibility} style={[globalStyles.Btn, { marginLeft: 10, backgroundColor: Colors.WHITE, elevation: 2, width: (Constants.SCREEN_WIDTH - 80) / 2, }]}>
                            <Text style={[globalStyles.buttonText, { color: Colors.BLACK }]}>Cancel</Text>
                        </TouchableResize>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.font2}>Don’t have an account?</Text>
                        <TouchableResize onPress={handleSignUpPress} >
                            <Text style={styles.font3}> Register</Text>
                        </TouchableResize>
                    </View>
                </View>
            </View >
        </Modal >
    )
}

export default SignInModal

const styles = StyleSheet.create({
    font1: {
        fontSize: 18,
        fontFamily: Fonts.BOLD,
        color: Colors.GRAY_DARK
    },

    font2: {
        fontSize: 13,
        fontFamily: Fonts.BOLD,
        color: Colors.GRAY_MEDIUM
    },

    font3: {
        fontSize: 13,
        fontFamily: Fonts.BOLD,
        color: Colors.GRAY_DARK
    },
})
