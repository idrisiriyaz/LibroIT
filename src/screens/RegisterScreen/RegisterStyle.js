import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		flex: 1,
		backgroundColor: Colors.WHITE
	},
	textinput: {
		height: 60,
		marginLeft: 20,
		borderRadius: 5,
		fontSize: 18,
		paddingHorizontal: 15,
		fontFamily: Fonts.BOLD,
		color: Fonts.BLACK,
		marginRight: 20,
	},
})