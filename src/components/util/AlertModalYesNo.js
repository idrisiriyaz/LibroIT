import React from 'react';
import { View, Text, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Constants, Fonts, Server } from '../../global';
import Button from './Button';
import Card from './Card';
import CrossSVG from '../../assets/svg/modalCross';
import TouchableResize from './TouchableResize';
import * as Service from '../../services/Services';


const AlertModalYesNo = ({ alertModal, setAlertModal, text, Hide, toggle, HidePersonality, flag, toggleAmbassador }) => {
  const onPressToHandle = () => {
    if (typeof (Hide) != "undefined") { Hide() }
    if (typeof toggle != "undefined") { toggle() }
  };


  const onpressYes = () => {
    if (typeof toggleAmbassador != "undefined") { toggleAmbassador() }
    if (typeof HidePersonality != "undefined") { HidePersonality() }
    if (typeof setAlertModal != "undefined") { setAlertModal(false) }
  }
  return (
    <Modal
      transparent={true}
      visible={alertModal}
      onRequestClose={onPressToHandle}>
      <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: "center" }}>
        <Card
          style={{
            backgroundColor: Colors.WHITE,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: typeof flag != "undefined" ? 45 : 20,
            borderRadius: 15
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: "relative", top: typeof flag != "undefined" ? -30 : -10, right: typeof flag != "undefined" ? -5 : -10 }}>
            <TouchableResize onPress={onPressToHandle}>
              <CrossSVG />
            </TouchableResize>
          </View>
          <Text
            style={{
              fontFamily: Fonts.SEMIBOLD,
              fontSize: 20,
              color: Colors.ONYX,
              opacity: 0.6,
              textAlign: 'center',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            {text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Button
              title="Yes"
              btnStyle={{ width: Constants.SCREEN_WIDTH * 0.35, height: 36 }}
              onPress={onpressYes}
            />
            <Button
              title="No"
              btnStyle={[
                {
                  width: Constants.SCREEN_WIDTH * 0.35,
                  height: 36,
                  backgroundColor: Colors.WHITE,
                  elevation: 2,
                  shadowOpacity: 0.25,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  }
                },
              ]}
              textStyle={{ color: Colors.BLACK }}
              onPress={onPressToHandle}
            />
          </View>
        </Card>
      </View>
    </Modal >
  );
};

export default AlertModalYesNo;
