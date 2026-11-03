# HabitFlow

A habit tracker for workouts and daily routines, built with React. Add your own habits or start from a template, check them off each day, and see your week in a chart.

**Live demo:** https://habitflow-athletic.vercel.app/

![HabitFlow screenshot](screenshot.png)

## Tech Stack

- React 18
- Tailwind CSS
- Chart.js with react-chartjs-2
- Heroicons
- Browser localStorage

## Features

- Add habits with a weekly goal
- Check off habits for today
- Start from templates: Beginner Workout, Mental Toughness and Nutrition Focus
- Get a workout plan for each day from Monday to Saturday
- See the last 7 days in a progress chart
- Keep your data in the browser, with no account or backend

## How It Works

The app is a single React component. Habits live in state and are saved to localStorage whenever they change. Each habit stores its completions by date, and the weekly chart reads from those dates.

## What I Learned

The biggest lesson from this project is not to jump straight into coding. Building goes better when you follow a process:

1. **Get a clear picture first.** Decide what you're building and how it should work before writing code. For HabitFlow, that means knowing what each habit stores, how a day gets checked off, and what the weekly chart should show.
2. **Build toward that picture.** With the goal clear, each piece of code has a purpose.
3. **Make small changes along the way.** The plan doesn't have to be perfect. Minor changes here and there are fine, as long as the overall picture stays the same.

The duplicate workout plan listed below shows why this matters. What should happen when the page loads a second time is the kind of question to answer before coding.

## Known Issues and Next Steps

- The daily workout plan is added again on every page load, which creates duplicates
- The app only lets you check off today, so past days can't be corrected
- Add a way to delete habits
- Add tests

## Run It

```bash
npm install
npm start
```

Then open http://localhost:3000.
