import { User } from 'lucide-react';
import InstallButton from '../components/InstallButton';
import BmiCard from '../components/BmiCard';
import AgeGuideCard from '../components/AgeGuideCard';

export default function Profile({ profile, setProfile, onReset, pwa }) {
  const field = 'w-full bg-white border border-slate-100 shadow-sm rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 ring-primary';
  const update = (k) => (e) => setProfile({ ...profile, [k]: e.target.value });

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center">
          <User size={30} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.name || 'โปรไฟล์ของฉัน'}</h2>
          <p className="text-sm text-slate-500">ข้อมูลเก็บไว้ในเครื่องของคุณเท่านั้น</p>
        </div>
      </div>

      <div className="space-y-3">
        <input className={field} placeholder="ชื่อ" value={profile.name} onChange={update('name')} />
        <div className="grid grid-cols-3 gap-3">
          <input className={field} type="number" placeholder="อายุ (ปี)" value={profile.age} onChange={update('age')} />
          <input className={field} type="number" placeholder="น้ำหนัก (กก.)" value={profile.weight} onChange={update('weight')} />
          <input className={field} type="number" placeholder="ส่วนสูง (ซม.)" value={profile.height} onChange={update('height')} />
        </div>
      </div>

      <BmiCard weight={profile.weight} height={profile.height} />

      <AgeGuideCard age={profile.age} onAgeChange={(age) => setProfile({ ...profile, age })} />

      <InstallButton pwa={pwa} className="w-full h-12" label="ดาวน์โหลดแอปลงอุปกรณ์" />

      <button
        onClick={() => window.confirm('ลบประวัติและข้อมูลทั้งหมด?') && onReset()}
        className="w-full h-12 rounded-full border border-rose-200 text-rose-500 text-sm"
      >
        ล้างข้อมูลทั้งหมด
      </button>
    </div>
  );
}

