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
  isCompact?: boolean;
  onThreeDotsPress?: (item: Task) => void;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  notes?: string;
  group?: string;
  groupColor?: string;
  icon?: React.ReactNode;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item,
  isActive,
  isVisible,
  isCompact,
  onThreeDotsPress,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const redBoxWidth = useSharedValue(0);
  const greenBoxWidth = useSharedValue(0);

  const { formatDistance } = require('date-fns');

  const resetSliding = useCallback(() => {
    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
    redBoxWidth.value = withTiming(0, { duration: 200 });
    greenBoxWidth.value = withTiming(0, { duration: 200 });
    setIsSliding(false);
  }, [translateX, redBoxWidth, greenBoxWidth]);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [isVisible, opacity, scale]);

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: withTiming(collapsed ? 70 : 160, {
      duration: collapsed ? 400 : 600,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

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

  const handleGestureEvent = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      if (!isCompact) {
        const translationX = event.nativeEvent.translationX;
        if (Math.abs(translationX) > 15) {
          setIsSliding(true);
          translateX.value = translationX;

          if (translationX > 0) {
            greenBoxWidth.value = Math.min(translationX, 120);
          } else if (translationX < 0) {
            redBoxWidth.value = Math.min(-translationX, 120);
          }
        }
      }
    },
    [isCompact, greenBoxWidth, redBoxWidth, translateX]
  );

  const handleStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      if (
        event.nativeEvent.state === State.END ||
        event.nativeEvent.state === State.CANCELLED
      ) {
        resetSliding();
      }
    },
    [resetSliding]
  );

  const animatedTaskStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const useBoxStyle = (boxWidth: any, color: string) =>
    useAnimatedStyle(() => ({
      width: boxWidth.value,
      height: collapsed ? 70 : 160,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      [color === 'red' ? 'right' : 'left']: 0,
      borderTopLeftRadius: color === 'green' ? 12 : 0,
      borderBottomLeftRadius: color === 'green' ? 12 : 0,
      borderTopRightRadius: color === 'red' ? 12 : 0,
      borderBottomRightRadius: color === 'red' ? 12 : 0,
      zIndex: 1,
    }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const toggleCollapse = () => {
    if (!isSliding && !isCompact) {
      setCollapsed((prev) => !prev);
    }
  };

  const DeleteBoxStyle = useBoxStyle(redBoxWidth, 'red');
  const DoneBoxStyle = useBoxStyle(greenBoxWidth, 'green');

  return (
    <Animated.View
      style={[
        cn(
          'relative overflow-hidden my-0.5 mx-4 px-4 py-3 bg-white rounded-lg shadow-md',
          'w-full h-40'
        ),
        animatedHeightStyle,
        animatedContainerStyle,
        isActive && { opacity: 0.7 },
      ]}
    >
      {!isCompact ? (
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleStateChange}
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
            <View className="relative w-8 h-8 justify-center items-center mr-2">
              {item.icon}
            </View>

            <TouchableOpacity onPress={toggleCollapse} className="flex-1">
              <Text className="text-lg font-bold text-black">{item.title}</Text>
              {collapsed ? (
                <Text className="text-gray-600">
                  {calculateTimeLeft(item.dueDate)}
                </Text>
              ) : (
                <Text className="text-gray-600">Due date: {item.dueDate}</Text>
              )}

              {!collapsed && (
                <View className="mt-2">
                  {item.notes && (
                    <View className="flex-row items-center mb-1">
                      <Ionicons
                        name="document-text-outline"
                        size={18}
                        color="#888"
                      />
                      <Text className="ml-1 text-sm text-gray-600">
                        Notes: {item.notes}
                      </Text>
                    </View>
                  )}
                  {item.group && (
                    <View className="flex-row items-center">
                      <Ionicons name="people-outline" size={18} color="#888" />
                      <Text className="ml-1 text-sm text-gray-600">
                        Group: {item.group}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="px-2"
              onPress={() => onThreeDotsPress?.(item)}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>

            <Animated.View
              style={[
                cn('absolute -right-4 w-3'),
                animatedHeightStyle,
                { backgroundColor: item.groupColor },
              ]}
            />
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <View className="flex-row items-center justify-between h-full rounded-lg bg-white px-2 py-1">
          <View className="relative w-6 h-6 justify-center items-center mr-2">
            {item.icon}
          </View>

          <View className="flex-1 pr-2">
            <Text
              className="text-sm font-bold text-black"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text
              className="text-gray-600 text-xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {calculateTimeLeft(item.dueDate)}
            </Text>
          </View>

          <TouchableOpacity
            className="px-1"
            onPress={() => onThreeDotsPress?.(item)}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="black" />
          </TouchableOpacity>

          <Animated.View
            style={[
              cn('absolute -right-4 w-3'),
              animatedHeightStyle,
              { backgroundColor: item.groupColor },
            ]}
          />
        </View>
      )}

      {!isCompact && (
        <>
          <Animated.View style={DoneBoxStyle}>
            <Ionicons name="checkmark" size={24} color="white" />
          </Animated.View>
          <Animated.View style={DeleteBoxStyle}>
            <Ionicons name="trash" size={24} color="white" />
          </Animated.View>
        </>
      )}
    </Animated.View>
  );
};

export default TaskItem;
