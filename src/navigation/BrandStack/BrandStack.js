import React from 'react';
import { ScreenNames } from '../../global/index';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

//screens imports
import HomeScreen from '../../screens/Home/HomeScreen';

enableScreens();
const stack = createNativeStackNavigator();

const BrandStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.EXPLORE_BRAND}
		// initialRouteName='Test'
		>
			<stack.Screen
				name={ScreenNames.HOME}
				component={HomeScreen} />
		</stack.Navigator>
	);
};
export default BrandStack;