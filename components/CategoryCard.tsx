import { View, Text, Image } from 'react-native'
import React from 'react'
import { ICategory } from '@/interfaces/ICategory'

interface Props {
    item: ICategory;
}

const CategoryCard = ({ item }: Props) => {
    return (
        <>
            <Image
                source={{ uri: item.icon }}
                style={{ width: 80, height: 80, borderRadius: 12 }}
                resizeMode="contain"
            />
            <Text className="mt-3 text-center font-bold text-lg text-gray-800">
                {item.category}
            </Text>
        </>

    )
}

export default CategoryCard