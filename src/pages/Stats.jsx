import { useState } from 'react';
import { CheckCircle2, Clock, Flame, Heart, Trash2 } from 'lucide-react';
import AgeGuideCard, { getAgeGroup } from '../components/AgeGuideCard';

const fmtMinutes = (s) => (s >= 60 ? `${Math.floor(s / 60)} นาที ${s % 60} วินาที` : `${s} วินาที`);
const fmtDate = (iso) =>
  new Date(iso).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });

function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <div className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center">
        <Icon size={18} />
      </div>
      <p className="mt-3 text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

export default function Stats({ history, heartRates, setHeartRates, profile, setProfile }) {
  const [bpm, setBpm] = useState('');
  const [note, setNote] = useState('');

  const ageGroup = getAgeGroup(profile?.age);
  const targetZone = ageGroup ? ageGroup.getTargetBpm(Number(profile.age)) : null;

  const getBpmStatus = (val) => {
    if (!targetZone) return null;
    if (val < targetZone.minBpm) return { label: 'ต่ำกว่าโซนเป้าหมาย', cls: 'bg-sky-50 text-sky-600' };
    if (val <= targetZone.maxBpm) return { label: 'อยู่ในโซนเหมาะสม', cls: 'bg-emerald-50 text-emerald-600' };
    return { label: 'สูงกว่าโซนปานกลาง (หนัก)', cls: 'bg-amber-50 text-amber-600' };
  };

  const totalSeconds = history.reduce((sum, h) => sum + h.seconds, 0);
  const avgBpm = heartRates.length
    ? Math.round(heartRates.reduce((s, h) => s + h.bpm, 0) / heartRates.length)
    : null;

  const addHeartRate = (e) => {
    e.preventDefault();
    const value = Number(bpm);
    if (!value || value < 30 || value > 250) return;
    setHeartRates((list) => [
      { id: Date.now(), bpm: value, note: note.trim(), date: new Date().toISOString() },
      ...list,
    ]);
    setBpm('');
    setNote('');
  };

  const chart = heartRates.slice(0, 10).reverse();
  const maxBpm = Math.max(...chart.map((h) => h.bpm), 100);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">สถิติของคุณ</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatBox icon={CheckCircle2} label="จำนวนครั้งที่สำเร็จ" value={`${history.length} ครั้ง`} />
        <StatBox icon={Clock} label="เวลาออกกำลังกายรวม" value={`${Math.round(totalSeconds / 60)} นาที`} />
      </div>

      {/* Heart rate log */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Heart size={18} className="text-rose-500" /> บันทึกอัตราการเต้นหัวใจ
          </h3>
          <div className="flex items-center gap-2">
            {targetZone && (
              <span className="text-xs bg-rose-50 text-rose-600 rounded-full px-3 py-1">
                เป้าหมายวัยคุณ: {targetZone.minBpm}–{targetZone.maxBpm} bpm
              </span>
            )}
            {avgBpm && <span className="text-xs bg-accent text-primary rounded-full px-3 py-1">เฉลี่ย {avgBpm} bpm</span>}
          </div>
        </div>

        <form onSubmit={addHeartRate} className="flex flex-wrap gap-2">
          <input
            type="number" inputMode="numeric" min="30" max="250" required value={bpm}
            onChange={(e) => setBpm(e.target.value)} placeholder="bpm"
            className="w-24 bg-surface rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary"
          />
          <input
            value={note} onChange={(e) => setNote(e.target.value)} placeholder="หมายเหตุ (เช่น หลังวิ่ง)"
            className="flex-1 min-w-[140px] bg-surface rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ring-primary"
          />
          <button className="bg-primary text-white rounded-xl px-5 py-2.5 text-sm font-medium">บันทึก</button>
        </form>

        {chart.length > 1 && (
          <div className="flex items-end gap-1.5 h-24">
            {chart.map((h) => (
              <div key={h.id} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] text-slate-500">{h.bpm}</span>
                <div className="w-full bg-primary/80 rounded-t-md" style={{ height: `${(h.bpm / maxBpm) * 70}%` }} />
              </div>
            ))}
          </div>
        )}

        {heartRates.length === 0 ? (
          <p className="text-sm text-slate-500">ยังไม่มีบันทึก</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {heartRates.slice(0, 8).map((h) => {
              const status = getBpmStatus(h.bpm);
              return (
                <li key={h.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{h.bpm} bpm</span>
                      {status && (
                        <span className={`text-[11px] font-medium rounded-full px-2.5 py-0.5 ${status.cls}`}>
                          {status.label}
                        </span>
                      )}
                      {h.note && <span className="text-slate-500">· {h.note}</span>}
                    </div>
                    <p className="text-xs text-slate-400">{fmtDate(h.date)}</p>
                  </div>
                  <button
                    onClick={() => setHeartRates((l) => l.filter((x) => x.id !== h.id))}
                    aria-label="ลบ" className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Age & Heart Rate Guidelines */}
      <AgeGuideCard
        age={profile?.age}
        onAgeChange={(age) => setProfile && setProfile({ ...profile, age })}
      />

      {/* History */}
      <section className="space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><Flame size={18} className="text-orange-500" /> ประวัติการออกกำลังกาย</h3>
        {history.length === 0 ? (
          <p className="text-sm text-slate-500">ยังไม่มีประวัติ ลองเริ่มออกกำลังกายดูสิ!</p>
        ) : (
          <ul className="space-y-2">
            {history.slice(0, 20).map((h) => (
              <li key={h.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{h.name}</p>
                  <p className="text-xs text-slate-400">{fmtDate(h.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary">{h.sets ? `${h.sets} เซ็ต · ` : ''}{fmtMinutes(h.seconds)}</p>
                  {h.bpm && <p className="text-xs text-rose-500">♥ {h.bpm} bpm</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

