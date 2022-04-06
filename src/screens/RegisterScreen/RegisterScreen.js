import React from 'react';
import { Keyboard, KeyboardAvoidingView, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './RegisterStyle'
import { ScreenNames } from '../../global/index';
import database from '@react-native-firebase/database'

const RegisterScreen = ({ navigation }) => {

	//Variables

	//States
	const [phoneNumber, setNumber] = React.useState('');
	const [userName, setUserName] = React.useState('');

	//Refs

	//Functions
	const Login = () => {
		if (phoneNumber.length > 9 ) {

			if (userName) {
				database().ref(`users`).once('value', users => {
					if (!users.exists()) {
	
						navigation.navigate(ScreenNames.REGISTER_OTP, { phoneNumber: phoneNumber, userName: userName })
					} else {
	
						// let user = Object.values(users.val())
						let key = Object.keys(users.val())
	
						const isPresent = key.includes(phoneNumber.toString());
	
						console.warn(isPresent);
						// console.warn(user.includes(9271173131"));
	
						if (!isPresent) {
							navigation.navigate(ScreenNames.REGISTER_OTP, { phoneNumber: phoneNumber, userName: userName })
	
						} else {
							Alert.alert("Alert!", 'Already')
						}
	
	
					}
	
	
				});
			} else {
			Alert.alert('Alert!',"Please Enter Your Name")
				
			}
			
		} else {

			Alert.alert('Alert!',"Please Enter Valid Number")
		}

	}

	//UseEffect

	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"} style={{}}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Register
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 }}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={{ flexDirection: "row", marginTop: 40 }}>
						<TextInput
							placeholder="Enter Name"
							onBlur={() => Keyboard.dismiss()}
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => setUserName(text)}
						/>
					</View>

					<View style={{ flexDirection: "row", marginTop: 40 }}>
						<Text style={{ borderRadius: 5, borderWidth: 1, padding: 15, fontFamily: Fonts.MEDIUM, fontSize: 18 }}>
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
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50 }} onPress={Login}>
					<Text style={globalStyles.buttonText}>
						Sign in
					</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					<Text style={{ color: "#16161680" }}>
						Don’t have a account?
					</Text>
					<TouchableOpacity style={{ paddingLeft: 5 }}>
						<Text style={{ color: "#161616" }}>
							Sign up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
};

export default RegisterScreen;