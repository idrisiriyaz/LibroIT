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

// import Back from '../../assets/svg/Back';

const Header = ({
	title,
	activateLeftIcon = true,
	activateRightIcon,
	backgroundColor }) => {

	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	return (
		// backgroundColor: true= white ,false=primary 
		<View style={[styles.container, { backgroundColor: Colors.WHITE }]}>
			{/* header left */}
			<View style={styles.headerLeftContainer}>

				<TouchableOpacity
					
					onPress={goBack}
					style={styles.headerLeft}>

					{/* {activateLeftIcon ?
						<Back />
						:
						null
					} */}
					<BackSpaceSvg />

				</TouchableOpacity>

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

				<TouchableOpacity
					style={styles.headerRight}>


					<MenuSvg  />


				</TouchableOpacity>


			</View>


		</View >
	);
}

export default React.memo(Header);
