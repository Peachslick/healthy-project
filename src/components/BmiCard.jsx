import { Info } from 'lucide-react';

// BMI categories (Asia-Pacific criteria, commonly used in Thailand)
export const BMI_LEVELS = [
  {
    id: 'under', label: 'น้ำหนักน้อย / ผอม', range: 'ต่ำกว่า 18.5', min: 0, max: 18.5,
    bar: 'bg-sky-400', text: 'text-sky-600', bg: 'bg-sky-50',
    detail: 'น้ำหนักต่ำกว่าเกณฑ์ อาจเสี่ยงขาดสารอาหาร ภูมิคุ้มกันต่ำ และกล้ามเนื้อน้อย ควรกินอาหารให้ครบ 5 หมู่ เพิ่มโปรตีน และออกกำลังกายสร้างกล้ามเนื้อ',
  },
  {
    id: 'normal', label: 'สมส่วน (ปกติ)', range: '18.5 – 22.9', min: 18.5, max: 23,
    bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50',
    detail: 'น้ำหนักอยู่ในเกณฑ์ที่ดี ความเสี่ยงโรคต่ำ รักษาด้วยการกินอาหารสมดุลและออกกำลังกายสม่ำเสมออย่างน้อย 150 นาทีต่อสัปดาห์',
  },
  {
    id: 'over', label: 'น้ำหนักเกิน (ท้วม)', range: '23 – 24.9', min: 23, max: 25,
    bar: 'bg-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50',
    detail: 'เริ่มมีน้ำหนักเกิน เสี่ยงเบาหวานและความดันสูงเพิ่มขึ้น ควรควบคุมอาหารหวาน มัน และเพิ่มการเคลื่อนไหวในแต่ละวัน',
  },
  {
    id: 'obese1', label: 'โรคอ้วนระดับ 1', range: '25 – 29.9', min: 25, max: 30,
    bar: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50',
    detail: 'เสี่ยงโรคเบาหวาน ความดัน ไขมันในเลือดสูง ควรลดน้ำหนักอย่างต่อเนื่อง ออกกำลังกายคาร์ดิโอร่วมกับเวทเทรนนิ่ง และปรึกษาแพทย์หากมีโรคประจำตัว',
  },
  {
    id: 'obese2', label: 'โรคอ้วนระดับ 2', range: '30 ขึ้นไป', min: 30, max: Infinity,
    bar: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50',
    detail: 'ความเสี่ยงโรคร้ายแรงสูง เช่น โรคหัวใจ เบาหวาน ข้อเข่าเสื่อม ควรปรึกษาแพทย์หรือนักโภชนาการเพื่อวางแผนลดน้ำหนักอย่างปลอดภัย',
  },
];

export const calcBmi = (weight, height) => {
  const w = Number(weight);
  const h = Number(height) / 100;
  if (!w || !h || w < 10 || h < 0.5) return null;
  return w / (h * h);
};

export default function BmiCard({ weight, height }) {
  const bmi = calcBmi(weight, height);
  const level = bmi ? BMI_LEVELS.find((l) => bmi >= l.min && bmi < l.max) : null;

  // Map BMI 15–35 onto the 0–100% gauge
  const pos = bmi ? Math.min(100, Math.max(0, ((bmi - 15) / 20) * 100)) : 0;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
      <h3 className="font-semibold">ดัชนีมวลกาย (BMI)</h3>

      {!bmi ? (
        <p className="text-sm text-slate-500">กรอกน้ำหนักและส่วนสูงด้านบน เพื่อคำนวณ BMI ของคุณ</p>
      ) : (
        <>
          <div className="flex items-end gap-3">
            <span className={`text-4xl font-bold ${level.text}`}>{bmi.toFixed(1)}</span>
            <span className={`mb-1 text-sm font-medium rounded-full px-3 py-1 ${level.bg} ${level.text}`}>{level.label}</span>
          </div>

          {/* Gauge */}
          <div>
            <div className="relative">
              <div className="flex h-3 rounded-full overflow-hidden">
                {BMI_LEVELS.map((l) => (
                  <div key={l.id} className={`${l.bar} flex-1`} />
                ))}
              </div>
              <div
                className="absolute -top-1 w-1.5 h-5 rounded-full bg-slate-800 ring-2 ring-white -translate-x-1/2"
                style={{ left: `${pos}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>15</span><span>18.5</span><span>23</span><span>25</span><span>30</span><span>35+</span>
            </div>
          </div>

          <p className={`text-sm rounded-2xl p-4 ${level.bg} text-slate-700`}>{level.detail}</p>
        </>
      )}

      {/* All criteria */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 flex items-center gap-1"><Info size={13} /> เกณฑ์ BMI (มาตรฐานเอเชีย-แปซิฟิก)</p>
        {BMI_LEVELS.map((l) => (
          <div
            key={l.id}
            className={`rounded-xl p-3 border text-sm ${level?.id === l.id ? `${l.bg} border-current ${l.text}` : 'border-slate-100'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-medium text-slate-800">
                <span className={`w-3 h-3 rounded-full ${l.bar}`} /> {l.label}
              </span>
              <span className="text-xs text-slate-500">{l.range}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{l.detail}</p>
          </div>
        ))}
        <p className="text-[11px] text-slate-400">BMI เป็นเพียงค่าประมาณ ไม่ได้แยกมวลกล้ามเนื้อกับไขมัน หากกังวลควรปรึกษาแพทย์</p>
      </div>
    </section>
  );
}

