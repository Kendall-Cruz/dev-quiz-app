import { View, Pressable , Image } from 'react-native';
import React, { useState } from 'react';
import { useSessionContext } from '@/context/SessionContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ModalInfo from '@/components/ModalInfo'; // Importa tu modal genérico
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const LogoutButton = () => {
  const { logout } = useSessionContext();
  const [showModal, setShowModal] = useState(false);

  const confirmLogout = () => {
    logout();
    router.replace('/(auth)/Login');
  };

  return (
    <>
      <Pressable
        onPress={() => setShowModal(true)}
        className="mx-4"
      >

        <Image style={{width:36 , height:36 }} source={require('../assets/images/logout_icono-.png')} />
      </Pressable>

      <ModalInfo
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Cerrar sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
        icon={{ name: 'log-out-outline', color: 'red' }}
        buttons={[
          { text: 'Cancelar', color: 'blue', onPress: () => setShowModal(false) },
          { text: 'Confirmar', color:'#D90D0D', onPress: confirmLogout },
        ]}
      />
    </>
  );
};

export default LogoutButton;
