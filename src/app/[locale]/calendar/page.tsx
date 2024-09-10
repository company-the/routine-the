import React from 'react';
import { View } from 'react-native';
import CalendarSmall from '../../../components/ui/calendar-small';

const CalendarScreen = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <CalendarSmall onPress={() => console.log('Pressed')}/>
    </View>
  );
};

export default CalendarScreen;
