import { IScoreBoardData } from "@/interfaces/IScoreBoardData"
import { IUser } from "@/interfaces/IUser";
import { IUserScore } from "@/interfaces/IUserScore";
import axios from "axios";
import { getUserById } from "./LoginService";


const getTopTenUsers = async (categoryId:string ):Promise<IScoreBoardData[]> => {
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_USERSCORE}/category/${categoryId}`);

        const topScores:IUserScore[] = response.data

        topScores.forEach(async element => {
            //TODO Iniciar una variable para guardar los elemneto en un IScoreBoardData y hacerle push a un list de IScoreBoardData que se va a retornar
            const user = await getUserById(element.userId);

            

        });
        


        return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}



const getTopTenUsers2 = async (categoryId: string): Promise<IScoreBoardData[]> => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_USERSCORE}/category/${categoryId}`);
    
    const topScores = response.data;

    const scores: IScoreBoardData[] = topScores.map((s: any) => ({
      categoryId: s.categoryId,
      userId: s.userId,
      maxScore: s.maxScore
    }));

    return scores;
  } catch (error) {
    console.log(error);
    return [];
  }
}
