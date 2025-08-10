import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionContext } from '@/context/SessionContext'
import useQuiz from '@/hooks/useQuiz'
import { ICategory } from '../../interfaces/ICategory';
import { Searchbar } from 'react-native-paper'
import LogoutButton from '@/components/LogoutButton'

const CategoriesScreen = () => {


  const { user } = useSessionContext();

  const { getCategories } = useQuiz();

  const [categories, setCategories] = useState<ICategory[]>()

  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();

      console.log("data", data)

      setCategories(data);
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
        <Searchbar
          placeholder="Buscar..."
          onChangeText={setBusqueda}
          value={busqueda}

        />
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
              <View className="p-4 m-2 bg-white rounded-lg shadow-lg flex-1 items-center max-w-[45%] border-cyan-500 border-4">
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