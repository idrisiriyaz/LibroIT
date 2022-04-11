import React from 'react';
import {
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import { Colors } from '../../global';

const TouchableResize = ({
    children,
    onPress = () => { },
    activeOpacity = 1,
    style = {},
    resizeValue = 0.8,
}) => {

    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(
            animatedValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }
        ).start();
    };

    const finishAnimation = () => {
        Animated.timing(
            animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }
        ).start();
    };

    const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, resizeValue],
    })

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={activeOpacity}
            onPressIn={startAnimation}
            onPressOut={finishAnimation}
            style={style}
        >
            <Animated.View
                style={{
                    transform: [
                        {
                            scale: scale
                        }
                    ],
                    // ...style,
                }}
            >

                {
                    children
                }
            </Animated.View>
        </TouchableOpacity>
    );
};
export default React.memo(TouchableResize);

export const styles = StyleSheet.create({
    con: {
        backgroundColor: Colors.WHITE,
    }
});