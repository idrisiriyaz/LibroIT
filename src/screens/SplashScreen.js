import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

//npm
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

//redux
import * as UserAction from '../redux/actions/userActions'

//global
import { Colors, Constants, ScreenNames } from '../global';

//component
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const SplashScreen = ({ navigation, dispatch }) => {

	//variable
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	const opacity = React.useRef(new Animated.Value(1)).current;


	React.useEffect(() => {
		
		onLoad()
	}, [])

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
								dispatch(UserAction.setPhone(user.phoneNumber.toString()));
								dispatch(UserAction.setSignedIn(true));
								navigation.dispatch(resetStackAndGoToHome)
							}
						});

				}

			}
		
		});

	};

	return (
		<Animated.View style={styles.container}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />

			
			<View style={styles.align}>
				{/* <LogoSvg /> */}
				<Text style={styles.fontText}>LibroIT</Text>
			</View>
			
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
		backgroundColor: Colors.WHITE
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
		color: Colors.PRIMARY,
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