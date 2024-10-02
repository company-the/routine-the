import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
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
  textFieldsConfig: TextFieldConfig[];
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const PopUpWindow: React.FC<PopUpWindowProps> = ({
  visible,
  textFieldsConfig,
  title = 'Add New Task',
  icon = <Ionicons name="add-circle" size={24} color="black" />,
  children,
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
          className={'flex-1 justify-center'}
        >
          <Animated.View
            style={[
              cn('bg-white rounded-lg p-5 shadow-lg'),
              animatedModalStyle,
              { width: '95%' },
            ]}
          >
            <ScrollView>
              <View className={'w-full'}>
                <View className={'flex-row justify-between items-center mb-4'}>
                  <Text className={'text-xl font-semibold'}>{title}</Text>
                  {icon}
                </View>

                {textFieldsConfig.map((fieldConfig, index) => (
                  <View
                    key={index}
                    className={
                      (widthClasses[fieldConfig.width || 'large'], 'mb-3')
                    }
                  >
                    <TextInput
                      className={'border border-gray-300 p-3 rounded-md'}
                      placeholder={fieldConfig.placeholder}
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>
                ))}

                {children}
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

export default PopUpWindow;
