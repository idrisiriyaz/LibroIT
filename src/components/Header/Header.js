import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

//my imports
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import MenuSvg from '../../assets/svg/header/menu';
import BackSpaceSvg from '../../assets/svg/header/backspace';
import { Colors, Constants } from '../../global/index';
import TouchableResize from '../util/TouchableResize';

// import Back from '../../assets/svg/Back';

const Header = ({ activateLeftIcon = true, activateRightIcon, rightIcon, rightIconPress, title }) => {

	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	return (
		// backgroundColor: true= white ,false=primary 
		<View style={[styles.container, { backgroundColor: Colors.WHITE }]}>
			{/* header left */}
			<View style={styles.headerLeftContainer}>

				<TouchableResize

					onPress={goBack}
					style={activateLeftIcon ? styles.headerLeft :
						null}>

					{activateLeftIcon ?
						<BackSpaceSvg />

						:
						null
					}

				</TouchableResize>

			</View>

			{/* header center */}
			<View style={styles.headerCenterContainer}>

				<View style={styles.headerCenter}>
					<Text style={styles.headerText}>
						{title}
					</Text>
				</View>

			</View>

			{/* header right */}
			<View style={styles.headerRightContainer}>

				<TouchableResize
					onPress={rightIconPress}
					style={styles.headerRight}>

					{activateRightIcon ? rightIcon ? rightIcon :
						<MenuSvg /> : null}


				</TouchableResize>


			</View>


		</View >
	);
}

export default React.memo(Header);
