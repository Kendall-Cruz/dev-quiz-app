import { View, Text, Image } from 'react-native'
import React from 'react'
import LogoutButton from './LogoutButton'

interface HeaderProps {
    title?: string
}

const Header = ({ title }: HeaderProps) => {
    return (
        <View className=" mb-4 px-2 flex-row items-center justify-between relative">
            <Image
                style={{ width: 70, height: 70, borderRadius: 20 }}
                source={require('../assets/images/Logo22.png')}
            />

            <Text
                className=" text-center flex-1 font-bold text-2xl text-white mx-2"
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
            >
                {title}
            </Text>



            <LogoutButton />
        </View>
    )
}

export default Header