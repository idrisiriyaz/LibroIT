import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
// import { Linking, Alert } from 'react-native';
// import { globalStyles } from './global/globalStyles';
// import NotificationManager from './NotificationManager';
// import { Server } from './global';
// import { notificationManager } from './NotificationManagerIOS'
// import { Platform } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import Axios from 'axios';
// import { element } from 'prop-types';
// import { PermissionsAndroid } from 'react-native';
import ErrorBoundary from './ErrorBoundary'


const App = () => {

	// const [info, setInfo] = React.useState(null)



	// async function requestUserPermission() {
	// 	const authorizationStatus = await messaging().requestPermission({
	// 		sound: false,
	// 		announcement: true,
	// 	});

	// }

	// messaging().setBackgroundMessageHandler(async remoteMessage => {
	// 	JSON.stringify(remoteMessage.data)
	// 	const data = remoteMessage.data
	// 	const Url = data.userType == "USER" ? `${Server.BASE_URL}/posts/${data.postId}/postImages/0` : `${Server.BASE_URL}/campaigns/${data.campaignId}/campaignImage`;
	// 	const userProfile =
	// 		data.userType == "USER" ?
	// 			`${Server.BASE_URL}/users/${data.userId}/userImage?${Date.now()}`
	// 			: `${Server.BASE_URL}/brands/${data.brandId}/brandImage?${Date.now()}`;
	// 	const sbText = data.subText
	// 	const Title = data.title
	// 	const Msg = data.message

	// 	if (Platform.OS === 'android') {
	// 		NotificationManager.showNotification(sbText, Title, Msg, Url, userProfile)
	// 	} else {
	// 		notificationManager.showNotification(1, Title, Msg, {}, {})
	// 	}
	// });

	// onRegister = (token) => {
	// }

	// onNotification = (notify) => {
	// }

	// onOpenNotification = (notify) => {
	// }




	// React.useEffect(() => {
	// 	try {
	// 		notificationManager.configure()
	// 		requestUserPermission();
	// 		const unsubscribe = messaging().onMessage(async remoteMessage => {
	// 			JSON.stringify(remoteMessage.data)
	// 			const data = remoteMessage.data
	// 			const Url = data.userType == "USER" ? `${Server.BASE_URL}/posts/${data.postId}/postImages/0` : `${Server.BASE_URL}/campaigns/${data.campaignId}/campaignImage`;
	// 			const userProfile =
	// 				data.userType == "USER" ?
	// 					`${Server.BASE_URL}/users/${data.userId}/userImage?${Date.now()}`
	// 					: `${Server.BASE_URL}/brands/${data.brandId}/brandImage?${Date.now()}`;
	// 			const sbText = data.subText
	// 			const Title = data.title
	// 			const Msg = data.message
	// 			if (Platform.OS === 'android') {
	// 				NotificationManager.showNotification(sbText, Title, Msg, Url, userProfile)
	// 			} else {
	// 				notificationManager.showNotification(1, Title, Msg, {}, {})
	// 			}
	// 		});
	// 		return unsubscribe;
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// }, []);

	return (
		<ErrorBoundary>

			<SafeAreaProvider>
				{

					<Provider store={store}>
						<MainStack />
					</Provider>
					// :
					// Alert.alert("Warning", "App is not Available in your Country")
				}
			</SafeAreaProvider>
		</ErrorBoundary>
	)
};

export default App;