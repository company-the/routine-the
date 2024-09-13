import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

interface LargeButtonProps {
  onPress: () => void;
  buttonText?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  onPress,
  buttonText = 'Add Task',
  icon = <Ionicons name="add-circle-outline" size={24} color="white" />,
  containerClassName,
  textClassName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={cn(
        'flex-row items-center justify-center bg-black rounded-full shadow-md w-34 h-14',
        containerClassName
      )}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <Text style={cn('ml-2 text-white font-bold', textClassName)}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LargeButton;
