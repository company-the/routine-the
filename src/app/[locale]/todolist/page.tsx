import React from 'react';
import { View } from 'react-native';
import NavBar from '../../../components/ui/navbar';
import SearchBar from '../../../components/ui/search';
import { ToDoListNavbarProps } from '../../../staticdata/todolist-navbar';

const TodoListScreen = () => {
  return (
    <View className="bg-white">
      <NavBar
        navTabs={ToDoListNavbarProps.navTabs}
        defaultTab={ToDoListNavbarProps.defaultTab}
      />
      <View className="mt-4 ml-4 ">
        <SearchBar placeholder="Search for tasks" />
      </View>
    </View>
  );
};

export default TodoListScreen;
