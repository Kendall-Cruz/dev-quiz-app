import { useCategoryStore } from '@/hooks/storage/useCategoryStore';
import { View, Text, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { ICategory } from '@/interfaces/ICategory';
import { IScoreBoardData } from '@/interfaces/IScoreBoardData';
import { getTopTenUsers } from '@/services/UserScoreService';
import ScoreTable from '@/components/ScoreTable';


const ScoreBoard = () => {
    const { categories } = useCategoryStore();
    const [level, setLevel] = useState<number | null>(null);
    const [topTen, setTopTen] = useState<IScoreBoardData[] | null>(null);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);

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

    useEffect(() => {
        if (level && currentCategory) {
            fetchTopTen(currentCategory, level);
        }
    }, [level]);

    return (
        <View className="bg-[#1E293B]">
            <Header title="Puntuaciones" />
            <Carousel
                width={Dimensions.get("window").width}
                data={categories}
                renderItem={({ item }) => (
                    <>
                        <View
                            key={item.category}
                            className="flex-row justify-center items-center text-center p-10"
                        >
                            <Text className="text-2xl text-white text-center font-semibold">
                                {item.category}
                            </Text>
                            <Image source={{ uri: item.icon }} className="w-8 h-8 mx-1" />
                        </View>

                        {/* Niveles */}
                        <View className="flex-row justify-center bg-white/10 py-3 mx-5 rounded">
                            <TouchableOpacity
                                className={`border-b py-1 px-5 mx-2 ${level === 1 ? "bg-green-500/40" : "bg-black/20"
                                    }`}
                                onPress={() => setLevel(1)}
                            >
                                <Text className="text-white m-1 text-base">Fácil</Text>
                            </TouchableOpacity>

                            <View className="justify-center mx-1">
                                <Text className="text-white">|</Text>
                            </View>

                            <TouchableOpacity
                                className={`border-b py-1 px-5 mx-2 ${level === 2 ? "bg-green-500/40" : "bg-black/20"
                                    }`}
                                onPress={() => setLevel(2)}
                            >
                                <Text className="text-white m-1 text-base">Intermedio</Text>
                            </TouchableOpacity>

                            <View className="justify-center mx-1">
                                <Text className="text-white">|</Text>
                            </View>

                            <TouchableOpacity
                                className={`border-b py-1 px-5 mx-2 ${level === 3 ? "bg-green-500/40" : "bg-black/20"
                                    }`}
                                onPress={() => setLevel(3)}
                            >
                                <Text className="text-white m-1 text-base">Difícil</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Tabla */}
                        <ScoreTable topTenList={topTen || []} />
                    </>
                )}
                onSnapToItem={(index) => onCategoryChange(categories[index])}
            />
        </View>
    );
};

export default ScoreBoard
/*
const ScoreBoard = () => {
   const { categories } = useCategoryStore();
   const [level , setLevel] = useState();
   const [topTen , setTopTen] = useState<IScoreBoardData[] | null>();

   const onCategoryChange = async (category: ICategory) => {
       setTopTen(null);
       let topTenUsers = await getTopTenUsers(category._id , level!)
       setTopTen(topTenUsers);
   }

   return (
       <View className='bg-[#1E293B]'>
           <Header title='Puntuaciones' />
           <Carousel
               width={Dimensions.get('window').width}
               data={categories}
               renderItem={({ item }) => (
                   <>
                       <View key={item.category} className="flex-row justify-center items-center text-center p-10">
                           <Text className='text-2xl text-white text-center font-semibold'>{item.category}</Text>
                           <Image source={{ uri: item.icon }} className='w-8 h-8 mx-1' />
                       </View>
                       <View className='flex-row justify-center bg-white/10 py-3 mx-5 rounded'>
                           <TouchableOpacity className='border-b bg-black/20 py-1 px-5 mx-2' focusable={true}><Text className='text-white m-1 text-base'>Facíl</Text></TouchableOpacity>
                           <View className="justify-center mx-1">
                               <Text className="text-white">|</Text>
                           </View>
                           <TouchableOpacity className='border-b bg-black/20 py-1 px-5 mx-2'><Text className='text-white m-1 text-base'>Intermedio</Text></TouchableOpacity>
                           <View className="justify-center mx-1">
                               <Text className="text-white">|</Text>
                           </View>
                           <TouchableOpacity className='border-b bg-black/20 py-1 px-5 mx-2'><Text className='text-white m-1 text-base'>Dificíl</Text></TouchableOpacity>
                       </View>
                       <ScoreTable topTenList={topTen || []}></ScoreTable>
                   </>



               )}
               onSnapToItem={(index) => {onCategoryChange(categories[index])}}
           />



       </View>
   );
};


export default ScoreBoard;  */

