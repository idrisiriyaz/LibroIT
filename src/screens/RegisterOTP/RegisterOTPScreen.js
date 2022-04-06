import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, Alert, TextInput, TouchableOpacity, View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { Colors, Fonts, ScreenNames } from '../../global';
import OTPTextInput from 'react-native-otp-textinput';
import { globalStyles } from '../../global/globalStyles';
import { styles } from './RegisterOTPStyles'
import { connect } from 'react-redux';
import * as UserAction from '../../redux/actions/userActions'
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';
// import { ALERT } from '../../global/colors';
;
const RegisterOTPScreen = ({ navigation, route: { params: { phoneNumber, userName } }, params, dispatch }, props) => {

	//Variables
	const user = {
		userId: 1,
		userName: "Dummy User",
		// phone: route.params.phone
	}

	//States
	const otpInput = React.useRef(null);
	const [code, setCode] = React.useState('023405');
	const [minutes, setMinutes] = React.useState(1);
	const [timerValue, setTimerValue] = React.useState(30);
	const [resend, setResend] = React.useState(false);

	//useRef
	const timerRef = React.useRef();


	const register = async () => {
		database().ref(`users`).once('value', users => {
			if (!users.exists()) {
				database().ref(`users/${phoneNumber}`).set({
					userName: userName,
					phoneNumber: phoneNumber,
				})

				dispatch(UserAction.setName(userName));
				dispatch(UserAction.setPhone(phoneNumber));
				dispatch(UserAction.setSignedIn(true));
				navigation.replace(ScreenNames.BOTTOM_TABS)

			} else {

				// let user = Object.values(users.val())
				let key = Object.keys(users.val())

				const isPresent = key.includes(phoneNumber.toString());

				console.warn(isPresent);
				// console.warn(user.includes(9271173131"));

				if (!isPresent) {
					database().ref(`users/${phoneNumber}`).set({
						userName: userName,
						phoneNumber: phoneNumber,
					})
				}
			}

			dispatch(UserAction.setName(userName));
			dispatch(UserAction.setPhone(phoneNumber));
			dispatch(UserAction.setSignedIn(true));
			navigation.replace(ScreenNames.BOTTOM_TABS)
		});
		await AsyncStorage.setItem('phoneNumber', phoneNumber.toString());

	}


	const [confirm, setConfirm] = useState(null);

	// const [code, setCode] = useState('');

	// Handle the button press
	async function signInWithPhoneNumber(phoneNumber) {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
	}

	async function confirmCode() {
		try {
			await confirm.confirm(code);
			register();
		} catch (error) {

			Alert.alert('Alert!', 'Invalid code.')
			// console.log('Invalid code.');
		}
	}

	// if (!confirm) {
	// 	return (
	// 		<Button
	// 			title="Phone Number Sign In"
	// 			onPress={() => signInWithPhoneNumber('+911234567890')}
	// 		/>
	// 	);
	// }
	//Functions
	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimerValue(prevTimerValue => prevTimerValue - 1);
		}, 1000);
	};

	const resendOtp = () => {
		setMinutes(1)
		setTimerValue(30)
		startTimer()
		setResend(false)
		signInWithPhoneNumber(`+91${phoneNumber}`);
		return () => {
			clearInterval(timerRef.current);
		};
	}

	const verifyOtp = async () => {
		if (code === "123456") {
			dispatch(UserAction.setUserId(user.userId));
			dispatch(UserAction.setAnniversaryDate(user.anniversaryDate));
			dispatch(UserAction.setDob(user.dob));
			dispatch(UserAction.setEmail(user.email));
			dispatch(UserAction.setName(user.userName));
			dispatch(UserAction.setPhone(user.phone));
			dispatch(UserAction.setSignedIn(true));
			navigation.replace(ScreenNames.BOTTOM_TABS)
			await AsyncStorage.setItem('userId', user.userId.toString());
		} else {
			alert("aokndwo")
		}
	}

	//UseEffect
	React.useEffect(() => {
		signInWithPhoneNumber(`+91${phoneNumber}`);
		startTimer()
		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	React.useEffect(() => {
		if (timerValue === 0) {
			if (minutes > 0) {
				setTimerValue(59)
				setMinutes(0)
			} else {
				setResend(true)
				clearInterval(timerRef.current);
			}
		}
	}, [timerValue]);


	//UI
	return (

		<KeyboardAvoidingView behavior={Platform.OS == "android" ? null : "padding"} style={styles.mainScreen}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<ScrollView keyboardShouldPersistTaps={Platform.OS === "android" ? "always" : "handled"}>

				<View style={{ marginHorizontal: 20 }}>
					<Text style={{ fontFamily: Fonts.BOLD, fontSize: 40, }}>
						Verifying  {'\n'}your number
					</Text>
					<Text style={{ fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000090", marginTop: 20 }}>
						We’ve sent your verification code to  +91 {phoneNumber}
					</Text>
					<View style={{ alignItems: "center", marginTop: Platform.OS === 'android' ? 70 : 0, paddingBottom: 30, }}>
						<Text style={{ position: "absolute", left: 0, bottom: Platform.OS === 'android' ? 85 : 160, fontFamily: Fonts.MEDIUM, fontSize: 16, color: "#00000080" }}>
							Enter Code
						</Text>
						{
							Platform.OS === 'android'
								?
								<OTPTextInput
									handleTextChange={(item) => {
										setCode(item)
										if (item.length == 6) {
											Keyboard.dismiss();
										}
									}}
									ref={otpInput}
									inputCount={6}
									tintColor={Colors.PRIMARY}
									offTintColor={'#000000'}
									containerStyle={{
									}}
									textInputStyle={[styles.subtitle, {
										borderRadius: 5,
										borderColor: Colors.BLACK,
										borderWidth: 1,
										borderBottomWidth: 1,
										height: 40,
										width: 35,
									}]} />
								:
								<OTPInputView
									style={{ width: '80%', height: 200 }}
									pinCount={6}
									ref={otpInput}
									// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
									onCodeChanged={code => {
										setCode(code)
									}}
									autoFocusOnLoad={false}
									codeInputFieldStyle={styles.underlineStyleBase}
									codeInputHighlightStyle={styles.underlineStyleHighLighted}
									onCodeFilled={(code => {
										setCode(code)
										console.log(`Code is ${code}, you are good to go!`)
									})}
								/>
						}
						{
							resend
								?
								<TouchableOpacity style={{ fontFamily: Fonts.MEDIUM, color: "#000000", position: "absolute", right: 0, bottom: Platform.OS === 'android' ? 5 : 70 }} onPress={resendOtp}><Text>Resend code</Text></TouchableOpacity>
								: <Text style={{ fontFamily: Fonts.MEDIUM, color: "#00000080", position: "absolute", right: 0, bottom: Platform.OS === 'android' ? 5 : 70 }}>{minutes}:{timerValue} min left</Text>

						}
					</View>
				</View>
			</ScrollView>
			<View style={{ justifyContent: "flex-end" }}>
				<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, borderRadius: 50 }} onPress={confirmCode}>
					<Text style={globalStyles.buttonText}>
						Verify
					</Text>
				</TouchableOpacity>
				{/* <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					<Text style={{ color: "#16161680" }}>
						Don’t have a account?
					</Text>
					<TouchableOpacity style={{ paddingLeft: 5 }}>
						<Text style={{ color: "#161616" }}>
							Sign up
						</Text>
					</TouchableOpacity>
				</View> */}
			</View>
		</KeyboardAvoidingView >
	)
};
// const mapStateToProps = (state) => {
// 	return {
// 		contactId: state.brand.contactId,
// 		country: state.brand.country,
// 		brandId: state.brand.brandId,
// 		brandInterest: state.brand.brandInterest,
// 		currentUserType: state.user.currentUserType,

// 	};
// };

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(null, mapDispatchToProps)(RegisterOTPScreen);