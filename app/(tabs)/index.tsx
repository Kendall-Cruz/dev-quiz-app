import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionContext } from '@/context/SessionContext'
import useQuiz from '@/hooks/useQuiz'
import { ICategory } from '../../interfaces/ICategory';
import LogoutButton from '@/components/LogoutButton'
import SearchBar from '@/components/SearchBar'
import CategoryCard from '@/components/CategoryCard'

const CategoriesScreen = () => {


  const { user } = useSessionContext();

  const { getCategoriesApi, categories, getCategoriesByName } = useQuiz();


  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      getCategoriesApi();
    };
    fetchCategories();
  }, []);


  return (
    <SafeAreaView className='h-full' style={{ backgroundColor: '#1E293B' }}>
      <View className="mt-4 mb-4 flex-row items-center justify-between relative">
        <Image
          style={{ width: 68, height: 68, borderRadius: 20 }}
          source={require('../../assets/images/Logo22.png')}
        />

        <Text
          className="font-bold text-3xl text-white"
        >
          Categorías
        </Text>

        <LogoutButton />
      </View>
      <View className='mx-7 mb-5 ' >
        <SearchBar onSearchTextChange={getCategoriesByName} />
      </View>
      <View>
        {categories && (
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (<CategoryCard item={item} />
            )}
          />
        )}

      </View>
    </SafeAreaView>

  )
}

export default CategoriesScreen