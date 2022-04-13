import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		height: Constants.SCREEN_HEIGHT,
		width: Constants.SCREEN_WIDTH,
		marginTop: 20
	},
	container: { height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.90 },
	searchInput: { height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 40, backgroundColor: Colors.WHITE, position: 'absolute', width: Constants.SCREEN_WIDTH * 0.90 },
	firstCon: { backgroundColor: Colors.SECONDARY, flex: 1, borderWidth: 2, borderTopLeftRadius: 40, },
	trandText: { fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_18, color: Colors.WHITE },
	back: { height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, left: 4, top: 4 },
	backCon: { height: 40, width: 40, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.WHITE, position: 'absolute', justifyContent: 'center', alignItems: 'center' },
	latestCon: { backgroundColor: Colors.WHITE, bottom: 0, width: Constants.SCREEN_WIDTH, height: Constants.SCREEN_HEIGHT / 3, position: 'absolute', borderWidth: 2, borderTopLeftRadius: 40, },
	latestText: { fontFamily: Fonts.BOLD, marginLeft: 10, fontSize: Fonts.SIZE_18 },
})