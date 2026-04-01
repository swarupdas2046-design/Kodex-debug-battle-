
import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();
  const { register, handleSubmit, reset,formState:{errors,isValid}} = useForm();

  const onSubmit = (data) => {
    addHabit({
      ...data,
      id: crypto.randomUUID(),
    });

    reset();
  };

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-2"
      >
        <h2 className="text-xl font-semibold">Add Habit</h2>

        {/* Habit Name */}
        <div>
          <label className="text-sm">Habit Name</label>
          <input
            {...register("name", { required: 'please enter a name' })}
            placeholder="e.g. Morning Exercise"
            className="w-full border rounded px-3 py-2 mt-1"
          />
           {errors.name&&<p className='text-red-800'>{errors.name.message}</p>}
        </div>

        {/* Goal + Unit */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-sm">Daily Goal</label>
            <input
              type="number"
              {...register("goalValue",{required:true})}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="w-1/2">
            <label className="text-sm">Unit</label>
            <select
              {...register("unit",{required:true})}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option>Minutes</option>
              <option>Pages</option>
              <option>Reps</option>
              <option>Litre</option>
            </select>
          </div>
        </div>

        {/* Date + Category */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-sm">Start Date</label>
            <input
              type="date"
              {...register("startDate",{required:true})}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="w-1/2">
            <label className="text-sm">Category</label>
            <select
              {...register("category",{required:true})}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option>Health</option>
              <option>Focus</option>
              <option>Growth</option>
              <option>Mindset</option>
              <option>Motivation</option>
            </select>
          </div>
        </div>

        {/* Motivation */}
        <div>
          <label className="text-sm">Motivation</label>
          <textarea
            {...register("motivation")}
            placeholder="Why is this important to you?"
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-medium">Priority Level</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-1">
              <input type="radio" value="low" {...register("priority")} />
              Low
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="medium" {...register("priority")} />
              Medium
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="high" {...register("priority")} />
              High
            </label>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700"
        >
          Create Habit
        </button>
      </form>
  );
};

export default HabitForm;