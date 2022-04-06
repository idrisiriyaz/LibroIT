import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		flex: 1,
		backgroundColor: Colors.WHITE
	},
	textinput: {
		borderWidth: 1,
		borderColor: Colors.BLACK,
		height: 60,
		marginLeft: 20,
		borderRadius: 5,
		fontSize: 18,
		paddingHorizontal: 15,
		fontFamily: Fonts.LIGHT,
		color: Fonts.BLACK,
		marginRight: 20,
	},
	subtitle: {
		fontFamily: Fonts.LIGHT,
		fontSize: Fonts.SIZE_14,
		color: Fonts.BLACK,
		textAlign: "center",
	},
	underlineStyleBase: {
		width: 30,
		height: 40,
		borderWidth: 1,
		color: Colors.BLACK,
		borderColor: Colors.BLACK,
		borderRadius: 5,
		borderBottomWidth: 1,
	},
	underlineStyleHighLighted: {
		borderColor: Colors.PRIMARY,
	},
})