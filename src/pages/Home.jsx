import { useState } from 'react';
import { Play, Search, Dumbbell } from 'lucide-react';
import { CATEGORIES } from '../data/workouts';
import WorkoutGrid from '../components/WorkoutGrid';
import useFilteredWorkouts from '../components/useFilteredWorkouts';

export default function Home({ onOpen }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const items = useFilteredWorkouts(query, category);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium text-primary">ขยับอีกนิด สุขภาพดีอีกหน่อย</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">พร้อมเริ่มต้นสุขภาพดีหรือยัง?</h2>
        <p className="text-sm text-slate-500 mt-1">ชุมชนเข้มแข็ง สร้างแรงผลักดัน</p>
      </div>

      {/* Hero banner */}
      <section className="bg-accent rounded-3xl p-6 sm:p-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-primary font-semibold">YOUR FIRST STEP</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-2">ออกได้ที่บ้าน วันละ 30 นาที</h3>
          <p className="text-sm text-slate-500 mt-1">ไม่ต้องเก่งก่อนเริ่ม แค่เริ่มก็เก่งขึ้นแล้ว</p>
          <button
            onClick={() => items[0] && onOpen(items[0])}
            className="mt-4 inline-flex items-center gap-2 bg-primary text-white text-sm font-medium rounded-full px-5 py-2.5"
          >
            เริ่มขยับกันเลย <Play size={14} />
          </button>
        </div>
        <div className="hidden sm:flex w-32 h-32 shrink-0 rounded-full bg-blue-100 text-primary items-center justify-center">
          <Dumbbell size={52} />
        </div>
      </section>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาท่าออกกำลังกายที่ใช่สำหรับคุณ"
          className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl pl-11 pr-4 py-3.5 text-sm outline-none focus:ring-2 ring-primary"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm shadow-sm transition ${
              category === c.id ? 'bg-primary text-white font-medium' : 'bg-white text-primary'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <h3 className="text-lg font-semibold">ท่าแนะนำสำหรับคุณ</h3>
        <span className="text-xs text-slate-500">{items.length} ท่าเริ่มต้น</span>
      </div>
      <WorkoutGrid items={items} onOpen={onOpen} />
    </div>
  );
}
