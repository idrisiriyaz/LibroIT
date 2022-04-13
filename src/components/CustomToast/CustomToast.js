import React from 'react';
import { Text, View, Animated, Modal } from 'react-native';

//npm
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

//style
import { styles } from './CustomToastStyle';

//global
import { Constants } from '../../global';

const CustomToast = ({
    isToastMsgVisible,
    toastMsg = "",
    dispatch,
    top = 100,
    setCustomToast
}) => {


    //variable
    const isFocused = useIsFocused();
    const animatedValue = React.useRef(new Animated.Value(0)).current;

  
    //function
    const startAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            duration: 500,
        }).start(onAnimationFinish);
    };
    const onAnimationFinish = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            useNativeDriver: true,
            delay: 1500,
            duration: 1000,
        }).start(() => setCustomToast(false));
    };

    React.useEffect(() => {
        if (isToastMsgVisible) {
            startAnimation();
        }
    }, [isToastMsgVisible]);
    if (isToastMsgVisible && isFocused) {
        return (
            <Modal
                animationType={'fade'}
                visible={isToastMsgVisible}
                // onRequestClose={toggleModal}
                transparent={true}
            // statusBarTranslucent={true}
            >

                <Animated.View style={[styles.parentContainer, { opacity: animatedValue, top: Constants.SCREEN_HEIGHT - 150, left: 50, right: 50 }]}>
                    <Text style={styles.text}>{toastMsg.toString()}</Text>
                </Animated.View>
            </Modal>
        );
        return null;
    }
};

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CustomToast));
