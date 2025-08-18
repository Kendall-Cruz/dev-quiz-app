import { View, Text , Image } from 'react-native'
import React from 'react'
import LogoutButton from './LogoutButton'

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View className="mt-4 mb-4 mx-2 flex-row items-center justify-between relative bg-transparent">
            <Image
                style={{ width: 68, height: 68, borderRadius: 20 }}
                source={require('../assets/images/Logo22.png')}
            />

            <Text
                className="font-bold text-3xl text-white"
            >
                {title}
            </Text>

            <LogoutButton />
        </View>
    )
}

export default Header