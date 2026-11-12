import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw, X, Check, Heart, SkipForward } from 'lucide-react';
import { formatPlan, setSeconds } from '../data/workouts';

const pad = (n) => String(n).padStart(2, '0');

export default function TimerModal({ workout, queue, programTitle, onClose, onComplete }) {
  const list = queue && queue.length > 0 ? queue : [workout];
  const isProgram = list.length > 1;

  const [idx, setIdx] = useState(0);
  const current = list[idx];
  const { plan } = current;
  const workLen = setSeconds(current);

  const [setNo, setSetNo] = useState(1); // current set (1-based)
  const [phase, setPhase] = useState('work'); // 'work' | 'rest' | 'done'
  const [remaining, setRemaining] = useState(workLen);
  const [running, setRunning] = useState(false);
  const [worked, setWorked] = useState(0); // total seconds spent in work phases
  const [completedSets, setCompletedSets] = useState(0);
  const [bpm, setBpm] = useState('');

  // Move to the next phase after a set ends (or is skipped)
  const nextPhase = () => {
    if (phase === 'work') {
      setCompletedSets((s) => s + 1);
      if (setNo >= plan.sets) {
        if (idx + 1 < list.length) {
          // Rest before moving to the next exercise in the program
          setPhase('next_ex');
          setRemaining(30);
        } else {
          setPhase('done');
          setRunning(false);
          setRemaining(0);
        }
      } else {
        setPhase('rest');
        setRemaining(plan.restSeconds);
      }
    } else if (phase === 'rest') {
      setSetNo((n) => n + 1);
      setPhase('work');
      setRemaining(workLen);
    } else if (phase === 'next_ex') {
      const nextW = list[idx + 1];
      setIdx((i) => i + 1);
      setSetNo(1);
      setPhase('work');
      setRemaining(setSeconds(nextW));
    }
  };

  // Tick every second while running
  useEffect(() => {
    if (!running || phase === 'done') return;
    const id = setInterval(() => {
      setRemaining((r) => r - 1);
      if (phase === 'work') setWorked((w) => w + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase]);

  // Phase ends when countdown reaches 0
  useEffect(() => {
    if (running && remaining <= 0 && phase !== 'done') nextPhase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const reset = () => {
    const firstLen = setSeconds(list[0]);
    setIdx(0);
    setSetNo(1);
    setPhase('work');
    setRemaining(firstLen);
    setRunning(false);
    setWorked(0);
    setCompletedSets(0);
  };

  const handleComplete = () => {
    onComplete({
      workoutId: isProgram ? 'program' : current.id,
      name: programTitle || (isProgram ? `คอร์ส ${list.length} ท่า` : current.name),
      seconds: Math.max(worked, 1),
      sets: Math.max(completedSets, 1),
      bpm: bpm ? Number(bpm) : null,
    });
  };

  const total = phase === 'rest' ? plan.restSeconds : phase === 'next_ex' ? 30 : workLen;
  const progress = phase === 'done' ? 100 : ((total - remaining) / total) * 100;
  const R = 90;
  const C = 2 * Math.PI * R;
  const isRest = phase === 'rest' || phase === 'next_ex';
  const color = isRest ? '#10B981' : '#2563EB';
  const label =
    phase === 'done' ? 'ครบทุกท่าแล้ว 🎉'
    : phase === 'next_ex' ? `พักเปลี่ยนท่า → ถัดไป: ${list[idx + 1]?.name}`
    : isRest ? `พักก่อนเซ็ต ${setNo + 1}`
    : running ? `เซ็ต ${setNo}/${plan.sets} กำลังทำ` : `เซ็ต ${setNo}/${plan.sets} พร้อมเริ่ม`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl max-h-full overflow-y-auto">
        {isProgram && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-primary font-medium mb-1.5">
              <span>{programTitle || 'โปรแกรมต่อเนื่อง'}</span>
              <span>ท่าที่ {idx + 1} / {list.length}</span>
            </div>
            <div className="flex gap-1.5">
              {list.map((w, i) => (
                <div
                  key={w.id}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < idx || phase === 'done' ? 'bg-emerald-500' : i === idx ? 'bg-primary' : 'bg-slate-100'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-primary">{current.nameEn} · {formatPlan(current)}</p>
            <h2 className="text-2xl font-bold">{current.name}</h2>
          </div>
          <button onClick={onClose} aria-label="ปิด" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {plan.reps && phase === 'work' ? `ทำ ${plan.reps} ครั้ง (จับเวลาแนะนำ) แล้วกด "เสร็จเซ็ต" ได้เลยถ้าทำครบก่อน` : current.beginnerTip}
        </p>

        <div className="relative w-56 h-56 mx-auto my-5">
          <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
            <circle cx="110" cy="110" r={R} stroke="#EFF6FF" strokeWidth="14" fill="none" />
            <circle
              cx="110" cy="110" r={R} stroke={color} strokeWidth="14" fill="none" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - progress / 100)}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <span className="text-5xl font-bold tabular-nums">
              {pad(Math.floor(Math.max(remaining, 0) / 60))}:{pad(Math.max(remaining, 0) % 60)}
            </span>
            <span className="text-xs text-slate-500 mt-1">{label}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} aria-label="รีเซ็ต" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <RotateCcw size={20} />
          </button>
          <button
            onClick={() => setRunning((r) => !r)}
            disabled={phase === 'done'}
            className="flex-1 h-12 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
          </button>
          <button
            onClick={nextPhase}
            disabled={phase === 'done'}
            aria-label={isRest ? 'ข้ามการพัก' : 'เสร็จเซ็ต'}
            className="h-12 px-4 rounded-full bg-accent text-primary text-sm font-medium flex items-center gap-1 disabled:opacity-50"
          >
            <SkipForward size={16} /> {isRest ? 'ข้ามพัก' : 'เสร็จเซ็ต'}
          </button>
        </div>

        <label className="mt-4 flex items-center gap-2 bg-accent rounded-2xl px-4 py-3 text-sm">
          <Heart size={16} className="text-rose-500" />
          <span className="text-slate-600">อัตราการเต้นหัวใจ (ไม่บังคับ)</span>
          <input
            type="number" inputMode="numeric" min="30" max="250" value={bpm}
            onChange={(e) => setBpm(e.target.value)} placeholder="bpm"
            className="ml-auto w-20 text-right bg-white rounded-lg px-2 py-1 outline-none focus:ring-2 ring-primary"
          />
        </label>

        <button
          onClick={handleComplete}
          className="mt-3 w-full h-12 rounded-full border-2 border-primary text-primary font-semibold flex items-center justify-center gap-2 hover:bg-accent"
        >
          <Check size={18} /> ทำสำเร็จ
        </button>
      </div>
    </div>
  );
}
