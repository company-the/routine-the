import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cn } from '../../lib/utils';

interface ButtonProps {
  onPress: () => void;
  buttonText?: string;
  icon?: React.ReactNode;
  type?: 'black' | 'white';
  shape?: 'rounded' | 'square';
  width?: string | number;
  height?: string | number;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonText = 'Button',
  icon,
  type = 'black',
  shape = 'rounded',
  width = 'auto',
  height = 'auto',
  textClassName,
}) => {
  const buttonStyles = {
    black: 'bg-black',
    white: 'bg-white border border-black',
  };

  const textColorStyles = {
    black: 'text-white',
    white: 'text-black',
  };

  const shapeStyles = {
    rounded: 'rounded-full',
    square: 'rounded-md',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        cn(
          `flex-row items-center justify-center shadow-md`,
          buttonStyles[type],
          shapeStyles[shape]
        ),
        { width, height },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={cn('mr-2')}>{icon}</View>}
        <Text
          style={cn(
            'font-bold text-center',
            textColorStyles[type],
            textClassName
          )}
        >
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
