import { Home, Activity, Dumbbell, User } from 'lucide-react';

export const TABS = [
  { id: 'home', label: 'หน้าแรก', icon: Home },
  { id: 'stats', label: 'สถิติ', icon: Activity },
  { id: 'workout', label: 'ออกกำลังกาย', icon: Dumbbell },
  { id: 'profile', label: 'โปรไฟล์', icon: User },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-100 pb-[env(safe-area-inset-bottom)]">
      <ul className="max-w-2xl mx-auto flex justify-around px-2 py-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <li key={id} className="flex-1">
            <button
              onClick={() => onChange(id)}
              aria-current={active === id ? 'page' : undefined}
              className={`w-full flex flex-col items-center gap-1 py-2 rounded-2xl text-xs transition ${
                active === id ? 'bg-accent text-primary font-medium' : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

