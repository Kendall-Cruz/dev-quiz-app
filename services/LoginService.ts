import axios from 'axios';
import { IAuthResponse } from '@/interfaces/IAuthResponse';
import type { IUser } from '../interfaces/IUser';




export const apiLogin = async (email: string, password: string): Promise<IAuthResponse> => {
  try {
    //Cambie la url para que la reconozca el teléfono 192.168.100.5
    const response = await axios.post<IAuthResponse>(process.env.REACT_APP_AUTH_LOGIN_URL, {
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
    const response = await axios.post<IAuthResponse>(process.env.REACT_APP_AUTH_REGISTER_URL, {
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
    const response = await axios.get<IUser>(`${process.env.REACT_APP_USERS_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el usuario por ID:', error.response?.data || error.message);
    return undefined;
  }
};
