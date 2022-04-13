import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

//global
import { Colors, Constants, Fonts, ScreenNames } from '../../global'

//npm
import database from '@react-native-firebase/database'
import { connect } from 'react-redux'

const ContactItem = ({ userId, userName, myUserName, myUserId, phoneNumber, navigation }) => {

    //function
    const addChatLobby = async () => {

        database().ref(`UserChat/${myUserId}`).once('value', chat => {

            if (!chat.exists()) {
                //new node 
                database().ref(`UserChat/${myUserId}/${userId}/Details`).set({
                    myUserId: myUserId,
                    userId: userId,
                    myUserName: myUserName,
                    userName: userName,
                    createDate: Date.now(),
                    updateDate: Date.now(),
                    isOnline: false,
                    isBlock: false
                })

                database().ref(`UserChat/${userId}/${myUserId}/Details`).set({
                    myUserId: userId,
                    userId: myUserId,
                    myUserName: userName,
                    userName: myUserName,
                    createDate: Date.now(),
                    updateDate: Date.now(),
                    isOnline: false,
                    isBlock: false

                })
                navigation?.navigate(ScreenNames.CHAT, { userId: userId, userName: userName })

            } else {

                let key = Object.keys(chat.val())
                const isPresent = key.includes(userId.toString());


                if (isPresent) {
                    //already exist node
                    navigation?.navigate(ScreenNames.CHAT, { userId: userId, userName: userName })

                } else {
                    //new existing node
                    database().ref(`UserChat/${myUserId}/${userId}/Details`).set({
                        myUserId: myUserId,
                        userId: userId,
                        myUserName: myUserName,
                        userName: userName,
                        createDate: Date.now(),
                        updateDate: Date.now(),
                        isOnline: false,
                        isBlock: false

                    })

                    database().ref(`UserChat/${userId}/${myUserId}/Details`).set({
                        myUserId: userId,
                        userId: myUserId,
                        myUserName: userName,
                        userName: myUserName,
                        createDate: Date.now(),
                        updateDate: Date.now(),
                        isOnline: false,
                        isBlock: false
                    })
                    navigation?.navigate(ScreenNames.CHAT, { userId: userId, userName: userName })

                }
            }
        })


    }

    return (
        <TouchableOpacity onPress={
            () => {
                addChatLobby()

            }
        } >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 2, backgroundColor: Colors.TERTIARY, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontFamily: Fonts.BOLD, alignItems: 'center', fontSize: Fonts.SIZE_16, paddingBottom: 2, }} >{userName?.charAt(0)}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }} >
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16, marginLeft: 20, alignItems: 'center', maxWidth: Constants.SCREEN_WIDTH / 3 }} >{userName}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, marginLeft: 20, maxWidth: Constants.SCREEN_WIDTH / 2 }} >{phoneNumber}</Text>

                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}
const mapStateToProps = state => ({
    phNo: state.user.phNo,
    myUserId: state.user.userId,
    myUserName: state.user.name,
    isSignedIn: state.user.isSignedIn,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
