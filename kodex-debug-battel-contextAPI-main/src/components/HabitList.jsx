import { useContext } from "react";
import { HabitContext, useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useContext(HabitContext);

  const today = new Date().toISOString().split("T")[0];

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length;

  const progressPercent =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  const topCategory =
    habits.reduce((acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + 1;
      return acc;
    }, {});
  

  // const mainFocus = Object.keys(topCategory).reduce((a, b) =>
  //   topCategory[a] < topCategory[b] ? a : b,
  // );
  const mainFocus =
  Object.keys(topCategory).length > 0
    ? Object.keys(topCategory).reduce((a, b) =>
        topCategory[a] < topCategory[b] ? a : b
      )
    : "";

  if (habits.length === 0) {
    return null;
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="max-w-md mx-auto mt-6 px-4 pb-20">
      {/* DAILY PROGRESS CARD */}
<div className="bg-white shadow rounded-xl p-4 mb-4 border-none space-y-4">
  <p className="text-xs text-gray-500">DAILY PROGRESS</p>

  {/* Top Row */}
  <div className="flex justify-between items-center">
    <h2 className="text-lg font-semibold">
      {completedToday === habits.length && habits.length > 0
        ? "Great Job 🎉"
        : "Keep going 💪"}
    </h2>

    <span className="text-sm text-gray-500">
      {completedToday}/{habits.length}
    </span>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-gray-200 h-2 rounded">
    <div
      className="bg-blue-600 h-2 rounded transition-all duration-300"
      style={{
        width: `${
          habits.length > 0
            ? (completedToday / habits.length) * 100
            : 0
        }%`,
      }}
    ></div>
  </div>

  {/* 🔥 NEW SECTION (Focus + Priority) */}
  <div className="flex justify-between border-t  pt-3">
    {/* Focus */}
    <div>
      <p className="text-xs text-gray-500">FOCUS</p>
      <p className="font-medium capitalize">
        {mainFocus || "N/A"}
      </p>
    </div>

    {/* Priority */}
    <div className="text-right">
      <p className="text-xs text-gray-500">PRIORITY</p>
      <p className="font-medium">
        {
          habits.filter((h) => h.priority === "high").length
        }{" "}
        High Tasks
      </p>
    </div>
  </div>
</div>
      <div className="space-y-3">
        {visibleHabits.map((habit, index) => (
          <HabitItem key={index} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default HabitList;