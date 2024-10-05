import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cn } from '../../lib/utils';

interface ColorCircleProps {
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        cn(
          `h-10 w-10 rounded-full justify-center items-center`,
          isSelected ? 'border-2 border-black' : ''
        ),
        { backgroundColor: color },
      ]}
    >
      {isSelected}
    </TouchableOpacity>
  );
};

export default ColorCircle;
