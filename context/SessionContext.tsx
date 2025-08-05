import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { getUserById, apiLogin } from "../services/LoginService";
import type { IUser } from "../interfaces/IUser";
import { ILoginResponse } from "@/interfaces/ILoginResponse";

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
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void
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


    const login = async (email: string, password: string): Promise<boolean> => { //Poner tryCatch
        setIsLoading(true);
        setError(null);

        const response:ILoginResponse = await apiLogin(email, password);

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

    const logout = () => {
        setCurrentState(LoggStates["not logged"]);
        setIsLoading(false);
        setError(null);
        setUser(undefined);
    };

    return (
        <SessionContext.Provider value={{
            estado: currentState,
            user: user,
            error: error,
            isChecking: currentState === LoggStates.verifying,
            isLogged: currentState === LoggStates.logged,
            isLoading: isLoading,
            login,
            logout
        }}>
            {children}
        </SessionContext.Provider>
    );
};
