import React from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, ToastAndroid, FlatList, Platform, Alert, Linking, Clipboard } from 'react-native';

//my imports
import { styles } from './ProfileStyle';
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { connect } from 'react-redux';
import { Colors, ScreenNames } from '../../global';
import { globalStyles } from '../../global/globalStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as UserAction from '../../redux/actions/userActions'


const UserDetailScreen = ({
	navigation,
	dispatch,
	
}) => {


	//Variables
	const resetStackAndGoToHome = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	//States

	//Refs

	//Functions
	const Logout = async () => {
		await AsyncStorage.clear()
		navigation.dispatch(resetStackAndGoToHome)
		dispatch(UserAction.clearSession())
	}

	//UseEffect

	//UI
	return (
		<View style={styles.container}>
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} isTransparent={true} />
			<Header activateLeftIcon={false} name={"Profile"} />
			<TouchableOpacity style={{ ...globalStyles.button, }} onPress={Logout}>
				<Text>
					Logout
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const mapStateToProps = state => ({
	referralCode: state.user.referralCode,
	name: state.user.name,
	email: state.user.email,
	isSignedIn: state.user.isSignedIn,
	uid: state.user.uid,
	userId: state.user.userId,
	followers: state.user.followers,
	followings: state.user.followings,
	postsCount: state.user.postsCount,
	signInProvider: state.user.signInProvider,
	adminUid: state.user.adminUid
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
