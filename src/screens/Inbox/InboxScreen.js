import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'

//style
import { styles } from './InboxStyle'

//global
import { Colors, Constants, Fonts, ScreenNames } from '../../global'

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import UserItem from '../../components/UserItem/UserItem'
import Header from '../../components/Header/Header'

//svg
import SearchSvg from '../../assets/svg/search';
import MessageSvg from '../../assets/svg/message';

//npm
import database from '@react-native-firebase/database'
import { connect } from 'react-redux'


const InboxScreen = ({ navigation, myUserId, myUserName }) => {

    //state
    const [chatUsers, setChatUsers] = React.useState(null);
    const [search, setSearch] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [Loader, setLoader] = React.useState(false);

    //function
    const goContact = () => navigation?.navigate(ScreenNames.CONTACT)

    const Search = (text) => {
        setSearchText(text)
        let filterData = chatUsers.filter(e => e.Details?.userName.includes(text) || (typeof e.Messages != "undefined" && JSON.parse(e.Messages.messages).length > 0 && JSON.parse(e.Messages.messages).some(message => message.message.includes(text))))
        setSearch(filterData)
    }

    const getChatUsers = () => {

        setLoader(true)
        database().ref(`/UserChat/${myUserId}`).on('value', chatUsers => {
            if (!chatUsers.exists()) {
                setChatUsers([])
            } else {
                let arr = Object.values(chatUsers.val())

                let newArr = arr.sort((a, b) => new Date(b.Details?.updateDate) - new Date(a.Details?.updateDate));

                let newArrays = newArr.filter(e => typeof e.Messages != "undefined" && JSON.parse(e.Messages.messages).length > 0)
                setChatUsers(newArrays);
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
                    <View style={styles.container}></View>
                    <View style={styles.searchInput} >
                        <SearchSvg />
                        <TextInput
                            onChangeText={text => Search(text)}
                            placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
                    </View>
                </View>
                {
                    chatUsers == null ? <ActivityIndicator size={'large'} color={Colors.PRIMARY} /> :
                        <FlatList
                            ListEmptyComponent={listNoChatUsers}
                            data={searchText.length > 0 ? search : chatUsers}
                            keyExtractor={(item, index) => `${JSON.stringify(item)}`}
                            renderItem={_renderItem}
                            contentContainerStyle={{ marginTop: 20, marginHorizontal: 20 }}
                        />
                }
            </View>
        </View >
    )
}

const mapStateToProps = state => ({
    phNo: state.user.phNo,
    myUserId: state.user.userId,
    myUserName: state.user.name,
    isSignedIn: state.user.isSignedIn
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);


