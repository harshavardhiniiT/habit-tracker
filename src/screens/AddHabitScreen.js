import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddHabitScreen({ route, navigation }) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    const habit = {
      id: Date.now(),
      name,
      frequency: parseInt(frequency),
      weight: parseFloat(weight),
    };

    route.params.addHabit(habit);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Habit Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Frequency per Day:</Text>
      <TextInput style={styles.input} value={frequency} onChangeText={setFrequency} keyboardType="numeric" />

      <Text style={styles.label}>Weight:</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />

      <Button title="Save Habit" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 4 },
});
