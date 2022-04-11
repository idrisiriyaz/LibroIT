import React, {  } from 'react';
import { Animated, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Constants, ScreenNames } from '../global';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as UserAction from '../redux/actions/userActions'
import firestore from '@react-native-firebase/firestore';

const SplashScreen = ({
	navigation,
	dispatch,
	contactId,
	uid
}) => {
	const [countryName, setCountryName] = React.useState(null)

	// const _getLocationAsync = async () => {
	// 	let { status } = await Permissions.askAsync(Permissions.LOCATION);
	// 	if (status !== "granted") {
	// 		getCountryName("1.3400016", "103.8054247")
	// 	} else {
	// 		Geolocation.getCurrentPosition(info => {
	// 			console.warn("info.coords.latitude, info.coords.longitude", info.coords.latitude, info.coords.longitude);
	// 			getCountryName(info.coords.latitude, info.coords.longitude)
	// 		});
	// 	}
	// };

	// const CheckPermission = async () => {
	// 	let granted = false;
	// 	Geolocation.requestAuthorization()
	// 	return granted;
	// }

	// const getCountryName = async (latitude, longitude) => {
	// 	const response = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAzB6iF-Vmt0nT7H64g-GAKUym-Fx5YkBU`)
	// 	response.data.results[0].address_components.map(element => {
	// 		if (element.types[0] === 'country') {
	// 			console.warn("element.long_name", element.long_name);
	// 			setCountryName(element.long_name);
	// 			onLoad(element.long_name)
	// 		}
	// 	})
	// 	// setCountryName(response.results[0].address_components[6].long_name)
	// }


	// React.useEffect(() => {
	// 	// notificationManager.configure()
	// 	try {
	// 		_getLocationAsync()
	// 	} catch (error) {
	// 		console.log("ioabfekj", error.message);
	// 	}
	// }, [])

	// const setAdminUid = async () => {
	// 	const response = await Axios.get(`${Server.BASE_URL}/chatNode`)
	// 	dispatch(UserActions.setAdminUid(response.data.node))
	// 	firebaseSvc.setAdminUid(response.data.node)
	// }



	// React.useEffect(() => {
	// 	setAdminUid()
	// }, [])


	// const resetStack1 = CommonActions.reset({
	// 	index: 1,
	// 	routes: [{
	// 		name: 'App',
	// 	}]
	// });

	// const getUserDetails = async () => {
	// 	const userId = await AsyncStorage.getItem('userId');
	// 	const response = await Axios.get(`${Server.BASE_URL}/users/${userId}`);
	// 	if (!response.data.email || !response.data.phNo || !response.data.fbProfileUrl) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	// const resetStack = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.YOUADME }],
	// });

	// const resetStackAndGoToUser = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	// });
	const resetStackAndGoToUser = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.INTRODUCTION, }],
	});
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	const user = {
		userId: 1,
		userName: "Dummy User",
		phone: "9890001103"
	}
	// const resetStackAndGoToUserProfile = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.CREATE_PROFILE_SCREEN }],
	// });

	// const resetStackAndGoToBrand = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.BRAND_MAIN_STACK, params: { screen: ScreenNames.BRAND_BOTTOM_TABS } }],
	// });

	// const goToBrandYouAdmeScreen = () => navigation.dispatch(resetStack);

	const opacity = React.useRef(new Animated.Value(1)).current;


	const CheckAsync = async () => {


	}
	React.useEffect(() => {
		// CheckAsync()
		onLoad()
	}, [])
	// console.warn(users.phoneNumber);


	const onLoad = async () => {

		Animated.timing(opacity, {
			toValue: 0,
			duration: 2500,
			useNativeDriver: true
		}).start(async ({ finished }) => {
			if (finished) {
				const phoneNumber = await AsyncStorage.getItem('phoneNumber');


				if (phoneNumber == null) {
					navigation.dispatch(resetStackAndGoToHome)
				} else {

					await firestore()
						.collection('users')
						.doc(`${phoneNumber}`)
						.get()
						.then(documentSnapshot => {

							navigation.dispatch(resetStackAndGoToHome)


							if (documentSnapshot.exists) {
								console.log('User data: ', documentSnapshot.data());

								const user = documentSnapshot.data()
								dispatch(UserAction.setUserId(user.phoneNumber));
								dispatch(UserAction.setName(user.userName));
								dispatch(UserAction.setPhone(user.phoneNumber));
								dispatch(UserAction.setSignedIn(true));
								navigation.dispatch(resetStackAndGoToHome)
							}
						});



					// console.warn(response);
					// dispatch(UserAction.setUserId(user.userId));
					// dispatch(UserAction.setAnniversaryDate(user.anniversaryDate));
					// dispatch(UserAction.setDob(user.dob));
					// dispatch(UserAction.setEmail(user.email));
					// dispatch(UserAction.setName(user.userName));
					// dispatch(UserAction.setPhone(user.phone));
					// dispatch(UserAction.setSignedIn(true));

				}



				// navigation.dispatch(ScreenNames.INTRODUCTION)
			}


			// 	const value = await AsyncStorage.getItem('userId');
			// 	const brandValue = await AsyncStorage.getItem('brandUid');
			// 	console.warn("countryName", countryName);
			// 	if (countryName === 'India' || countryName === 'Singapore') {
			// 		if (value !== null) {
			// 			const response = await getUserDetails();
			// 			dispatch(UserActions.setCountry('SINGAPORE'))
			// 			dispatch(UserActions.setCurrencyType('S$'))
			// 			if (response) {
			// 				navigation.dispatch(resetStackAndGoToUserProfile);
			// 			} else {
			// 				navigation.dispatch(resetStackAndGoToUser);
			// 			}
			// 		} else if (brandValue !== null) {
			// 			navigation.dispatch(resetStackAndGoToBrand);
			// 			dispatch(BrandActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCurrencyType('S$'))
			// 		} else {
			// 			dispatch(UserActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCurrencyType('S$'))
			// 			dispatch(UserActions.setCurrencyType('S$'))
			// 			goToBrandYouAdmeScreen();
			// 		}
			// 	} else if (countryName === 'Malaysia') {
			// 		console.warn("byee");
			// 		if (value !== null) {
			// 			const response = await getUserDetails();
			// 			dispatch(UserActions.setCountry('MALAYSIA'))
			// 			dispatch(UserActions.setCurrencyType('RM'))
			// 			if (response) {
			// 				navigation.dispatch(resetStackAndGoToUserProfile);
			// 			} else {
			// 				navigation.dispatch(resetStackAndGoToUser);

			// 			}
			// 		} else if (brandValue !== null) {
			// 			navigation.dispatch(resetStackAndGoToBrand);
			// 			dispatch(BrandActions.setCountry('MALAYSIA'))
			// 			dispatch(BrandActions.setCurrencyType('RM'))
			// 		} else {
			// 			dispatch(UserActions.setCountry('MALAYSIA'))
			// 			dispatch(BrandActions.setCountry('MALAYSIA'))
			// 			dispatch(UserActions.setCurrencyType('RM'))
			// 			dispatch(BrandActions.setCurrencyType('RM'))
			// 			goToBrandYouAdmeScreen();
			// 		}
			// 	}
			// 	else if (countryName === 'Cambodia') {
			// 		navigation.dispatch(resetStack1);
			// 	} else {
			// 		console.log("🚀 ~ file: SplashScreen.js ~ line 135 ~ getCountryName ~ element.long_name", countryName)
			// 		if (value !== null) {
			// 			const response = await getUserDetails();
			// 			if (response) {
			// 				navigation.dispatch(resetStackAndGoToUserProfile);
			// 			} else {
			// 				navigation.dispatch(resetStackAndGoToUser);

			// 			}
			// 			dispatch(UserActions.setCountry('SINGAPORE'))
			// 			dispatch(UserActions.setCurrencyType('S$'))
			// 		} else if (brandValue !== null) {
			// 			navigation.dispatch(resetStackAndGoToBrand);
			// 			dispatch(BrandActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCurrencyType('S$'))
			// 		} else {
			// 			dispatch(UserActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCountry('SINGAPORE'))
			// 			dispatch(BrandActions.setCurrencyType('S$'))
			// 			dispatch(UserActions.setCurrencyType('S$'))
			// 			goToBrandYouAdmeScreen();
			// 		}
			// 	}
			// }
		});

	};

	return (
		<Animated.View style={styles.container}>
			{/* <Svg width="100%" height="140" viewBox="0 0 375 120" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Path d="M115.5 120C260.475 120 378 4.71332 378 -137.5C378 -279.713 260.475 -395 115.5 -395C-29.4747 -395 -147 -279.713 -147 -137.5C-147 4.71332 -29.4747 120 115.5 120Z" fill="#FFEFB7" />
				<Path d="M262.5 101C407.475 101 525 -14.2867 525 -156.5C525 -298.713 407.475 -414 262.5 -414C117.525 -414 0 -298.713 0 -156.5C0 -14.2867 117.525 101 262.5 101Z" fill="#FFE488" />
				<Path d="M176.5 51C321.475 51 439 -64.2867 439 -206.5C439 -348.713 321.475 -464 176.5 -464C31.5253 -464 -86 -348.713 -86 -206.5C-86 -64.2867 31.5253 51 176.5 51Z" fill="#FDD54D" />
			</Svg> */}
			<View style={styles.align}>
				{/* <LogoSvg /> */}
				<Text style={styles.fontText}>LibroIT</Text>
			</View>
			{/* <Svg width="100%" height="74" viewBox="0 0 375 64" fill="none" xmlns="http://www.w3.org/2000/svg">
				<Path d="M252.5 515C397.475 515 515 399.713 515 257.5C515 115.287 397.475 0 252.5 0C107.525 0 -10 115.287 -10 257.5C-10 399.713 107.525 515 252.5 515Z" fill="#FFEFB7" />
				<Path d="M102.5 515C247.475 515 365 399.713 365 257.5C365 115.287 247.475 0 102.5 0C-42.4747 0 -160 115.287 -160 257.5C-160 399.713 -42.4747 515 102.5 515Z" fill="#FFE488" />
				<Path d="M73.5 530C218.475 530 336 414.713 336 272.5C336 130.287 218.475 15 73.5 15C-71.4747 15 -189 130.287 -189 272.5C-189 414.713 -71.4747 530 73.5 530Z" fill="#FDD54D" />
			</Svg> */}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: Constants.SCREEN_WIDTH,
		height: Constants.SCREEN_HEIGHT,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.PRIMARY
	},
	align: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	fontText: {
		fontSize: 53,
		marginTop: 20,
		// fontFamily: Fonts.BOLD,
		color: Colors.WHITE,
		textAlign: "center"
		// flexDirection: "column-reverse"
	},
});
const mapStateToProps = state => ({
	token: state.user.token,
	userId: state.user.userId,
	country: state.user.country
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
// export default connect(null, mapDispatchToProps)();