import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ToolTipsModal = ({visible, setVisibility}) => {

  const onRequestClose = () => {
    closeModal();
  };
  const closeModal = () => {
    setVisibility(!visible)
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={closeModal}
          style={{backgroundColor: 'transparent', flex: 1}}
        >
        {/* Start: Tooltip */}
        <View style={styles.talkBubble}>
          <View style={styles.talkBubbleSquare}>
            <Text style={styles.talkBubbleMessage}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Text>
            <View style={styles.talkBubbleTriangle} />
          </View>
        </View>
        {/* End: Tooltip */}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default React.memo(ToolTipsModal);

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2, // <- zIndex here
    flex: 1,
    left: 20,
    top: 325,
    // left: (Dimensions.get('window').width / 2) - 300, // Uncomment this line when test in device.
    // bottom: 222,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  talkBubbleSquare: {
    width: 200,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 16,
  },
  talkBubbleTriangle: {
    position: 'absolute',
    bottom: -20,
    left: 85,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
  },
  talkBubbleMessage: {
    color: '#000000',
    padding: 5,
    // marginTop: 40,
    // marginLeft: 20,
    // marginRight: 20,
  },
});
