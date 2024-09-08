import React from 'react';
import { View } from 'react-native';
import NavBar from '../../../components/ui/todolist-navbar';
import { ToDoListNavbarProps } from '../../../staticdata/todolist-navbar';

const TodoListScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <NavBar
        navTabs={ToDoListNavbarProps.navTabs}
        defaultTab={ToDoListNavbarProps.defaultTab}
      />
    </View>
  );
};

export default TodoListScreen;
