import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Service from './ServicePage'
import Queue from './QueuePage'

const Stack = createStackNavigator()

export default function NavigationPage() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Service" component={Service}></Stack.Screen>
                <Stack.Screen name="Queue" component={Queue}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}