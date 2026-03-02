import { TouchableOpacity, Text } from "react-native";

interface LevelButtonProps {
  label: string;
  levelValue: number;
  currentLevel: number | null;
  onPress: (level: number) => void;
}

const LevelButton = ({ label, levelValue, currentLevel, onPress }: LevelButtonProps) => {
  const isActive = currentLevel === levelValue;

  return (
    <TouchableOpacity
      className={`flex-1 py-3 mx-1 rounded-lg ${isActive ? "bg-[#273A57]" : "bg-gray-200"}`}
      onPress={() => onPress(levelValue)}
    >
      <Text
        className={`text-center font-montserratSemi text-base ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default LevelButton;
