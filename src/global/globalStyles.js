import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '.';

export const globalStyles = StyleSheet.create({
	button: {
		height: 50,
		backgroundColor: Colors.PRIMARY,
		borderRadius: 5,
		justifyContent: "center", alignItems: "center",
		marginHorizontal: 20,
		marginBottom: 15
	},
	Btn: {
		height: 50,
		backgroundColor: Colors.PRIMARY,
		borderRadius: 30,
		justifyContent: "center", alignItems: "center",
		marginHorizontal: 20,
		marginBottom: 15,
		borderWidth: 2,

	},
	buttonText: {
		fontFamily: Fonts.BOLD,
		fontSize: 18,
		color: Colors.BLACK
	},
	view: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	buttonText2: {
		fontFamily: Fonts.MEDIUM,
		fontSize: 12,
		color: Colors.WHITE,
	},
});