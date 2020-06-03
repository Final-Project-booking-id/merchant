import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Service from './ServicePage'
import Queue from './QueuePage'
import QRCamera from './CameraPage'
import History from './HistoryPage'

const Stack = createStackNavigator()

export default function NavigationPage() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName ="Service" headerMode='none'>
                <Stack.Screen name="Service" component={Service}></Stack.Screen>
                <Stack.Screen name="Queue" component={Queue}></Stack.Screen>
                <Stack.Screen name="History" component={History}></Stack.Screen>
                <Stack.Screen name="QRCamera" component={QRCamera}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}