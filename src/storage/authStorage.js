import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'user_data';

export const saveUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(AUTH_KEY, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error(e);
  }
};
