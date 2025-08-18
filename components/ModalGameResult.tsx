import { View, Text, Modal } from 'react-native'
import React from 'react'

interface ModalProps {
    wrongAnswers: number,
    correctAnswers: number
}

const ModalGameResult = () => {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center items-center px-5"
                onPress={closeOnBackdropPress ? onClose : undefined}
            >
                <Pressable
                    className="bg-white rounded-2xl p-6 w-full max-w-sm items-center shadow-lg"
                    onPress={(e) => e.stopPropagation()}
                >
                    {icon && (
                        <Ionicons
                            name={icon.name as any}
                            size={40}
                            color={icon.color || '#000'}
                            style={{ marginLeft: 5 }}
                        />
                    )}

                    {title && (
                        <Text className="text-lg font-bold text-slate-700 mt-3 text-center">
                            {title}
                        </Text>
                    )}

                    {message && (
                        <Text className="text-sm text-gray-600 text-center leading-5 mt-3 mb-6">
                            {message}
                        </Text>
                    )}

                    <View className="flex-row gap-3">
                        {buttons.map((btn, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`rounded-lg py-3 px-5 flex-1 bg-gray-200 ${btn.color ? `bg-${btn.color}-500` : 'bg-red-500'
                                    }`}
                                onPress={btn.onPress}
                            >
                                <Text className="text-black text-center font-bold">
                                    {btn.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}


export default ModalGameResult