import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
    buttonColor?: string;
    icon: {
        name: string,
        color: string
    }
}

const ModalInfo = ({ visible, onClose, title, message, buttonText, icon, buttonColor }: ModalProps) => {
    const { name, color } = icon;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-5">
                <View className="bg-white rounded-2xl p-6 w-full max-w-sm items-center shadow-lg">
                    <View className="items-center mb-5">
                        <Ionicons name={name as any} size={40} color={color} />
                        <Text className="text-lg font-bold text-slate-700 mt-3 text-center">
                            {title}
                        </Text>
                    </View>

                    <Text className="text-sm text-gray-600 text-center leading-5 mb-6">
                        {message}
                    </Text>

                    <TouchableOpacity
                        className={`rounded-lg py-3 px-8 min-w-[100px] ${buttonColor ? `bg-${buttonColor}-500` : 'bg-blue-500'}`}
                        onPress={onClose}
                    >
                        <Text className="text-white text-base font-bold text-center">
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};




export default ModalInfo;