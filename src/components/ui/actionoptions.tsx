import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';

import { cn } from '../../lib/utils';

interface ActionButtonProps {
  icon?: React.ReactNode;
  label: string;
  labelSize?: number;
  labelColor?: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: object;
  contentStyle?: object;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  labelSize = 18,
  labelColor = 'black',
  onPress,
  containerStyle = {},
  contentStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[cn('flex-row items-center justify-start py-3'), containerStyle]}
    >
      {icon && <View style={{ marginRight: 15 }}>{icon}</View>}

      <Text
        style={[
          {
            fontSize: labelSize,
            color: labelColor,
          },
          contentStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
