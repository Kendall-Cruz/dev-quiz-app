import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getAllCategories } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/ICategory'

const useQuiz = () => {
  const [allCategories, setAllCategories] = useState<ICategory[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  const getCategoriesApi = async () => {
    const categoriesResponse = await getAllCategories();
    setAllCategories(categoriesResponse);
    setCategories(categoriesResponse);
  }

  const getCategoriesByName = useCallback( (nombre: string) => {
    
    if (!allCategories.length) {
      return;
    }

    if (!nombre.trim()) {
      setCategories(allCategories);
    } else {
      const filtered = allCategories.filter(cat =>
        cat.category.toLowerCase().includes(nombre.toLowerCase())
      );
      setCategories(filtered);
    }
  }, [allCategories]);

  return {
    getCategoriesApi,
    getCategoriesByName,
    categories,
    allCategories
  }
}

export default useQuiz