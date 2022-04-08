import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './InboxStyle'
import { Colors, Constants, Fonts, ScreenNames } from '../../global'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Header from '../../components/Header/Header'
import SearchSvg from '../../assets/svg/search';
import MessageSvg from '../../assets/svg/message';
import database from '@react-native-firebase/database'
import { connect } from 'react-redux'
import UserItem from '../../components/UserItem/UserItem'



const InboxScreen = ({ navigation, myUserId, myUserName }) => {




    const [chatUsers, setChatUsers] = React.useState([]);

    const [search, setSearch] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [Loader, setLoader] = React.useState(false);
    const [requestMsgCount, setRequestMsgCount] = React.useState(0);
    // const myUserId = 9702586589;
    const userId = 9702586589;
    // const myUserName = 9702586589;
    const userName = "riyaz";



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
    const goContact = () => navigation?.navigate(ScreenNames.CONTACT)

    const Search = (text) => {
        setSearchText(text)
        let filterData = chatUsers.filter(e => e.Details?.userName.includes(text) || (typeof e.Messages != "undefined" && JSON.parse(e.Messages.messages).length > 0 && JSON.parse(e.Messages.messages).some(message => message.message.includes(text))))
        setSearch(filterData)
    }

    const getChatUsers = () => {

        setLoader(true)
        // console.warn(myUserId)
        database().ref(`/UserChat/${myUserId}`).once('value', chatUsers => {
            if (!chatUsers.exists()) {
                setChatUsers([])
            } else {
                let arr = Object.values(chatUsers.val())

                let newArr = arr.sort((a, b) => new Date(b.Details?.updateDate) - new Date(a.Details?.updateDate));

                // let newArrays = newArr.filter(e => typeof e.Messages != "undefined" && JSON.parse(e.Messages.messages).length > 0)
                setChatUsers(newArr);

                console.log(newArr);

            }
        });

        setLoader(false)
    }
    const listNoChatUsers = () => {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.searchText}>No Users</Text>
        </View>)

    }



    const _renderItem = ({ item, index }) => <UserItem getChatUsers={getChatUsers} messages={item.Messages} item={item.Details} navigation={navigation} myUserId={item?.Details?.myUserId} userName={item?.Details?.userName} userId={item?.Details?.userId} />

    React.useEffect(() => {
        getChatUsers()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header title={"Inbox"} activateRightIcon rightIconPress={goContact} rightIcon={<MessageSvg />} />
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }} >


                <View style={{ margin: 20 }}>

                    <View style={{ height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.90 }}></View>

                    <View style={{ height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 40, backgroundColor: Colors.WHITE, position: 'absolute', width: Constants.SCREEN_WIDTH * 0.90 }} >
                        <SearchSvg />
                        <TextInput
                            // autoFocus
                            onChangeText={text => Search(text)}
                            // onFocus={goToList}
                            placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
                    </View>
                </View>

                <FlatList
                    ListEmptyComponent={listNoChatUsers}
                    data={searchText.length > 0 ? search : chatUsers}
                    keyExtractor={(item, index) => `${JSON.stringify(item)}`}
                    renderItem={_renderItem}
                    contentContainerStyle={{ marginTop: 20, marginHorizontal: 20 }}
                />
            </View>

            {/* <View style={{ justifyContent: 'center', position: 'absolute', backgroundColor: Colors.PRIMARY, borderWidth: 2, bottom: 40, left: Constants.SCREEN_WIDTH / 1.2, height: 50, width: 50, alignItems: 'center', borderRadius: 50 }}>
                <Text>hhh</Text>
            </View> */}
        </View >
    )
}

const mapStateToProps = state => ({
    phNo: state.user.phNo,
    myUserId: state.user.userId,
    myUserName: state.user.name,
    isSignedIn: state.user.isSignedIn,
    bookItems: state.bookmark.bookItems,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);


