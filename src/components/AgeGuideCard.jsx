import { useState } from 'react';
import { HeartPulse, Clock, Flame, Dumbbell, CheckCircle2, Info, Sparkles } from 'lucide-react';

export const AGE_GROUPS = [
  {
    id: 'youth',
    title: 'เด็กและวัยรุ่น',
    ageRange: '6–17 ปี',
    minAge: 6,
    maxAge: 17,
    duration: 'อย่างน้อยวันละ 60 นาที',
    durationShort: '60 นาที/วัน',
    intensity: 'ปานกลางถึงหนัก (Moderate to Vigorous)',
    intensityShort: 'ปานกลาง–หนัก',
    hrLabel: 'ปานกลาง 120–150 bpm',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    badgeBg: 'bg-sky-100 text-sky-700',
    border: 'border-sky-200',
    guidelines: [
      'ควรออกกำลังกายหรือมีกิจกรรมทางกายอย่างน้อย 60 นาทีต่อวัน (สะสมระยะเวลาได้ตลอดทั้งวัน)',
      'เน้นการออกกำลังกายแบบแอโรบิก เพื่อพัฒนาหัวใจและปอด',
      'ควรมีกิจกรรมเสริมสร้างความแข็งแรงของกล้ามเนื้อและกระดูกอย่างน้อย 3 วันต่อสัปดาห์',
      'เลือกกิจกรรมที่สนุกสนานและเหมาะสมกับวัย',
    ],
    examples: [
      { label: 'ระดับปานกลาง', items: 'เดินเร็ว, ปั่นจักรยาน, เต้นแอโรบิก' },
      { label: 'ระดับหนัก', items: 'วิ่งเร็ว, กระโดดเชือก, ว่ายน้ำ, เล่นฟุตบอล, บาสเกตบอล' },
      { label: 'เสริมกล้ามเนื้อและกระดูก', items: 'กระโดดตบ, วิ่ง, กระโดดเชือก, ดันพื้น และสควอท' },
    ],
    getTargetBpm: (age) => {
      const max = 220 - age;
      return {
        max,
        targetText: '120–150 bpm (ระดับปานกลาง)',
        subText: `HRmax ประมาณ ${max} bpm`,
        minBpm: 120,
        maxBpm: 150,
      };
    },
  },
  {
    id: 'adult',
    title: 'วัยผู้ใหญ่',
    ageRange: '18–59 ปี',
    minAge: 18,
    maxAge: 59,
    duration: 'อย่างน้อย 150 นาทีต่อสัปดาห์',
    durationShort: '150 นาที/สัปดาห์',
    intensity: 'ปานกลาง (Moderate Intensity)',
    intensityShort: 'ปานกลาง',
    hrLabel: '64–76% HRmax',
    color: 'text-primary',
    bg: 'bg-accent',
    badgeBg: 'bg-blue-100 text-primary',
    border: 'border-blue-200',
    guidelines: [
      'กิจกรรมระดับปานกลางอย่างน้อย 150 นาที/สัปดาห์ (เช่น วันละ 30 นาที 5 วัน/สัปดาห์) หรือระดับหนักอย่างน้อย 75 นาที/สัปดาห์',
      'ออกกำลังกายเสริมสร้างความแข็งแรงของกล้ามเนื้ออย่างน้อย 2 วันต่อสัปดาห์',
      'บริหารกล้ามเนื้อมัดใหญ่ ได้แก่ ขา สะโพก หลัง หน้าท้อง หน้าอก ไหล่ และแขน',
      'เพิ่มกิจกรรมการยืดเหยียดกล้ามเนื้อ เพื่อเพิ่มความยืดหยุ่นของร่างกาย',
    ],
    examples: [
      { label: 'ระดับปานกลาง', items: 'เดินเร็ว, ปั่นจักรยาน, เต้นแอโรบิก, ว่ายน้ำ' },
      { label: 'ระดับหนัก', items: 'วิ่ง, ว่ายน้ำเร็ว, เล่นกีฬา' },
      { label: 'เสริมสร้างกล้ามเนื้อ', items: 'สควอท, ยกน้ำหนักตามความเหมาะสม, ดันพื้น, ใช้ยางยืดออกกำลังกาย' },
      { label: 'เพิ่มความยืดหยุ่น', items: 'โยคะ, การยืดเหยียดกล้ามเนื้อ' },
    ],
    getTargetBpm: (age) => {
      const max = 220 - age;
      const low = Math.round(max * 0.64);
      const high = Math.round(max * 0.76);
      return {
        max,
        targetText: `${low}–${high} bpm (64–76% HRmax)`,
        subText: `คำนวณจาก HRmax ${max} bpm (220 - อายุ ${age} ปี)`,
        minBpm: low,
        maxBpm: high,
      };
    },
  },
  {
    id: 'senior',
    title: 'ผู้สูงอายุ',
    ageRange: '60 ปีขึ้นไป',
    minAge: 60,
    maxAge: 120,
    duration: 'อย่างน้อย 150 นาทีต่อสัปดาห์ (ตามสภาพร่างกาย)',
    durationShort: 'เริ่มตามความสามารถ',
    intensity: 'เบาถึงปานกลาง ตามสมรรถภาพร่างกาย',
    intensityShort: 'เบาถึงปานกลาง',
    hrLabel: 'เบา 57–63% HRmax',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    guidelines: [
      'เริ่มจากระดับเบาตามความสามารถ และสะสมกิจกรรมระดับปานกลางให้ได้ 150 นาที/สัปดาห์ หากสภาพร่างกายเอื้ออำนวย',
      'ออกกำลังกายเสริมสร้างความแข็งแรงของกล้ามเนื้อ 2–3 วันต่อสัปดาห์',
      'ฝึกการทรงตัวอย่างน้อย 3 วันต่อสัปดาห์ เพื่อป้องกันการหกล้ม',
      'ฝึกความยืดหยุ่นของกล้ามเนื้อและข้อต่อ 2–3 วันต่อสัปดาห์',
      'เลือกกิจกรรมที่มีแรงกระแทกต่ำ และเหมาะสมกับโรคประจำตัว',
    ],
    examples: [
      { label: 'แอโรบิกแรงกระแทกต่ำ', items: 'เดินเร็ว, เดินแกว่งแขน, ปั่นจักรยาน, เต้นบาสโลบ' },
      { label: 'เสริมสร้างกล้ามเนื้อ', items: 'ย่อเข่า, ดันกำแพง, ดึงยางยืด, นั่งเตะขา' },
      { label: 'ฝึกการทรงตัว', items: 'ยืนขาเดียว, เดินต่อเท้า, ยืนเขย่งปลายเท้า, รำไท่จี๋' },
      { label: 'เพิ่มความยืดหยุ่น', items: 'ยืดเหยียดกล้ามเนื้อ, โยคะสำหรับผู้สูงอายุ' },
    ],
    getTargetBpm: (age) => {
      const max = 220 - age;
      const lowLight = Math.round(max * 0.57);
      const highLight = Math.round(max * 0.63);
      const lowMod = Math.round(max * 0.64);
      const highMod = Math.round(max * 0.76);
      return {
        max,
        targetText: `${lowLight}–${highLight} bpm (ระดับเบา 57–63% HRmax)`,
        subText: `ระดับปานกลาง: ${lowMod}–${highMod} bpm · HRmax ${max} bpm`,
        minBpm: lowLight,
        maxBpm: highMod,
      };
    },
  },
];

export function getAgeGroup(age) {
  const n = Number(age);
  if (!n || n < 6 || n > 120) return null;
  return AGE_GROUPS.find((g) => n >= g.minAge && n <= g.maxAge) || null;
}

export default function AgeGuideCard({ age, onAgeChange }) {
  const numericAge = Number(age);
  const matchedGroup = getAgeGroup(numericAge);
  const [selectedTab, setSelectedTab] = useState(null);

  const activeGroup =
    AGE_GROUPS.find((g) => g.id === selectedTab) || matchedGroup || AGE_GROUPS[1];
  const target = matchedGroup ? matchedGroup.getTargetBpm(numericAge) : null;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <HeartPulse size={20} className="text-rose-500" />
            คำแนะนำการออกกำลังกาย & อัตราการเต้นหัวใจตามช่วงวัย
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            คำนวณโซนอัตราการเต้นหัวใจที่เหมาะสมและแนวทางการฝึกตามเกณฑ์อายุของคุณ
          </p>
        </div>
        {onAgeChange && (
          <div className="flex items-center gap-2 bg-surface rounded-xl px-3 py-1.5 border border-slate-200">
            <span className="text-xs text-slate-500">อายุของคุณ:</span>
            <input
              type="number"
              min="6"
              max="120"
              value={age || ''}
              onChange={(e) => {
                onAgeChange(e.target.value);
                setSelectedTab(null);
              }}
              placeholder="ปี"
              className="w-14 text-center font-semibold text-sm bg-white rounded-lg py-1 outline-none focus:ring-2 ring-primary"
            />
            <span className="text-xs text-slate-500">ปี</span>
          </div>
        )}
      </div>

      {/* Personalized Calculation Banner */}
      {matchedGroup && target ? (
        <div className={`rounded-2xl p-4 border ${matchedGroup.bg} ${matchedGroup.border} space-y-2`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`text-xs font-semibold rounded-full px-3 py-1 ${matchedGroup.badgeBg} inline-flex items-center gap-1`}>
              <Sparkles size={13} /> ช่วงวัยของคุณ: {matchedGroup.title} ({matchedGroup.ageRange})
            </span>
            <span className="text-xs text-slate-500">{target.subText}</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white/90 rounded-xl p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <HeartPulse size={13} className="text-rose-500" /> หัวใจเป้าหมายขณะออกกำลังกาย
              </p>
              <p className={`text-base font-bold mt-0.5 ${matchedGroup.color}`}>{target.targetText}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={13} className="text-primary" /> ระยะเวลาแนะนำ
              </p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{matchedGroup.duration}</p>
            </div>
            <div className="bg-white/90 rounded-xl p-3">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Flame size={13} className="text-orange-500" /> ระดับความหนัก
              </p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{matchedGroup.intensity}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500 bg-surface rounded-2xl p-4">
          กรอกอายุของคุณ (ตั้งแต่ 6 ปีขึ้นไป) เพื่อคำนวณอัตราการเต้นหัวใจสูงสุด (HRmax) และโซนการออกกำลังกายเฉพาะบุคคล
        </p>
      )}

      {/* Age group selector tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {AGE_GROUPS.map((g) => {
            const isCurrent = activeGroup.id === g.id;
            const isUserGroup = matchedGroup?.id === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedTab(g.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition border ${
                  isCurrent
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-slate-600 border-slate-100 hover:bg-accent'
                }`}
              >
                {g.title} ({g.ageRange}) {isUserGroup ? '• วัยของคุณ' : ''}
              </button>
            );
          })}
        </div>

        {/* Selected group detail */}
        <div className="rounded-2xl border border-slate-100 bg-surface/60 p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-slate-800">
                {activeGroup.title} (อายุ {activeGroup.ageRange})
              </h4>
              <p className="text-xs text-slate-500">
                ระยะเวลา: {activeGroup.duration} · ความหนัก: {activeGroup.intensity}
              </p>
            </div>
            <span className={`text-xs font-semibold rounded-full px-3 py-1 ${activeGroup.badgeBg}`}>
              หัวใจเป้าหมาย: {activeGroup.hrLabel}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-primary" /> แนวทางปฏิบัติ
            </p>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {activeGroup.guidelines.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Dumbbell size={14} className="text-primary" /> ตัวอย่างกิจกรรมที่เหมาะสม
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {activeGroup.examples.map((ex) => (
                <div key={ex.label} className="bg-white rounded-xl p-3 border border-slate-100">
                  <p className="text-xs font-semibold text-primary">{ex.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{ex.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Info size={13} /> ตารางสรุปเกณฑ์การออกกำลังกายและอัตราการเต้นหัวใจตามช่วงวัย
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-accent text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">ช่วงวัย</th>
                <th className="py-2.5 px-3 font-semibold">ระยะเวลา</th>
                <th className="py-2.5 px-3 font-semibold">ความหนัก</th>
                <th className="py-2.5 px-3 font-semibold">อัตราการเต้นหัวใจ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {AGE_GROUPS.map((g) => {
                const isMine = matchedGroup?.id === g.id;
                return (
                  <tr key={g.id} className={isMine ? 'bg-blue-50/60 font-medium' : ''}>
                    <td className="py-2.5 px-3">
                      {g.ageRange} <span className="text-xs text-slate-400 block sm:inline">({g.title})</span>
                    </td>
                    <td className="py-2.5 px-3">{g.durationShort}</td>
                    <td className="py-2.5 px-3">{g.intensityShort}</td>
                    <td className="py-2.5 px-3 text-primary font-medium">{g.hrLabel}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400">
          *หมายเหตุ: สูตรคำนวณอัตราการเต้นหัวใจสูงสุด (HRmax) = 220 − อายุ (ปี) หากมีโรคประจำตัวควรปรึกษาแพทย์ก่อนออกกำลังกาย
        </p>
      </div>
    </section>
  );
}

