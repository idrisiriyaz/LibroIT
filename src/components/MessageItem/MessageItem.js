import moment from 'moment';
import React from 'react'
import { Linking, StyleSheet, Text, View, Image, Animated, Clipboard, TouchableOpacity } from 'react-native'
import HyperLink from 'react-native-hyperlink';
import { Colors, Constants, Fonts } from '../../global';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import * as UserActions from '../../redux/actions/userActions';



const MessageItem = ({ item, myUserId, message, flatlistRef, setCustomToast, setReplaydata, highlightMessageId, dispatch }) => {

    const [textShown, setTextShown] = React.useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = React.useState(0); //to show the "Read more & Less Line"
    const [imageHeightWidth, setImageHeightWidth] = React.useState(null)
    const [urlPreview, setUrlPreview] = React.useState(null)


    // function test(url) {
    //     var mat = url.match(/(https?:\/\/[^ ]*)/)
    //     if (mat != null) {
    //         if (mat.length > 0) {
    //             setUrlPreview(mat[0])
    //         }
    //     }

    // }



    const toggleNumberOfLine = () => {
        setTextShown(!textShown);
    };

    const onTextLayout = React.useCallback((e) => {
        setLengthMore(e.nativeEvent.lines.length >= 6); //to check the text is more than 4 lines or not
    }, []);





    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };


    const goToReplayMessage = () => {
        if (typeof message != "undefined") {
            const index = message.findIndex(e => e.messageId == item.replyMessageDetails.messageId)
            flatlistRef.current.scrollToIndex({ index: index, animated: true })
            setTimeout(() => {
                dispatch(UserActions.setHighlightMessageId(item.replyMessageDetails.messageId))
            }, 500)

        }
    }
    let right = React.useRef(new Animated.Value(0)).current;
    let opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (highlightMessageId == item.messageId) {
            Animated.timing(opacity, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: false
            }).start(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false
                }).start(() => {
                    dispatch(UserActions.setHighlightMessageId(0))
                })
            })
        }
    }, [highlightMessageId])


    return (
        <GestureRecognizer
            onSwipeRight={(state) => {
                Animated.timing(right, {
                    toValue: 50,
                    duration: 200,
                    useNativeDriver: false
                }).start(() => {
                    Animated.timing(right, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    }).start()
                })
                if (typeof setReplaydata != "undefined") {
                    setReplaydata(item)
                }
            }}
            config={config}
            hitSlop={{ left: 50, right: 50, }}
        >
            <Animated.View style={{ backgroundColor: Colors.BLACK, position: "absolute", top: 0, left: 10, right: 10, bottom: 5, opacity: opacity, borderRadius: 10 }} />
            <Animated.View style={{ alignItems: item.senderId == myUserId ? "flex-end" : "flex-start", position: "relative", left: right }}>
                <Text style={{
                    fontFamily: Fonts.MEDIUM,
                    color: Colors.DARK_JUNGLE_GREEN,
                    fontSize: 10,
                    opacity: 0.4,
                    position: 'absolute'
                }}>{item.senderId == myUserId ? `You, ${moment(item.time).fromNow()}` : `${item.senderName}, ${moment(item.time).fromNow()}`}</Text>

                <View style={{
                    justifyContent: 'center',
                    backgroundColor: item.senderId == myUserId ? Colors.WHITE : Colors.PRIMARY + 20,
                    borderColor: Colors.BLACK, borderWidth: 2, marginVertical: 16,
                    borderRadius: 16,
                    maxWidth: Constants.SCREEN_WIDTH / 1.5,
                    padding: 10, borderTopLeftRadius: item.senderId == myUserId ? null : 0, borderBottomRightRadius: item.senderId == myUserId ? 0 : null
                }}>

                    {
                        typeof item.reply != "undefined"
                            &&
                            item.reply
                            ?
                            <TouchableOpacity
                                onPress={goToReplayMessage}
                                style={{ flexDirection: 'row', marginBottom: 10, borderLeftWidth: 4, borderWidth: 1, padding: 4, borderRadius: 10, backgroundColor: Colors.GRAY_LIGHT, justifyContent: "space-between" }} >
                                <View style={{ justifyContent: "space-between" }}>
                                    <Text style={{ fontFamily: Fonts.BOLD }}>{item.replyMessageDetails.senderId == myUserId ? "You" : item.replyMessageDetails.senderName}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text numberOfLines={2} style={{ color: Colors.GRAY_DARK, fontFamily: Fonts.MEDIUM, maxWidth: Constants.SCREEN_WIDTH / 1.4 }} >{item.replyMessageDetails.message}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            :
                            null
                    }




                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


                        <View><HyperLink
                            linkStyle={{ color: Colors.SECONDARY }}
                            onLongPress={(url, text) => {
                                Clipboard.setString(url);
                                setCustomToast(true)
                            }}
                            onPress={(url, text) => Linking.openURL(url)}>
                            <Text numberOfLines={textShown ? undefined : 6} onTextLayout={onTextLayout} style={{ fontSize: 15, color: Colors.BLACK, fontFamily: Fonts.BOLD }}>
                                {item.message}
                            </Text>
                        </HyperLink>
                            {lengthMore ? (
                                <Text
                                    onPress={toggleNumberOfLine}
                                    style={{
                                        lineHeight: 21,
                                        color: Colors.SECONDARY,
                                        fontFamily: Fonts.MEDIUM,
                                        marginHorizontal: 4,
                                    }}>
                                    {textShown ? 'Less' : 'Read more'}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Animated.View>
        </GestureRecognizer>
    )
}
const mapStateToProps = state => ({
    highlightMessageId: state.user.highlightMessageId
});
let mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem)

const styles = StyleSheet.create({})
