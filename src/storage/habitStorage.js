import AsyncStorage from '@react-native-async-storage/async-storage';

const HABIT_KEY = 'habits';

export const getHabits = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HABIT_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
  }
};

export const saveHabit = async (habits) => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(HABIT_KEY, jsonValue);
  } catch (e) {
    console.error(e);
  }
};
