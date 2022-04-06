import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'

// import CustomButton from '../Components/CustomButton/CustomButton';
import { Colors, Fonts } from './src/global/index';
import RNRestart from 'react-native-restart';

export class ErrorBoundary extends React.Component {

	state = {
		error: false,
		errMsg: "",
	}

	static getDerivedStateFromError(error) {
		return { error: true };
	}

	onPress = async () => {
		// await AsyncStorage.clear();
		RNRestart.Restart();
	}

	componentDidCatch(error, errorInfo) {
		const mod = JSON.stringify(error);
		this.setState({ errMsg: mod });
		// deal with errorInfo if needed
	}

	render() {

		if (this.state.error) {
			return (
				<SafeAreaView style={styles.parentContainer}>

					<View style={styles.parentContainer}>
						<View style={styles.icon}>
						</View>
						<Text style={styles.title}>Oops, Something Went Wrong</Text>

						<Text style={styles.text}>
							The app ran into a problem and could not continue.
							We apologise for any inconvenience this has caused!
							Press the button below to restart the app.
                        Please contact us if this issue persits.</Text>
						<ScrollView>
							<Text style={styles.text}>{this.state.errMsg && this.state.errMsg}</Text>
						</ScrollView>
						<View style={styles.gap} />
						<TouchableOpacity onPress={() => { this.onPress() }} >
							<Text>Back To Home</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>

			)
		} else {
			return this.props.children;
		}
	}
};

const styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
		backgroundColor: '#ffffff',
		justifyContent: 'center'
	},
	title: {
		color: Colors.PRIMARY,
		fontSize: 30,
		fontFamily: Fonts.BOLD,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	text: {
		fontFamily: Fonts.BOLD,
		color: '#000',
		fontSize: 18,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	icon: {
		paddingHorizontal: 20,
		paddingBottom: 5,
	},
	gap: {
		height: 20,
	}
});

export default ErrorBoundary;