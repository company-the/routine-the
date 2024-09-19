import React, { useState, useCallback, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

interface TaskItemProps {
  item: Task;
  isActive?: boolean;
  isVisible: boolean;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  notes?: string;
  group?: string;
  groupColor?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, isActive, isVisible }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const redBoxWidth = useSharedValue(0);
  const greenBoxWidth = useSharedValue(0);

  const maxBoxWidth = 120;
  const slideThreshold = 15;

  const { formatDistance } = require('date-fns');

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [isVisible]);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(collapsed ? 70 : 160, {
        duration: collapsed ? 400 : 600,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const calculateTimeLeft = (dueDate: string) => {
    try {
      const dueDateObj = new Date(dueDate);
      if (isNaN(dueDateObj.getTime())) {
        return 'Invalid date';
      }
      return formatDistance(dueDateObj, new Date(), { addSuffix: true });
    } catch (error) {
      console.error('Error calculating time left:', error);
      return 'Invalid date';
    }
  };

  const onGestureEvent = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      const translationX = event.nativeEvent.translationX;

      if (Math.abs(translationX) > slideThreshold) {
        setIsSliding(true);
        translateX.value = translationX;

        if (translationX > 0) {
          greenBoxWidth.value = Math.min(translationX, maxBoxWidth);
        } else if (translationX < 0) {
          redBoxWidth.value = Math.min(-translationX, maxBoxWidth);
        }
      }
    },
    [maxBoxWidth, translateX, greenBoxWidth, redBoxWidth, slideThreshold]
  );

  const onEnd = useCallback(() => {
    translateX.value = withSpring(0, {
      damping: 20,
      stiffness: 200,
    });
    redBoxWidth.value = withTiming(0, { duration: 200 });
    greenBoxWidth.value = withTiming(0, { duration: 200 });
    setIsSliding(false);
  }, [translateX, redBoxWidth, greenBoxWidth]);

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (
        event.nativeEvent.state === State.END ||
        event.nativeEvent.state === State.CANCELLED
      ) {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        });
        redBoxWidth.value = withTiming(0, { duration: 200 });
        greenBoxWidth.value = withTiming(0, { duration: 200 });
        setIsSliding(false);
      }
    },
    [translateX, redBoxWidth, greenBoxWidth]
  );

  const animatedTaskStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const DeleteBoxStyle = useAnimatedStyle(() => {
    return {
      width: redBoxWidth.value,
      height: collapsed ? 70 : 160,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      zIndex: 1,
    };
  });

  const DoneBoxStyle = useAnimatedStyle(() => {
    return {
      width: greenBoxWidth.value,
      height: collapsed ? 70 : 160,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      zIndex: 1,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const toggleCollapse = () => {
    if (!isSliding) {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <Animated.View
      style={[
        cn(
          'relative overflow-hidden my-0.125rem mx-4 px-4 py-5 bg-white rounded-lg shadow-md'
        ),
        animatedHeightStyle,
        animatedContainerStyle,
        isActive && { opacity: 0.7 },
      ]}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onEnd}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
        failOffsetY={[-5, 5]}
      >
        <Animated.View
          style={[
            cn(
              'flex-row items-center justify-between h-full rounded-lg bg-white'
            ),
            animatedTaskStyle,
          ]}
        >
          <View
            className={'relative w-2rem h-2rem justify-center items-center'}
          >
            {item.iconName && item.iconSize && item.iconColor && (
              <Ionicons
                name={item.iconName}
                size={item.iconSize}
                color={item.iconColor}
              />
            )}
          </View>

          <TouchableOpacity onPress={toggleCollapse} style={cn('flex-1')}>
            <Text className={'text-lg font-bold text-black'}>{item.title}</Text>
            {collapsed ? (
              <Text style={cn('text-gray-600')}>
                {calculateTimeLeft(item.dueDate)}
              </Text>
            ) : (
              <Text style={cn('text-gray-600')}>Due date: {item.dueDate}</Text>
            )}

            {!collapsed && (
              <View style={cn('mt-2')}>
                {item.notes && (
                  <View className={'flex-row items-center mb-1'}>
                    <Ionicons
                      name="document-text-outline"
                      size={18}
                      color="#888"
                    />
                    <Text className={'ml-1 text-sm text-gray-600'}>
                      Notes: {item.notes}
                    </Text>
                  </View>
                )}
                {item.group && (
                  <View className={'flex-row items-center'}>
                    <Ionicons name="people-outline" size={18} color="#888" />
                    <Text className={'ml-1 text-sm text-gray-600'}>
                      Group: {item.group}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity className={'px-2'}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>

          <Animated.View
            style={[
              cn('absolute right--4 w-[12px]'),
              animatedHeightStyle,
              { backgroundColor: item.groupColor },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>

      <Animated.View style={DoneBoxStyle}>
        <Ionicons name="checkmark" size={24} color="white" />
      </Animated.View>

      <Animated.View style={DeleteBoxStyle}>
        <Ionicons name="trash" size={24} color="white" />
      </Animated.View>
    </Animated.View>
  );
};

export default TaskItem;
