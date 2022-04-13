import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, ActivityIndicator, FlatList } from 'react-native';

//npm
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import BookItem from '../../components/BookItem/BookItem';
import Header from '../../components/Header/Header';

//global
import { Colors, Constants, Fonts, ScreenNames, Services } from '../../global';

//svg
import SearchSvg from '../../assets/svg/search';
import { styles } from './BookSearchStyle';


const BookSearchScreen = () => {


	//variable
	const navigation = useNavigation();

	//state
	const [bookSearchList, setBookSearchList] = useState([]);
	const [Loader, setLoader] = useState(false);
	const [searchText, setSearchText] = useState(null);
	const [totalList, setTotalList] = useState(0);

	//function
	const goToDetails = (isbn13) => navigation.navigate(ScreenNames.BOOK_DETAILS, { isbn13: isbn13 })

	const getBookList = async (text) => {
		setSearchText(text)
		if (text) {
			setLoader(true)
			try {
				const response = await Services.getBookSearchListApi(text);
				console.warn(response.data);

				if (response.data.books) {
					setBookSearchList(response.data.books)
					setTotalList(response.data.total)
				}
			} catch (error) {
				console.warn(error);
			}
			setLoader(false)
		}
	}


	const renderBookList = ({ item }) => <BookItem goToDetails={goToDetails} item={item} />

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header title={"Search Book"} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
				<View style={{ margin: 20 }}>
					<View style={styles.conatainer}></View>
					<View style={styles.searchInput} >
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
							<View style={styles.totalCon}>
								<Text style={styles.total}>Total</Text>
								<Text style={styles.total}>{totalList}</Text>
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
