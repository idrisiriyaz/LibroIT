import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Fonts } from '../../global';
import UploadSVG from '../../assets/svg/upload';

const Button = ({
  title = 'CLICK',
  style = {},
  onPress = () => { },
  disabled = false,
  textStyle = {},
  btnStyle = {},
  svgName = '',
  fontSize1 = 0,
  fontFamily = Fonts.BOLD,
  Activeindicator = false,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  const finishAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.btnCon, { transform: [{ scale }] }, style]}>
      <TouchableOpacity
        disabled={disabled}
        onPressOut={finishAnimation}
        onPressIn={startAnimation}
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.btn,
          { backgroundColor: disabled ? Colors.GRAY_DARK : Colors.PRIMARY, flexDirection: 'row' },
          btnStyle,
        ]}>
        {

          Activeindicator ?
            <ActivityIndicator size="small" color="#ffffff" />
            :

            <Text maxFontSizeMultiplier={1} style={[styles.title, textStyle, { fontSize: fontSize1 == 0 ? 16 : fontSize1, fontFamily: fontFamily }]}>
              {title}
            </Text>
        }
        {typeof svgName == 'string' && svgName == 'upload' && <UploadSVG style={{ marginLeft: 5 }} />}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  btnCon: {
    marginHorizontal: 0,
    marginBottom: 10,
    borderRadius: 10,
  },
});
