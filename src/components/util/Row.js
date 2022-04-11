import React from 'react';
import { View } from 'react-native';

const Row = ({
    children, style, ...rest
}) => {
    return(
    <View style={[style,{flexDirection:'row'}]}>
        {children}
    </View>
)};

export default Row;
