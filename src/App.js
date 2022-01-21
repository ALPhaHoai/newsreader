import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Node} from 'react';

import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";

import * as RNLocalize from "react-native-localize";
import DeviceInfo from 'react-native-device-info';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    useEffect(() => {
        (async () => {
            console.log("RNLocalize", RNLocalize.getLocales());
            console.log("RNLocalize", RNLocalize.getCurrencies());
            console.log("RNLocalize", RNLocalize.getTimeZone());
            console.log("DeviceInfo", await DeviceInfo.getBatteryLevel());
            console.log("DeviceInfo", await DeviceInfo.getBrand());
            console.log("DeviceInfo", await DeviceInfo.getDevice());
            console.log("DeviceInfo", await DeviceInfo.getDeviceType());
            console.log("DeviceInfo", await DeviceInfo.getDeviceName());
            console.log("DeviceInfo", await DeviceInfo.getMacAddress());
            console.log("DeviceInfo", await DeviceInfo.getManufacturer());
            console.log("DeviceInfo", await DeviceInfo.getMaxMemory());
            console.log("DeviceInfo", await DeviceInfo.getModel());
            console.log("DeviceInfo", await DeviceInfo.getPhoneNumber());
            console.log("DeviceInfo", await DeviceInfo.getProduct());
            console.log("DeviceInfo", await DeviceInfo.getSystemName());
            console.log("DeviceInfo", await DeviceInfo.getSystemVersion());
            console.log("DeviceInfo", await DeviceInfo.getUniqueId());
            console.log("DeviceInfo", await DeviceInfo.isTablet());
        })()
    }, [])

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
