import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { Controller, useForm } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker';
import { useCategoryStore } from '@/hooks/storage/useCategoryStore'
import { getQuestionsByCategoryLevel } from '@/services/QuestionService'
import { useQuestionStore } from '@/hooks/storage/useQuestionStore'
import { router } from 'expo-router'
import { shuffleArray } from '../../helpers/arrayShuffle';

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
        const filteredQuestions = await getQuestionsByCategoryLevel(data.category, data.difficulty);

        setQuestionsFiltered(shuffleArray(filteredQuestions))

        router.push('/GameScreen')
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
                            <View className="bg-white rounded-md mb-2">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                >
                                    <Picker.Item label="Selecciona la categoría" value="" />
                                    {categories.map((cat) => <Picker.Item key={cat._id} label={cat.category} value={cat._id} style={{ fontWeight: 'bold' }} />)}
                                </Picker>
                            </View>
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
                            <View className="bg-white rounded-md mb-2">
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(itemValue) => onChange(itemValue)}
                                >
                                    <Picker.Item label="Selecciona una dificultad" value="" />
                                    <Picker.Item label="Fácil" value="1" />
                                    <Picker.Item label="Intermedio" value="2" />
                                    <Picker.Item label="Difícil" value="3" />
                                </Picker>
                            </View>
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

export default GameConfig