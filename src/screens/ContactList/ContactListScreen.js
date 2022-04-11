import { View, Text, TextInput, FlatList, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './ContactStyle'
import { Colors, Constants, Fonts } from '../../global'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Header from '../../components/Header/Header'
import SearchSvg from '../../assets/svg/search';
import { connect } from 'react-redux'
import Contacts from 'react-native-contacts';
import firestore from '@react-native-firebase/firestore';
import ContactItem from '../../components/ContactItem/ContactItem'
import { openSettings } from 'react-native-permissions';


const ContactListScreen = ({ navigation, phNo }) => {

    // console.warn(typeof phNo);


    const [contactUsers, setContactUsers] = React.useState(null);

    const [search, setSearch] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [Loader, setLoader] = React.useState(false);


    const Search = (text) => {
        setSearchText(text)
        let filterData = contactUsers.filter(e => e?.userName.includes(text) || (e?.phoneNumber.includes(text)))
        setSearch(filterData)
    }


    const listNoChatUsers = () => {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.searchText}>No Users</Text>
        </View>)

    }



    const _renderItem = ({ item }) => <ContactItem navigation={navigation} phoneNumber={item?.phoneNumber} userName={item?.userName} userId={item?.userId} />



    const getContactList = async () => {

        Contacts.getAll().then(async (contacts) => {

            setLoader(true)
            const contactList = contacts.map(e => e.phoneNumbers);
            const phoneNumbers = contactList.map(e => e[0]);
            const filterPhone = phoneNumbers.filter(e => typeof e?.number != 'undefined');
            const phone = filterPhone.map(e => e.number.replace(/\D/g, '').slice(-10));
            const mobileNumber = phone.filter(e => e != phNo);

            // console.warn(mobileNumber);
            const userPhoneNumberByContact = [...new Set(mobileNumber)]

            await firestore()
                .collection('users')
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.empty) {
                        setContactUsers([]);

                    } else {

                        const users = [];
                        querySnapshot.forEach(documentSnapshot => {
                            users.push({
                                ...documentSnapshot.data(),
                                key: documentSnapshot.id,
                            });
                        })
                        if (users) {


                            const intersection = users.filter(element => userPhoneNumberByContact.includes(element?.phoneNumber));
                            setContactUsers(intersection);

                        }
                    }



                })
            setLoader(false)


        }).catch((e) => {
            console.log(e)
        })
    }


    const checkStoragePermission = async () => {
        setLoader(true)
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]);

        if (granted['android.permission.READ_CONTACTS'] !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                "Alert",
                "Please Allow Contact permission from Settings to continue",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { text: "Open Setting", onPress: () => { openSettings() } }
                ]
            );
        } else {
            getContactList()
        }

        setLoader(false)

    }
    React.useEffect(() => {


        checkStoragePermission()

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>

            <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
            <Header title={"Contact"} />
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
                {
                    contactUsers == null ? <ActivityIndicator color={Colors.PRIMARY} size={'large'} /> :
                        <FlatList
                            ListEmptyComponent={listNoChatUsers}
                            data={searchText.length > 0 ? search : contactUsers}
                            keyExtractor={(item) => `${JSON.stringify(item)}`}
                            renderItem={_renderItem}
                            contentContainerStyle={{ marginTop: 20, marginHorizontal: 20 }}
                        />
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen);


