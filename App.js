import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Node} from 'react';

import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{title: 'Welcome'}}
                    />
                    <Stack.Screen name="News" component={NewsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
