import * as React from 'react';
import { View, Text } from 'react-native';

//npm
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//svg
import MenuSvg from '../../assets/svg/menu/book-bookmarkwhite';
import MenuFilledSvg from '../../assets/svg/menu/book-bookmark';
import HomeSvg from '../../assets/svg/menu/server-fillWhite';
import HomeFilledSvg from '../../assets/svg/menu/server-fill';
import ProfileSvg from '../../assets/svg/menu/profile_icon';
import ProfileFilledSvg from '../../assets/svg/menu/profile_icon_filled';

//stack
import HomeStack from '../HomeStack/HomeStack';
import BrandStack from '../BrandStack/BrandStack';
import ProfileStack from '../ProfileStack/ProfileStack';

//global
import { Colors, Fonts } from '../../global';

//variable
const Tab = createBottomTabNavigator();


//function
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
							</View>
							:
							<MenuSvg />
					),
				}}
			/>
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