import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';

//npm
import { connect } from 'react-redux';

//component
import Header from '../../components/Header/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

//global
import { Colors, Services } from '../../global';
import { styles } from './BookDetailsStyle';

const BookDetailsScreen = ({ route: { params: { isbn13 } } }) => {

	//state
	const [bookDetails, setBookDetails] = useState({});
	const [Loader, setLoader] = useState(false);

	//function
	const getBookDetails = async () => {
		setLoader(true)
		try {
			const response = await Services.getBookDetailsApi(isbn13);
			setBookDetails(response.data)
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

						<View style={styles.container}>

							<ScrollView style={{ marginTop: 100, }}>
								<View style={{ alignItems: 'center' }}>
									<View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>

										<Text style={styles.price} >{bookDetails.price}</Text>
										<Text style={styles.authority}>Authority</Text>
										<Text style={styles.author} >{bookDetails.authors}</Text>
									</View>
								</View>
								<View style={styles.subCon} >

									<View style={{ alignItems: 'center' }}>
										<Text numberOfLines={1} style={styles.heading} >{"Rating"}</Text>
										<Text numberOfLines={1} style={styles.subHeading} >{bookDetails.rating}</Text>

									</View>

									<View style={{ borderLeftColor: Colors.BLACK, borderLeftWidth: 2, paddingLeft: 20, alignItems: 'center' }}>
										<Text numberOfLines={1} style={styles.heading} >{"Number of pages"}</Text>
										<Text numberOfLines={1} style={styles.subHeading} >{bookDetails.pages} page</Text>

									</View>

									<View style={{ borderLeftColor: Colors.BLACK, borderLeftWidth: 2, paddingLeft: 20, alignItems: 'center' }}>

										<Text numberOfLines={1} style={styles.heading} >{"Year"}</Text>
										<Text numberOfLines={1} style={styles.subHeading} >{bookDetails.year}</Text>
									</View>

								</View>

								<View style={{ margin: 20 }}>
									<Text style={styles.desc} >{bookDetails.desc}</Text>
								</View>
							</ScrollView>

						</View>
						<View style={styles.imageCon}>
							<Image style={{ height: "100%", width: "100%" }} source={{ uri: bookDetails.image }} />
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
