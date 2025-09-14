import { IScoreBoardData } from "@/interfaces/IScoreBoardData"
import { IUser } from "@/interfaces/IUser";
import { IUserScore } from "@/interfaces/IUserScore";
import axios from "axios";
import { getUserById } from "./LoginService";


export const getTopTenUsers = async (categoryId: string, level: number): Promise<IScoreBoardData[]> => {
    try {
        const response = await axios.get(
            `${process.env.EXPO_PUBLIC_USERSCORE}/category/${categoryId}/level/${level}`
        );

        const topScores: IUserScore[] = response.data;

        const scores: IScoreBoardData[] = await Promise.all(
            topScores.map(async (s) => {
                const user = await getUserById(s.userId);

                return {
                    username: `${user?.name} ${user?.surname}` || "Desconocido",
                    maxScore: s.maxScore,
                    level: s.level,
                };
            })
        );

        return scores.sort((a, b) => Number(b.maxScore) - Number(a.maxScore)).slice(0, 10);

    } catch (error) {
        console.error("Error en getTopTenUsers:", error);
        return [];
    }
};

export const submitScore = async (categoryId: string, userId: string, score: number, level: number): Promise<IUserScore | null> => {
    try {
        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_USERSCORE}/submitScore`, { categoryId, userId, score, level, }
        );
        console.log("Realizó el guardado")
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}



