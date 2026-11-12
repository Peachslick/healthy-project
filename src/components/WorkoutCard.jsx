import { Clock, Play } from 'lucide-react';
import { LEVELS, formatPlan, totalMinutes } from '../data/workouts';
import WorkoutImage from './WorkoutImage';

export default function WorkoutCard({ workout, onOpen }) {
  return (
    <div
      onClick={() => onOpen(workout)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sm:p-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="relative">
        <WorkoutImage workout={workout} className="w-full aspect-video rounded-xl" />
        <span className="absolute top-2 left-2 text-xs bg-white text-emerald-700 rounded-full px-2.5 py-1">
          {LEVELS[workout.level]}
        </span>
      </div>
      <p className="mt-3 text-xs text-primary">{workout.nameEn}</p>
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold">{workout.name}</h3>
        <button
          aria-label={`ดูรายละเอียด ${workout.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(workout);
          }}
          className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center hover:bg-primary hover:text-white transition"
        >
          <Play size={16} />
        </button>
      </div>
      <p className="mt-1 text-sm font-medium text-slate-700">{formatPlan(workout)}</p>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
        <Clock size={13} /> ~{totalMinutes(workout)} นาที / {workout.equipment}
      </p>
    </div>
  );
}
