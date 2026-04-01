

import { useState, useEffect } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  useEffect(() => {
    setEditData(habit);
  }, [habit]);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates?.includes(today);

  const handleSave = () => {
    updateHabit(habit.id, {
      ...habit,
      ...editData,
    });
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 border-none space-y-3">
      {editing ? (
        <div className="space-y-2">
          {/* Name */}
          <input
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="w-full border-none px-2 py-1 rounded"
          />

          {/* Goal + Unit */}
          <div className="flex gap-2">
            <input
              type="number"
              value={editData.goalValue}
              onChange={(e) =>
                setEditData({ ...editData, goalValue: e.target.value })
              }
              className="w-1/2 border px-2 py-1 rounded"
            />

            <select
              value={editData.unit}
              onChange={(e) =>
                setEditData({ ...editData, unit: e.target.value })
              }
              className="w-1/2 border px-2 py-1 rounded"
            >
              <option>Minutes</option>
              <option>Pages</option>
              <option>Reps</option>
              <option>Litre</option>
            </select>
          </div>

          {/* Date + Category */}
          <div className="flex gap-2">
            <input
              type="date"
              value={editData.startDate}
              onChange={(e) =>
                setEditData({ ...editData, startDate: e.target.value })
              }
              className="w-1/2 border px-2 py-1 rounded"
            />

            <select
              value={editData.category}
              onChange={(e) =>
                setEditData({ ...editData, category: e.target.value })
              }
              className="w-1/2 border px-2 py-1 rounded"
            >
              <option>Health</option>
              <option>Focus</option>
              <option>Growth</option>
              <option>Mindset</option>
              <option>Motivation</option>
            </select>
          </div>

          {/* Priority */}
          <div className="flex gap-3 text-sm">
            {["low", "medium", "high"].map((p) => (
              <label key={p}>
                <input
                  type="radio"
                  value={p}
                  checked={editData.priority === p}
                  onChange={(e) =>
                    setEditData({ ...editData, priority: e.target.value })
                  }
                />{" "}
                {p}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Normal View */}
          <h2 className="font-semibold">{habit.name}</h2>

          <p className="text-sm text-gray-500">
            {habit.goalValue} {habit.unit}
          </p>

          <p className="text-xs  ">
           <span className=" font-bold text-blue-600">{habit.category}</span> • <span className={`font-semibold ${habit.priority=='high'?'bg-red-600':'bg-amber-50'} ${habit.priority=='medium'?'bg-orange-300':'bg-amber-50'} ${habit.priority=='low'?'bg-green-600':'bg-amber-50'} text-white px-1.5`}>{habit.priority}</span> 
          </p>

          <div className="flex justify-between mt-2">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteHabit(habit.id)} className="hover:text-red-600">Delete</button>
            <button onClick={() => toggleHabit(habit.id)} className="bg-blue-700 px-4 text-taupe-50 font-bold py-2.5 rounded">
              {isDoneToday ? "Done" : "Complete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HabitItem;