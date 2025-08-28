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
                <View className=" mt-12 justify-center px-6">

                    {/* Categoría */}
                    <Text className="text-white mb-2 text-lg font-semibold">Categoría</Text>
                    <Controller
                        control={control}
                        name="category"
                        rules={{ required: 'Debe seleccionar una categoría' }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={styles.DropDown}
                                data={categories}
                                labelField="category"
                                valueField="_id"
                                value={value}
                                placeholder="Selecciona la categoría"
                                renderItem={(item) => (
                                    <View className="flex-row items-center p-2">
                                        <Image source={{ uri: item.icon }} className="w-6 h-6 mr-2 rounded-full" />
                                        <Text>{item.category}</Text>
                                    </View>
                                )}
                                onChange={(item) => onChange(item._id)}
                            />
                        )}
                    />
                    {errors.category && (
                        <Text className='text-red-500 text-base ml-1'>{errors.category.message}</Text>
                    )}

                    {/* Dificultad */}
                    <Text className="text-white mb-2 text-lg mt-10 font-semibold">Dificultad</Text>
                    <Controller
                        control={control}
                        name="difficulty"
                        rules={{ required: 'Debe seleccionar la dificultad' }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={styles.DropDown}
                                data={[
                                    { label: 'Fácil', value: '1' },
                                    { label: 'Intermedio', value: '2' },
                                    { label: 'Difícil', value: '3' }
                                ]}
                                labelField="label"
                                valueField="value"
                                value={value}
                                placeholder="Selecciona una dificultad"
                                onChange={(item) => onChange(item.value)}
                            />
                        )}
                    />
                    {errors.difficulty && (
                        <Text className='text-red-500 text-base ml-1'>{errors.difficulty.message}</Text>
                    )}
                    {/* Botón */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="bg-blue-500 py-4 rounded-md mx-5 mt-14"
                    >
                        <Text className="text-center text-white font-bold text-xl">
                            Iniciar Juego
                        </Text>
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
        paddingVertical: 12,
        paddingHorizontal: 4
    }
})

export default GameConfig