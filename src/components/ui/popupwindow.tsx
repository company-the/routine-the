import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { cn } from '../../lib/utils';

interface TextFieldConfig {
  placeholder: string;
  width?: 'small' | 'medium' | 'large';
}

interface PopUpWindowProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  textFieldsConfig: TextFieldConfig[];
  DatePickerComponent: React.ReactNode;
  HorizontalListComponent: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
}

const PopUpWindow: React.FC<PopUpWindowProps> = ({
  visible,
  onClose,
  onSave,
  textFieldsConfig,
  DatePickerComponent,
  HorizontalListComponent,
  title = 'Add New Task',
  icon = <Ionicons name="add-circle" size={24} color="black" />,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(100, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const widthClasses = {
    small: 'w-1/3',
    medium: 'w-2/3',
    large: 'w-full',
  };

  return (
    <Modal visible={visible} transparent>
      <Animated.View
        style={[
          cn('flex-1 justify-center items-center bg-black bg-opacity-50'),
          animatedBackgroundStyle,
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={cn('flex-1 justify-center')}
        >
          <Animated.View
            style={[
              cn('bg-white rounded-lg p-5 shadow-lg'),
              animatedModalStyle,
              { width: '95%' },
            ]}
          >
            <ScrollView>
              <View style={cn('w-full')}>
                <View style={cn('flex-row justify-between items-center mb-4')}>
                  <Text style={cn('text-xl font-semibold')}>{title}</Text>
                  {icon}
                </View>

                {textFieldsConfig.map((fieldConfig, index) => (
                  <TextInput
                    key={index}
                    style={cn(
                      'border border-gray-300 p-3 mb-3 rounded-md',
                      widthClasses[fieldConfig.width || 'large'],
                      'w-full'
                    )}
                    placeholder={fieldConfig.placeholder}
                    placeholderTextColor="#A0A0A0"
                  />
                ))}

                {DatePickerComponent}

                {HorizontalListComponent}

                <View style={cn('flex-row justify-between mt-4')}>
                  <TouchableOpacity
                    style={cn(
                      'bg-black py-3 px-4 rounded-md flex-1 mr-2 justify-center items-center'
                    )}
                    onPress={onClose}
                  >
                    <Text style={cn('text-white font-bold text-center')}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={cn(
                      'bg-white border border-black py-3 px-4 rounded-md flex-1 ml-2 justify-center items-center'
                    )}
                    onPress={onSave}
                  >
                    <Text style={cn('text-black font-bold text-center')}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

export default PopUpWindow;
