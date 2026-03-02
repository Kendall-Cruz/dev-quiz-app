import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface ModalProps {
    wrongAnswers: number,
    correctAnswers: number,
    visible: boolean;
    onClose?: () => void;
    onPressButton: () => void;
    title?: string;
    message?: string;
    buttonText: string
}

const ModalGameResult = ({ wrongAnswers, correctAnswers, visible, onClose, title, message, buttonText, onPressButton }: ModalProps) => {
    return (
        <Modal
            animationType='slide'
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable className="flex-1 bg-black/50 justify-center items-center px-5">
                <Pressable
                    className="bg-white rounded-2xl p-8 w-full max-w-md items-center shadow-xl"
                    onPress={(e) => e.stopPropagation()}
                >

                    {title && (
                        <Text className="text-2xl font-bold text-slate-800 text-center mb-3">
                            {title}
                        </Text>
                    )}

                    {message && (
                        <Text className="text-lg text-gray-600 text-center leading-6 mb-6">
                            {message}
                        </Text>
                    )}

                    <View className="flex-row items-center bg-green-100 rounded-lg px-4 py-3 mb-3 w-full">
                        <Text className="text-lg text-gray-800 font-medium">
                            Correctas: <Text className="font-bold text-green-700">{correctAnswers}</Text>
                        </Text>
                        <Ionicons name="checkmark-circle" size={26} color="green" style={{ marginLeft: 4 }} />
                    </View>

                    <View className="flex-row items-center bg-red-100 rounded-lg px-4 py-3 mb-6 w-full">
                        <Text className="text-lg text-gray-800 font-medium">
                            Incorrectas: <Text className="font-bold text-red-700">{wrongAnswers}</Text>
                        </Text>
                        <Ionicons name="close-circle" size={26} color="red" style={{ marginLeft: 4 }} />
                    </View>

                    {/* Botón */}
                    <TouchableOpacity
                        className="rounded-lg py-4 px-6 w-full bg-gray-300 shadow-md"
                        onPress={onPressButton}
                    >
                        <Text className="text-black text-center font-bold text-lg">
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    )
}


export default ModalGameResult