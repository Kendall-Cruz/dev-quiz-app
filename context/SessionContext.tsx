import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { getUserById, apiLogin, apiRegister } from "../services/LoginService";
import type { IUser } from "../interfaces/IUser";
import { IAuthResponse } from "@/interfaces/IAuthResponse";
import { useUserStore } from "@/hooks/storage/useUserStore";

export enum LoggStates {
    'verifying' = 'verifying',
    'logged' = 'logged',
    'not logged' = 'not logged'
}


interface IAuthState {
    estado: LoggStates,
    user?: IUser | null,
    isChecking: boolean,
    isLogged: boolean,
    isLoading: boolean,
    error: string | null,
    message: string | null,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    register: (name: string, surname: string, email: string, password: string) => Promise<boolean>,
    clearError: () => void,
    clearMessage: () => void,
}

// Contexto
const SessionContext = createContext<IAuthState>({} as IAuthState);

export const useSessionContext = () => useContext(SessionContext);

// Proveedor
export const SessionProvider = ({ children }: PropsWithChildren) => {
    // Estados del contexto
    const { user, estado, setUser, setEstado, clearUser } = useUserStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [message, setMessage] = useState<string | null>("");


    const login = async (email: string, password: string): Promise<boolean> => { //Poner tryCatch :PP 
        setIsLoading(true);
        setError(null);

        const response: IAuthResponse = await apiLogin(email, password);

        console.log("La respuesta despues del servicio", response)
        if (response.userId) {
            const userLogin: IUser | undefined = await getUserById(response.userId);

            setUser(userLogin!);
            setEstado(LoggStates.logged);
            setIsLoading(false);
            return true;
        } else {
            setError(response.message || 'Credenciales inválidas');
            setEstado(LoggStates["not logged"]);
            setUser(null as any);
            setIsLoading(false);
            return false;
        }


    };

    const register = async (name: string, surname: string, email: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await apiRegister(name, surname, email, password);
            console.log('Respuesta registro', response) //Verificar


            if (!response.userId) {
                setError(response.message);
                return false
            } else {
                setMessage(response.message);
                return true
            }

        } catch (error) {
            setError("Error de registro");
            return false
        }
    }

    const logout = () => {
        clearUser();
        setIsLoading(false);
        setError(null);
        console.log(user, "usuario deslogeado")
    };

    const clearError = () => {
        setError(null);
    }

    const clearMessage = () => {
        setMessage(null);
    }

    return (
        <SessionContext.Provider
            value={{
                estado,
                user,
                error,
                message,
                isChecking: estado === LoggStates.verifying,
                isLogged: estado === LoggStates.logged,
                isLoading,
                login,
                logout,
                register,
                clearError,
                clearMessage
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};














