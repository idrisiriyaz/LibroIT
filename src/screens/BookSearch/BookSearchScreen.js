// import React from 'react';
// import { View } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import styles from './BookSearchStyle'
import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, Alert, View, TouchableOpacity, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import HomeHeader from '../../components/Header/HomeHeader';
import { Colors, Constants, Fonts, ScreenNames } from '../../global';
import SearchSvg from '../../assets/svg/search';
import BackSvg from '../../assets/svg/back';

import * as Service from '../../global/Services';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const BookSearchScreen = () => {

	//Variables

	//States

	//Refs

	//Functions

	//UseEffect

	//UI
	// console.warn(phNo);
	const navigation = useNavigation();

	const [bookSearchList, setBookSearchList] = useState([]);
	const [Loader, setLoader] = useState(false);
	const [searchText, setSearchText] = useState(null);
	const [totalList, setTotalList] = useState(0);


	const goToDetails = (isbn13) => navigation.navigate(ScreenNames.BOOK_DETAILS, { isbn13: isbn13 })

	const getBookList = async (text) => {


		setSearchText(text)

		if (text) {
			setLoader(true)
			try {
				const response = await Service.getBookSearchListApi(text);
				console.warn(response.data);

				if (response.data.books) {
					setBookSearchList(response.data.books)
					setTotalList(response.data.total)
				}

				// console.warn(response.data.total);
			} catch (error) {
				console.warn(error);
			}

			setLoader(false)
		}
	}

	useEffect(() => {
		// getBookDetails();

	}, [])



	const renderBookList = ({ item }) => {

		return (
			<TouchableOpacity onPress={() => goToDetails(item.isbn13)} style={{ borderRadius: 16, flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, backgroundColor: Colors.WHITE, justifyContent: 'space-evenly', alignItems: 'center', borderWidth: 2, paddingVertical: 10 }}>

				<Image
					style={{ height: 100, width: 100 }}

					source={{ uri: item.image }} />

				<View style={{}}  >

					<Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, maxWidth: Constants.SCREEN_WIDTH / 2, color: Colors.BLACK, fontSize: Fonts.SIZE_14 }}>
						{item.title}

					</Text>
					<Text numberOfLines={2} style={{ fontFamily: Fonts.BOLD, maxWidth: Constants.SCREEN_WIDTH / 2, color: Colors.GRAY_DARK, fontSize: Fonts.SIZE_12, marginBottom: 10, }}>
						{item.subtitle}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}



	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header title={"Search Book"} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >



				<View style={{ margin: 20 }}>

					<View style={{ height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.90 }}></View>

					<View style={{ height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 40, backgroundColor: Colors.WHITE, position: 'absolute', width: Constants.SCREEN_WIDTH * 0.90 }} >
						<SearchSvg />
						<TextInput
							autoFocus
							onChangeText={text => getBookList(text)}
							// onFocus={goToList}
							placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
					</View>
				</View>
				{
					searchText ? Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :

						<>

							<View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 10, justifyContent: 'space-between' }}>
								<Text style={{ fontFamily: Fonts.BOLD, color: Colors.BLACK, fontSize: Fonts.SIZE_16, }}>Result</Text>
								<Text style={{ fontFamily: Fonts.BOLD, color: Colors.BLACK, fontSize: Fonts.SIZE_16, }}>{totalList}</Text>
							</View>

							{
								totalList == 0 && <LottieView style={{ height: Constants.SCREEN_HEIGHT / 2, alignSelf: 'center' }} source={require('../../assets/json/looking-for-something.json')} autoPlay loop />
							}

							<FlatList
								showsVerticalScrollIndicator={false}
								data={bookSearchList}
								keyExtractor={(item, index) => `${JSON.stringify(item)}`}
								renderItem={renderBookList} />
						</> :
						<View style={{ justifyContent: 'center' }} >
							<LottieView style={{ height: Constants.SCREEN_HEIGHT / 2, alignSelf: 'center' }} source={require('../../assets/json/looking-for-something.json')} autoPlay loop />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookSearchScreen);
