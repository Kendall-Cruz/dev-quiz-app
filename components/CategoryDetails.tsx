import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { ICategory } from '../interfaces/ICategory';

interface CategoryDetailsProps {
    visible: boolean;
    onClose: () => void;
    category: ICategory | null;
}

const CategoryDetails = ({ visible, onClose, category }: CategoryDetailsProps) => {
    if (!category) return null;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white rounded-lg p-6 w-4/5 items-center">
                    <Image
                        source={{ uri: category.icon }}
                        style={{width: 120 , height: 120 , marginBottom:5}}
                        resizeMode="contain"
                    />
                    <Text className="text-lg font-bold mb-2">{category.category}</Text>
                    <Text className="text-center mb-4">{category.description}</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-blue-600 px-6 py-2 rounded"
                    >
                        <Text className="text-white font-bold">Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CategoryDetails;


