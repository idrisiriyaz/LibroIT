import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import database from '@react-native-firebase/database'
import moment from 'moment';
import { connect } from 'react-redux';
import { Colors, Constants, Fonts, GlobalStyles } from '../../global';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from '../../components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import MessageItem from '../../components/MessageItem/MessageItem';
import SendSvg from '../../assets/svg/send';
import CrossSvg from "../../assets/svg/cross"
import firestore from '@react-native-firebase/firestore';


const ChatScreen = ({ myUserName, myUserId, route: { params: { userId, userName } } }) => {

	const navigation = useNavigation()

	const goBack = () => navigation.goBack();

	// console.log("userId", userId, "myUserId", myUserId, "userName", userName);
	//ref
	const flatlistRef = React.useRef(null)

	//state
	const [modalVisible, setModalVisible] = useState(false);
	const [isVisibleAttachmentModal, setVisibilityAttachmentModal] = React.useState(false);
	const [index, setIndex] = React.useState(0);
	const [customToast, setCustomToast] = React.useState(false)
	const [Messages, setMessages] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false)
	const [details, setDetails] = React.useState({});
	const [otherDetails, setOtherDetails] = React.useState({});
	const [userMessage, setUserMessage] = React.useState(null);
	const userMessageRef = React.useRef(null);
	const [isOnline, setIsOnline] = React.useState(false);
	const [replaydata, setReplaydata] = React.useState(null)
	const [blockUser, setBlockUser] = React.useState(false);
	const [loader, setLoader] = React.useState(false);
	const [isAskTypeModalVisible, setAskTypeModalVisible] = React.useState(false);;
	const [blockOtherUser, setOtherBlockUser] = React.useState(false);



	//toggle
	const toggleAttachmentModal = () => setVisibilityAttachmentModal(!isVisibleAttachmentModal)
	const toggleClearChat = () => setModalVisible(!modalVisible)
	const toggleAskImageTypeModal = () => setAskTypeModalVisible(!isAskTypeModalVisible);


	//navigate
	const goProfile = () => navigation.navigate(ScreenNames.PROFILE, { otherUserId: userId })

	//function
	const clearChat = () => {
		let userRef = database().ref(`UserChat/${myUserId}/${userId}/Messages`);
		userRef.remove().then(() => {
			console.log("successfully removed reference")
		})
		toggleClearChat();
	}
	const deleteChat = () => {
		let userRef = database().ref(`UserChat/${myUserId}/${userId}`);
		userRef.remove().then(() => {
			console.log("successfully removed reference")
		})
		toggleClearChat();

		navigation.pop();
		// getChatUsers();
	}
	const getDetails = () => {

		database().ref(`UserChat/${myUserId}/${userId}/Details`).on('value', messages => {
			if (!messages.exists()) {
				console.log("getDetails No details")
			} else {
				setIsOnline(messages.val().isOnline)
				setDetails(messages.val());


			}
		});

	}

	const getOtherDetails = () => {
		database().ref(`UserChat/${userId}/${myUserId}/Details`).on('value', messages => {
			if (!messages.exists()) {
				console.log("getOtherDetails No details")
			} else {

				setOtherDetails(messages.val());
			}
		});

	}

	const getMessages = async () => {
		database().ref(`UserChat/${myUserId}/${userId}/Messages`).on('value', messages => {
			if (!messages.exists()) {
				setMessages([])
			} else {
				let abc = Object.values(messages.val())
				if (JSON.parse(abc).length > 1) {
					setMessages(JSON.parse(abc).sort(function (a, b) {
						return new Date(b.time) - new Date(a.time)
					}));
				} else {
					setMessages(JSON.parse(abc));

				}

			}
		});

	}


	const checkBlock = async () => {


		try {
			try {
				let blockUsers = [];

				firestore()
					.collection('users').doc(`${myUserId}`)
					.get()
					.then(querySnapshot => {

						blockUsers = querySnapshot.data().blockUsers
						let isblockUsers = blockUsers.includes(userId)
						// console.log("my", isblockUsers);
						setBlockUser(isblockUsers)
						// console.log('Total users: ', querySnapshot.data().blockUsers);
					});


			} catch (error) {
				console.warn(error);
			}


			// const response = await Service.checkBlock(myUserId, userId)
			// setBlockUser(response.data)
		} catch (error) {
			console.warn(error);
		}



	}


	const checkOtherBlock = async () => {
		// setIsLoading(true)
		try {
			let blockUsers = [];

			firestore()
				.collection('users').doc(`${userId}`)
				.get()
				.then(querySnapshot => {

					blockUsers = querySnapshot.data().blockUsers
					let isblockUsers = blockUsers.includes(myUserId)
					setOtherBlockUser(isblockUsers)
					// console.log('Total users: ', querySnapshot.data().blockUsers);
				});

		} catch (error) {
			console.warn(error);
		}


		// setIsLoading(false)
	}

	const addBlockUsers = async () => {


		try {

			firestore()
				.doc(`users/${myUserId}`)
				.update({
					blockUsers: firestore.FieldValue.arrayUnion(userId),
				});


			// const response1 = await Service.blockUser(myUserId, userId);
			// navigation.pop(2)


		} catch (error) {
			console.log('ProfileScreen [getUserDataFunc]', error);
		}


	};




	const removeBlockUsers = async () => {
		try {

			firestore()
				.doc(`users/${myUserId}`)
				.update({
					blockUsers: firestore.FieldValue.arrayRemove(userId),
				});


		} catch (error) {
			console.log('ProfileScreen [getUserDataFunc]', error);
		}
	};

	const isOnlineUser = async () => {
		// console.log(`UserChat/${userId}/${myUserId}/Details`);
		database()
			.ref(`UserChat/${userId}/${myUserId}/Details`)
			.update({
				isOnline: true,
			})
			.then(() => console.log('isOnline true updated.'));
	}


	const isOfflineUser = () => {
		database()
			.ref(`UserChat/${userId}/${myUserId}/Details`)
			.update({
				isOnline: false,
			})
			.then(() => console.log('isOnline false updated.'));
	}
	const sendMessage = async () => {
		setReplaydata(null)

		let counter;

		database().ref(`UserChat/Counter/UserMessageCounter`).once('value', messageCounter => {
			if (!messageCounter.exists()) {
				database().ref(`UserChat/Counter/UserMessageCounter`).set({
					counter: 1
				})
				counter = 1
			} else {

				counter = messageCounter.val().counter


			}
			const users = [{
				myUserId: myUserId,
				userId: `${userId}`,
			}, {
				myUserId: `${userId}`,
				userId: myUserId
			}]



			const userDetails = [
				{ ...details, updateDate: Date.now() },
				{ ...otherDetails, updateDate: Date.now() }
			]


			let message = {
				messageId: counter,
				typeofMessage: "CHAT",
				message: userMessage,
				date: moment(Date.now()).format('l'),
				time: Date.now(),
				userSeen: [myUserId],
				senderId: myUserId,
				senderName: myUserName,
			}
			if (replaydata != null) {
				message = { ...message, reply: true, replyMessageDetails: replaydata }
			}


			let updatedMessage = {
				"messages": JSON.stringify([...Messages, message])
			}



			let chatr = {
			}

			for (let index = 0; index < users.length; index++) {
				chatr[`/UserChat/${users[index].myUserId}/${users[index].userId}/Messages`] = updatedMessage
				chatr[`/UserChat/${users[index].myUserId}/${users[index].userId}/Details`] = userDetails[index]
			}

			database().ref().update(chatr);


			counter++

			database()
				.ref(`UserChat/Counter/UserMessageCounter`)
				.update({
					counter: counter,
				})
				.then(() => console.log('Data updated.'))

		})
		userMessageRef.current.clear()

		setUserMessage('');


	}



	const _renderItem = ({ item }) => <MessageItem userName={item.senderName} item={item} myUserId={myUserId} message={Messages} flatlistRef={flatlistRef} setReplaydata={setReplaydata} setCustomToast={setCustomToast} />

	React.useEffect(() => {
		getDetails();
		getOtherDetails();
		getMessages();
		checkOtherBlock();
		checkBlock();
		isOnlineUser()
		return () => isOfflineUser();

	}, [])

	React.useEffect(() => {
		setTimeout(() => {
			if (flatlistRef.current != null) {
				const unSeenCount = Messages.map(e => {
					if (e.userSeen.filter(i => i == myUserId).length > 0) {
						return true
					} else {
						return false
					}
				}
				)
				if (unSeenCount.filter(e => e == false).length > 0) {

					const response = Messages.map(e => {
						if (e.userSeen.filter(e => e == myUserId).length > 0) {
							return e
						} else {
							return { ...e, userSeen: [...e.userSeen, myUserId] }
						}
					})
					const users = [{
						myUserId: myUserId,
						userId: userId,
					}, {
						myUserId: userId,
						userId: myUserId
					}
					]
					let updatedMessage = {
						"messages": JSON.stringify(response)
					}

					let chatr = {
					}

					for (let index = 0; index < users.length; index++) {
						chatr[`/UserChat/${users[index].myUserId}/${users[index].userId}/Messages`] = updatedMessage
					}

					database().ref().update(chatr);
				}
			}

		}, 2000)
	}, [Messages])



	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? "padding" : null} style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />

			<Header title={userName} activateRightIcon={true} />
			<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.MUNSELL, }} >
				<Text style={{ fontSize: 12, paddingBottom: 2, fontFamily: Fonts.BOLD, color: isOnline ? Colors.SECONDARY : Colors.ALERT }} >{isOnline ? "Online" : "Offline"}</Text>
			</View>

			<View style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.WHITE, paddingTop: 20 }}>
				{
					Messages
					&&
					<FlatList
						data={Messages}
						inverted={true}
						ref={flatlistRef}
						keyExtractor={(item, index) => index.toString()}
						renderItem={_renderItem}
						contentContainerStyle={{ marginHorizontal: 20, marginTop: 20, paddingBottom: 20 }}
						showsVerticalScrollIndicator={false}
					/>
					// Object.keys(Messages.val()).map(e => renderItem(e))
				}
			</View>
			{/* <View style={{ alignItems: "flex-end", justifyContent: "center", flexDirection: "row", backgroundColor: Colors.WHITE }}>

				<TextInput
					onChangeText={(e) => setUserMessage(e)}
					ref={userMessageRef}
					placeholderTextColor={Colors.GRAY_DARK}
					placeholder="Message"
					style={styles.TextInput}
					showsVerticalScrollIndicator
				/> */}

			{/* <TouchableOpacity style={{ height: 46, justifyContent: "center", width: 70 }} onPress={sendMessage}>
				<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: Fonts.SIZE_16, color: Colors.PRIMARY }}> SEND</Text>
			</TouchableOpacity> */}
			{
				replaydata &&
				<View style={{
					justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 16,
					padding: 10,
					borderBottomRightRadius: replaydata ? 0 : 16,
					borderBottomLeftRadius: replaydata ? 0 : 16,
					borderWidth: 2,
					borderBottomWidth: 0,
					borderColor: Colors.BLACK,
					marginRight: userMessage ? 80 : 20,

				}}>
					<TouchableOpacity
						onPress={() => {
							setReplaydata(null)
						}}
						style={{ position: "absolute", zIndex: 100, right: 16, top: 16, height: 20, width: 20, backgroundColor: Colors.WHITE + 50, borderRadius: 10, alignItems: "center", justifyContent: "center" }}>
						<CrossSvg />
					</TouchableOpacity>

					<View style={{
						flexDirection: 'row',
						borderLeftColor: Colors.BLACK,
						borderLeftWidth: 4, padding: 4,
						borderColor: Colors.BLACK,
						borderWidth: 1,
						borderRadius: 10,
						backgroundColor: Colors.GRAY_LIGHT,
						justifyContent: "space-between"
					}} >
						<View style={{ justifyContent: "space-between" }}>
							<Text style={{
								color: Colors.BLACK, fontFamily: Fonts.BOLD
							}}>{replaydata.senderId == userId ? "You" : replaydata.senderName}</Text>
							<View style={{ flexDirection: 'row' }}>
								<Text numberOfLines={2} style={{ color: Colors.GRAY_DARK, fontFamily: Fonts.MEDIUM, maxWidth: Constants.SCREEN_WIDTH / 1.4 }} >{replaydata?.message}</Text>
							</View>
						</View>
					</View>
				</View>
			}
			<View style={{ alignItems: "center", justifyContent: 'space-between', flexDirection: "row", backgroundColor: Colors.WHITE, marginHorizontal: 20, marginBottom: 20, }}>

				{/* <View style={{ height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.80 }}></View> */}


				<View style={{
					height: 60, borderTopRightRadius: replaydata ? 0 : 16,
					borderTopLeftRadius: replaydata ? 0 : 16,
					borderTopWidth: replaydata ? 0 : 2,
					flexDirection: 'row',
					paddingHorizontal: 20, flex: 1,
					borderWidth: 2,
					borderRadius: 16,
					backgroundColor: Colors.WHITE,
				}} >
					{/* <SearchSvg /> */}
					{/* <Text style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_16 }}>
							Search
						</Text> */}
					<TextInput
						// autoFocus
						onChangeText={(e) => setUserMessage(e)}
						ref={userMessageRef}
						placeholderTextColor={Colors.GRAY_DARK}
						placeholder="Message"
						style={styles.TextInput}
						showsVerticalScrollIndicator
					/>

				</View>


				{
					userMessage ?
						<TouchableOpacity style={{ marginLeft: 10, }} onPress={removeBlockUsers}>
							<View style={{ height: 50, width: 50, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.TERTIARY, justifyContent: 'center', alignItems: 'center' }}>


								<SendSvg />

							</View>
						</TouchableOpacity> : null
				}

			</View>
			{/* </View> */}
		</KeyboardAvoidingView >
	);
}
const styles = StyleSheet.create({
	TextInput: {
		flex: 1,
		fontSize: 18,
		fontFamily: Fonts.MEDIUM,
		color: Colors.BLACK
	},
})
const mapStateToProps = state => ({
	phNo: state.user.phNo,
	myUserId: state.user.userId,
	myUserName: state.user.name,
	isSignedIn: state.user.isSignedIn,
	bookItems: state.bookmark.bookItems,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);


