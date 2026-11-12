import { AlertTriangle, ExternalLink, Lightbulb, Play, Target, Timer, X } from 'lucide-react';
import { LEVELS, formatPlan } from '../data/workouts';
import WorkoutImage from './WorkoutImage';

export default function WorkoutDetail({ workout, onClose, onStart }) {
  const { plan } = workout;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(workout.videoSearch)}`;

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-xl"
      >
        <div className="relative">
          <WorkoutImage workout={workout} className="w-full aspect-video" emojiSize="text-7xl" />
          <button onClick={onClose} aria-label="ปิด" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs text-primary">{workout.nameEn} · {LEVELS[workout.level]}</p>
            <h2 className="text-2xl font-bold">{workout.name}</h2>
            <p className="text-sm text-slate-500 mt-2">{workout.description}</p>
          </div>

          {/* Recommended plan */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-accent rounded-2xl py-3">
              <p className="text-xs text-slate-500">เซ็ต</p>
              <p className="text-lg font-bold text-primary">{plan.sets}</p>
            </div>
            <div className="bg-accent rounded-2xl py-3">
              <p className="text-xs text-slate-500">{plan.reps ? 'ครั้ง/เซ็ต' : 'วินาที/เซ็ต'}</p>
              <p className="text-lg font-bold text-primary">{plan.reps || plan.holdSeconds}</p>
            </div>
            <div className="bg-accent rounded-2xl py-3">
              <p className="text-xs text-slate-500">พักระหว่างเซ็ต</p>
              <p className="text-lg font-bold text-primary">{plan.restSeconds} วิ</p>
            </div>
          </div>

          <p className="flex items-center gap-2 text-sm text-slate-600">
            <Target size={16} className="text-primary" /> กล้ามเนื้อที่ใช้: {workout.muscles}
          </p>

          {/* Video */}
          <section>
            <h3 className="font-semibold mb-2">วิดีโอสาธิตวิธีทำ</h3>
            {workout.videoId ? (
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${workout.videoId}?rel=0`}
                  title={`วิธีทำท่า ${workout.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={searchUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-slate-900 text-white rounded-2xl px-4 py-5"
              >
                <span className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center"><Play size={20} fill="white" /></span>
                  <span>
                    <span className="block text-sm font-medium">ดูคลิปสอนท่า{workout.name}บน YouTube</span>
                    <span className="block text-xs text-slate-300">เปิดผลการค้นหาคลิปสอน</span>
                  </span>
                </span>
                <ExternalLink size={18} />
              </a>
            )}
          </section>

          <section>
            <h3 className="font-semibold mb-2">ขั้นตอนการทำ</h3>
            <ol className="space-y-2">
              {workout.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-amber-50 rounded-2xl p-4 text-sm space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-amber-700"><AlertTriangle size={16} /> ข้อผิดพลาดที่พบบ่อย</h3>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              {workout.mistakes.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </section>

          <p className="flex gap-2 text-sm text-slate-600 bg-accent rounded-2xl p-4">
            <Lightbulb size={16} className="text-primary shrink-0 mt-0.5" /> {workout.beginnerTip}
          </p>
          <p className="text-xs text-slate-400">อบอุ่นร่างกายก่อนฝึก หากเจ็บหรือเวียนศีรษะให้หยุดทันที</p>

          <button
            onClick={() => onStart(workout)}
            className="w-full h-12 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2"
          >
            <Timer size={18} /> เริ่มออกกำลังกาย ({formatPlan(workout)})
          </button>
        </div>
      </div>
    </div>
  );
}

