import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '../../lib/utils';
import { getCalendarMonth } from '../../utils/get-calendar-month';
import ArrowIcon from '../icons/arrow';
import IconButton from './icon-button';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const calendarData = getCalendarMonth(currentYear, currentMonth);

const CalendarSmall = ({ className, onPress }: { className?: string; onPress: () => void }) => {
  return (
    <View style={cn('bg-black/90 w-full h-auto rounded-3xl p-3', className)}>
      <View className='flex flex-col items-center gap-2'>
        <View className='flex flex-row justify-around w-full'>
          <View className='flex flex-row items-center'>
            <IconButton icon={<ArrowIcon className='-rotate-90' />} onPress={() => console.log('Pressed')} />
            <View className='flex flex-row gap-3 mx-16'>
              <Text className='text-white text-xl font-bold'>{calendarData.monthName}</Text>
              <Text className='text-white text-xl font-bold'>{currentYear.toString()}</Text>
            </View>
            <IconButton icon={<ArrowIcon className='rotate-90' />} onPress={() => console.log('Pressed')} />
          </View>
        </View>
        <View className='flex flex-row flex-wrap gap-1 items-center justify-start pl-2'>
          {calendarData.days.map((day) => (
            <Pressable
              key={day}
              style={cn('flex items-center justify-center h-11 w-11 bg-white rounded-xl')}
              onPress={onPress}
            >
              <Text className='text-black/90 font-bold'>{day}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CalendarSmall;
