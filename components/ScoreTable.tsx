import { View, Text, FlatList, ScrollView } from "react-native";
import { IScoreBoardData } from "@/interfaces/IScoreBoardData";

interface Props {
    topTenList: IScoreBoardData[];
}

const ScoreTable = ({ topTenList }: Props) => {
    return (
        <View className="bg-white rounded-sm mx-5 my-3 shadow-lg">
            {/* Header */}
            <View className="bg-gray-300 px-4 py-3">
                <View className="flex-row items-center">
                    <Text className="flex-1 text-gray-800 font-bold text-lg">Ranking</Text>
                    <Text className="text-gray-800 font-bold">Puntuación</Text>
                </View>
            </View>

            {topTenList.length !== 0 ? (
                <FlatList
                    data={topTenList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View className={`flex-row items-center py-3 px-4 ${index !== topTenList.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            {/* Posición */}
                            <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
                                <Text className={`font-bold ${
                                    index === 0 ? 'text-[#e6c403]' : 
                                    index === 1 ? 'text-[#6a83a8]' : 
                                    index === 2 ? 'text-[#CD7F32]' : 
                                    'text-gray-700'
                                }`}>
                                    {index + 1}
                                </Text>
                            </View>

                            {/* Nombre usuario */}
                            <Text className="flex-1 text-gray-800 text-base">
                                {item.username}
                            </Text>

                            {/* Score */}
                            <View className="bg-blue-50 rounded-lg px-3 py-1">
                                <Text className="text-blue-700 font-semibold text-right">
                                    {item.maxScore}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View className="py-8 px-4">
                    <View className="items-center">
                        <Text className="text-center text-base text-gray-600">
                            No hay puntuaciones disponibles de momento
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ScoreTable