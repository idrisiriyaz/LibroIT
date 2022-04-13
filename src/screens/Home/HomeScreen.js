
import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

//npm
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

//component
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import ProfileModal from '../../components/ProfileModal/ProfileModal';
import SignInModal from '../../components/SignInModal/SignInModal';
import LatestBook from '../../components/LatestBook/LatestBook';
import TrandBook from '../../components/TrandBook/TrandBook';
import HomeHeader from '../../components/Header/HomeHeader';

//global
import { Colors, Constants, Fonts, ScreenNames, Services } from '../../global';

//svg
import SearchSvg from '../../assets/svg/search';
import BackSvg from '../../assets/svg/back';
import { styles } from './HomeStyle';


const HomeScreen = ({ name, isSignedIn }) => {

	//variable
	const navigation = useNavigation();

	//state
	const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
	const [bookList, setBookList] = useState([])
	const [bookLast, setBookLast] = useState([])
	const [Loader, setLoader] = useState({});
	const [visibleModal, setVisibleModal] = useState(false);


	//function
	const toggleVisibleModal = () => setVisibleModal(!visibleModal);
	const toggleIsSignInModalVisibility = React.useCallback(() => setIsSignInModalVisible(!isSignInModalVisible));

	const getBookList = async () => {
		setLoader(true)
		try {
			const response = await Services.getBookListApi();
			setBookList(response.data.books)
			setBookLast(response.data.books)
		} catch (error) {
			console.warn(error);
		}
		setLoader(false)
	}



	const goToSearchList = () => navigation.navigate(ScreenNames.BOOK_SEARCH)
	const goToList = (title) => navigation.navigate(ScreenNames.BOOK_LIST, { title: title })
	const goToDetails = (isbn13) => navigation.navigate(ScreenNames.BOOK_DETAILS, { isbn13: isbn13 })
	const goToChat = () => navigation.navigate(ScreenNames.INBOX)

	useEffect(() => {
		getBookList();



	}, [])
	const renderBookList = ({ item }) => <TrandBook goToDetails={goToDetails} item={item} />
	const renderBookLast = ({ item }) => <LatestBook goToDetails={goToDetails} item={item} />

	return (
		<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >
			<FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
			<HomeHeader
				activateRightIcon={isSignedIn ? true : false}
				title={isSignedIn ? name.charAt(0) : null}
				midIconPress={goToChat}
				rightIconPress={
					() => {
						if (isSignedIn) {

							toggleVisibleModal()
						} else {
							toggleIsSignInModalVisibility()
						}
					}
				} />
			<View style={{ flex: 1, backgroundColor: Colors.WHITE }} >

				<View style={{ margin: 20 }}>

					<View style={styles.container}></View>

					<View style={styles.searchInput} >
						<SearchSvg />
						<TextInput
							onFocus={goToSearchList}
							placeholder='Search' style={{ flex: 1, fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_16 }} />
					</View>
				</View>
				{
					Loader ? <ActivityIndicator color={Colors.PRIMARY} size='large' /> :
						<View style={{ flex: 1, marginTop: 20, }}>

							<View style={styles.firstCon}>

								<View style={{ flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
									<Text style={styles.trandText} >Trending Books</Text>
									<TouchableOpacity onPress={() => goToList("Trending Books")} >
										<View style={styles.back}></View>
										<View style={styles.backCon}>
											<BackSvg />
										</View>
									</TouchableOpacity>
								</View>
								<FlatList
									horizontal
									keyExtractor={(item) => `${JSON.stringify(item)}`}
									data={bookList} renderItem={renderBookList} />
							</View>

							<View style={styles.latestCon}>
								<View style={{ flexDirection: 'row', margin: 20, justifyContent: "space-between" }}>
									<Text style={styles.latestText} >Latest Books</Text>
									<TouchableOpacity onPress={() => goToList("Latest Books")} >
										<View style={styles.back}></View>
										<View style={styles.backCon}>
											<BackSvg />
										</View>
									</TouchableOpacity>
								</View>
								<FlatList
									horizontal
									keyExtractor={(item) => `${JSON.stringify(item)}`}
									data={bookLast} renderItem={renderBookLast} />

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
			<ProfileModal visible={visibleModal} toggleModal={toggleVisibleModal} />
			<SignInModal
				toggleIsSignInModalVisibility={toggleIsSignInModalVisibility}
				isSignInModalVisible={isSignInModalVisible}
			/>
		</View>
	)
};
const mapStateToProps = state => ({
	phNo: state.user.phNo,
	userId: state.user.userId,
	isSignedIn: state.user.isSignedIn,
	name: state.user.name
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
