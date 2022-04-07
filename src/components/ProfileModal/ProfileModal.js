import { CommonActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Modal, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import { Colors, Fonts, ScreenNames } from '../../global'
// import CrossSvg from "../../assets/svg/modalCross.svg"
import MenuFilledSvg from '../../assets/svg/menu/book-bookmark';
import HomeFilledSvg from '../../assets/svg/menu/server-fill';
import ProfileFilledSvg from '../../assets/svg/menu/profile_icon_filled';
import HelpSvg from '../../assets/svg/help';
import AsyncStorage from '@react-native-community/async-storage';
import { globalStyles } from '../../global/globalStyles';
import * as UserAction from '../../redux/actions/userActions'
import { connect } from 'react-redux';

const ProfileModal = ({ visible, toggleModal, userName, phNo, dispatch }) => {

    const [Loader, setLoader] = React.useState(false);

    const navigation = useNavigation();

    const resetStackAndGoHome = CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.BOTTOM_TABS, params: { screen: ScreenNames.HOME } }],
    });
    const resetStackAndGoProfile = CommonActions.reset({
        index: 2,
        routes: [{ name: ScreenNames.BOTTOM_TABS, params: { screen: ScreenNames.PROFILE } }],
    });
    const resetStackAndGoBook = CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.BOTTOM_TABS, params: { screen: ScreenNames.BOOK_LIST } }],
    });


    const goToHome = () =>  navigation.dispatch(resetStackAndGoHome);
    const goToBook = () => navigation.dispatch(resetStackAndGoProfile);
    const goToProfile = () => navigation.dispatch(resetStackAndGoBook);
    const goToHelp = () => Linking.openURL('mailto:libroit2022@gmail.com?subject=Libro IT HelpDesk')



    const Logout = async () => {
        setLoader(true)
        await AsyncStorage.clear()
        navigation.dispatch(resetStackAndGoHome)
        dispatch(UserAction.clearSession())
        setLoader(false)
    }
    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={visible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
            <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center" }}>
                <View style={{ backgroundColor: Colors.WHITE, borderRadius: 40, margin: 60, borderWidth: 2, padding: 20, }}>
                    <TouchableOpacity onPress={toggleModal} style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 30, backgroundColor: Colors.PRIMARY, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_18, color: Colors.BLACK }}>X</Text>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 2, padding: 20, borderRadius: 20, marginVertical: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE, }}>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
                            {userName}
                        </Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_18, color: Colors.GRAY_DARK }}>
                            +91 {phNo}
                        </Text>
                    </View>


                    <TouchableOpacity onPress={goToHome} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, }}>

                        <HomeFilledSvg />
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
                            Home
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToBook} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, }}>

                        <MenuFilledSvg />
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
                            Book
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToProfile} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, }}>

                        <ProfileFilledSvg />
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
                            Profile
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToHelp} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, }}>

                        <HelpSvg />
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
                            Help
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...globalStyles.button, borderWidth: 2, borderRadius: 30, marginVertical: 10, }} onPress={Logout}>
                        {Loader ? <ActivityIndicator color={Colors.BLACK} /> : <Text style={{ ...globalStyles.buttonText }}>
                            Logout
                        </Text>}
                    </TouchableOpacity>


                </View>
            </View>



        </Modal >
    )
}


const mapStateToProps = state => ({
    phNo: state.user.phNo,
    userName: state.user.name,
    bookItems: state.bookmark.bookItems,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);




const styles = StyleSheet.create({
    font1: {
        fontSize: 14,
        fontFamily: Fonts.BOLD,
        color: Colors.GRAY_DARK
    }
})
