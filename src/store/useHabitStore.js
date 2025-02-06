import { create } from 'zustand';

const useHabitStore = create((set) => ({
  habits: [],

  addHabit: (name) =>
    set((state) => ({
      habits: [
        ...state.habits,
        { id: Date.now(), name, streak: 0, score: 0, completed: false },
      ],
    })),

  toggleHabit: (id) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              streak: habit.completed ? habit.streak - 1 : habit.streak + 1,
              score: habit.completed ? habit.score - 10 : habit.score + 10,
            }
          : habit
      ),
    })),

  deleteHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),
}));

export default useHabitStore;
