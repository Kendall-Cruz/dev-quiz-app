import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { getAllCategories } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/ICategory'

const useQuiz = () => {

  const [categories , setCategories] = useState<ICategory[]>()

  const getCategoriesApi = async () => {
    const categoriesResponse = await getAllCategories();
    setCategories(categoriesResponse);
    return categories;
  }

  const getCategoriesByName = (nombre:string) => {

  }

  return (
    {
      getCategoriesApi,
      categories
    }
  )
}

export default useQuiz