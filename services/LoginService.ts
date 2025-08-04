import axios from 'axios';
import type { ILoginResponse } from '../interfaces/ILoginResponse';
import type { IUser } from '../interfaces/IUser';




export const apiLogin = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const response = await axios.post<ILoginResponse>('http://localhost:3000/api/users/login', {
      //Cuerpo de la petición
      email,
      password
    });

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
