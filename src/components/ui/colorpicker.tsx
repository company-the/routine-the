import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cn } from '../../lib/utils';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  setSelectedColor,
}) => {
  return (
    <View>
      <Text style={cn('text-lg mb-2')}>Select Color</Text>
      <View style={cn('flex-row flex-wrap mb-3')}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            style={[
              cn('w-8 h-8 rounded-full mr-2 mb-2'),
              selectedColor === color ? cn('border-2 border-black') : {},
              { backgroundColor: color },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;
