import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Constants } from '../../global/index'

export const styles = StyleSheet.create({

	mainScreen: {
		height: Constants.SCREEN_HEIGHT,
		width: Constants.SCREEN_WIDTH,
		marginTop: 20
	},
	container:{ height: 60, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.PRIMARY, left: 4, top: 6, width: Constants.SCREEN_WIDTH * 0.90 },
	searchInput:{ height: 60, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', borderWidth: 2, borderRadius: 40, backgroundColor: Colors.WHITE, position: 'absolute', width: Constants.SCREEN_WIDTH * 0.90 }
})