import React from 'react';
import { ViewToken } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import TaskItem, { Task } from './task';

type ListItemProps = {
  viewableItems: SharedValue<ViewToken[]>;
  item: Task;
};

const ListItem: React.FC<ListItemProps> = ({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((viewableItem) => viewableItem.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, [viewableItems.value]);

  return (
    <Animated.View style={rStyle}>
      <TaskItem item={item} isVisible={Boolean(viewableItems.value)} />
    </Animated.View>
  );
};

export { ListItem };
