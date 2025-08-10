import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
}

const ErrorModal = ({ visible, onClose, title, message, buttonText }: ErrorModalProps) => {
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
                        <Ionicons name="alert-circle" size={40} color="#e74c3c" />
                        <Text className="text-lg font-bold text-slate-700 mt-3 text-center">
                            {title}
                        </Text>
                    </View>

                    <Text className="text-sm text-gray-600 text-center leading-5 mb-6">
                        {message}
                    </Text>

                    <TouchableOpacity
                        className="bg-red-500 rounded-lg py-3 px-8 min-w-[100px]"
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



export default ErrorModal;