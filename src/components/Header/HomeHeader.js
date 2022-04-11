import React from 'react';
import {
    Text,
    View,
} from 'react-native';

//my imports
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import MenuSvg from '../../assets/svg/header/menu';
import BagSvg from '../../assets/svg/header/bag';
import { Colors, Constants } from '../../global/index';
import TouchableResize from '../util/TouchableResize';

// import Back from '../../assets/svg/Back';

const Header = ({
    activateLeftIcon = true,
    activateRightIcon,
    title,
    rightIconPress,
    midIconPress

}) => {

    const navigation = useNavigation();



    return (
        // backgroundColor: true= white ,false=primary 
        <View style={[styles.container, { backgroundColor: Colors.WHITE }]}>
            {/* header left */}
            <View style={styles.headerLeftContainer}>

                <TouchableResize

                    onPress={rightIconPress}
                    style={[styles.headerLeft, { backgroundColor: Colors.TERTIARY }]}>

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: Colors.WHITE, borderWidth: 1 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: Colors.WHITE, borderWidth: 1 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: Colors.WHITE, borderWidth: 1 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: Colors.WHITE, borderWidth: 1 }} />

                        </View>
                    </View>



                </TouchableResize>

            </View>

            {/* header center */}
            {/* <View style={styles.headerCenterContainer}>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
                </View>

            </View> */}

            {/* header right */}
            <View style={[styles.headerRightContainer, { flexDirection: "row", flex: 0.5 }]}>

                {activateRightIcon ?
                    <>
                        <TouchableResize
                            onPress={midIconPress}
                            style={styles.headerRight}>
                            <BagSvg />
                        </TouchableResize>
                        <TouchableResize
                            style={[styles.headerLeft, { backgroundColor: Colors.WHITE, }]}>
                            <Text style={[styles.headerText, { textAlign: 'center', paddingBottom: 2 }]}>
                                {title}
                            </Text>

                        </TouchableResize>
                    </> : <Text style={[styles.headerText, { fontSize: 30 }]}>
                        LibroIT
                    </Text>
                }


            </View>


        </View >
    );
}

export default React.memo(Header);
