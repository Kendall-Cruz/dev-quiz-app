import { View, Text, SafeAreaView, BackHandler, Alert, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuestionStore } from '@/hooks/storage/useQuestionStore'
import { router } from 'expo-router'
import { IQuestion } from '../interfaces/IQuestion';
import { goBack } from 'expo-router/build/global-state/routing';

const GameScreen = () => {
    const { questionsFiltered } = useQuestionStore()
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    const [questionCounter, setQuestionCounter] = useState(1)
    const [score, setScore] = useState(0)


    useEffect(() => {

        if (questionsFiltered) {
            if (questionCounter >= 20) {
                Alert.alert("se acabarpm las preguntas")
            }
            setCurrentQuestion(questionsFiltered[questionCounter - 1]);
        }

        return


    }, [questionCounter])


    const checkAnswer = (answer: string) => {
        if (answer) {
            if (answer === currentQuestion?.correctAnswer) {
                Alert.alert('Respuesta correcta')
                setScore(score + 1)
                setQuestionCounter(questionCounter + 1);

            }
            else {
                Alert.alert('Respuesta incorrecta')
                setQuestionCounter(questionCounter + 1);
            }
        }
    }


    return (
        <SafeAreaView className='h-full bg-[#1E293B]'>
            <View className="mt-16 justify-center px-6">
                <Pressable
                    onPress={() => router.replace('/(tabs)/GameConfig')}
                    className="self-start mb-4 bg-slate-700/40 rounded-xl px-4 py-2"
                >
                    <Text className='text-white font-medium'>← Volver</Text>
                </Pressable>

                <View className="flex-row justify-between w-full px-4 mb-6 mt-6">
                    <View className=" bg-slate-700/40 rounded-xl px-4 py-2 shadow-sm">
                        <Text className="text-white text-lg">Modo: <Text className="font-bold">Fácil</Text></Text>
                    </View>
                    <View className=" bg-slate-700/40 rounded-xl px-4 py-2 shadow-sm">
                        <Text className="text-white text-lg">Puntuación: <Text className="font-bold">{score}</Text></Text>
                    </View>
                </View>

                <View className="bg-white rounded-2xl p-6 my-6 py-20 w-full shadow-lg">
                    <Text className="text-center text-gray-800 text-lg leading-relaxed font-medium">
                        {currentQuestion?.question}
                    </Text>
                </View>

                {currentQuestion?.options && currentQuestion.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        className="bg-sky-50 hover:bg-slate-600 rounded-xl py-5 px-6 mt-5 mb-3 w-full shadow-md border border-slate-600 active:scale-98 transition-all"
                        onPress={() => checkAnswer(option)}
                    >
                        <Text className="text-black text-center font-medium text-base">{option}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl py-5 px-6 mb-3 w-full shadow-md active:scale-98 transition-all"
                    onPress={() => setQuestionCounter(questionCounter + 1)}
                >
                    <Text className="text-white text-center font-semibold">Next Question</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GameScreen
