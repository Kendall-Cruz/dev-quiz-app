import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'

const GameScreen = () => {
  return (
    <SafeAreaView className='h-full ' style= {{backgroundColor: '#1E293B'}}>
      <Header title='Configuración'/>
      <View> 
        <Text>Game</Text>
      </View>
    </SafeAreaView>
  )
}

export default GameScreen