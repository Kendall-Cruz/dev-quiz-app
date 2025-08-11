import { ICategory } from "@/interfaces/ICategory";
import axios from "axios";

export const getAllCategories = async (): Promise<ICategory[]> => { //localhost
    try {
        const response = await axios.get<ICategory[]>('http://localhost:3000/api/categories'); 
        console.log("response",response)
        return response.data;
    } catch (error: any) {
        console.log(error);
        return []
    }
}