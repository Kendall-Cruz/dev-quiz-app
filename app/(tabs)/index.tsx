import { View, Text, Image, FlatList, Pressable , ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionContext } from '@/context/SessionContext'
import useQuiz from '@/hooks/useQuiz'
import { ICategory } from '../../interfaces/ICategory';
import LogoutButton from '@/components/LogoutButton'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'
import Header from '@/components/Header'
import { useUserStore } from '@/hooks/storage/useUserStore';
import * as Animatable from "react-native-animatable";

const CategoriesScreen = () => {


    const { user } = useSessionContext();
    const { clearUser } = useUserStore()

    const { getCategoriesApi, filteredCategories, getCategoriesByName } = useQuiz();


    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            getCategoriesApi();
        };
        fetchCategories();
    }, []);

    return (

        <SafeAreaView className='h-full' style={{ backgroundColor: '#1E293B' }}>
            <Header title='Categorías' />
            <View className='mx-7 mb-5 ' >
                <SearchBar onSearchTextChange={getCategoriesByName} />
            </View>
            <ScrollView>
                {filteredCategories && (
                    <FlatList
                        data={filteredCategories}
                        keyExtractor={(item) => item._id.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => (
                            <Animatable.View
                                key={item.category}
                                animation="bounceIn"
                                duration={600}
                                delay={index * 100}
                                useNativeDriver
                                className="p-4 m-2 bg-slate-50 rounded-lg shadow-lg flex-1 items-center max-w-[45%] border-cyan-500 border-4" >
                                <CategoryCard item={item} />
                            </Animatable.View>
                        )}
                    />
                )}

            </ScrollView>

        </SafeAreaView>

    )
}

export default CategoriesScreen