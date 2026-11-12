import { Activity, User } from 'lucide-react';
import InstallButton from './InstallButton';

export default function Header({ onProfile, pwa }) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
            <Activity size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary leading-tight">FitEasy</h1>
            <p className="text-[11px] text-slate-400 leading-none">เริ่มฟิตง่าย ๆ ได้ทุกวัน</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <InstallButton pwa={pwa} className="text-xs sm:text-sm px-3 sm:px-4 py-2" label="ดาวน์โหลดแอป" />
          <button
            onClick={onProfile}
            aria-label="โปรไฟล์"
            className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

