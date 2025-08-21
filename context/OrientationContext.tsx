import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { Dimensions } from "react-native";

interface IOrientationState {
  isPortrait: boolean;
  checkOrientation: () => void;
}

// Contexto
const OrientationContext = createContext<IOrientationState>({} as IOrientationState);

export const useOrientation = () => useContext(OrientationContext);

// Provider
export const OrientationProvider = ({ children }: PropsWithChildren) => {
  const [isPortrait, setIsPortrait] = useState(true); // valor inicial simple

  // Función para calcular orientación
  const checkOrientation = () => {
    const { width, height } = Dimensions.get("window");
    setIsPortrait(height >= width);
  };

  useEffect(() => {
    // Calculamos la orientación al montar
    checkOrientation();

    // Escuchamos cambios de tamaño (rotación)
    const subscription = Dimensions.addEventListener("change", checkOrientation);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <OrientationContext.Provider value={{ isPortrait, checkOrientation }}>
      {children}
    </OrientationContext.Provider>
  );
};
