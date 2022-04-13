import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

//global
import { Colors, Constants, Fonts } from '../../global'

const BookItem = ({goToDetails, item}) => {
    return (
        <TouchableOpacity onPress={() => goToDetails(item.isbn13)} style={{ borderRadius: 16, flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, height: 180, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', borderWidth: 2, paddingVertical: 10 }}>

            <Image
                style={{ height: 100, width: 100 }}

                source={{ uri: item.image }} />

            <View style={{ margin: 20, marginBottom: 0 }}  >
                <Text numberOfLines={2} style={{ fontFamily: Fonts.BOLD, maxWidth: Constants.SCREEN_WIDTH / 2, color: Colors.GRAY_DARK, fontSize: Fonts.SIZE_10, marginBottom: 10, }}>
                    {item.subtitle}
                </Text>

                <Text numberOfLines={1} style={{ fontFamily: Fonts.BOLD, maxWidth: Constants.SCREEN_WIDTH / 2, color: Colors.BLACK, fontSize: Fonts.SIZE_12 }}>
                    {item.title}

                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default BookItem