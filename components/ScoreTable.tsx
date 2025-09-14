import { View, Text, FlatList } from "react-native";
import { IScoreBoardData } from "@/interfaces/IScoreBoardData";

interface Props {
    topTenList: IScoreBoardData[];
}

const ScoreTable = ({ topTenList }: Props) => {
    return (
        <View className="bg-white/10 rounded mx-5 my-3">
            <View className="flex-row border-b border-white/20 py-2 px-3">
                <Text className="flex-1 text-white font-bold">Usuario</Text>
                <Text className="w-20 text-white font-bold text-right">Score</Text>
            </View>
            {topTenList.length !== 0 ? (
                <FlatList
                    data={topTenList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View className="flex-row py-2 px-3 border-b border-white/10">
                            <Text className="flex-1 text-white flex-row">
                                <Text className={ index === 0 ? 'text-[#d4af37]' : index === 1 ? 'text-[#71d8e]' : index === 2 ? 'text-[#CD7F32]' : ''}>
                                    {index + 1}
                                </Text>
                                {" - "}{item.username}
                            </Text>
                            <Text className="w-20 text-white text-right">{item.maxScore}</Text>
                        </View>
                    )}
                />
            ) : (
                <View className="m-5">
                    <Text className="text-center text-base text-white">No hay puntuaciones disponibles de momento</Text>
                </View>
            )}
        </View>
    );
};

export default ScoreTable;
