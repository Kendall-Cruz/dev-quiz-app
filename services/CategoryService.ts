import { ICategory } from "@/interfaces/ICategory";
import axios from "axios";

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await axios.get<ICategory[]>('http://192.168.100.5:3000/api/categories'); 
        return response.data;
    } catch (error: any) {
        console.log(error);
        return []
    }
}