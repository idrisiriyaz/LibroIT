// import React from 'react';
// import { View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import styles from './HomeStyle'
import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, Alert, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import HomeHeader from '../../components/Header/HomeHeader';
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import SearchSvg from '../../assets/svg/search';
import BackSvg from '../../assets/svg/back';
import * as BookAction from '../../redux/actions/bookAction'

import * as Service from '../../global/Services';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ name, bookItems, dispatch, phNo }) => {

	//Variables

	//States

	//Refs

	//Functions

	//UseEffect

	//UI
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();
	console.warn(phNo);

	const [bookList, setBookList] = useState([])
	const [Loader, setLoader] = useState({});



	const getBookList = async () => {
		setLoader(true)
		try {
			const response = await Service.getBookListApi();
			setBookList(response.data.books)
			// console.warn(response.data);
		} catch (error) {
			console.warn(error);
		}
		setLoader(false)

	}

	useEffect(() => {
		getBookList();



	}, [])


	const bookListDemo =
	{
		"title": "Designing Across Senses",
		"subtitle": "A Multimodal Approach to Product Design",
		"isbn13": "9781491954249",
		"price": "$27.59",
		"image": "https://itbook.store/img/books/9781491954249.png",
		"url": "https://itbook.store/books/9781491954249"
	}



	console.warn(bookItems);
	const renderbookList = ({ item }) => {

		const goToDetails = () => navigation.navigate(ScreenNames.BOOK_DETAILS, { isbn13: item.isbn13 })



		// dispatch(BookAction.addToCart(item));

		return (
			<TouchableOpacity onPress={goToDetails} style={{ borderRadius: 16, width: 160, marginLeft: 20, height: 240, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', borderWidth: 2, paddingVertical: 10 }}>

				<Image
					style={{ height: 100, width: 100 }}

					source={{ uri: item.image }} />

				<View style={{ margin: 20, marginBottom: 0 }}  >
					<Text numberOfLines={2} style={{ fontFamily: Fonts.BOLD, color: Colors.GRAY_DARK, fontSize: Fonts.SIZE_10, marginBottom: 10, }}>
						{item.subtitle}
					</Text>

					<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, color: Colors.BLACK, fontSize: Fonts.SIZE_12 }}>
						{item.title}

					</Text>
				</View>
			</TouchableOpacity>
		)
	}
	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<HomeHeader title="Riyaz" />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >



				<View style={{ margin: 20 }}>

					<View style={{ height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.90 }}></View>

					<View style={{ height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 40, backgroundColor: Colors.WHITE, position: 'absolute', width: Constants.SCREEN_WIDTH * 0.90 }} >
						<SearchSvg />
						{/* <Text style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_16 }}>
							Search
						</Text> */}
						<TextInput
							placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
					</View>
				</View>




				{
					Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :
						<View style={{ flex: 1, marginTop: 20, }}>

							<View style={{ backgroundColor: Colors.SECONDARY, flex: 1, borderWidth: 2, borderTopLeftRadius: 40, }}>

								<View style={{ flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
									<Text style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_18, color: Colors.WHITE }} >Trending book</Text>
									<View>
										<View style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, left: 4, top: 4 }}></View>
										<View style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
											<BackSvg />
										</View>
									</View>
								</View>


								<FlatList
									horizontal
									data={bookList} renderItem={renderbookList} />
							</View>

							<View style={{ backgroundColor: Colors.WHITE, bottom: 0, width: Constants.SCREEN_WIDTH, height: Constants.SCREEN_HEIGHT / 3, position: 'absolute', borderWidth: 2, borderTopLeftRadius: 40, }}>

								<View style={{ flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
									<Text style={{ fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_18 }} >Last Book</Text>
									<View>
										<View style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, left: 4, top: 4 }}></View>
										<View style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
											<BackSvg />
										</View>
									</View>
								</View>


								<View style={{ height: 80, borderRadius: 80, borderWidth: 2, padding: 20, borderStyle: 'dotted', marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }} >




									<Image source={{ uri: bookListDemo ? bookListDemo.image : null }} style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.ALERT, }} />
									<View>

										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_14, color: Colors.BLACK }} >{bookListDemo ? bookListDemo.title : "Roya"}</Text>
										<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK }} >{bookListDemo ? bookListDemo.subtitle : "Roya"}</Text>
									</View>
								</View>
							</View>


						</View>

				}






				{/* <View style={{ borderRadius: 20, width: 160, height: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderWidth: 2, paddingVertical: 10 }}>

					<Image
						style={{ height: 100, width: 100 }}

						source={{ uri: "https://itbook.store/img/books/9781491954249.png" }} />

					<View style={{ margin: 20, marginBottom: 0 }}  >
						<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, color: Colors.GRAY_DARK, fontSize: Fonts.SIZE_14, marginBottom: 10, }}>
							9781491954249
						</Text>

						<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, color: Colors.BLACK, fontSize: Fonts.SIZE_16 }}>
							9781491954249
						</Text>
					</View>
				</View> */}



			</View>

		</View>
	)
};
const mapStateToProps = state => ({
	phNo: state.user.phNo,
	name: state.user.name,
	bookItems: state.bookmark.bookItems,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);