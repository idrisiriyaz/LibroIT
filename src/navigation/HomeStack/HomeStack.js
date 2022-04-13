import React from 'react';

//global
import { ScreenNames } from '../../global/index';

//npm
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'


//screen
import HomeScreen from '../../screens/Home/HomeScreen';
import BookDetailsScreen from '../../screens/BookDetails/BookDetailsScreen';

//variable
const stack = createNativeStackNavigator();

//function
enableScreens();

const HomeStack = () => {
	return (
		<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ScreenNames.HOME}>
			<stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
			<stack.Screen name={ScreenNames.BOOK_DETAILS} component={BookDetailsScreen} />
		</stack.Navigator>
	);
};
export default HomeStack;