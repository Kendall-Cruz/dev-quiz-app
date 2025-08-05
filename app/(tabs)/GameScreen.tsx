import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const GameScreen = () => {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: '#1E293B'}} className='h-full'> 
        <Text>Game</Text>
      </View>
    </SafeAreaView>
  )
}

export default GameScreen