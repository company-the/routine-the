import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';

interface Item {
  name: string;
  color: string;
}

interface HorizontalListProps {
  items: Item[];
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
}

const HorizontalList: React.FC<HorizontalListProps> = ({
  items,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <View>
      <Text style={cn('text-lg mb-2')}>Select Item</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={cn('flex-row mb-3')}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => setSelectedItem(item.name)}
              style={[
                cn(
                  'py-2 px-4 rounded-lg mr-2',
                  selectedItem === item.name
                    ? 'border-2 border-gray-600 shadow-lg'
                    : ''
                ),
                { backgroundColor: item.color },
              ]}
            >
              <Text style={cn('text-white font-bold text-sm')}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HorizontalList;
