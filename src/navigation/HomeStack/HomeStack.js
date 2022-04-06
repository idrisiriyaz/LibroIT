import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';
import BookDetailsScreen from '../../screens/BookDetails/BookDetailsScreen';


enableScreens();
const stack = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.HOME}
		>
			<stack.Screen
				name={ScreenNames.HOME}
				component={HomeScreen} />
			<stack.Screen
				name={ScreenNames.BOOK_DETAILS}
				component={BookDetailsScreen} />

		</stack.Navigator>
	);
};
export default HomeStack;