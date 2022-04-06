// import React from 'react';
// import { View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import styles from './BookDetailsStyle'
import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, Alert, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import HomeHeader from '../../components/Header/HomeHeader';
import { Colors, Constants, Fonts } from '../../global';
import SearchSvg from '../../assets/svg/search';
import BackSvg from '../../assets/svg/back';

import * as Service from '../../global/Services';


const BookDetailsScreen = ({ name, phNo, route: { params: { isbn13 } } }) => {

	//Variables

	//States

	//Refs

	//Functions

	//UseEffect

	//UI
	console.warn(phNo);

	const [bookDetails, setBookDetails] = useState({});
	const [Loader, setLoader] = useState(false);



	const getBookDetails = async () => {
		setLoader(true)
		try {
			const response = await Service.getBookDetailsApi(isbn13);
			setBookDetails(response.data)
			console.warn(response.data);
		} catch (error) {
			console.warn(error);
		}

		setLoader(false)
	}

	useEffect(() => {
		getBookDetails();

	}, [])




	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header title={"Detail Book"} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >

				{Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :
					<View style={{ flex: 1, marginTop: 20, justifyContent: 'flex-end' }}>

						<View style={{ backgroundColor: Colors.WHITE, bottom: 0, height: Constants.SCREEN_HEIGHT / 1.5, borderWidth: 2, borderTopLeftRadius: 40, }}>

							<ScrollView style={{ marginTop: 100, }}>



								<View style={{ alignItems: 'center' }}>


									<View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>

										<Text style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_24, color: Colors.TERTIARY }} >{bookDetails.price}</Text>
										<Text style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_24, color: Colors.BLACK }}>Authority</Text>
										<Text style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.GRAY_DARK }} >{bookDetails.authors}</Text>
									</View>


								</View>
								<View style={{ borderRadius: 80, borderWidth: 2, padding: 20, justifyContent: "space-evenly", marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }} >





									<View style={{ alignItems: 'center' }}>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK }} >{"Rating"}</Text>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.BLACK }} >{bookDetails.rating}</Text>

									</View>

									<View style={{ borderLeftColor: Colors.BLACK, borderLeftWidth: 2, paddingLeft: 20, alignItems: 'center' }}>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK }} >{"Number of pages"}</Text>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.BLACK }} >{bookDetails.pages} page</Text>

									</View>

									<View style={{ borderLeftColor: Colors.BLACK, borderLeftWidth: 2, paddingLeft: 20, alignItems: 'center' }}>

										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK }} >{"Year"}</Text>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.BLACK }} >{bookDetails.year}</Text>
									</View>



								</View>

								<View style={{ margin: 20 }}>
									<Text style={{ fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.OUTER_SPACE }} >{bookDetails.desc}</Text>
								</View>



							</ScrollView>

						</View>
						<View
							// onPress={goToDetails}
							style={{ borderRadius: 16, position: "absolute", top: 60, left: Constants.SCREEN_WIDTH / 4, width: 160, marginLeft: 20, height: 240, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', borderWidth: 2, paddingVertical: 10 }}>

							<Image
								style={{ height: "100%", width: "100%" }}

								source={{ uri: bookDetails.image }} />


						</View>





					</View>

				}




			</View>

		</View >
	)
};
const mapStateToProps = state => ({
	phNo: state.user.phNo,
	name: state.user.name
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsScreen);
