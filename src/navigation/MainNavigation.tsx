import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TodoListScreen from '../app/[locale]/todolist/page';
import CalendarScreen from '../app/[locale]/calendar/page';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="TodoList">
        <Tab.Screen name="TodoList" component={TodoListScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
