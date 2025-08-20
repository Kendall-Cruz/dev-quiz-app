
import { View, Text, SafeAreaView, BackHandler, Alert, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuestionStore } from '@/hooks/storage/useQuestionStore'
import { router } from 'expo-router'
import { IQuestion } from '../interfaces/IQuestion';
import { goBack } from 'expo-router/build/global-state/routing';
import { Audio } from 'expo-av'
import ModalInfo from '@/components/ModalInfo';
import { shuffleArray } from '@/helpers/arrayShuffle';
import ModalGameResult from '@/components/ModalGameResult';
import * as Animatable from "react-native-animatable";


const GameScreen = () => {
    const { questionsFiltered, setQuestionsFiltered } = useQuestionStore()
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    const [questionCounter, setQuestionCounter] = useState(1)
    const [score, setScore] = useState(0);
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    //sonidos
    const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
    const [wrongSound, setWrongSound] = useState<Audio.Sound | null>(null);


    useEffect(() => {

        if (questionsFiltered) {
            if (questionCounter > questionsFiltered.length) {
                setShowModalInfo(true);
                return;
            }
            console.log(questionsFiltered.length);
            const question = questionsFiltered[questionCounter - 1];

            const shuffledOptions = shuffleArray(question.options);
            setCurrentQuestion({
                ...question,
                options: shuffledOptions,
            })

            setSelectedOption(null);
        }
        return
    }, [questionCounter])

    useEffect(() => {

        const loadSounds = async () => {
            const { sound: soundCorrect } = await Audio.Sound.createAsync(
                require('../assets/sounds/correct_answer-.mp3')
            );
            const { sound: soundWrong } = await Audio.Sound.createAsync(
                require('../assets/sounds/wrong_answer-.mp3')
            );

            setCorrectSound(soundCorrect);
            setWrongSound(soundWrong);
        };

        loadSounds();


        return () => {
            correctSound && correctSound.unloadAsync();
            wrongSound && wrongSound.unloadAsync();
        };
    }, []);

    const checkAnswer = async (answer: string) => {
        if (!currentQuestion) return

        setSelectedOption(answer);

        if (answer) {
            if (answer === currentQuestion?.correctAnswer) {
                await correctSound?.replayAsync();
                setScore(score + 1)
            }
            else {
                await wrongSound?.replayAsync();
            }

            setTimeout(() => {
                setQuestionCounter(questionCounter + 1);
            }, 2000);
        }
    }

    const onPressModalButton = () => {
        cleanGame();
        setShowModalInfo(false);
        router.replace('/(tabs)/GameConfig');
    }

    const cleanGame = () => {
        setScore(0)
        setQuestionsFiltered([])
        setQuestionCounter(1)
        setCurrentQuestion(null)
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

                <Animatable.View key={currentQuestion?.question} animation='bounceInDown' className="bg-white rounded-2xl p-6 my-6 py-20 w-full shadow-lg ">
                    <Text className="text-center text-gray-800 text-lg leading-relaxed font-medium">
                        {currentQuestion?.question}
                    </Text>
                </Animatable.View>

                {currentQuestion?.options && currentQuestion.options.map((option, index) => {


                    let optionStyle = "bg-sky-50 border border-slate-600";
                    if (selectedOption) {
                        if (option === currentQuestion.correctAnswer) {
                            optionStyle = "bg-green-500 border-green-700"; // correcta verde
                        } else if (option === selectedOption) {
                            optionStyle = "bg-red-500 border-red-700"; // incorrecta  rojo
                        } else {
                            optionStyle = "bg-gray-200 border-gray-400"; // las demás gris 
                        }
                    }
                    return (
                        <Animatable.View
                            key={option}
                            animation="bounceIn"
                            delay={index * 100} // efecto escalonado
                        >
                            <TouchableOpacity
                                key={index}
                                disabled={!!selectedOption}
                                activeOpacity={0.7}
                                className={`rounded-xl py-5 px-6 mt-5 mb-3 w-full shadow-md ${optionStyle} border-blue-300 border-2`}
                                onPress={() => checkAnswer(option)}
                            >
                                <Text className="text-black text-center font-medium text-base">{option}</Text>
                            </TouchableOpacity>

                        </Animatable.View>

                    )
                })}

            </View>
            <View className='mt-8'>
                <Text className="text-white text-lg text-center">Pregunta  <Text className='text-green-300'>{questionCounter}</Text>  de  {questionsFiltered.length}</Text>
            </View>
            <ModalGameResult
                correctAnswers={score}
                wrongAnswers={questionsFiltered.length - score}
                visible={showModalInfo} title='Resultados'
                message='Has finalizado todas las preguntas, estos son los resultados'
                buttonText='Regresar'
                onPressButton={onPressModalButton} >

            </ModalGameResult>

        </SafeAreaView>
    )
}

export default GameScreen
