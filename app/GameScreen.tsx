
import { View, Text, SafeAreaView, BackHandler, Alert, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useQuestionStore } from '@/hooks/storage/useQuestionStore'
import { router } from 'expo-router'
import { IQuestion } from '../interfaces/IQuestion';
import { Audio } from 'expo-av'
import { shuffleArray } from '@/helpers/arrayShuffle';
import ModalGameResult from '@/components/ModalGameResult';
import * as Animatable from "react-native-animatable";
import { Ionicons } from '@expo/vector-icons';
import { submitScore } from '@/services/UserScoreService';
import { useUserStore } from '@/hooks/storage/useUserStore';


const GameScreen = () => {
    const { questionsFiltered, setQuestionsFiltered } = useQuestionStore()
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    const { user } = useUserStore();
    const [questionCounter, setQuestionCounter] = useState(1)
    const [score, setScore] = useState(0);
    const [showModalInfo, setShowModalInfo] = useState(false); //Modal del resultado
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


    //Efecto para cargar los sonidos 
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

    //Función para verificar la respuesta y guardar un nuevo score
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

            setTimeout(() => { //El juego funciona de la manera de que , en cada cambio de pregunta hay un pequeño tiempo de feedback
                setQuestionCounter(questionCounter + 1);
            }, 2000);
        }
    }

    //El modal de resultado final se muestra pero solo es posible cerrarlo por medio de este metodo que limpia el juego y redirije a la configuración de nuevo
    const onPressModalButton = async () => {
        if (!currentQuestion || !user) return;

        try {
            console.log("Se presionó el botón del modal")
            // Espera a que el score se guarde
            await submitScore(
                currentQuestion.categoryId,
                user._id,
                score,
                currentQuestion.level
            );

            // Limpia el juego y redirige
            cleanGame();
            setShowModalInfo(false);
            router.replace('/(tabs)/GameConfig');
        } catch (error) {
            console.error("Error guardando el score:", error);
            Alert.alert("Error", "No se pudo guardar tu puntuación. Intenta de nuevo.");
        }
    };

    const cleanGame = () => {
        setScore(0)
        setQuestionsFiltered([])
        setQuestionCounter(1)
        setCurrentQuestion(null)
    }

    return (
        <SafeAreaView className='h-full bg-[#1E293B]'>
            <ScrollView>
                <View className="mt-16 justify-center px-6">
                    <Pressable
                        onPress={() => router.replace('/(tabs)/GameConfig')}
                        className="self-start rounded-xl px-4 py-2"
                    >
                        <Ionicons name="arrow-back" size={32} color='white' />
                    </Pressable>

                    <Animatable.View className="flex-row justify-between w-full px-4 mb-6 mt-6" animation='bounceInDown'>
                        <View className=" bg-slate-700/40 rounded-xl px-4 py-2 shadow-sm">
                            <Text className="text-white text-lg font-montserrat">Modo: <Text className="font-montserratBold">{
                                currentQuestion?.level === 1 ? "Fácil" : currentQuestion?.level === 2 ? "Intermedio" : currentQuestion?.level === 3 ? "Difícil" : ""}
                            </Text></Text>
                        </View>
                        <View className=" bg-slate-700/40 rounded-xl px-4 py-2 shadow-sm">
                            <Text className="text-white text-lg font-montserrat">Puntuación: <Text className="font-montserratBold">{score}</Text></Text>
                        </View>
                    </Animatable.View>

                    <Animatable.View
                        key={currentQuestion?.question}
                        animation="bounceInDown"
                        className="bg-white rounded-lg p-6 my-6 py-20 w-full shadow-2xl border border-indigo-400 translate-y-[-5px] rotate-x-3 rotate-y-1"
                    >
                        <Text className="text-center text-gray-800 text-lg leading-relaxed font-montserratBold"
                            adjustsFontSizeToFit
                        >
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
                                delay={index * 100}
                            >
                                <TouchableOpacity
                                    key={index}
                                    disabled={!!selectedOption}
                                    activeOpacity={0.7}
                                    className={`rounded-xl py-5 px-6 mt-5 mb-3 w-full shadow-md ${optionStyle} border-blue-300 border-2`}
                                    onPress={() => checkAnswer(option)}
                                >
                                    <Text className="text-black text-center font-medium text-lg font-montserratSemi" adjustsFontSizeToFit>{option}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        )
                    })}
                    <View className='mt-8'>
                        <Text className="text-white text-lg text-center font-montserratBold">Pregunta  <Text className='text-green-300 font-montserratBold'>{questionCounter}</Text>  de  {questionsFiltered.length}</Text>
                    </View>
                </View>

                <ModalGameResult
                    correctAnswers={score}
                    wrongAnswers={questionsFiltered.length - score}
                    visible={showModalInfo} title='Resultados'
                    message='Has finalizado todas las preguntas, estos son los resultados'
                    buttonText='Regresar'
                    onPressButton={onPressModalButton} >
                </ModalGameResult>
            </ScrollView>
        </SafeAreaView>
    )
}

export default GameScreen
