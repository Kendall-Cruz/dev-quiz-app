import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { ICategory } from '@/interfaces/ICategory'

interface Props {
    item: ICategory;
    onPress?: () => void;
}

const CategoryCard = ({ item , onPress }: Props) => {
    return (
        <Pressable onPress={onPress}>
            <Image
                source={{ uri: item.icon }}
                style={{ width: 80, height: 80, borderRadius:4 }}
                resizeMode="contain"
            />
            <Text className="mt-3 text-center text-lg text-gray-800 font-montserratBold">
                {item.category}
            </Text>
        </Pressable>

    )
}

export default CategoryCard