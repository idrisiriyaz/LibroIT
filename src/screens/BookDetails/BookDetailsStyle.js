import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		height: Constants.SCREEN_HEIGHT,
		width: Constants.SCREEN_WIDTH,
		marginTop: 20
	},
	container: { backgroundColor: Colors.WHITE, bottom: 0, height: Constants.SCREEN_HEIGHT / 1.5, borderWidth: 2, borderTopLeftRadius: 40, },
	price: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_24, color: Colors.TERTIARY },
	authority: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_24, color: Colors.BLACK },
	author: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_20, color: Colors.GRAY_DARK },
	subCon: { borderRadius: 80, borderWidth: 2, padding: 20, justifyContent: "space-evenly", marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' },
	heading: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK },
	subHeading: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.BLACK },
	desc: { fontFamily: Fonts.BOLD, fontSize: Fonts.SIZE_14, color: Colors.OUTER_SPACE },
	imageCon: { borderRadius: 16, position: "absolute", top: 60, left: Constants.SCREEN_WIDTH / 4, width: 160, marginLeft: 20, height: 240, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', borderWidth: 2, paddingVertical: 10 }

})