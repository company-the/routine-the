import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export interface NavBarProps {
  navTabs: string[];
  defaultTab: string;
}

const NavBar: React.FC<NavBarProps> = ({ navTabs, defaultTab }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);

  return (
    <View className="flex-row justify-between py-2 px-5 items-center bg-gray-200 h-fit">
      {navTabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
          <Text
            className={`text-lg ${
              selectedTab === tab ? 'text-black font-bold' : 'text-gray-500'
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavBar;
