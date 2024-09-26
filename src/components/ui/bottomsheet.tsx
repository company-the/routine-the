import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { styled } from 'nativewind';
import { cn } from '../../lib/utils';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  containerClassName?: string;
  backgroundColor?: string;
  borderRadius?: string;
  height?: number;
}

const screenHeight = Dimensions.get('window').height;

const StyledView = styled(View);

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  containerClassName,
  backgroundColor = 'bg-gray-200',
  borderRadius = 'rounded-t-3xl',
  height = screenHeight * 0.4,
}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const animateModalIn = () => {
    Animated.parallel([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateModalOut = () => {
    Animated.parallel([
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(height);
      animateModalIn();
    } else {
      animateModalOut();
    }
  }, [visible, height]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        translateY.setValue(Math.max(0, gestureState.dy));
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          animateModalOut();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={animateModalOut}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: backgroundOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            transform: [{ translateY }],
            height: height,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <StyledView
          style={cn(
            `${backgroundColor} ${borderRadius} p-5 shadow-lg h-full`,
            containerClassName
          )}
        >
          <View className={'items-center mb-4'}>
            <View className={'w-12 h-1.5 bg-gray-400 rounded-full'} />
          </View>

          {children}
        </StyledView>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
