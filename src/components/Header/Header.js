import React from 'react';
import { Text, View } from 'react-native';

//style
import { styles } from './styles'

//npm
import { useNavigation } from '@react-navigation/native';

//svg
import MenuSvg from '../../assets/svg/header/menu';
import BackSpaceSvg from '../../assets/svg/header/backspace';

//global
import { Colors } from '../../global/index';

//component
import TouchableResize from '../util/TouchableResize';



const Header = ({ activateLeftIcon = true, activateRightIcon, rightIcon, rightIconPress, title }) => {


	//variable
	const navigation = useNavigation();


	//function
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
