import { View, Text , Image } from 'react-native'
import React from 'react'
import { ICategory } from '@/interfaces/ICategory'

interface Props {
    item:ICategory;
}

const CategoryCard = ({item}:Props) => {
    return (
        <View className="p-4 m-2 bg-slate-50 rounded-lg shadow-lg flex-1 items-center max-w-[45%] border-cyan-500 border-4">
            <Image
                source={{ uri: item.icon }}
                style={{ width: 80, height: 80, borderRadius: 12 }}
                resizeMode="contain"
            />
            <Text className="mt-3 text-center font-bold text-lg text-gray-800">
                {item.category}
            </Text>
        </View>
    )
}

export default CategoryCard