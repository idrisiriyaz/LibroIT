import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, ToastAndroid, FlatList, ActivityIndicator, Platform, Alert, Linking, Clipboard } from 'react-native';

//my imports
import { styles } from './ProfileStyle';
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as UserAction from '../../redux/actions/userActions'
import LottieView from 'lottie-react-native';


const UserDetailScreen = ({
	navigation,
	dispatch,
	phNo,
	userName

}) => {

	const [Loader, setLoader] = React.useState(false);

	//Variables
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	//States

	//Refs

	//Functions
	const Logout = async () => {
		setLoader(true)
		await AsyncStorage.clear()
		navigation.dispatch(resetStackAndGoToHome)
		dispatch(UserAction.clearSession())
		setLoader(false)
	}

	//UseEffect

	//UI
	return (
		<View style={styles.container}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<Header activateLeftIcon={false} name={"Profile"} />



			<View style={{ backgroundColor: Colors.SECONDARY, bottom: 0, width: Constants.SCREEN_WIDTH, height: Constants.SCREEN_HEIGHT / 1.6, position: 'absolute', borderWidth: 2, borderTopLeftRadius: 40, alignItems: 'center' }}>





				<View style={{ borderWidth: 2, margin: 20, padding: 20, borderRadius: 20, position: 'absolute', bottom: Constants.SCREEN_HEIGHT / 2, justifyContent: 'center', alignContent: "center", alignItems: 'center', backgroundColor: Colors.WHITE, }}>

					<View style={{ justifyContent: "center", flex: 1 }}>

						<LottieView style={{ height: 200, width: 200, right: 8, }} source={require('../../assets/json/profile.json')} autoPlay loop />

					</View>



					<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_20, color: Colors.BLACK }}>
						{userName}
					</Text>
					<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_18, color: Colors.GRAY_DARK }}>
						+91 {phNo}
					</Text>


				</View>




			</View>
			<TouchableOpacity style={{ ...globalStyles.button, borderWidth: 2, borderRadius: 30, top: Constants.SCREEN_HEIGHT * 0.6 }} onPress={Logout}>
				{Loader ? <ActivityIndicator color={Colors.BLACK} /> : <Text style={{ ...globalStyles.buttonText }}>
					Logout
				</Text>}
			</TouchableOpacity>
		</View>
	);
}

const mapStateToProps = state => ({
	phNo: state.user.phNo,
	userName: state.user.name,
	bookItems: state.bookmark.bookItems,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);

