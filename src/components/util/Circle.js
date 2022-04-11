import React from 'react';
import {View} from 'react-native';

const Circle = ({children, style, size = 50, ...rest}) => {

  return (
    <View style={[{height: size, width: size, borderRadius: size / 2}, style]}>
      {children}
    </View>
  );
};

export default Circle;
