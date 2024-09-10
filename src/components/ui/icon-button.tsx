import { Pressable } from "react-native";
import { cn } from "../../lib/utils";

interface IIconButton {
  icon: React.ReactNode;
  onPress: () => void;
  className?: string;
}

const IconButton = ({icon, onPress, className}: IIconButton) => {
  return (
    <Pressable style={cn(`bg-transparent`, className)} onPress={onPress}>
        {icon}
    </Pressable>
  );
};

export default IconButton;
