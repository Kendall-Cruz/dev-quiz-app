import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Controller, useForm } from 'react-hook-form'
import { useCategoryStore } from '@/hooks/storage/useCategoryStore'
import { getQuestionsByCategoryLevel } from '@/services/QuestionService'
import { useQuestionStore } from '@/hooks/storage/useQuestionStore'
import { router } from 'expo-router'
import { shuffleArray } from '../../helpers/arrayShuffle';
import { Dropdown } from 'react-native-element-dropdown';

const GameConfig = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            category: '',
            difficulty: '',
        },
    });

    const { categories } = useCategoryStore()
    const { setQuestionsFiltered } = useQuestionStore();

    const onSubmit = async (data: any) => {
        const filteredQuestions = await getQuestionsByCategoryLevel(data.category, data.difficulty); //Obtiene las preguntas filtradas

        setQuestionsFiltered(shuffleArray(filteredQuestions)) //Las guarda en el estado global de zustand

        router.push('/GameScreen') //Redirije al juego
    };

    return (
        <SafeAreaView className='h-full bg-[#1E293B]'>
            <ScrollView>
                <Header title='Configuración' />
                <View className="mt-12 justify-center px-6">
                    {/* Categoría */}
                    <View className="mb-8">
                        <Text className="text-white mb-4 text-xl font-montserratBold">
                            Categoría
                        </Text>
                        <Controller
                            control={control}
                            name="category"
                            rules={{ required: 'Debe seleccionar una categoría' }}
                            render={({ field: { onChange, value } }) => (
                                <View className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <Dropdown
                                        style={[styles.DropDown, { backgroundColor: 'white', borderRadius: 12 }]}
                                        data={categories}
                                        labelField="category"
                                        valueField="_id"
                                        value={value}
                                        placeholder="Selecciona una categoría"
                                        placeholderStyle={{ color: '#6B7280', fontSize: 16 }}
                                        selectedTextStyle={{ color: '#1F2937', fontSize: 16, fontWeight: '600' }}
                                        renderItem={(item) => (
                                            <View className="flex-row items-center p-4 border-b border-gray-100">
                                                <View className="w-10 h-10 rounded-full items-center justify-center mr-3">
                                                    <Image source={{ uri: item.icon }} className="w-6 h-6" />
                                                </View>
                                                <Text className="text-gray-800 font-montserratSemi text-base">
                                                    {item.category}
                                                </Text>
                                            </View>
                                        )}
                                        onChange={(item) => onChange(item._id)}
                                    />
                                </View>
                            )}
                        />
                        {errors.category && (
                            <View className="flex-row items-center mt-2">
                                <Text className="text-red-400 text-sm font-montserratSemi ml-1">
                                    {errors.category.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Dificultad */}
                    <View className="mb-10">
                        <Text className="text-white mb-4 text-xl font-montserratBold">
                            Dificultad
                        </Text>
                        <Controller
                            control={control}
                            name="difficulty"
                            rules={{ required: 'Debe seleccionar la dificultad' }}
                            render={({ field: { onChange, value } }) => (
                                <View className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <Dropdown
                                        style={[styles.DropDown, { backgroundColor: 'white', borderRadius: 12 }]}
                                        data={[
                                            { label: 'Fácil', value: '1' },
                                            { label: 'Intermedio', value: '2' },
                                            { label: 'Difícil', value: '3' }
                                        ]}
                                        labelField="label"
                                        valueField="value"
                                        value={value}
                                        placeholder="Elige tu nivel de desafío"
                                        placeholderStyle={{ color: '#6B7280', fontSize: 16 }}
                                        selectedTextStyle={{ color: '#1F2937', fontSize: 16, fontWeight: '600' }}
                                        renderItem={(item) => (
                                            <View className="flex-row items-center p-4 border-b border-gray-100">
                                                <View className={`w-3 h-3 rounded-full mr-3 ${item.value === '1' ? 'bg-green-400' :
                                                        item.value === '2' ? 'bg-yellow-400' : 'bg-red-400'
                                                    }`} />
                                                <Text className="text-gray-800 font-montserratSemi text-base">
                                                    {item.label}
                                                </Text>
                                            </View>
                                        )}
                                        onChange={(item) => onChange(item.value)}
                                    />
                                </View>
                            )}
                        />
                        {errors.difficulty && (
                            <View className="flex-row items-center mt-2">
                                <Text className="text-red-400 text-sm font-montserratSemi ml-1">
                                    {errors.difficulty.message}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Botón mejorado */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="bg-gradient-to-r from-[#273A57] to-[#1E293B] py-5 rounded-2xl mx-2 shadow-lg"
                        style={{
                            backgroundColor: '#273A57',
                            shadowColor: '#273A57',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 8
                        }}
                    >
                        <View className="flex-row items-center justify-center">
                            <Text className="font-montserratBold text-center text-white text-xl">
                                Iniciar Juego
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    DropDown: {
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 3,
        paddingVertical: 18,
        paddingHorizontal: 10
    }
})

export default GameConfig