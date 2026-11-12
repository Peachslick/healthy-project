import { useState } from 'react';
import { Check, Clock, Flame, ListChecks, Play, Sparkles } from 'lucide-react';
import { PROGRAMS, workouts, formatPlan, totalMinutes } from '../data/workouts';
import WorkoutImage from '../components/WorkoutImage';

const byId = Object.fromEntries(workouts.map((w) => [w.id, w]));

export default function WorkoutPage({ onOpen, onStartProgram }) {
  const [selected, setSelected] = useState(['jumpingjack', 'squat', 'pushup']);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const customWorkouts = selected.map((id) => byId[id]).filter(Boolean);
  const customMinutes = customWorkouts.reduce((sum, w) => sum + totalMinutes(w), 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium text-primary">WORKOUT PROGRAMS</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">โปรแกรมออกกำลังกายจัดเซ็ต</h2>
        <p className="text-sm text-slate-500 mt-1">
          เลือกคอร์สสำเร็จรูปแล้วกดเริ่ม ระบบจะรันต่อเนื่องทีละท่าจนจบ หรือจัดตารางของคุณเองด้านล่าง
        </p>
      </div>

      {/* Preset Programs */}
      <section className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {PROGRAMS.map((p) => {
          const list = p.workoutIds.map((id) => byId[id]).filter(Boolean);
          const mins = list.reduce((s, w) => s + totalMinutes(w), 0);
          return (
            <div
              key={p.id}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium bg-accent text-primary rounded-full px-3 py-1">
                    {p.badge}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={13} /> ~{mins} นาที · {list.length} ท่า
                  </span>
                </div>

                <div>
                  <p className="text-xs text-primary">{p.subtitle}</p>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                </div>

                <ul className="space-y-2 pt-1">
                  {list.map((w, i) => (
                    <li
                      key={w.id}
                      onClick={() => onOpen(w)}
                      className="flex items-center gap-3 p-2 rounded-2xl bg-surface hover:bg-accent/60 cursor-pointer transition"
                    >
                      <span className="w-6 h-6 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                        {i + 1}
                      </span>
                      <WorkoutImage workout={w} className="w-12 h-9 rounded-lg shrink-0" emojiSize="text-xl" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{w.name}</p>
                        <p className="text-[11px] text-slate-500">{formatPlan(w)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onStartProgram({ title: p.title, queue: list })}
                className="w-full h-11 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <Play size={16} /> เริ่มคอร์สนี้ ({list.length} ท่า)
              </button>
            </div>
          );
        })}
      </section>

      {/* Custom Routine Builder */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ListChecks size={20} className="text-primary" /> จัดตารางออกกำลังกายเอง
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ติ๊กเลือกท่าที่ต้องการฝึกวันนี้ตามลำดับ แล้วกดเริ่มทำต่อเนื่องได้ทันที
            </p>
          </div>
          {customWorkouts.length > 0 && (
            <span className="text-xs bg-accent text-primary font-medium rounded-full px-3 py-1.5 flex items-center gap-1">
              <Flame size={14} /> เลือกแล้ว {customWorkouts.length} ท่า (~{customMinutes} นาที)
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workouts.map((w) => {
            const order = selected.indexOf(w.id);
            const active = order !== -1;
            return (
              <div
                key={w.id}
                onClick={() => toggle(w.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                  active ? 'border-primary bg-accent/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                    active ? 'bg-primary text-white' : 'border border-slate-300 text-transparent'
                  }`}
                >
                  {active ? order + 1 : <Check size={14} />}
                </div>
                <WorkoutImage workout={w} className="w-14 h-10 rounded-xl shrink-0" emojiSize="text-2xl" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{w.name}</p>
                  <p className="text-xs text-slate-500">{formatPlan(w)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          disabled={customWorkouts.length === 0}
          onClick={() =>
            onStartProgram({
              title: `ตารางของฉัน (${customWorkouts.length} ท่า)`,
              queue: customWorkouts,
            })
          }
          className="w-full sm:w-auto px-6 h-12 rounded-full bg-primary text-white text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Sparkles size={16} /> เริ่มตารางของฉัน ({customWorkouts.length} ท่า · ~{customMinutes} นาที)
        </button>
      </section>
    </div>
  );
}
