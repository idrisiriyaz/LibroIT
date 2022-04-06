import { firebase, } from '@react-native-firebase/auth';
import uuid from 'uuid';
import database from '@react-native-firebase/database'
import { Alert, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
	apiKey: "AIzaSyAhD0rFGX8fZxJmmnf-13y-3-6oCpjW7a0",
	authDomain: "youadme-c3867.firebaseapp.com",
	databaseURL: "https://youadme-c3867.firebaseio.com",
	projectId: "youadme-c3867",
	storageBucket: "youadme-c3867.appspot.com",
	messagingSenderId: "779889908081",
	appId: "1:779889908081:web:edecf6823c991c3bfd3ed0",
	measurementId: "G-0G21576SK5"
};
class FirebaseSvc {
	currentUserEmailId;
	currentUserUid;
	adminUid = '';
	userUid = '';
	constructor(props) {
		if (!firebase.apps.length) {
			firebase.initializeApp(config);
		} else {
		}
	}

	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('uidTest');
			if (value !== null) {
				return value;
			}
		} catch (error) {
			console.log("firebaseSvc Screen", error.message);
		}
	}

	setAdminUid = u => {
		// console.warn(u);
		this.adminUid = u;
	}

	setUid = u => {
		// console.warn(u);
		this.userUid = u;
	}

	updateUid = u => {
		return u;
	}
	updateEmail = e => this.currentUserEmailId = e

	get uid() {
		return this.currentUserUid;
	}
	get ref() {
		return database().ref('Messages')
	}
	get ref1() {
		return database().ref('MobileUser');
	}
	get ref2() {
		return database().ref('MobileUserFriendList');
	}

	parse = snapshot => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
		const { key: id } = snapshot;
		const { key: _id } = snapshot; //needed for giftedchat
		const timestamp = new Date(numberStamp);

		const message = {
			id,
			_id,
			timestamp,
			text,
			user,
		};
		return message;
	};

	refOn = (callback, currentUserUid) => {
		// console.warn(this.adminUid);
		let db = this.ref2;
		let db1 = this.ref1;
		let uid = currentUserUid;
		let userId = '';
		let chatId = '';
		db1.on('value', (data1) => {
			data1.forEach(element => {
				if (uid == element.val().uid)
					userId = element.key;
			}
			);
			db.on('value', (data) => {
				data.forEach(element => {
					if (userId == element.val().userId) {
						chatId = element.key;
					}
				});
				database().ref('Messages').child(chatId)
					.limitToLast(20)
					.on('child_added', snapshot => callback(this.parse(snapshot)))
			})
		})
	}

	get timestamp() {
		var date = new Date();
		return date.toTimeString();
	}
	fire = (flag1, userProfile) => {
		if (flag1 == true) {
			database().ref('MobileUser').push(userProfile);
			return false;
			// break;
		} else {
			return false;
		}
	};


	createFriendList = () => {
		let db = this.ref1;
		let db1 = this.ref2;
		let flag = false;
		let adminUid = this.adminUid;
		db.on('value', (data) => {
			data.forEach(element => {
				if (this.userUid == element.val().uid)
					this.currentUserKey = element.key;
			});
			let friends = {
				friendId: adminUid,
				userId: this.currentUserKey
			}
			db1.on('value', (data) => {
				data.forEach(element => {
					if (element.val().userId === this.currentUserKey) {
						flag = true;
					}
				});
				if (flag == false) {
					database().ref('MobileUserFriendList').push(friends);
				} else {
					return false;
				}
			})
		})
	}

	insert = (uid, name) => {
		let db = this.ref1;
		let flag = false;
		let userProfile = {
			name: name,
			uid: uid,
			avatar: '',
		}
		db.on('value', (data) => {
			let detail = data.val();
			let arr = Object.values(detail)
			arr.map(element => {
				if (element.uid === userProfile.uid) {
					flag = true;
				}
			});
			if (flag == false) {
				database().ref('MobileUser').push(userProfile, this.callback)
				return null;
			} else {
			}
		}
		)
	};

	callback(error) {
		if (error) {
			Alert.alert(error)
		} else {
		}
	}
	// send the message to the Backend
	sendMessage = (email, messages) => {
	}
	send = messages => {
		let testMario;
		for (let i = 0; i < messages.length; i++) {
			let db = this.ref2;
			let db1 = this.ref1;
			let uid = this.userUid;
			let userId = '';
			let chatId = '';
			db1.on('value', (data1) => {

				data1.forEach(element => {

					if (uid == element.val().uid)
						userId = element.key;
				}
				);
				db.on('value', (data) => {
					data.forEach(element => {
						if (userId == element.val().userId) {
							chatId = element.key;
						}
					});
					const { text, user, elementKey } = messages[i];
					const message = {
						text,
						user,
						userId: userId,
					};

					this.ref.child(chatId).push(message);
				})
			})
		}

	};

	refOff() {
		this.ref.off();
	}
}


const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
