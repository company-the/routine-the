import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

interface DatePickerComponentProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  date,
  setDate,
  placeholder = 'Select deadline',
  size = 'medium',
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePickerModal = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePickerModal = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePickerModal();
  };

  const sizeClasses = {
    small: 'p-2 text-sm',
    medium: 'p-3 text-base',
    large: 'p-4 text-lg',
  };

  return (
    <>
      <TouchableOpacity
        style={cn(
          'border border-gray-300 mb-3 rounded-md flex-row items-center self-start bg-white ',
          sizeClasses[size]
        )}
        onPress={showDatePickerModal}
      >
        <Ionicons
          name="calendar-outline"
          size={size === 'large' ? 24 : size === 'medium' ? 20 : 16}
          color="black"
          style={{ marginRight: 8 }}
        />
        <Text className="text-gray-600">
          {date ? date.toDateString() : placeholder}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePickerModal}
      />
    </>
  );
};

export default DatePickerComponent;
