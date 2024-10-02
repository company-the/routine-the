import React from 'react';
import { View, ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

interface ListItemProps {
  viewableItems: SharedValue<ViewToken[]>;
  item: any;
  children: React.ReactNode;
  horizontal?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  viewableItems,
  item,
  children,
  horizontal = false,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value.some(
      (viewableItem) =>
        viewableItem.isViewable && viewableItem.item.id === item.id
    );

    if (!horizontal) {
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          { scale: withTiming(isVisible ? 1 : 0.6, { duration: 500 }) },
        ],
      };
    } else {
      return {
        opacity: 1,
        transform: [{ translateX: 0 }],
      };
    }
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <View className="flex items-center justify-center">{children}</View>
    </Animated.View>
  );
};

export default ListItem;
