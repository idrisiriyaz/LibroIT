import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, Alert, TouchableOpacity, ActivityIndicator, View } from 'react-native';

//npm
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import OTPTextInput from 'react-native-otp-textinput';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

//global
import { Colors, Fonts, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';

//style
import { styles } from './OTPStyles'

//redux
import * as UserAction from '../../redux/actions/userActions'

const OTPScreen = ({ navigation, route: { params: { number } }, params, dispatch }, props) => {



	//state
	const otpInput = React.useRef(null);
	const [code, setCode] = React.useState('023405');
	const [minutes, setMinutes] = React.useState(1);
	const [timerValue, setTimerValue] = React.useState(30);
	const [resend, setResend] = React.useState(false);
	const [Loader, setLoader] = React.useState(false);

	//useRef
	const timerRef = React.useRef();
	const [confirm, setConfirm] = useState(null);


	//function
	const signInWithPhoneNumber = async (phoneNumber) => {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
	}


	const confirmCode = async () => {
		setLoader(true)
		try {
			await confirm.confirm(code);
			verifyOtp();
		} catch (error) {
			Alert.alert('Alert!', 'Invalid code.')
		}
		setLoader(false)
	}

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
		signInWithPhoneNumber(`+91${number}`);

		return () => {
			clearInterval(timerRef.current);
		};
	}

	const verifyOtp = async () => {

		setLoader(true)

		await firestore()
			.collection('users')
			.doc(`${number}`)
			.get()
			.then(documentSnapshot => {
				console.log('User exists: ', documentSnapshot.exists);

				if (documentSnapshot.exists) {
					console.log('User data: ', documentSnapshot.data());

					const user = documentSnapshot.data()
					dispatch(UserAction.setUserId(user.phoneNumber));
					dispatch(UserAction.setName(user.userName));
					dispatch(UserAction.setPhone(user.phoneNumber.toString()));
					dispatch(UserAction.setSignedIn(true));
					AsyncStorage.setItem('phoneNumber', number.toString());
					navigation.replace(ScreenNames.BOTTOM_TABS)
				}
			});

		setLoader(false)
	}

	//UseEffect
	React.useEffect(() => {

		signInWithPhoneNumber(`+91${number}`);

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
						We???ve sent your verification code to  +91 {number}
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
										borderWidth: 2,
										borderBottomWidth: 2,
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

				<View style={{ justifyContent: "flex-end" }}>
					<TouchableOpacity style={{ ...globalStyles.button, marginHorizontal: 56, marginVertical: 50, borderRadius: 50, borderWidth: 2 }} onPress={confirmCode}>

						{Loader ? <ActivityIndicator color={Colors.BLACK} /> : <Text style={globalStyles.buttonText}>
							Verify
						</Text>
						}

					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView >
	)
};

const mapDispatchToProps = (dispatch) => ({ dispatch, });

export default connect(null, mapDispatchToProps)(OTPScreen);