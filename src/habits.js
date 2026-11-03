// Adds habits from a plan or template, skipping names that already exist.
export function addMissingHabits(habits, names, goal) {
  const existing = new Set(habits.map((habit) => habit.name));
  const added = names
    .filter((name) => !existing.has(name))
    .map((name) => ({
      id: Date.now() + Math.random(),
      name,
      completions: {},
      streak: 0,
      goal,
    }));
  return [...habits, ...added];
}

// Merges saved habits that share a name, keeping all of their completions.
export function dedupeHabits(habits) {
  const byName = new Map();
  habits.forEach((habit) => {
    const match = byName.get(habit.name);
    if (match) {
      match.completions = { ...match.completions, ...habit.completions };
    } else {
      byName.set(habit.name, { ...habit });
    }
  });
  return [...byName.values()];
}
