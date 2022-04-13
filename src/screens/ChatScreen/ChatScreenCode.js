import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';

//npm
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database'
import moment from 'moment';
import { connect } from 'react-redux';

//global
import { Colors, Constants, Fonts } from '../../global';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import TouchableResize from '../../components/util/TouchableResize';
import CustomToast from '../../components/CustomToast/CustomToast';
import MessageItem from '../../components/MessageItem/MessageItem';
import ModalMenu from '../../components/util/ModalMenu';
import Header from '../../components/Header/Header';

//svg
import SendSvg from '../../assets/svg/send';
import CrossSvg from "../../assets/svg/cross";

//style
import { styles } from './ChatStyle';



const ChatScreen = ({ myUserName, myUserId, route: { params: { userId, userName } } }) => {

	//ref
	const flatlistRef = React.useRef(null)

	//state
	const [modalVisible, setModalVisible] = useState(false);
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
	const [blockOtherUser, setOtherBlockUser] = React.useState(false);

	//toggle
	const toggleClearChat = () => setModalVisible(!modalVisible)

	//function
	const clearChat = () => {


		let userRef = database().ref(`UserChat/${myUserId}/${userId}/Messages`);
		userRef.remove().then(() => {
			console.log("successfully removed reference")
		})
		toggleClearChat();
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
		setIsLoading(true)

		try {
			try {
				let blockUsers = [];

				await firestore()
					.collection('users').doc(`${myUserId}`)
					.get()
					.then(querySnapshot => {

						blockUsers = querySnapshot.data().blockUsers
						let isblockUsers = blockUsers.includes(userId)
						setBlockUser(isblockUsers)

					});


			} catch (error) {
				console.warn(error);
			}


			setIsLoading(false)
		} catch (error) {
			console.warn(error);
		}



	}


	const checkOtherBlock = async () => {


		setIsLoading(true)
		try {
			let blockUsers = [];

			await firestore()
				.collection('users').doc(`${userId}`)
				.get()
				.then(querySnapshot => {

					blockUsers = querySnapshot.data().blockUsers
					let isblockUsers = blockUsers.includes(myUserId)
					setOtherBlockUser(isblockUsers)
				});

		} catch (error) {
			console.warn(error);
		}


		setIsLoading(false)
	}

	const addBlockUsers = async () => {

		setIsLoading(true)
		try {

			await firestore()
				.doc(`users/${myUserId}`)
				.update({
					blockUsers: firestore.FieldValue.arrayUnion(userId),
				});
			checkBlock()
			checkOtherBlock()
			setModalVisible(false);

		} catch (error) {
			console.log('ProfileScreen [getUserDataFunc]', error);
		}

		setIsLoading(false)

	};


	const removeBlockUsers = async () => {

		setIsLoading(true)
		try {

			await firestore()
				.doc(`users/${myUserId}`)
				.update({
					blockUsers: firestore.FieldValue.arrayRemove(userId),
				});

			checkBlock()
			checkOtherBlock()
			setModalVisible(false);

		} catch (error) {
			console.log('ProfileScreen [getUserDataFunc]', error);
		}
		setIsLoading(false)
	};

	const isOnlineUser = async () => {
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
				isHide: false,
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

	const seenMessage = () => {

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
	}


	const _renderItem = ({ item }) => <MessageItem otherDetails={otherDetails} details={details} userName={item.senderName} item={item} myUserId={myUserId} userId={userId} message={Messages} flatlistRef={flatlistRef} setReplaydata={setReplaydata} setCustomToast={setCustomToast} />

	React.useEffect(() => {
		getDetails();
		getOtherDetails();
		getMessages();
		checkOtherBlock();
		checkBlock();
		isOnlineUser();

		return () => isOfflineUser();

	}, [])

	React.useEffect(() => {
		seenMessage()
	}, [Messages])



	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.conatainer}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header title={userName} activateRightIcon={true} rightIconPress={toggleClearChat} />
			{isLoading ? <ActivityIndicator size={'large'} color={Colors.PRIMARY} /> : blockOtherUser || blockUser ?
				<View style={styles.blockCon}>
					{blockUser ?
						<View>
							<Text style={[styles.acceptText, { alignSelf: "center" }]} >You have blocked {userName}</Text>
							<Text style={[styles.acceptText, { alignSelf: "center" }]} >You can't chat with {userName}</Text>
							<TouchableResize onPress={removeBlockUsers} style={[styles.acception]}>
								<Text style={[styles.acceptText, { alignSelf: "center" }]} >Unblock</Text>
							</TouchableResize>
						</View>

						: <Text style={[styles.acceptText, { alignSelf: "center" }]} >You're Blocked</Text>}

				</View>
				:
				<>
					<View style={styles.chatCon} >
						<Text style={{ fontSize: 12, paddingBottom: 2, fontFamily: Fonts.BOLD, color: isOnline ? Colors.SECONDARY : Colors.ALERT }} >{isOnline ? "Online" : "Offline"}</Text>
					</View>
					<View style={styles.messageCon}>
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
						}
					</View>

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
								style={styles.cross}>
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
									}}>{replaydata.senderId == myUserId ? "You" : replaydata.senderName}</Text>
									<View style={{ flexDirection: 'row' }}>
										<Text numberOfLines={2} style={styles.replyMessage} >{replaydata?.message}</Text>
									</View>
								</View>
							</View>
						</View>
					}
					<View style={styles.replyCon} >

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
								<TouchableOpacity style={{ marginLeft: 10, }} onPress={sendMessage}>
									<View style={styles.send}>

										<SendSvg />

									</View>
								</TouchableOpacity> : null
						}

					</View>
				</>}

			<ModalMenu
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}>
				{blockOtherUser ? null : <TouchableResize style={{ margin: 6 }}
					onPress={clearChat} >
					<Text style={{ fontFamily: Fonts.BOLD, color: Colors.ALERT, paddingBottom: 2, }} >Delete Chat</Text>
				</TouchableResize>}
				<TouchableResize style={{ margin: 6 }}
					onPress={() => {
						if (blockUser) {
							removeBlockUsers();
						} else {
							addBlockUsers();
						}
					}} >
					{isLoading ? <ActivityIndicator color={Colors.SECONDARY} size='small' /> : <Text style={{ fontFamily: Fonts.BOLD, paddingBottom: 2, }} >{blockUser ? "Unblock" : "Block"} User</Text>}
				</TouchableResize>

			</ModalMenu>
			<CustomToast
				isToastMsgVisible={customToast}
				toastMsg={"Message Copied!"}
				setCustomToast={setCustomToast}
				top={Constants.SCREEN_HEIGHT - 300}
			/>
		</KeyboardAvoidingView >
	);
}

const mapStateToProps = state => ({
	phNo: state.user.phNo,
	myUserId: state.user.userId,
	myUserName: state.user.name,
	isSignedIn: state.user.isSignedIn,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);


