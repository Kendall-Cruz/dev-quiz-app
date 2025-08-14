import { ICategory } from '@/interfaces/ICategory'
import { create} from 'zustand'

interface ICategoryStore{
    categories: ICategory[],
    setCategories: (categories:ICategory[]) => void;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
    categories: [],
    setCategories: (categories) => set({categories})
}))

