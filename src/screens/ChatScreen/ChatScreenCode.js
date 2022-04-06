/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { FlatList, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import database from '@react-native-firebase/database'
import { firebase, } from '@react-native-firebase/auth';
import moment from 'moment';
import { connect } from 'react-redux';
import { Colors, Fonts } from '../../global';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { SCREEN_WIDTH } from '../../global/constants';

const ChatScreen = ({ uid, adminUid }) => {
	// console.warn(route.params.uid);
	const emailRef = React.useRef(null);
	const passwordRef = React.useRef(null);
	const password = React.useRef(``);
	const config = {
		apiKey: "AIzaSyCJbAmiViZuZxGsFDTK44U-Cx4ElKY9C_c",
		authDomain: "chatapp-f56c0.firebaseapp.com",
		projectId: "chatapp-f56c0",
		storageBucket: "chatapp-f56c0.appspot.com",
		messagingSenderId: "1037817987119",
		appId: "1:1037817987119:web:bee708e63b6c45614146da",
		measurementId: "G-9BSJVKMJSZ"
	};


	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	} else {
		// console.log("hiii", this.state.currentUserKey)
		console.log("firebase apps already running...")
	}
	let [email, setEmail] = React.useState(null);
	let [Messages, setMessages] = React.useState(null);
	let [Messages1, setMessages1] = React.useState([]);

	React.useEffect(() => {
		database().ref('Message').on('value', messages => {
			if (!messages.exists()) {

			} else {
				database().ref('Message').child(uid).on('value', element => {
					if (!element.exists()) {
						// console.warn(element);
					} else {
						let abc = Object.values(element.val())
						setMessages(abc.sort(function (a, b) {
							return new Date(b.time) - new Date(a.time)
						}))
					}
				})
			}
			// console.warn(elment);

		})
	}, [])

	const addMessage = (uid) => {
		if (email) {
			database().ref('Message').child(uid).push({
				userUid: uid,
				message: email,
				date: moment(Date.now()).format('l'),
				time: Date.now()
			})
			emailRef.current.clear()
			setEmail('');
		}
		return null;
	}

	const sendMessage = () => {
		database().ref('Message').once('value', messages => {
			addMessage(uid)
		})
	}

	const renderItem = React.useCallback(({ item }) => {
		return (
			<>
				<View style={{
					justifyContent:
						item.userUid === uid ? "flex-end" : "flex-start",
					flexDirection: "row",
					marginBottom: 20, marginHorizontal: 20,
					flex: 1,
				}}>
					<Text style={{
						fontSize: 18, backgroundColor: Messages
							&&
							item.userUid === uid ? "#fed64d" : "#00000010",
						// flex: 1,
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						paddingHorizontal: 10,
						paddingVertical: 5,
						maxWidth: (SCREEN_WIDTH / 150) * 100
					}}>
						{
							item.message
						}
					</Text>
					<Text style={{
						fontSize: 13, backgroundColor:
							item.userUid === uid ? "#fed64d" : "#00000010",
						// flex: 1,
						color: "#00000050",
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						paddingRight: 10,
						marginLeft: -0.3,
						paddingTop: 9
						// paddingVertical: 5,
					}}>
						{/* {
						Messages
						&&
						console.warn(Messages.val()[item].message)
					} */}
						{
							moment(item.time).format('LT')
						}
					</Text>
				</View>
			</>
		)
	}, [Messages])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? "padding" : null} style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
			<FocusAwareStatusBar
				barStyle="dark-content"
				backgroundColor={Colors.PRIMARY}
			/>
			<Header name='YouAdMe Chat' activateLeftIcon={true} />
			<View style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.WHITE, paddingTop: 20 }}>
				{
					Messages
					&&
					<FlatList
						data={Messages}
						renderItem={renderItem}
						inverted={true}
					/>
					// Object.keys(Messages.val()).map(e => renderItem(e))
				}
			</View>
			<View style={{ alignItems: "flex-end", justifyContent: "center", flexDirection: "row", backgroundColor: Colors.WHITE }}>

				<TextInput
					autoCapitalize='none'
					textContentType='emailAddress'
					onChangeText={(e) => { setEmail(e); }}
					ref={emailRef}
					keyboardType="email-address"
					placeholderTextColor={Colors.GRAY_DARK}
					placeholder="Message"
					style={styles.TextInput} />
				<TouchableOpacity style={{ height: 46, justifyContent: "center", width: 70 }} onPress={() => { sendMessage() }}>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: Fonts.SIZE_16, color: Colors.PRIMARY }}> SEND</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView >
	);
}
const styles = StyleSheet.create({
	TextInput: {
		borderColor: Colors.BLACK,
		borderRadius: 10,
		flex: 1,
		padding: 5,
		height: 46,
		paddingLeft: 20,
		paddingVertical: 10,
		fontSize: 18,
		color: Colors.BLACK
	},
})
const mapStateToProps = state => ({
	token: state.user.token,
	uid: state.user.uid,
	adminUid: state.user.adminUid
});
let mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
