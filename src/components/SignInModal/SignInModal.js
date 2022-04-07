import React from 'react'
import { FlatList, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ViewData } from '../../DummyData'
import { Colors, Constants, Fonts, ScreenNames } from '../../global'
import { globalStyles } from '../../global/globalStyles'
import CrossSvg from "../../assets/svg/modalCross.svg"
import CustomTextInput from "../../components/CustomTextInput1/CustomTextInput1"
import { useNavigation } from '@react-navigation/native';

const SignInModal = ({ isSignInModalVisible, toggleIsSignInModalVisibility, navigateFrom, navigateTo }) => {

    const navigation = useNavigation();

    const handleSignInPress = () => {
        navigation.navigate(ScreenNames.SIGNIN)
        toggleIsSignInModalVisibility()
    }
    const handleSignUpPress = () => {
        navigation.navigate(ScreenNames.SIGNUP)
        toggleIsSignInModalVisibility()
    }
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isSignInModalVisible}>
            <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: "flex-end", justifyContent: "center", alignItems: "center" }}>
                < View style={{ justifyContent: "flex-end", backgroundColor: Colors.WHITE, padding: 10, marginHorizontal: 20, borderRadius: 10 }}>
                    <View style={{}}>
                        <View style={{ flexDirection: "row", padding: 10, justifyContent: "flex-end", }}>
                            <TouchableOpacity
                                hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
                                onPress={toggleIsSignInModalVisibility} >
                                <CrossSvg />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.font1}>Please Sign In to Continue.</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                        <TouchableOpacity onPress={handleSignInPress} style={[globalStyles.Btn, { marginRight: 10, elevation: 2, width: (Constants.SCREEN_WIDTH - 80) / 2, }]}>
                            <Text style={globalStyles.buttonText}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleIsSignInModalVisibility} style={[globalStyles.Btn, { marginLeft: 10, backgroundColor: Colors.WHITE, elevation: 2, width: (Constants.SCREEN_WIDTH - 80) / 2, }]}>
                            <Text style={[globalStyles.buttonText, { color: Colors.BLACK }]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.font2}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={handleSignUpPress} >
                            <Text style={styles.font3}> Sign Up</Text>
                        </TouchableOpacity>
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
