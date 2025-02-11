import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

export default function HabitListItem({ habit, deleteHabit }) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text>Frequency: {habit.frequency}</Text>
      <Text>Weight: {habit.weight}</Text>
      <ProgressBar progress={habit.weight / 5} />
      <Button title="Delete" onPress={() => deleteHabit(habit.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
