import { View, Text, Image } from 'react-native'
import React from 'react'
import LogoutButton from './LogoutButton'

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View className="mt-3 mb-4 px-2 flex-row items-center justify-between">
            {/* Logo */}
            <Image
                source={require('../assets/images/icon_without_letters_NBG.png')}
                className="w-16 h-16 rounded-2xl"
            />

            {/* Title */}
            <View className="flex-1 items-center mx-2">
                <Text
                    className="text-2xl text-white font-montserratBold text-center"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                >{title}</Text>
            </View>

            {/* Logout */}
            <LogoutButton />
        </View>
    )
}

export default Header
