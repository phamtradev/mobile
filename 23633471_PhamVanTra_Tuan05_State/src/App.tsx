import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from '@/navigation/root-navigator';
import { store } from '@/store';

/**
 * Thứ tự bọc có ý nghĩa:
 *
 * Provider ngoài cùng để mọi màn hình trong cây điều hướng đều đọc được store.
 * SafeAreaProvider phải bọc ngoài NavigationContainer vì thanh tab và header
 * cần biết vùng an toàn của thiết bị.
 */
export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootNavigator />
                    <StatusBar style="light" />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
