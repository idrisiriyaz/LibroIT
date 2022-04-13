import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

//style
import { styles } from './ProfileStyle';

//component
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

//npm
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

//global
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';

//redux
import * as UserAction from '../../redux/actions/userActions'


const UserDetailScreen = ({
	navigation,
	dispatch,
	phNo,
	userName

}) => {

	const [Loader, setLoader] = React.useState(false);

	//variable
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	//function
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

			<View style={styles.cont}>
				<View style={styles.contain}>
					<View style={{ justifyContent: "center", flex: 1 }}>
						<LottieView style={{ height: 200, width: 200, right: 8, }} source={require('../../assets/json/profile.json')} autoPlay loop />
					</View>
					<Text numberOfLines={1} style={styles.userName}>
						{userName}
					</Text>
					<Text numberOfLines={1} style={styles.phoneNumber}>
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
	userName: state.user.name
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);

