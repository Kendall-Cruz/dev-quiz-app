import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionContext } from '@/context/SessionContext'
import useQuiz from '@/hooks/useQuiz'
import { ICategory } from '../../interfaces/ICategory';
import LogoutButton from '@/components/LogoutButton'
import SearchBar from '@/components/SearchBar'

const CategoriesScreen = () => {


  const { user } = useSessionContext();

  const { getCategoriesApi , categories , getCategoriesByName } = useQuiz();


  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      getCategoriesApi();
    };
    fetchCategories();
  }, []);


  return (
    <SafeAreaView className='h-full ' style={{ backgroundColor: '#1E293B' }}>
      <View className="mt-4 mb-4 flex-row items-center justify-between">
        <Image
          style={{ width: 68, height: 68 ,borderRadius: 20 }}
          source={require('../../assets/images/Logo22.png')}
        />

        <Text className="flex-1 text-center font-bold text-3xl text-white">
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
            renderItem={({ item }) => (
              <View className="p-4 m-2 bg-cyan-100 rounded-lg shadow-lg flex-1 items-center max-w-[45%] border-cyan-500 border-4">
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 80, height: 80, borderRadius: 12, borderBottomWidth: 1 }}
                  resizeMode="contain"
                />
                <Text className="mt-3 text-center font-bold text-lg text-gray-800">
                  {item.category}
                </Text>
              </View>
            )}
          />
        )}

      </View>
    </SafeAreaView>

  )
}

export default CategoriesScreen