import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

export interface SortButtonProps {
  containerClassName?: string;
  buttonClassName?: string;
  optionsClassName?: string;
}

interface SortOptionProps {
  option: string;
  isSelected: boolean;
  onPress: () => void;
}

const SortOption: React.FC<SortOptionProps> = ({
  option,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={cn(
      `h-10 justify-center px-4 border-b border-gray-300 ${
        isSelected ? 'bg-gray-200' : 'bg-white'
      }`
    )}
  >
    <Text
      style={cn('text-center text-sm', isSelected ? 'font-bold' : undefined)}
    >
      {option}
    </Text>
  </TouchableOpacity>
);

const SortButton: React.FC<SortButtonProps> = ({
  containerClassName,
  buttonClassName,
  optionsClassName,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('Custom');
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const options = ['Custom', 'Closest', 'Furthest', 'Group'];

  const toggleDropdown = () => {
    if (showDropdown) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowDropdown(false));
    } else {
      setShowDropdown(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 160,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  const arrowRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={cn('relative w-18', containerClassName)}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={cn(
          'flex-row justify-between items-center bg-black px-2 rounded-full h-9',
          buttonClassName
        )}
      >
        <Text style={cn('text-white font-bold text-sm')}>Sort</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <Ionicons name="chevron-down" size={16} color="white" />
        </Animated.View>
      </TouchableOpacity>
      {showDropdown && (
        <Animated.View
          style={[
            { height: animatedHeight },
            cn(
              'absolute top-10 w-18 bg-white rounded-lg border shadow-lg overflow-hidden z-50 border-gray-300',
              optionsClassName
            ),
          ]}
        >
          {options.map((option) => (
            <SortOption
              key={option}
              option={option}
              isSelected={selectedOption === option}
              onPress={() => handleOptionSelect(option)}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default SortButton;
