import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getAllCategories } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/ICategory'
import { useCategoryStore } from './storage/useCategoryStore'

const useQuiz = () => {
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([])
  const { categories , setCategories}  = useCategoryStore();

  const getCategoriesApi = async () => {
    const categoriesResponse = await getAllCategories();
    setCategories(categoriesResponse); //Se setean las categorias en el estado global de zustand
    setFilteredCategories(categoriesResponse);
  }

  const getCategoriesByName = useCallback( (nombre: string) => {
    
    if (!categories.length) {
      return;
    }

    if (!nombre.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(cat =>
        cat.category.toLowerCase().includes(nombre.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [categories]);

  return {
    getCategoriesApi,
    getCategoriesByName,
    filteredCategories,
  }
}

export default useQuiz