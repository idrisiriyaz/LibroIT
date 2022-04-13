
import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';

//npm
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import BookItem from '../../components/BookItem/BookItem';
import Header from '../../components/Header/Header';

//global
import { Colors, Constants, Fonts, ScreenNames, Services } from '../../global';

//svg
import SearchSvg from '../../assets/svg/search';

//style
import { styles } from './BookListStyle';


const BookSearchScreen = ({ route }) => {

	//variable
	const navigation = useNavigation();

	//state
	const [bookSearchList, setBookSearchList] = useState([]);
	const [Loader, setLoader] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [totalList, setTotalList] = useState(0);
	const [bookList, setBookList] = useState([])
	const [title, setTitle] = useState(typeof route?.params?.title != 'undefined' ? route?.params?.title : "Book List")

	//function
	const goToDetails = (isbn13) => navigation.navigate(ScreenNames.BOOK_DETAILS, { isbn13: isbn13 })

	const getBookSearchList = async (text) => {
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
	const getBookList = async () => {
		setLoader(true)
		try {
			const response = await Services.getBookListApi();
			setBookList(response.data.books)
		} catch (error) {
			console.warn(error);
		}
		setLoader(false)

	}
	useEffect(() => {
		getBookList();

	}, [])



	const renderBookSearchList = ({ item }) => <BookItem goToDetails={goToDetails} item={item} />
	const renderBookList = ({ item }) => <BookItem goToDetails={goToDetails} item={item} />


	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<Header activateLeftIcon={typeof route?.params?.title != 'undefined' ? true : false} title={title} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
				<View style={{ margin: 20 }}>
					<View style={styles.container}></View>
					<View style={styles.searchInput} >
						<SearchSvg />
						<TextInput
							onChangeText={text => getBookSearchList(text)}
							placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
					</View>
				</View>
				{Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :
					searchText.length > 0 ?

						Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :
							<>
								<View style={styles.totalCon}>
									<Text style={styles.total}>Total</Text>
									<Text style={styles.total}>{totalList}</Text>
								</View>
								<FlatList
									showsVerticalScrollIndicator
									data={bookSearchList}
									keyExtractor={(item, index) => `${JSON.stringify(item)}`}
									renderItem={renderBookSearchList} />
							</> : <FlatList
							showsVerticalScrollIndicator
							data={bookList}
							keyExtractor={(item, index) => `${JSON.stringify(item)}`}
							renderItem={renderBookList} />

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
