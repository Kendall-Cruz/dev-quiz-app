import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getAllCategories } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/ICategory'
import { useCategoryStore } from './storage/useCategoryStore'

const useQuiz = () => {
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([])
  const { categories, setCategories } = useCategoryStore();

  const getCategoriesApi = async () => {
    const categoriesResponse = await getAllCategories();
    setCategories(categoriesResponse); //Se setean las categorias en el estado global de zustand
    setFilteredCategories(categoriesResponse); // Y en el estado local filtrado
  }

  const getCategoriesByName = useCallback((nombre: string) => {
    /* Use el callback porque cuando lo hacía sin callback
    se bugeaba el filtrado a renderizarse cada vez*/
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