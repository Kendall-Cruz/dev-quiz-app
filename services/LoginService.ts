import axios from 'axios';
import type { ILoginResponse } from '../interfaces/ILoginResponse';
import type { IUser } from '../interfaces/IUser';




export const apiLogin = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    console.log("Email en servicio: ", email)
    const response = await axios.post<ILoginResponse>('http://localhost:3000/api/users/login', {
      email,
      password
    }); //Aqui puede estar el error

    console.log("Respuesta dentro del servicio", response)

    return response.data;
  } catch (error: any) {
    return {
      message: error.response?.data?.message || 'Error desconocido'
    };
  }
};


export const getUserById = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get<IUser>(`http://localhost:3000/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el usuario por ID:', error.response?.data || error.message);
    return undefined;
  }
};
