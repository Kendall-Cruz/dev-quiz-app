import { ICategory } from "@/interfaces/ICategory";
import axios from "axios";

export const getAllCategories = async (): Promise<ICategory[]> => { //localhost
    try {
        const response = await axios.get<ICategory[]>('http://192.168.100.5:3000/api/categories'); 
        console.log(process.env.REACT_APP_CATEGORIES_URL)
        console.log("response",response)
        return response.data;
    } catch (error: any) {
        console.log(error);
        return []
    }
}