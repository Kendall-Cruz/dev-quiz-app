import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { getUserById, apiLogin, apiRegister } from "../services/LoginService";
import type { IUser } from "../interfaces/IUser";
import { IAuthResponse } from "@/interfaces/IAuthResponse";

export enum LoggStates {
    'verifying' = 'verifying',
    'logged' = 'logged',
    'not logged' = 'not logged'
}


interface IAuthState {
    estado: LoggStates,
    user?: IUser,
    isChecking: boolean,
    isLogged: boolean,
    isLoading: boolean,
    error: string | null,
    message: string | null,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    register: (name: string , surname: string , email:string , password: string) => Promise<boolean>,
    clearError:() => void,
}

// Contexto
const SessionContext = createContext<IAuthState>({} as IAuthState);

export const useSessionContext = () => useContext(SessionContext);

// Proveedor
export const SessionProvider = ({ children }: PropsWithChildren) => {
    // Estados del contexto
    const [currentState, setCurrentState] = useState<LoggStates>(LoggStates.verifying);
    const [user, setUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>("");
    const [message , setMessage] = useState<string | null>("");


    const login = async (email: string, password: string): Promise<boolean> => { //Poner tryCatch
        setIsLoading(true);
        setError(null);

        const response:IAuthResponse = await apiLogin(email, password);

        console.log( "La respuesta despues del servicio",response)
        if (response.userId) {
            const userLogin: IUser | undefined = await getUserById(response.userId);

            setUser(userLogin);
            setCurrentState(LoggStates.logged);
            setIsLoading(false);
            return true;
        } else {
            setError(response.message || 'Credenciales inválidas');
            setCurrentState(LoggStates["not logged"]);
            setUser(undefined);
            setIsLoading(false);
            return false;
        }


    };


    //2 opciones 
    // No setear el usuario desde aqui y redireccionar al login para que la persona ingrese desde ahí
    // Setearlo desde el registro y redireccionarlo al inicio de la aplicación
    const register = async(name: string , surname: string , email:string , password: string):Promise<boolean> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await apiRegister(name , surname , email , password);
            console.log('Respuesta registro' , response) //Verificar


            if(!response.userId){
                setError(response.message);
                return false
            }else{
                setMessage(response.message);
                return true
            }
            
        } catch (error) {
            return false
        }
    }

    const logout = () => {
        setCurrentState(LoggStates["not logged"]);
        setIsLoading(false);
        setError(null);
        setUser(undefined);
        console.log(user , "usurio deslogeado")
    };

    const clearError = () => {
        setError(null);
    }

    return (
        <SessionContext.Provider value={{
            estado: currentState,
            user: user,
            error: error,
            message: message,
            isChecking: currentState === LoggStates.verifying,
            isLogged: currentState === LoggStates.logged,
            isLoading: isLoading,
            login,
            logout,
            register,
            clearError,
        }}>
            {children}
        </SessionContext.Provider>
    );
};
