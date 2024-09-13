import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

interface TextFieldConfig {
  placeholder: string;
}

interface Group {
  name: string;
  color: string;
}

interface AddTaskModalUIProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  showDatePicker?: boolean;
  showGroupSelector?: boolean;
  textFieldsConfig: TextFieldConfig[];
  existingGroups?: Group[];
  title?: string;
  icon?: React.ReactNode;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const colors = [
  '#FF6347',
  '#FFD700',
  '#90EE90',
  '#87CEFA',
  '#FF69B4',
  '#CD5C5C',
  '#C7CEEA',
];

const PopUpWindow: React.FC<AddTaskModalUIProps> = ({
  visible,
  onClose,
  onSave,
  showDatePicker = false,
  showGroupSelector = false,
  textFieldsConfig,
  existingGroups = [],
  title = 'Add New Task',
  icon = <Ionicons name="add-circle" size={24} color="black" />,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>('');

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  useEffect(() => {
    if (visible) {
      setDate(null);
      setSelectedColor(null);
      setSelectedGroup(null);
      setNewGroupName('');

      opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(100, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

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

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleSelectGroup = (groupName: string) => {
    setSelectedGroup(groupName);
    setSelectedColor(null);
  };

  const handleCreateNewGroup = (text: string) => {
    setNewGroupName(text);
    setSelectedGroup(null);
    if (text) {
      setSelectedColor(colors[0]);
    }
  };

  return (
    <Modal visible={visible} transparent>
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          animatedBackgroundStyle,
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Animated.View
            className="w-11/12 bg-white rounded-lg p-5 shadow-lg"
            style={animatedModalStyle}
          >
            <ScrollView>
              <StyledView className="w-full">
                <StyledView className="flex-row justify-between items-center mb-4">
                  <StyledText className="text-xl font-semibold">
                    {title}
                  </StyledText>
                  {icon}
                </StyledView>

                {textFieldsConfig.map((fieldConfig, index) => (
                  <StyledTextInput
                    key={index}
                    className="border border-gray-300 p-3 mb-3 rounded-md"
                    placeholder={fieldConfig.placeholder}
                    placeholderTextColor="#A0A0A0"
                  />
                ))}

                {showDatePicker && (
                  <StyledTouchableOpacity
                    className="border border-gray-300 p-3 mb-3 rounded-md flex-row items-center"
                    onPress={showDatePickerModal}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#A0A0A0"
                      className="mr-2"
                    />
                    <StyledText className="text-gray-600 ml-2">
                      {date ? date.toDateString() : 'Select deadline'}
                    </StyledText>
                  </StyledTouchableOpacity>
                )}
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={hideDatePickerModal}
                />

                {showGroupSelector && (
                  <>
                    <StyledText className="text-lg mb-2">
                      Select Group
                    </StyledText>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <StyledView className="flex-row mb-3">
                        {existingGroups.map((group) => (
                          <TouchableOpacity
                            key={group.name}
                            onPress={() => handleSelectGroup(group.name)}
                            className={`py-2 px-4 rounded-lg mr-2 ${
                              selectedGroup === group.name
                                ? 'border-2 border-gray-600 shadow-lg'
                                : ''
                            }`}
                            style={{
                              backgroundColor: group.color,
                            }}
                          >
                            <StyledText className="text-white font-bold text-sm">
                              {group.name}
                            </StyledText>
                          </TouchableOpacity>
                        ))}
                      </StyledView>
                    </ScrollView>

                    <StyledTextInput
                      className="border border-gray-300 p-3 mb-3 rounded-md"
                      placeholder="Create New Group"
                      value={newGroupName}
                      onChangeText={handleCreateNewGroup}
                      placeholderTextColor="#A0A0A0"
                    />

                    {newGroupName && (
                      <>
                        <StyledText className="text-lg mb-2">
                          Select Color
                        </StyledText>
                        <StyledView className="flex-row flex-wrap mb-3">
                          {colors.map((color) => (
                            <TouchableOpacity
                              key={color}
                              onPress={() => setSelectedColor(color)}
                              className={`w-8 h-8 rounded-full mr-2 mb-2 ${
                                selectedColor === color
                                  ? 'border-2 border-black'
                                  : ''
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </StyledView>
                      </>
                    )}
                  </>
                )}

                <StyledView className="flex-row justify-between mt-4">
                  <StyledTouchableOpacity
                    className="bg-black py-3 px-4 rounded-md flex-1 mr-2 justify-center items-center"
                    onPress={onClose}
                  >
                    <StyledText className="text-white font-bold text-center">
                      Cancel
                    </StyledText>
                  </StyledTouchableOpacity>
                  <StyledTouchableOpacity
                    className="bg-white border border-black py-3 px-4 rounded-md flex-1 ml-2 justify-center items-center"
                    onPress={onSave}
                  >
                    <StyledText className="text-black font-bold text-center">
                      Save
                    </StyledText>
                  </StyledTouchableOpacity>
                </StyledView>
              </StyledView>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

export default PopUpWindow;
