import React, { useRef } from 'react';
import { FlatList, ViewToken, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Task } from './task';
import { ListItem } from './list_item';

interface TaskListProps {
  tasks: Task[];
  customIcon: React.ReactNode;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, customIcon }) => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = vItems;
    }
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          viewableItems={viewableItems}
          customIcon={customIcon}
        />
      )}
      onViewableItemsChanged={onViewableItemsChanged.current}
      scrollEventThrottle={16}
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
};

export default TaskList;
