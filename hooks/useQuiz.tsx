import { View, Text } from 'react-native'
import React from 'react'
import { getAllCategories } from '@/services/CategoryService'

const useQuiz = () => {

    const getCategories = async () =>{
        const categories = await getAllCategories();
        console.log('categorias hook : ' , categories)
        return categories;
    }
  return (
    {
        getCategories
    }
  )
}

export default useQuiz