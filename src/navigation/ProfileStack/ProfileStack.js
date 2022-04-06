import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//my imports

//screens imports
import LoginScreen from '../../screens/Login/LoginScreen';
import OTPScreen from '../../screens/OTP/OTPScreen';
import { connect } from 'react-redux';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import RegisterOTPScreen from '../../screens/RegisterOTP/RegisterOTPScreen';

enableScreens();
const stack = createNativeStackNavigator();

const ProfileStack = ({
	isSignedIn
}) => {

	// const initialScreenName = isSignedIn ? ScreenNames.PROFILE : ScreenNames.SIGN_IN;
	const initialScreenName = isSignedIn ? ScreenNames.PROFILE : ScreenNames.SIGN_IN;

	return (
		<stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName={initialScreenName}	>

			<stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
			<stack.Screen name={ScreenNames.OTP} component={OTPScreen} />
			<stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
			<stack.Screen name={ScreenNames.REGISTER} component={RegisterScreen} />
			<stack.Screen name={ScreenNames.REGISTER_OTP} component={RegisterOTPScreen} />
		</stack.Navigator>
	);
};

const mapStateToProps = state => ({
	isSignedIn: state.user.isSignedIn,
});

export default connect(mapStateToProps, null)(ProfileStack);
