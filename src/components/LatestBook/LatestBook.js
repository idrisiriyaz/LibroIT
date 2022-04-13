import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, Constants, Fonts } from '../../global'

const LatestBook = ({ goToDetails, item }) => {
    return (
        <TouchableOpacity onPress={() => goToDetails(item.isbn13)} style={{ height: 80, borderRadius: 80, borderWidth: 2, padding: 20, borderStyle: 'dotted', marginHorizontal: 20, alignItems: 'center', flexDirection: 'row' }} >

            <Image source={{ uri: item ? item.image : null }} style={{ height: 40, width: 40, borderWidth: 2, borderRadius: 40, backgroundColor: Colors.ALERT, }} />
            <View>

                <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_14, color: Colors.BLACK }} >{item ? item.title : "Roya"}</Text>
                <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, width: Constants.SCREEN_WIDTH * 0.6, marginLeft: 10, fontSize: Fonts.SIZE_12, color: Colors.GRAY_DARK }} >{item ? item.subtitle : "Roya"}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default LatestBook