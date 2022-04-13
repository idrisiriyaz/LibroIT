import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		flex: 1,
		backgroundColor: Colors.WHITE,
		// justifyContent: ""
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
	font1: { fontFamily: Fonts.MEDIUM, fontSize: 20, color: "#00000070", marginTop: 20 },
	code:{ flexDirection: "row", marginVertical: 40, height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 20, backgroundColor: Colors.WHITE, },
	codeText:{
		fontFamily: Fonts.BOLD,
		color: Fonts.BLACK,
		fontSize: 18,

	},
	
})