import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function Service() {
    return (
        <View style={styles.container}>
            <Text>SERVICE PAGE</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

