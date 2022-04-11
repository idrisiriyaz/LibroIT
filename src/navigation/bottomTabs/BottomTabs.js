import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//my imports

// SVG
import MenuSvg from '../../assets/svg/menu/book-bookmarkwhite';
import MenuFilledSvg from '../../assets/svg/menu/book-bookmark';
import HomeSvg from '../../assets/svg/menu/server-fillWhite';
import HomeFilledSvg from '../../assets/svg/menu/server-fill';
import NotificationsSvg from '../../assets/svg/menu/notification_icon';
import NotificationsFilledSvg from '../../assets/svg/menu/notification_icon_filled';
import ProfileSvg from '../../assets/svg/menu/profile_icon';
import ProfileFilledSvg from '../../assets/svg/menu/profile_icon_filled';

import HomeStack from '../HomeStack/HomeStack';
import BrandStack from '../BrandStack/BrandStack';
import ProfileStack from '../ProfileStack/ProfileStack';
import NotificationStack from '../NotificationStack/NotificationStack';
import { Colors, Fonts } from '../../global';
import { Platform, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabs() {
	return (
		<Tab.Navigator
			backBehavior='none'
			sceneContainerStyle={{ backgroundColor: Colors.WHITE }}

			tabBarOptions={{
				showLabel: false,
				keyboardHidesTabBar: true,
				style: {
					margin: 20,
					position: 'absolute',
					backgroundColor: Colors.TERTIARY,
					borderWidth: 2, elevation: 0, paddingHorizontal: 10, borderColor: Colors.BLACK, borderTopColor: Colors.BLACK, borderTopWidth: 2, borderRadius: 40, height: 70
				}

			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							<View style={{ flexDirection: 'row', padding: 10, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.PRIMARY }}>
								<HomeFilledSvg />
								<Text style={{
									marginLeft: 10,
									fontSize: Fonts.SIZE_18,
									fontFamily: Fonts.BOLD,
									color: Colors.BLACK,
									paddingBottom: 2,
								}}>
									Explore
								</Text>

								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</View>
							:
							<HomeSvg />
					),

				}}
			/>
			<Tab.Screen name="Book" component={BrandStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							<View style={{ flexDirection: 'row', padding: 10, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.PRIMARY }}>
								<MenuFilledSvg />
								<Text style={{
									marginLeft: 10,
									fontSize: Fonts.SIZE_18,
									fontFamily: Fonts.BOLD,
									color: Colors.BLACK,
									paddingBottom: 2,

								}}>
									Books
								</Text>

								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</View>
							:
							<MenuSvg />
					),
				}}
			/>
			{/* <Tab.Screen name="Notifications" component={NotificationStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<NotificationsFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 6, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />
							</View>
							: <NotificationsSvg />
					),
				}}
			/> */}
			<Tab.Screen name="Profile" component={ProfileStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							<View style={{ flexDirection: 'row', padding: 10, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.PRIMARY }}>
								<ProfileFilledSvg />
								<Text style={{
									marginLeft: 10,
									fontSize: Fonts.SIZE_18,
									fontFamily: Fonts.BOLD,
									color: Colors.BLACK,
									paddingBottom: 2,

								}}>
									Profile
								</Text>

								{/* <View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} /> */}
							</View>
							:
							<ProfileSvg />
					),
				}}
			/>
		</Tab.Navigator>

	);
}
export default BottomTabs;