import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  TrophyIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getWeekDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(5, 10));
  }
  return days;
}

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHabit, setNewHabit] = useState("");
  const [goal, setGoal] = useState(3);
  const todayKey = getTodayKey();

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  function addHabit() {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabit.trim(),
        completions: {},
        streak: 0,
        goal,
      },
    ]);
    setNewHabit("");
  }

  function toggleCompletion(id) {
    const date = todayKey;
    setHabits((h) =>
      h.map((habit) => {
        if (habit.id === id) {
          const done = !habit.completions[date];
          return {
            ...habit,
            completions: {
              ...habit.completions,
              [date]: done,
            },
          };
        }
        return habit;
      })
    );
  }

  const days = getWeekDays();
  const progressData = {
    labels: days,
    datasets: habits.map((habit, idx) => ({
      label: habit.name,
      data: days.map(
        (day) => (habit.completions[`${new Date().getFullYear()}-${day}`] ? 1 : 0)
      ),
      backgroundColor: `hsl(${(idx * 60) % 360}, 85%, 60%)`,
    })),
  };

  function applyTemplate(templateName) {
    const templates = {
      "Beginner Workout": ["Push-ups", "Squats", "Jogging"],
      "Mental Toughness": ["Cold shower", "Meditation", "Wake up early"],
      "Nutrition Focus": ["Protein intake", "No sugar", "Hydration"],
    };
    const selected = templates[templateName] || [];
    const newHabits = selected.map((name) => ({
      id: Date.now() + Math.random(),
      name,
      completions: {},
      streak: 0,
      goal,
    }));
    setHabits([...habits, ...newHabits]);
  }

  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">HabitFlow</h1>
          <FireIcon className="w-10 h-10 text-orange-500 animate-pulse" />
        </header>

        <div className="mb-6">
          <input
            type="text"
            className="w-full rounded-lg px-4 py-2 text-black"
            placeholder="Add new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              min="1"
              max="7"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-20 text-black px-2 py-1 rounded"
            />
            <button
              className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              onClick={addHabit}
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" /> Add Habit
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Templates</h2>
          <div className="flex space-x-3">
            {["Beginner Workout", "Mental Toughness", "Nutrition Focus"].map(
              (t) => (
                <button
                  key={t}
                  className="bg-gray-800 border border-white px-3 py-1 rounded-md hover:bg-orange-500"
                  onClick={() => applyTemplate(t)}
                >
                  {t}
                </button>
              )
            )}
          </div>
        </div>

        <ul className="space-y-4">
          {habits.map((habit) => {
            const doneDays = Object.values(habit.completions).filter(Boolean)
              .length;
            const badge = doneDays >= habit.goal ? "🏅" : "";
            return (
              <li
                key={habit.id}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!habit.completions[todayKey]}
                      onChange={() => toggleCompletion(habit.id)}
                      className="mr-3 w-5 h-5"
                    />
                    <span className="text-lg font-semibold">{habit.name}</span>
                  </label>
                  <p className="text-sm mt-1 text-orange-300">
                    Weekly Goal: {habit.goal} | Completed: {doneDays} {badge}
                  </p>
                </div>
                <TrophyIcon className="w-6 h-6 text-yellow-400" />
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Weekly Progress</h2>
          <Bar data={progressData} options={{ responsive: true }} />
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          "Train like a beast. Rest like a champ. Repeat."
        </footer>
      </div>
    </div>
  );
}