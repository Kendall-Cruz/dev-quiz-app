import { View, Text, FlatList, ScrollView } from "react-native";
import { IScoreBoardData } from "@/interfaces/IScoreBoardData";

interface Props {
    topTenList: IScoreBoardData[];
}

const ScoreTable = ({ topTenList }: Props) => {
    return (
        <View className="bg-white rounded-xl mx-4 my-3 mt-6 shadow-lg overflow-hidden">
            {/* Header */}
            <View className="bg-[#273A57] px-4 py-4">
                <View className="flex-row items-center">
                    <Text className="flex-1 text-white font-montserratSemi text-lg">Ranking</Text>
                    <Text className="text-white font-montserratSemi text-base">Puntuación</Text>
                </View>
            </View>

            {topTenList.length !== 0 ? (
                <FlatList
                    data={topTenList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View className={`flex-row items-center py-4 px-4 ${index !== topTenList.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            {/* Posición */}
                            <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                                index === 0 ? 'bg-yellow-100 border-2 border-yellow-300' :
                                index === 1 ? 'bg-gray-100 border-2 border-gray-300' :
                                index === 2 ? 'bg-orange-100 border-2 border-orange-300' :
                                'bg-[#273A57]'
                            }`}>
                                <Text className={`font-montserratSemi text-base ${
                                    index === 0 ? 'text-yellow-600' : 
                                    index === 1 ? 'text-gray-600' : 
                                    index === 2 ? 'text-orange-600' : 
                                    'text-white'
                                }`}>
                                    {index + 1}
                                </Text>
                            </View>

                            {/* Nombre usuario */}
                            <Text className="flex-1 text-gray-800 font-montserratSemi text-base">
                                {item.username}
                            </Text>

                            {/* Score */}
                            <View className="bg-[#273A57] rounded-lg px-4 py-2">
                                <Text className="text-white font-montserratSemi text-base">
                                    {item.maxScore}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View className="py-8 px-4">
                    <View className="items-center">
                        <Text className="text-center text-base text-gray-600 font-montserratSemi">
                            No hay puntuaciones disponibles de momento
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ScoreTable