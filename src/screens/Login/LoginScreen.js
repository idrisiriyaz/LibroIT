import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Alert } from 'react-native';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

//global
import { Colors, Fonts, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';

//style
import { styles } from './LoginStyle'

//npm
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({ navigation }) => {



	//state
	const [number, setNumber] = React.useState(0)
	const [Loader, setLoader] = React.useState(false)

	//function
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

		} else {

			Alert.alert('Alert!', "Please Enter Valid Number")
		}
		setLoader(false)

	}

	const Register = () => {
		navigation.navigate(ScreenNames.REGISTER)
	}


	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />

			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Welcome {'\n'}Login
					</Text>
					<Text style={styles.font1}>
						Enter Your Phone Number and we will send SMS with confirmation code to your number
					</Text>
					<View style={styles.code}>
						<Text style={styles.codeText}>
							+91
						</Text>
						<TextInput
							placeholder="Enter number"
							maxLength={10}
							onBlur={() => Keyboard.dismiss()}
							keyboardType="phone-pad"
							style={{ ...styles.textinput, flex: 1 }}
							placeholderTextColor={Fonts.BLACK}
							onChangeText={text => {
								setNumber(text)
								if (text.length == 10) {
									Keyboard.dismiss();
								}
							}
							}
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