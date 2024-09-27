import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  containerClassName,
  inputClassName,
  buttonClassName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const iconAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(iconAnimation, {
      toValue: searchQuery.length > 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const rotateIcon = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View
      style={cn(
        'flex-row items-center rounded-full h-10 border border-gray-300 w-72 bg-white',
        containerClassName
      )}
    >
      <TextInput
        style={cn(
          'flex-1 pl-4 text-sm text-gray-700 bg-white rounded-l-full h-full',
          inputClassName
        )}
        placeholder={placeholder ? placeholder : 'Search...'}
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
      />

      <TouchableOpacity
        onPress={searchQuery.length > 0 ? handleClearSearch : undefined}
        style={cn(
          'h-full justify-center items-center w-10 bg-white rounded-r-full',
          buttonClassName
        )}
      >
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          {searchQuery.length > 0 ? (
            <Ionicons name="close-circle" size={22} color="black" />
          ) : (
            <Ionicons name="search" size={22} color="black" />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
