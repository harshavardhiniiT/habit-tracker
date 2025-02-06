import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import useHabitStore from "../../src/store/useHabitStore";

export default function HomeScreen() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabitStore();
  const [habitName, setHabitName] = useState("");
  const [duration, setDuration] = useState(""); // New state for duration
  const [days, setDays] = useState([]); // New state for selected days

  const toggleDay = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>

      {/* Input to Add Habit */}
      <TextInput
        style={styles.input}
        placeholder="Enter new habit"
        value={habitName}
        onChangeText={setHabitName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      {/* Days Selector */}
      <View style={styles.daysContainer}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <TouchableOpacity key={day} onPress={() => toggleDay(day)}>
            <Text style={[styles.day, days.includes(day) && styles.selectedDay]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Add Habit"
        onPress={() => {
          if (habitName.trim() && duration.trim() && days.length > 0) {
            addHabit(habitName, parseInt(duration), days);
            setHabitName("");
            setDuration("");
            setDays([]);
          }
        }}
      />

      {/* Habit List */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitText}>
              {item.name} - {item.duration} min ({item.days.join(", ")}) Streak: {item.streak}, Score: {item.score}
            </Text>
            <TouchableOpacity onPress={() => toggleHabit(item.id)}>
              <Text style={styles.completeButton}>{item.completed ? "✅" : "⬜"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteHabit(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  habitItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 1 },
  habitText: { fontSize: 16 },
  completeButton: { fontSize: 20, marginHorizontal: 10 },
  deleteButton: { fontSize: 20, color: "red" },
  daysContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  day: { margin: 5, padding: 10, borderWidth: 1, borderRadius: 5 },
  selectedDay: { backgroundColor: "lightblue" },
});

