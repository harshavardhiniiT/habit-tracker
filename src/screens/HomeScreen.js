import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getHabits, saveHabit } from '../storage/habitStorage';
import HabitListItem from '../components/HabitListItem';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = await getHabits();
      setHabits(storedHabits);
    };
    fetchHabits();
  }, []);

  const addHabit = async (habit) => {
    const newHabits = [...habits, habit];
    setHabits(newHabits);
    await saveHabit(newHabits);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      <Button
        title="Add Habit"
        onPress={() => navigation.navigate('AddHabit', { addHabit })}
      />
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HabitListItem habit={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
});
