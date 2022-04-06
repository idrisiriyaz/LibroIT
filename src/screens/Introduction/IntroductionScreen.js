import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import { styles } from './IntroductionStyle'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'


const introductionScreen = ({ navigation }) => {

	//Variables
	const introductonData = [
		{
			header: "Fresh Products",
			discription: "Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard",
			image: require("../../assets/images/info1.png")
		},
		{
			header: "Secure Payment",
			discription: "Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard",
			image: require("../../assets/images/info2.png")
		},
		{
			header: "Free Delivery",
			discription: "Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard",
			image: require("../../assets/images/info3.png")
		}
	];

	const resetStackAndGoToUser = CommonActions.reset({
		index: 0,
		routes: [{ name: ScreenNames.BOTTOM_TABS, }],
	});

	//States
	const [index, setIndex] = React.useState(0)

	//Refs
	let flatlistRef = React.useRef();

	//Functions

	//UseEffect

	//UI
	const renderItem = ({ item, index }) => {
		return (
			<View style={styles.mainScreen}>
				<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
				<Text style={{ fontSize: 35, color: Colors.PRIMARY, marginLeft: 40, letterSpacing: -2, fontFamily: Fonts.BOLD }}>{item.header}</Text>
				<Text style={{ fontSize: 24, color: "#16161650", marginLeft: 40, marginRight: 20, letterSpacing: -2, fontFamily: Fonts.MEDIUM }}>{item.discription}</Text>
				<View style={{ width: Constants.SCREEN_WIDTH, height: Constants.SCREEN_WIDTH - 80, marginTop: 50 }}>
					<Image source={item.image} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
					{/* <T */}
				</View>
				{
					index === 2
						?
						<View style={{ alignItems: "flex-end", position: "absolute", right: 0, bottom: 150 }}>
							<TouchableOpacity style={{ backgroundColor: Colors.PRIMARY, width: 120, borderTopLeftRadius: 30, borderBottomLeftRadius: 30, alignItems: "center" }} onPress={() => navigation.dispatch(resetStackAndGoToUser)}>
								<Text style={{ paddingVertical: 17, color: Colors.WHITE, }}>Continue</Text>
							</TouchableOpacity>
						</View>
						:
						null
				}
				<View style={{ position: "absolute", right: 66, bottom: 120, flexDirection: "row" }}>
					<View style={{ height: 8, backgroundColor: index == 0 ? Colors.PRIMARY : "#5F9D8450", width: index == 0 ? 26 : 8, borderRadius: 5, marginHorizontal: 4 }} />
					<View style={{ height: 8, backgroundColor: index == 1 ? Colors.PRIMARY : "#5F9D8450", width: index == 1 ? 26 : 8, borderRadius: 5, marginHorizontal: 4 }} />
					<View style={{ height: 8, backgroundColor: index == 2 ? Colors.PRIMARY : "#5F9D8450", width: index == 2 ? 26 : 8, borderRadius: 5, marginHorizontal: 4 }} />
				</View>
			</View>
		)
	}
	const getItemLayout = (data, index) => {
		return { length: styles.mainScreen.width, offset: styles.mainScreen.width * index, index }
	}


	React.useEffect(() => {
		let index = 0;
		setInterval(() => {
			if (flatlistRef.current) {
				if (index > 2) {
					// navigation.dispatch(resetStackAndGoToUser)
					null;
				}
				else {
					flatlistRef.current.scrollToIndex({ index: index });
					index += 1;
				}
			}
		}, 2000);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
			<FlatList
				data={introductonData}
				ref={flatlistRef}
				horizontal={true}
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
				getItemLayout={getItemLayout}
				pagingEnabled={true}
				renderItem={renderItem} />
		</View>
	)
};

export default introductionScreen;