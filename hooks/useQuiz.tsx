import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getAllCategories } from '@/services/CategoryService'
import { ICategory } from '@/interfaces/ICategory'

const useQuiz = () => {
  const [allCategories, setAllCategories] = useState<ICategory[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  const getCategoriesApi = async () => {
    const categoriesResponse = await getAllCategories();
    console.log('📦 Categorías cargadas:', categoriesResponse.length);
    setAllCategories(categoriesResponse);
    setCategories(categoriesResponse);
  }

  const getCategoriesByName = useCallback( (nombre: string) => {
    console.log('🔍 Buscando:', nombre);
    console.log('📊 Total categorías disponibles:', allCategories.length);
    
    if (!allCategories.length) {
      console.log('❌ No hay categorías cargadas');
      return;
    }

    if (!nombre.trim()) {
      console.log('🔄 Restaurando todas las categorías');
      setCategories(allCategories);
    } else {
      const filtered = allCategories.filter(cat =>
        cat.category.toLowerCase().includes(nombre.toLowerCase())
      );
      console.log('✅ Categorías filtradas:', filtered.length);
      console.log('📋 Nombres filtrados:', filtered.map(cat => cat.category));
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