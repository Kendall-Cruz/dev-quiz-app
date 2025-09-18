import { useCategoryStore } from '@/hooks/storage/useCategoryStore';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import Header from '@/components/Header';
import { useEffect, useState, useRef } from 'react';
import { ICategory } from '@/interfaces/ICategory';
import { IScoreBoardData } from '@/interfaces/IScoreBoardData';
import { getTopTenUsers } from '@/services/UserScoreService';
import ScoreTable from '@/components/ScoreTable';


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
                            <View
                                key={item.category}
                                className="flex-row justify-center items-center text-center p-10"
                            >
                                <Text className="text-2xl text-white text-center font-montserratSemi">
                                    {item.category}
                                </Text>
                                <Image source={{ uri: item.icon }} className="w-8 h-8 mx-1" />
                            </View>

                            <View className='flex-row justify-center bg-white rounded-sm px-3 py-4 mx-5 shadow-lg'>
                                <TouchableOpacity
                                    className={`py-3 px-5 mx-2 rounded-sm ${level === 1 ? "bg-[#273A57]" : "bg-gray-300"}`}
                                    onPress={() => setLevel(1)}
                                >
                                    <Text className={`text-center font-montserratSemi text-base ${level === 1 ? "text-white" : "text-gray-700"}`}>
                                        Fácil
                                    </Text>
                                </TouchableOpacity>

                                <View className="h-px bg-gray-200 mx-4 my-2" />

                                <TouchableOpacity
                                    className={`py-3 px-5 mx-2 rounded-sm ${level === 2 ? "bg-[#273A57]" : "bg-gray-300"}`}
                                    onPress={() => setLevel(2)}
                                >
                                    <Text className={`text-center font-montserratSemi text-base ${level === 2 ? "text-white" : "text-gray-700"}`}>
                                        Intermedio
                                    </Text>
                                </TouchableOpacity>

                                <View className="h-px bg-gray-200 mx-4 my-2" />

                                <TouchableOpacity
                                    className={`py-3 px-5 mx-2 rounded-sm ${level === 3 ? "bg-[#273A57]" : "bg-gray-300"}`}
                                    onPress={() => setLevel(3)}
                                >
                                    <Text className={`text-center font-montserratSemi text-base ${level === 3 ? "text-white" : "text-gray-700"}`}>
                                        Difícil
                                    </Text>
                                </TouchableOpacity>
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
