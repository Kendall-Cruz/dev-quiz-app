import { ICategory } from "@/interfaces/ICategory";
import axios from "axios";

export const getAllCategories = async (): Promise<ICategory[]> => { //localhost
    try {
        const response = await axios.get<ICategory[]>(process.env.EXPO_PUBLIC_CATEGORIES_URL); 
        return response.data;
    } catch (error: any) {
        console.log(error);
        return []
    }
}

