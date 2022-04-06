import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';
import BookListScreen from '../../screens/BookList/BookListScreen';

enableScreens();
const stack = createNativeStackNavigator();

const BrandStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.BOOK_LIST}
		// initialRouteName='Test'
		>
			<stack.Screen
				name={ScreenNames.BOOK_LIST}
				component={BookListScreen} />
		</stack.Navigator>
	);
};
export default BrandStack;