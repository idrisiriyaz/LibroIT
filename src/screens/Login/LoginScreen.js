import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Alert } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, Constants } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './LoginStyle'
import { ScreenNames } from '../../global/index';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';



const LoginScreen = ({ navigation }) => {

	//Variables

	//States
	const [number, setNumber] = React.useState(0)
	const [Loader, setLoader] = React.useState(false)

	//Refs

	//Functions
	const Login = async () => {


		setLoader(true)

		if (number.length > 9) {


			await firestore()
				.collection('users')
				.doc(`${number}`)
				.get()
				.then(documentSnapshot => {
					console.log('User exists: ', documentSnapshot.exists);

					if (documentSnapshot.exists) {
						console.log('User data: ', documentSnapshot.data());
						navigation.navigate(ScreenNames.OTP, { number: number })
					} else {
						Alert.alert('Alert!', "Invalid User Please Register",
							[
								{
									text: "Cancel",
									style: "cancel"
								},
								{ text: "Register", onPress: () => { navigation.navigate(ScreenNames.REGISTER) } }
							])
					}
				});

			// await database().ref(`users`).once('value', users => {
			// 	if (!users.exists()) {

			// 		navigation.navigate(ScreenNames.REGISTER)

			// 	} else {

			// 		// let user = Object.values(users.val())
			// 		let key = Object.keys(users.val())

			// 		const isPresent = key.includes(number.toString());

			// 		// console.warn(isPresent);
			// 		// console.warn(user.includes(9271173131"));

			// 		if (isPresent) {
			// 			navigation.navigate(ScreenNames.OTP, { number: number })


			// 		} else {
			// 			navigation.navigate(ScreenNames.REGISTER)

			// 		}


			// 	}


			// });


		} else {

			Alert.alert('Alert!', "Please Enter Valid Number")
		}
		setLoader(false)

	}





	const Register = () => {
		navigation.navigate(ScreenNames.REGISTER)
	}

	//UseEffect
	React.useEffect(() => {

		// const usersCollection = firestore().collection('users');

		// console.warn(usersCollection.doc().get());

		// firestore()
		// 	.collection('users').doc("9702586589")
		// 	.get()
		// 	.then(querySnapshot => {
		// 		console.log('Total users: ', querySnapshot.data());
		// 	});

		// firestore()
		// 	.collection('users').doc("9702586589").set({
		// 		size: "ssss"
		// 	})

	}, [])

	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />

			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Login
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 }}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={{ flexDirection: "row", marginVertical: 40, height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 20, backgroundColor: Colors.WHITE, }}>
						<Text style={{
							fontFamily: Fonts.BOLD,
							color: Fonts.BLACK,
							fontSize: 18,

						}}>
							+91
						</Text>
						<TextInput
							placeholder="Enter number"
							maxLength={10}
							onBlur={() => Keyboard.dismiss()}
							keyboardType="phone-pad"
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => setNumber(text)}
						/>
					</View>
				</View>

				<View style={{ flex: 1 }}>
					<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50, borderWidth: 2, }} onPress={Login}>
						{
							Loader ? <ActivityIndicator color={Colors.BLACK} /> : <Text style={globalStyles.buttonText}>
								Login
							</Text>
						}
					</TouchableOpacity>
					<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
						<Text style={{ color: "#16161680", fontFamily: Fonts.BOLD }}>
							Don’t have a account?
						</Text>
						<TouchableOpacity onPress={Register} style={{ paddingLeft: 5 }}>
							<Text style={{
								color: "#161616", fontFamily: Fonts.BOLD,
								color: Fonts.BLACK,
							}}>
								Register
							</Text>

						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView >
	)
};

export default LoginScreen;