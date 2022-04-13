import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

//global
import { Colors, Constants, Fonts, ScreenNames } from '../../global'

const UserItem = ({ userId, userName, myUserId, navigation, messages }) => {

    //state
    const [Messages, setMessages] = React.useState([]);
    const [unSeenCount, setUnSeenCount] = React.useState(0);

    //function
    const goChatLobby = () => navigation?.navigate(ScreenNames.CHAT, { userId: userId, userName: userName })

    const getMassageCount = () => {
        if (typeof messages != "undefined") {

            let obj1 = JSON.parse(messages.messages).sort(function (a, b) {
                return new Date(b.time) - new Date(a.time)
            })

            let obj2 = { ...obj1[0] }

            setMessages(obj2)


            const unSeenCount = JSON.parse(messages.messages).map(e => {
                if (e.userSeen.filter(i => i == myUserId).length > 0) {
                    return true
                } else {
                    return false
                }
            }
            )
            setUnSeenCount(unSeenCount.filter(e => e == false).length)
        }
    }

    React.useEffect(() => {
        getMassageCount();
    }, []);
    return (
        <TouchableOpacity onPress={
            () => {
                goChatLobby()
            }
        } >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ height: 40, width: 40, borderRadius: 40, borderWidth: 2, backgroundColor: Colors.TERTIARY, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontFamily: Fonts.BOLD, alignItems: 'center', fontSize: Fonts.SIZE_16, paddingBottom: 2, }} >{userName.charAt(0)}</Text>
                    </View>

                    <View style={{ justifyContent: 'center' }} >
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16, marginLeft: 20, alignItems: 'center', maxWidth: Constants.SCREEN_WIDTH / 3 }} >{userName}</Text>
                        <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, marginLeft: 20, maxWidth: Constants.SCREEN_WIDTH / 2 }} >{Messages?.message}</Text>

                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    {
                        Messages ?
                            <Text style={{ color: Colors.GRAY_MEDIUM, fontSize: 12, marginBottom: 6, fontFamily: Fonts.MEDIUM, marginTop: 4 }}>
                                {Messages.date}
                            </Text>
                            : null
                    }

                    {
                        unSeenCount ?
                            <View style={{
                                backgroundColor: Colors.SECONDARY, paddingHorizontal: 4, height: 20,
                                borderWidth: 1,
                                width: 20,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 20,
                            }}>
                                <Text style={{ color: Colors.WHITE, fontFamily: Fonts.MEDIUM, fontSize: 10 }} >{unSeenCount}</Text>
                            </View>
                            : null
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserItem