import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Alert } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './LoginStyle'
import { ScreenNames } from '../../global/index';
import database from '@react-native-firebase/database'


const LoginScreen = ({ navigation }) => {

	//Variables

	//States
	const [number, setNumber] = React.useState(0)
	const [Loader, setLoader] = React.useState(false)

	//Refs

	//Functions
	const Login = () => {


		setLoader(true)

		if (number.length > 9) {


			database().ref(`users`).once('value', users => {
				if (!users.exists()) {

					navigation.navigate(ScreenNames.REGISTER)

				} else {

					// let user = Object.values(users.val())
					let key = Object.keys(users.val())

					const isPresent = key.includes(number.toString());

					console.warn(isPresent);
					// console.warn(user.includes(9271173131"));

					if (isPresent) {
						navigation.navigate(ScreenNames.OTP, { number: number })


					} else {
						navigation.navigate(ScreenNames.REGISTER)

					}


				}


			});


		} else {

			Alert.alert('Alert!', "Please Enter Valid Number")
		}
		setLoader(false)

	}





	const Register = () => {
		navigation.navigate(ScreenNames.REGISTER)
	}

	//UseEffect

	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"} style={{}}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Login
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 }}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={{ flexDirection: "row", marginTop: 40 }}>
						<Text style={{ borderRadius: 5, borderWidth: 1, padding: 15, fontFamily: Fonts.MEDIUM, fontSize: 18 }}>
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
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50 }} onPress={Login}>
					{
						Loader ? <ActivityIndicator color={Colors.ALERT} /> : <Text style={globalStyles.buttonText}>
							Sign in
						</Text>
					}
				</TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					<Text style={{ color: "#16161680" }}>
						Don’t have a account?
					</Text>
					<TouchableOpacity onPress={Register} style={{ paddingLeft: 5 }}>
						<Text style={{ color: "#161616" }}>
							Sign up
						</Text>

					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
};

export default LoginScreen;