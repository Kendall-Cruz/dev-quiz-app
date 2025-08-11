import axios from 'axios';
import { IAuthResponse } from '@/interfaces/IAuthResponse';
import type { IUser } from '../interfaces/IUser';




export const apiLogin = async (email: string, password: string): Promise<IAuthResponse> => {
  try {
    //Cambie la url para que la reconozca el teléfono 192.168.100.5
    const response = await axios.post<IAuthResponse>('http://http://localhost:3000/api/users/login', {
      email,
      password
    });

    console.log("Respuesta dentro del servicio", response)

    return response.data;
  } catch (error: any) {
    return {
      message: error.response?.data?.message || 'Error al intentar iniciar sesión'
    };
  }
};


export const apiRegister = async (name: string, surname: string, email: string, password: string): Promise<IAuthResponse> => {
  try {
    const response = await axios.post<IAuthResponse>('http://http://localhost:3000/api/users/register', {
      name, surname, email, password
    })

    return response.data;

  } catch (error: any) {
    return {
      message: error.response?.data.message || 'Error al intentar registrarse'
    }
  }
}


export const getUserById = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await axios.get<IUser>(`http://192.168.56.1:3000/api/users/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el usuario por ID:', error.response?.data || error.message);
    return undefined;
  }
};
