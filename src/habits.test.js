import { addMissingHabits, dedupeHabits } from "./habits";

test("adding the same plan twice does not create duplicates", () => {
  const once = addMissingHabits([], ["Squats", "Plank"], 3);
  const twice = addMissingHabits(once, ["Squats", "Plank"], 3);
  expect(twice.map((habit) => habit.name)).toEqual(["Squats", "Plank"]);
});

test("existing habits keep their progress", () => {
  const habits = [{ id: 1, name: "Squats", completions: { "2026-11-03": true }, streak: 0, goal: 3 }];
  const result = addMissingHabits(habits, ["Squats", "Plank"], 3);
  expect(result[0]).toBe(habits[0]);
  expect(result).toHaveLength(2);
});

test("merging duplicates keeps completions from every copy", () => {
  const result = dedupeHabits([
    { id: 1, name: "Squats", completions: { "2026-11-02": true }, streak: 0, goal: 3 },
    { id: 2, name: "Squats", completions: { "2026-11-03": true }, streak: 0, goal: 3 },
    { id: 3, name: "Plank", completions: {}, streak: 0, goal: 3 },
  ]);
  expect(result.map((habit) => habit.name)).toEqual(["Squats", "Plank"]);
  expect(result[0].completions).toEqual({ "2026-11-02": true, "2026-11-03": true });
});
