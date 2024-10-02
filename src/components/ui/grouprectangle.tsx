import React from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { cn } from '../../lib/utils';

interface GroupRectangleProps {
  text: string;
  color: string;
  onSelect: (id: string) => void;
  id: string;
  selectedGroupId: string | null;
}

const GroupRectangle: React.FC<GroupRectangleProps> = ({
  text,
  color,
  id,
  selectedGroupId,
  onSelect,
}) => {
  const isSelected = id === selectedGroupId;
  const opacityAnim = new Animated.Value(isSelected ? 1 : 0.5);

  const handlePressIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onSelect(id)}
        style={[
          cn(
            `py-2 px-4 rounded-md flex justify-center items-center`,
            isSelected ? 'border-2 border-black' : ''
          ),
          { backgroundColor: color },
        ]}
      >
        <Text className={'text-white font-semibold text-sm'}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GroupRectangle;
