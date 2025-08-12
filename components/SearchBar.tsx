import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useQuiz from '@/hooks/useQuiz';

interface Props {
    onSearchTextChange: (text: string) => void;
    placeholder?: string;
}

const SearchBar = ({ onSearchTextChange, placeholder = "Buscar..." }: Props) => {

    const [searchText, setSearchText] = useState('');

    const handleTextChange = (text: string) => {
        setSearchText(text); 
        onSearchTextChange(text);
    };

    const clearSearch = () => {
        
        setSearchText('');
        onSearchTextChange('');
    };

    return (
        <View className="flex-row items-center bg-gray-100 rounded-md px-5 py-1 my-2.5 shadow-sm">
            <TextInput
                className="flex-1 text-base text-gray-700 pr-2.5"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={handleTextChange}
                returnKeyType="search"
            />

            <View className="p-1">
                <Ionicons name="search" size={24} color="#6B7280" />
            </View>

        </View>
    );
}

export default SearchBar