import React from 'react';
import { Keyboard, KeyboardAvoidingView, Alert, ScrollView, Text, TextInput, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Constants } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './RegisterStyle'
import { ScreenNames } from '../../global/index';
import database from '@react-native-firebase/database'
import { StackActions } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const RegisterScreen = ({ navigation }) => {

	//Variables

	//States
	const [phoneNumber, setNumber] = React.useState('');
	const [userName, setUserName] = React.useState('');
	const [verifyUserName, setVerifyUserName] = React.useState(false);
	const [Loader, setLoader] = React.useState(false)
	const [checkUser, setCheckUser] = React.useState(false);

	//Refs

	//Functions

	// async function checkUserName(userName) {



	// 	await firestore()
	// 		.collection('users')
	// 		.get().then(documentSnapshot => {
	// 			documentSnapshot.forEach(snapshot => {


	// 				const user = snapshot.data()
	// 				// console.warn(typeof user.userName);
	// 				// console.warn(typuserName);
	// 				// console.warn(user.userName === userName);

	// 				if (user.userName === userName) {



	// 					Alert.alert("Alert!", 'Already UserName')
	// 				} else {

	// 				}


	// 			})
	// 		}
	// 		)

	// }


	const Register = async () => {
		setLoader(true)

		if (checkUser) {
			Alert.alert('Alert!', "Please Enter Valid UserName")

		} else {


			let isUserAvail;
			await firestore()
				.collection('users')
				// Filter results
				.where('userName', '==', userName)
				.get()
				.then(querySnapshot => {


					isUserAvail = querySnapshot.size;
					// return 
					/* ... */
				});

			if (isUserAvail === 1) {

				Alert.alert("Alert!", 'Already UserName');

			} else {

				if (phoneNumber.length > 9) {

					if (userName) {

						firestore()
							.collection('users')
							.doc(`${phoneNumber}`)
							.get()
							.then(documentSnapshot => {
								console.log('User exists: ', documentSnapshot.exists);

								if (documentSnapshot.exists) {
									console.log('User data: ', documentSnapshot.data());

									Alert.alert("Alert!", 'Already Number')
								} else {


									navigation.navigate(ScreenNames.REGISTER_OTP, { phoneNumber: phoneNumber, userName: userName })
								}
							});

					} else {
						Alert.alert('Alert!', "Please Enter Your UserName")

					}

				} else {

					Alert.alert('Alert!', "Please Enter Valid Number")
				}


			}


		}

		setLoader(false)


	}
	const LoginPage = () => navigation.navigate(ScreenNames.LOGIN)

	const onUsernameChange = (t) => {
		setUserName(t)
		if (Constants.isValidUser(t).valid) {
			// usernameRef?.current?.showHelperText(Constants.isValidUser(t).message);
			setCheckUser(false);
			return;
		} {
			setCheckUser(true);

		}
	};
	//UseEffect

	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Register
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 }}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={{ marginTop: 40, height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderColor: checkUser ? Colors.ALERT : Colors.BLACK, borderRadius: 20, backgroundColor: Colors.WHITE, }}>
						<TextInput
							placeholder="Enter Name"
							maxLength={20}
							onBlur={() => Keyboard.dismiss()}
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => onUsernameChange(text)}
						/>
					</View>

					{userName ? checkUser &&
						<Text style={{ fontFamily: Fonts.MEDIUM, color: Colors.ALERT }}>
							Please don't enter any special charecter and space except dot(.) and underscore( _ )
						</Text> : null
					}

					<View style={{ marginVertical: 40, height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 20, backgroundColor: Colors.WHITE, }}>
						<Text style={{ fontFamily: Fonts.BOLD, fontSize: 18 }}>
							+91
						</Text>
						<TextInput
							placeholder="Enter Number"
							maxLength={10}
							onBlur={() => Keyboard.dismiss()}
							keyboardType="phone-pad"
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => setNumber(text)}
						/>
					</View>
				</View>

				<View >
					<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50, borderWidth: 2, }} onPress={Register}>
						{Loader ? <ActivityIndicator color={Colors.BLACK} /> : <Text style={globalStyles.buttonText}>
							Register
						</Text>}
					</TouchableOpacity>
					<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
						<Text style={{ color: "#16161680", fontFamily: Fonts.BOLD }}>
							Log into existing account?
						</Text>
						<TouchableOpacity onPress={LoginPage} style={{ paddingLeft: 5 }}>
							<Text style={{
								color: "#161616", fontFamily: Fonts.BOLD,
								color: Fonts.BLACK,
							}}>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

		</KeyboardAvoidingView>
	)
};

export default RegisterScreen;