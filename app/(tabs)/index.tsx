import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSessionContext } from '@/context/SessionContext'

const CategoriesScreen = () => {


  const {user} = useSessionContext();
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#1E293B' }} className='h-full'>
        <Text className='text-white'>Bienvenido { user?.name}</Text>
      </View>
    </SafeAreaView>

  )
}

export default CategoriesScreen