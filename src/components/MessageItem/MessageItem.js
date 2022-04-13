import React from 'react'
import { Linking, Text, View, Animated, TouchableOpacity } from 'react-native'

//npm
import GestureRecognizer from 'react-native-swipe-gestures';
import Clipboard from '@react-native-community/clipboard';
import database from '@react-native-firebase/database'
import HyperLink from 'react-native-hyperlink';
import { connect } from 'react-redux';
import moment from 'moment';

//global
import { Colors, Constants, Fonts } from '../../global';

//redux
import * as UserActions from '../../redux/actions/userActions';

//svg
import DoubleTick from '../../assets/svg/DoubleTick.svg';
import BlueTick from '../../assets/svg/BlueTick.svg'

//compoment
import TouchableResize from '../util/TouchableResize';


const MessageItem = ({ item, myUserId, details, otherDetails, userId, message, flatlistRef, setCustomToast, setReplaydata, highlightMessageId, dispatch }) => {

    //variable
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    let right = React.useRef(new Animated.Value(0)).current;
    let opacity = React.useRef(new Animated.Value(0)).current;


    //state
    const [textShown, setTextShown] = React.useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = React.useState(0); //to show the "Read more & Less Line"
    const [modalVisible, setModalVisible] = React.useState(false);

    //function
    const toggleChat = () => setModalVisible(!modalVisible)

    const deleteMessage = () => {
        const users = [{
            myUserId: myUserId,
            userId: `${userId}`,
        }, {
            myUserId: `${userId}`,
            userId: myUserId
        }]
        const userDetails = [
            { ...details, updateDate: Date.now() },
            { ...otherDetails, updateDate: Date.now() }
        ]


        let messageHide = [{ ...item, isHide: true }]

        let messageNew = message.map(obj => messageHide.find(o => o.messageId === obj.messageId) || obj);

        console.warn(messageNew);

        let updatedMessage = {
            "messages": JSON.stringify(messageNew)
        }

        let chatr = {
        }

        for (let index = 0; index < users.length; index++) {
            chatr[`/UserChat/${users[index].myUserId}/${users[index].userId}/Messages`] = updatedMessage
            chatr[`/UserChat/${users[index].myUserId}/${users[index].userId}/Details`] = userDetails[index]
        }

        database().ref().update(chatr);
        toggleChat();
    }

    const copyMessage = () => {
        Clipboard.setString(item.message);
        setCustomToast(true)
        toggleChat()
    }
    const toggleNumberOfLine = () => {
        setTextShown(!textShown);
    };

    const onTextLayout = React.useCallback((e) => {
        setLengthMore(e.nativeEvent.lines.length >= 6); //to check the text is more than 4 lines or not
    }, []);



    const goToReplayMessage = () => {
        if (typeof message != "undefined") {
            const index = message.findIndex(e => e.messageId == item.replyMessageDetails.messageId)
            flatlistRef.current.scrollToIndex({ index: index, animated: true })
            setTimeout(() => {
                dispatch(UserActions.setHighlightMessageId(item.replyMessageDetails.messageId))
            }, 500)

        }
    }

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
            onSwipeRight={() => {

                if (!item.isHide) {

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
                }
            }}
            config={config}
            hitSlop={{ left: 50, right: 50, }}
        >
            <Animated.View style={{ backgroundColor: Colors.BLACK, position: "absolute", top: 0, left: 10, right: 10, bottom: 5, opacity: opacity, borderRadius: 10 }} />
            <Animated.View style={{ alignItems: item.senderId == myUserId ? "flex-end" : "flex-start", position: "relative", left: right }}>

                {
                    modalVisible ? <View style={{ flexDirection: 'row', width: Constants.SCREEN_WIDTH / 2, justifyContent: 'space-evenly', height: 40, alignItems: 'center', }} >
                        <TouchableResize onPress={deleteMessage} style={{ backgroundColor: Colors.WHITE, padding: 6, borderRadius: 6, borderWidth: 2 }} >
                            <Text style={{ fontFamily: Fonts.BOLD, paddingBottom: 2, color: Colors.ALERT }} >Delete</Text>
                        </TouchableResize>

                        <TouchableResize onPress={copyMessage} style={{ backgroundColor: Colors.WHITE, padding: 6, borderRadius: 6, borderWidth: 2 }} >
                            <Text style={{ fontFamily: Fonts.BOLD, paddingBottom: 2, color: Colors.SECONDARY }} >Copy</Text>
                        </TouchableResize>

                    </View> : null
                }
                <TouchableOpacity

                    onLongPress={() => {
                        if (item.senderId == myUserId) {
                            toggleChat()
                        }
                    }}

                    style={{
                        justifyContent: 'center',
                        backgroundColor: item.senderId == myUserId ? Colors.WHITE : Colors.PRIMARY + 20,
                        borderColor: Colors.BLACK, borderWidth: 2, marginVertical: 16,
                        borderRadius: 16,
                        minWidth: Constants.SCREEN_WIDTH / 3.6,
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


                        <View>
                            <HyperLink
                                linkStyle={{ color: Colors.SECONDARY }}
                                onLongPress={(url) => {
                                    Clipboard.setString(url);
                                    setCustomToast(true)
                                }}
                                onPress={(url) => Linking.openURL(url)}>
                                <Text numberOfLines={textShown ? undefined : 6} onTextLayout={onTextLayout} style={{ fontSize: 15, fontStyle: item.isHide ? 'italic' : 'normal', marginHorizontal: 4, color: Colors.BLACK, paddingBottom: 2, fontFamily: Fonts.BOLD, maxWidth: Constants.SCREEN_WIDTH / 1.6 }}>
                                    {item.isHide ? "You deleted this message" : item.message}
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
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ color: '#00000050', fontSize: 12, alignSelf: 'flex-end', fontFamily: Fonts.MEDIUM }}>{moment(item.time).format('LT')}</Text>

                            {/* <SingleTickNew /> */}
                            {
                                item.senderId == myUserId
                                    ?
                                    <>
                                        {
                                            item.userSeen.filter(e => e == userId).length > 0
                                                ?
                                                <BlueTick />
                                                :
                                                <DoubleTick />
                                        }
                                    </>
                                    :
                                    null
                            }
                        </View>

                    </View>
                </TouchableOpacity>
            </Animated.View>
        </GestureRecognizer>
    )
}
const mapStateToProps = state => ({
    highlightMessageId: state.user.highlightMessageId
});
let mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem)


