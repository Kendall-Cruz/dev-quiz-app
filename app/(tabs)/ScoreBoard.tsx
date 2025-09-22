import { useCategoryStore } from '@/hooks/storage/useCategoryStore';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import Header from '@/components/Header';
import { useEffect, useState, useRef } from 'react';
import { ICategory } from '@/interfaces/ICategory';
import { IScoreBoardData } from '@/interfaces/IScoreBoardData';
import { getTopTenUsers } from '@/services/UserScoreService';
import ScoreTable from '@/components/ScoreTable';
import LevelButton from '@/components/LevelButton';


const ScoreBoard = () => {
    const { categories } = useCategoryStore();
    const [level, setLevel] = useState<number | null>(null);
    const [topTen, setTopTen] = useState<IScoreBoardData[] | null>(null);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    const carouselRef = useRef<any>(null);

    const fetchTopTen = async (category: ICategory, level: number) => {
        setTopTen(null);
        const topTenUsers = await getTopTenUsers(category._id, level);
        console.log(topTenUsers)
        setTopTen(topTenUsers);
    };

    const onCategoryChange = (category: ICategory) => {
        setCurrentCategory(category);
        if (level) fetchTopTen(category, level);
    };


    //Se tiene que cargar la primera categoría cuando se renden
    useEffect(() => {
        if (categories.length > 0) {
            setLevel(1);
            setCurrentCategory(categories[0]);
            fetchTopTen(categories[0], level!);
        }
    }, [categories]);


    useEffect(() => {
        if (level && currentCategory) {
            fetchTopTen(currentCategory, level);
        }
    }, [level]);

    return (
        <SafeAreaView>
            <View className="bg-[#1E293B]">
                <Header title="Puntuaciones" />
                <Carousel
                    ref={carouselRef}
                    width={Dimensions.get("window").width}
                    data={categories}
                    renderItem={({ item }) => (
                        <>
                            <View className="bg-[#273A57] mx-4 mt-4 rounded-t-xl">
                                <View className="flex-row justify-between items-center p-6">
                                    {/* Espaciador izquierdo */}
                                    <View className="w-4" />

                                    {/* Contenido central */}
                                    <View className="flex-row items-center">
                                        <Text className="text-2xl text-white text-center font-montserratSemi">
                                            {item.category} a
                                        </Text>
                                        <Image source={{ uri: item.icon }} className="w-8 h-8 mx-2" />
                                    </View>

                                    {/* Icono de swipe a la derecha */}
                                    {categories.length > 1 ? (
                                        <Image
                                            source={require('../../assets/images/swipe-icon.png')}
                                            className="w-8 h-8"
                                            style={{ tintColor: '#00c6ff' }}
                                        />
                                    ) : (
                                        <View className="w-4" />
                                    )}
                                </View>
                            </View>
                            <View className="flex-row bg-white rounded-b-xl px-3 py-4 mx-4">
                                <LevelButton
                                    label="Fácil"
                                    levelValue={1}
                                    currentLevel={level}
                                    onPress={setLevel}
                                />
                                <LevelButton
                                    label="Intermedio"
                                    levelValue={2}
                                    currentLevel={level}
                                    onPress={setLevel}
                                />
                                <LevelButton
                                    label="Difícil"
                                    levelValue={3}
                                    currentLevel={level}
                                    onPress={setLevel}
                                />
                            </View>

                            {/* Tabla */}
                            {topTen === null ? (
                                <View className="flex justify-center items-center py-10">
                                    <ActivityIndicator size="large" color="#00c6ff" />
                                    <Text className="text-white mt-3">Cargando...</Text>
                                </View>
                            ) : (
                                <ScoreTable topTenList={topTen} />
                            )}
                        </>
                    )}
                    onSnapToItem={(index) => onCategoryChange(categories[index])}
                />
            </View>
        </SafeAreaView>

    );
};

export default ScoreBoard
