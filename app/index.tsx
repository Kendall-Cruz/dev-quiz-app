import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { LoggStates, useSessionContext } from '@/context/SessionContext';
import { Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold, useFonts } from '@expo-google-fonts/montserrat';


export default function IndexScreen() {
    const router = useRouter();
    const { estado } = useSessionContext();

    const [fontsLoaded] = useFonts({
        MontserratRegular: Montserrat_400Regular,
        MontserratBold: Montserrat_700Bold,
        MontserratSemibold: Montserrat_600SemiBold
    });


    useEffect(() => {

        /* Justificación del setTimeout:
        Tuve que usar este timeout porque si intento hacer la redirección justo al montar la pantalla,
        me lanzaba un error que decía algo como "Attempted to navigate before mounting the Root Layout component".
        Eso pasa porque la navegación todavía no está lista al *** cuando quiería cambiar de ruta.
        Al poner este setTimeout con un delay muy corto , hago que la redirección espere un momento,
        dejando que todo el layout raíz termine de montarse bien antes de navegar.
        No sé si existe alguna otra solución*/

        const timeout = setTimeout(() => {
            if (estado === LoggStates.logged) {
                router.replace('/(tabs)');
            } else {
                router.replace('/(auth)/Login');
            }
        }, 10);

        return () => clearTimeout(timeout);
    }, [estado]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Verificando sesión...</Text>
        </View>
    );
}