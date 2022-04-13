import React from 'react';

//npm
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

//global
import { ScreenNames } from '../global/index';

//screen
import BottomTabs from '../navigation/bottomTabs/BottomTabs';
import SplashScreen from '../screens/SplashScreen';
import BookListScreen from '../screens/BookList/BookListScreen';
import BookDetailsScreen from '../screens/BookDetails/BookDetailsScreen';
import BookSearchScreen from '../screens/BookSearch/BookSearchScreen';
import ChatScreenCode from '../screens/ChatScreen/ChatScreenCode';
import InboxScreen from '../screens/Inbox/InboxScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ContactListScreen from '../screens/ContactList/ContactListScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RegisterOTPScreen from '../screens/RegisterOTP/RegisterOTPScreen';
import OTPScreen from '../screens/OTP/OTPScreen';


//variable
enableScreens();
const stack = createNativeStackNavigator();

const MainStack = () => {

	return (
		<NavigationContainer>
			<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'SplashScreen'}>
				<stack.Screen name={ScreenNames.BOTTOM_TABS} component={BottomTabs} />
				<stack.Screen name="SplashScreen" component={SplashScreen} />
				<stack.Screen name={ScreenNames.BOOK_SEARCH} component={BookSearchScreen} />
				<stack.Screen name={ScreenNames.BOOK_LIST} component={BookListScreen} />
				<stack.Screen name={ScreenNames.BOOK_DETAILS} component={BookDetailsScreen} />
				<stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
				<stack.Screen name={ScreenNames.CHAT} component={ChatScreenCode} />
				<stack.Screen name={ScreenNames.INBOX} component={InboxScreen} />
				<stack.Screen name={ScreenNames.CONTACT} component={ContactListScreen} />
				<stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
				<stack.Screen name={ScreenNames.REGISTER} component={RegisterScreen} />
				<stack.Screen name={ScreenNames.REGISTER_OTP} component={RegisterOTPScreen} />
				<stack.Screen name={ScreenNames.OTP} component={OTPScreen} />
			</stack.Navigator>
		</NavigationContainer>
	);
};

export default MainStack;
