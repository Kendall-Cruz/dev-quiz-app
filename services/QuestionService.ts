import { IQuestion } from "@/interfaces/IQuestion";
import axios from "axios";

export const getQuestionsByCategoryLevel = async (categoryId: string, level: string): Promise<IQuestion[]> => {
    try {
        console.log(categoryId, level);
        const url = `${process.env.EXPO_PUBLIC_QUESTIONS}/category/${categoryId}/level/${level}`;
        console.log(url);
        // Usa la variable `url` que ya construiste
        const response = await axios.get(url); 
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}