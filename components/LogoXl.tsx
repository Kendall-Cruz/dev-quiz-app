import { View, Text, StyleSheet , Image } from 'react-native'
import React from 'react'

const LogoXl = () => {
    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image style={styles.logoIcon} source={require('../assets/images/Logo22.png')}></Image>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        width: 250,
        height: 250,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
})
export default LogoXl