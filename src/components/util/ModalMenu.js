import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ModalMenu = ({ children, modalVisible, setModalVisible }) => {

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}
        style={{ backgroundColor: 'transparent', flex: 1 }}
      />
      <View style={styles.modalView}>
        <View style={{ padding: 2.5 }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalMenu;

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 85 : 40,
    right: 30,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
