import { View, Text, Image, FlatList, Pressable, ScrollView, Alert, TouchableOpacity, StatusBar } from 'react-native';
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
import CategoryDetails from '@/components/CategoryDetails';

const CategoriesScreen = () => {

    const { getCategoriesApi, filteredCategories, getCategoriesByName } = useQuiz();
    const [categoryDetailsVisible, setCategoryDetailsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            getCategoriesApi();
        };
        fetchCategories();
    }, []);

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E293B' }}>
            <StatusBar backgroundColor='#1e2f47' />
            <Header title='Categorías' />
            <View className='mx-7 mb-5'>
                <SearchBar onSearchTextChange={getCategoriesByName} />
            </View>

            <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item._id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => (
                    <Animatable.View
                        key={item.category}
                        animation="bounceIn"
                        duration={600}
                        delay={index * 100}
                        useNativeDriver
                        className="p-4 m-2 bg-slate-50 rounded-lg shadow-lg flex-1 items-center max-w-[45%] border-cyan-500 border-4"
                    >
                        <Pressable >
                            <CategoryCard item={item} onPress={() => {
                                console.log('se está clickeando'); //Prueba borrar
                                setSelectedCategory(item);
                                setCategoryDetailsVisible(true);
                            }} />
                        </Pressable>
                    </Animatable.View>
                )}
            />
            <CategoryDetails
                visible={categoryDetailsVisible}
                category={selectedCategory}
                onClose={() => setCategoryDetailsVisible(false)}
            />
        </SafeAreaView>


    )
}

export default CategoriesScreen