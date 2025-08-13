import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { useSessionContext } from '@/context/SessionContext'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const LogoutButton = () => {
    const { logout } = useSessionContext();


    const logoutApp = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        logout();
                        router.replace('/(auth)/Login');
                    },
                },
            ]
        );
    }
    return (
        <Pressable
            onPress={logoutApp}
            className='mx-2'
        >
            <Ionicons name="log-out-outline" size={42} color="red" />
        </Pressable>
    )
}

export default LogoutButton