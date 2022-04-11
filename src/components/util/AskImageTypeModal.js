import React from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// svg
import CrossSvg from '../../assets/svg/modalCross';

// global
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Constants, Colors, Fonts} from '../../global';
import TouchableResize from './TouchableResize';
import {color} from 'react-native-reanimated';

const AskImageTypeModal = ({
  visible = true,
  setVisibility,
  openGallery,
  openCamera,
}) => {
  const closeModal = () => {
    if (typeof setVisibility === 'function') {
      setVisibility(!visible);
    }
  };

  const handleOnRequestClose = () => {
    if (Platform.OS === 'android') {
      closeModal();
    }
  };

  const handleOpenCamera = () => {
    if (typeof openCamera === 'function') {
      // closeModal();
      openCamera();
    }
  };

  const handleOpenGallery = () => {
    if (typeof openGallery === 'function') {
      // closeModal();
      openGallery();
    }
  };

  const {bottom} = useSafeAreaInsets();

  return (
    <Modal
      animationType={'fade'}
      onRequestClose={handleOnRequestClose}
      transparent={true}
      visible={visible}>
      <SafeAreaView style={styles.con}>
        <TouchableOpacity
          onPress={closeModal}
          activeOpacity={1}
          style={styles.blurView}
        />

        <View
          style={[
            styles.childCon,
            {
              paddingBottom: Constants.isIOS ? bottom : 0,
            },
          ]}>
          {/* header */}
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontFamily: Fonts.BOLD,
                fontSize: 16,
                color: Colors.PRIMARY,
              }}>
              Choose
            </Text>
            <TouchableResize
              onPress={closeModal}
              activeOpacity={1}
              style={styles.closeCon}>
              <CrossSvg />
            </TouchableResize>
          </View>

          <View style={styles.line} />

          <TouchableOpacity
            activeOpacity={1}
            onPress={handleOpenGallery}
            style={styles.openGalleryCon}>
            <Text style={styles.text}>Choose From Library ...</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleOpenCamera}
            style={styles.openCamerCon}>
            <Text style={styles.text}>Take Photo ...</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default React.memo(AskImageTypeModal);

export const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  blurView: {
    flex: 1,
  },
  childCon: {
    backgroundColor: Colors.WHITE,
    // borderRadius: 7,
  },
  closeCon: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openCamerCon: {
    padding: 20,
  },
  openGalleryCon: {
    padding: 20,
  },
  text: {
    fontFamily: Fonts.BOLD,
    fontSize: 16,
    color: Colors.ONXY,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.STEEL_BLUE,
  },
});
