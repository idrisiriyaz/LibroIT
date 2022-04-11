import React from 'react';
import {View} from 'react-native';
import { Colors } from '../../global';

const Card = ({children, style, ...rest}) => {
    const defaultStyles={
        borderColor:Colors.GRAY_MEDIUM,
        borderWidth:0.5 ,
        borderRadius:5,
        padding: 10,
        
    };
  return (<View style={[defaultStyles,style]}>{children}</View>);
};

export default Card;
