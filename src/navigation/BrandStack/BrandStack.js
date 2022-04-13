import React from 'react';

//global
import { ScreenNames } from '../../global/index';

//npm
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

//screen
import BookListScreen from '../../screens/BookList/BookListScreen';
import BookDetailsScreen from '../../screens/BookDetails/BookDetailsScreen';

//variable
const stack = createNativeStackNavigator();

//function
enableScreens();

const BrandStack = () => {
	return (
		<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ScreenNames.BOOK_LIST}>
			<stack.Screen name={ScreenNames.BOOK_LIST} component={BookListScreen} />
			<stack.Screen name={ScreenNames.BOOK_DETAILS} component={BookDetailsScreen} />
		</stack.Navigator>
	);
};
export default BrandStack;