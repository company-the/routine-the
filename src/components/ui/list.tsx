import React, { useRef } from 'react';
import { FlatList, ViewToken, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import ListItem from './list_item';

interface Identifiable {
  id: string | number;
}

interface VerticalListProps<T extends Identifiable> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  horizontal?: boolean;
  gap?: number;
  bottomSpace?: number;
}

const VerticalList = <T extends Identifiable>({
  data,
  renderItem,
  horizontal = false,
  gap,
  bottomSpace,
}: VerticalListProps<T>) => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const onViewableItemsChanged = useRef(
    ({ viewableItems: viewable }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = viewable;
    }
  );

  const defaultGap = gap !== undefined ? gap : horizontal ? 20 : 10;
  const defaultBottomSpace = bottomSpace !== undefined ? bottomSpace : 50;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem
          viewableItems={viewableItems}
          item={item}
          horizontal={horizontal}
        >
          {renderItem(item)}
        </ListItem>
      )}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View
          style={horizontal ? { width: defaultGap } : { height: defaultGap }}
        />
      )}
      contentContainerStyle={{
        paddingBottom: defaultBottomSpace,
        paddingHorizontal: horizontal ? 10 : 0,
      }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  );
};

export default VerticalList;
