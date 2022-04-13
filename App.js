import React from 'react';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './ErrorBoundary'


const App = () => {

	return (
		<ErrorBoundary>
			<SafeAreaProvider>
					<Provider store={store}>
						<MainStack />
					</Provider>
			</SafeAreaProvider>
		</ErrorBoundary>
	)
};

export default App;