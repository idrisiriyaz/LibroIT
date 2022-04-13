import { View, Text, TextInput, FlatList, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native'
import React from 'react'

//style
import { styles } from './ContactStyle'

//global
import { Colors, Constants, Fonts } from '../../global'

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import ContactItem from '../../components/ContactItem/ContactItem'
import Header from '../../components/Header/Header'

//svg
import SearchSvg from '../../assets/svg/search';

//npm
import firestore from '@react-native-firebase/firestore';
import { openSettings } from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux'


const ContactListScreen = ({ navigation, phNo }) => {

    //state
    const [contactUsers, setContactUsers] = React.useState(null);
    const [search, setSearch] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [Loader, setLoader] = React.useState(false);


    //function
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


                            const intersection = users.filter(element => userPhoneNumberByContact.includes(element?.phoneNumber.toString()));
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

                    <View style={styles.container}></View>

                    <View style={styles.searchInput} >
                        <SearchSvg />
                        <TextInput
                            onChangeText={text => Search(text)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen);


