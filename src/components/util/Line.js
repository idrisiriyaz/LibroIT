import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../global';

const Line = ({children, style, ...rest}) => {
  return <View style={[styles.defaultStyle, style]}>{children}</View>;
};

export default Line;

const styles = StyleSheet.create({
  defaultStyle: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.GRAY_MEDIUM,
  },
});
