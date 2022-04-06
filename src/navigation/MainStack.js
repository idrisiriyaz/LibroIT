import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { CommonActions, NavigationContainer } from '@react-navigation/native';

import { Colors, Constants, ScreenNames, Server } from '../global/index';

//screens imports
import BottomTabs from '../navigation/bottomTabs/BottomTabs';
import { connect } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import introductionScreen from '../screens/Introduction/IntroductionScreen';
import BookListScreen from '../screens/BookList/BookListScreen';
import BookDetailsScreen from '../screens/BookDetails/BookDetailsScreen';
import BookSearchScreen from '../screens/BookSearch/BookSearchScreen';

enableScreens();
const stack = createNativeStackNavigator();

const MainStack = ({ myUserId, dispatch, navigation, country }) => {
	// const resetStack = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.YOUADME }],
	// });

	// const resetStackAndGoToUser = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.CREATE_PROFILE_SCREEN }],
	// });

	// const resetStackAndGoToBrand = CommonActions.reset({
	// 	index: 0,
	// 	routes: [{ name: ScreenNames.BRAND_MAIN_STACK, params: { screen: ScreenNames.BRAND_BOTTOM_TABS } }],
	// });


	// const checkUserAndBrandLogin = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('userId');
	// 		const brandValue = await AsyncStorage.getItem('brandUid');
	// 		if (value !== null) {
	// 			getUserById(value);
	// 		} else if (brandValue !== null) {
	// 			getBrandByUid(brandValue);
	// 		} else {
	// 			dispatch(UserActions.setSignedIn(false));
	// 			dispatch(UserActions.setCountry(country));
	// 			dispatch(UserActions.updateInterests([]));
	// 			goToBrandYouAdmeScreen();
	// 		}

	// 	} catch (e) {
	// 		console.log("MainStack", e.message);
	// 		return false;
	// 	}
	// }

	// const getBrandByUid = async (brandUid) => {
	// 	try {
	// 		const response = await Axios.get(`${Server.BASE_URL}/brandContactInfos/uid/${brandUid}`);
	// 		setBrandToRedux(response.data);
	// 	} catch (error) {
	// 		console.log("MainStack", error.message);
	// 	}
	// };

	// const setBrandToRedux = brandData => {
	// 	dispatch(BrandActions.setBrandId(brandData.brand.brandId));
	// 	dispatch(BrandActions.setContactId(brandData.contactId));
	// 	dispatch(BrandActions.setCountry(brandData.brand.country));
	// 	dispatch(BrandActions.setBrandName(brandData.brand.brandName));
	// 	dispatch(BrandActions.setBrandCampaigns(brandData.brand.totalCampaigns));
	// 	dispatch(BrandActions.setBrandProducts(brandData.brand.totalProducts));
	// 	dispatch(BrandActions.setBrandPosts(brandData.brand.totalPosts));
	// 	dispatch(BrandActions.setAboutUs(brandData.brand.aboutUs));
	// 	dispatch(BrandActions.setWebSite(brandData.brand.websiteUrl));
	// 	dispatch(BrandActions.setLocation(brandData.brand.location));
	// 	dispatch(BrandActions.setFacebookUrl(brandData.brand.facebookUrl));
	// 	dispatch(BrandActions.setPhone(brandData.phoneNumber));
	// 	dispatch(BrandActions.setEmail(brandData.email));
	// 	dispatch(UserActions.setCurrentUserType('Brand'));
	// 	if (brandData.brand.brandInterest && brandData.brand.brandInterest.length > 0) {
	// 		let dummyData = brandData.brand.brandInterest.map(e => e.interestId);
	// 		dispatch(BrandActions.setInterest(dummyData));
	// 	}
	// 	updateBrandToken(brandData.contactId);
	// };


	// const getUserById = async (userId) => {
	// 	try {
	// 		console.warn(userId);
	// 		const response = await Axios.get(`${Server.BASE_URL}/users/${userId}`);
	// 		setUserToRedux(response.data);
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };

	// const setUserToRedux = userData => {
	// 	dispatch(UserActions.setSignedIn(true));
	// 	dispatch(UserActions.setSignInProvider(userData.signInProvider));
	// 	dispatch(UserActions.setCountry(userData.country.toUpperCase()));
	// 	dispatch(UserActions.setDob(userData.dob));
	// 	dispatch(UserActions.setEmail(userData.email));
	// 	dispatch(UserActions.setFbProfileUrl(userData.fbProfileUrl));
	// 	dispatch(UserActions.setFollowers(userData.followers));
	// 	dispatch(UserActions.setFollowings(userData.followings));
	// 	dispatch(UserActions.setGender(userData.gender));
	// 	dispatch(UserActions.setInstaProfileUrl(userData.instaProfileUrl));
	// 	dispatch(UserActions.setName(userData.name));
	// 	dispatch(UserActions.setPhone(userData.phNo));
	// 	dispatch(UserActions.setPostCount(userData.postsCount));
	// 	dispatch(UserActions.setReferralCode(userData.referralCode));
	// 	dispatch(UserActions.setReferredByReferralCode(userData.referredByReferralCode));
	// 	dispatch(UserActions.setUid(userData.uid));
	// 	dispatch(UserActions.setUserId(userData.userId));
	// 	dispatch(UserActions.setUserImageExtension(userData.userImageExtension));
	// 	// dispatch(UserActions.setUserLoginCountry(userData.userCountry));
	// 	firebaseSvc.setUid(userData.uid)

	// 	dispatch(UserActions.setCurrentUserType('User'));
	// 	if (userData.userInterests && userData.userInterests.length > 0) {
	// 		let dummyData = userData.userInterests.map(e => e.interestId);
	// 		dispatch(UserActions.updateInterests(dummyData));
	// 	}
	// 	// console.warn(!userData.email || !userData.phNo || !userData.fbProfileUrl);
	// 	// if (!userData.name || !userData.phNo || !userData.fbProfileUrl) {
	// 	// 	console.warn("hiii");
	// 	// 	navigation.dispatch(resetStackAndGoToUser);

	// 	// }
	// 	updateUserToken(userData.userId);
	// };

	// const goToBrandYouAdmeScreen = () => navigation.dispatch(resetStack);

	// const opacity = React.useRef(new Animated.Value(1)).current;


	// let updateUserToken = async (userId) => {
	// 	try {
	// 		const t = await messaging().getToken();
	// 		dispatch(UserActions.setToken(t));
	// 		await Axios.put(`${Server.BASE_URL}/users/${userId}/registrationToken/${t}`);
	// 	} catch (error) {
	// 		console.log("MainStack", error.message);
	// 	}
	// };

	// let updateBrandToken = async (contactId) => {
	// 	try {
	// 		const t = await messaging().getToken();
	// 		dispatch(UserActions.setToken(t));
	// 		await Axios.put(`${Server.BASE_URL}/brandContactInfos/${contactId}/registrationToken/${t}`);
	// 		navigation.dispatch(resetStackAndGoToBrand);
	// 	} catch (error) {
	// 		console.log("Mainstack", error.message);
	// 	}
	// };

	// React.useEffect(() => {
	// 	checkUserAndBrandLogin()
	// 	const unsubscribe = messaging().onTokenRefresh(newToken => {
	// 		updateUserToken(newToken);
	// 	});
	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, []);

	// const linking = {
	// 	prefixes: ['https://youadmeapp.com', 'youadmeapp'],
	// 	config: {
	// 		initialRouteName: 'youadmeapp.com',
	// 		screens: {
	// 			Home: "home",
	// 			BottomTabs: {
	// 				path: 'user',
	// 				screens: {
	// 					Profile: {
	// 						path: 'profile',
	// 						screens: {
	// 							DeepLinkPostDetailsScreen: {
	// 								path: 'post-details/:postId',
	// 								parse: postId => postId
	// 							},
	// 						},
	// 					},
	// 					Brands: {
	// 						path: "campaigns",
	// 						screens: {
	// 							ViewCampaignDetails: {
	// 								path: "campaign-details/:campaignId",
	// 								parse: campaignId => campaignId,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 			BrandMainStack: {
	// 				path: 'all-brands',
	// 				screens: {
	// 					BrandBottomTabs: {
	// 						path: "brand",
	// 						screens: {
	// 							CampaignStack: {
	// 								path: "campaigns",
	// 								screens: {
	// 									ViewCampaignDetails: {
	// 										path: 'campaign-details/:campaignId',
	// 										parse: campaignId => campaignId
	// 									},
	// 								}
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// };

	// const linkingIOS = {
	// 	prefixes: ['https://tsayouadme.com', 'tsayouadme://'],
	// 	config: {
	// 		initialRouteName: 'com.youadme.ios.app',
	// 		screens: {
	// 			Home: "home",
	// 			BottomTabs: {
	// 				path: 'user',
	// 				screens: {
	// 					Profile: {
	// 						path: 'profile',
	// 						screens: {
	// 							DeepLinkPostDetailsScreen: {
	// 								path: 'post-details/:postId',
	// 								parse: postId => postId
	// 							},
	// 						},
	// 					},
	// 					Brands: {
	// 						path: "campaigns",
	// 						screens: {
	// 							DeepLinkCampaignDetails: {
	// 								path: "campaign-details/:campaignId",
	// 								parse: campaignId => campaignId,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 			BrandMainStack: {
	// 				path: 'all-brands',
	// 				screens: {
	// 					BrandBottomTabs: {
	// 						path: "brand",
	// 						screens: {
	// 							CampaignStack: {
	// 								path: "campaigns",
	// 								screens: {
	// 									ViewCampaignDetails: {
	// 										path: 'campaign-details/:campaignId',
	// 										parse: campaignId => campaignId
	// 									},
	// 								}
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// };

	return (
		<NavigationContainer
		// linking={Platform.OS === 'android' ? linking : linkingIOS}

		>
			<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'SplashScreen'}>
				<stack.Screen options={{ contentStyle: { borderLeftColor: Colors.ALERT } }} name={ScreenNames.BOTTOM_TABS} component={BottomTabs} />
				<stack.Screen name="SplashScreen" component={SplashScreen} />
				<stack.Screen name={ScreenNames.INTRODUCTION} component={introductionScreen} />
				<stack.Screen name={ScreenNames.BOOK_SEARCH} component={BookSearchScreen} />
				<stack.Screen name={ScreenNames.BOOK_LIST} component={BookListScreen} />
				<stack.Screen name={ScreenNames.BOOK_DETAILS} component={BookDetailsScreen} />
				{/* <stack.Screen name={ScreenNames.BRAND_MAIN_STACK} component={BrandMainStack} />
			<stack.Screen name={ScreenNames.YOUADME} component={BrandYouadmiScreen} />
			<stack.Screen name="StartScreen" component={StartScreen} />
			<stack.Screen name="App" component={App} />
			<stack.Screen name="loginTest" component={LoginScreen} />
			<stack.Screen name={ScreenNames.ENTER_PHONE_NUMBER} component={EnterPhoneNumberScreen} />
			<stack.Screen name={ScreenNames.CREATE_PROFILE_SCREEN} component={CreateProfileScreen} />
			<stack.Screen name={ScreenNames.MFAOTP} component={MFAOTP} />
			<stack.Screen name={ScreenNames.EDIT_PROFILE_FOR_OLD_CBD_USER} component={EditProfileForOldCbdUser} />
			<stack.Screen name={ScreenNames.MFA_OTP_FOR_OLD_CBD_USER} component={MFATOPForCbdUser} /> */}
			</stack.Navigator>
		</NavigationContainer>
	);
};

// const mapStateToProps = state => ({
// 	myUserId: state.user.userId,
// 	country: state.user.country
// });
// let mapDispatchToProps = dispatch => ({ dispatch });

// export default connect(mapStateToProps, mapDispatchToProps)(MainStack);
export default MainStack;
