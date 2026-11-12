import { useState } from 'react';
import { Download, X, Share, MoreVertical, PlusSquare } from 'lucide-react';

// Download/install button. Uses native prompt when available, otherwise shows manual steps.
export default function InstallButton({ pwa, className = '', label = 'ดาวน์โหลดแอป' }) {
  const [help, setHelp] = useState(false);
  if (pwa.installed) return null;

  const onClick = async () => {
    const shown = await pwa.install();
    if (!shown) setHelp(true);
  };

  return (
    <>
      <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 bg-primary text-white font-medium rounded-full ${className}`}>
        <Download size={16} /> {label}
      </button>

      {help && (
        <div className="fixed inset-0 z-[60] bg-slate-900/50 flex items-end sm:items-center justify-center" onClick={() => setHelp(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">วิธีติดตั้งแอป</h3>
              <button onClick={() => setHelp(false)} aria-label="ปิด" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"><X size={18} /></button>
            </div>

            {pwa.isIOS ? (
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><Share size={18} className="text-primary shrink-0" /> เปิดด้วย Safari แล้วกดปุ่ม "แชร์" ด้านล่าง</li>
                <li className="flex gap-3"><PlusSquare size={18} className="text-primary shrink-0" /> เลือก "เพิ่มไปยังหน้าจอโฮม"</li>
                <li className="flex gap-3"><Download size={18} className="text-primary shrink-0" /> กด "เพิ่ม" เพื่อยืนยัน</li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><MoreVertical size={18} className="text-primary shrink-0" /> เปิดด้วย Chrome หรือ Edge แล้วกดเมนู ⋮ มุมขวาบน</li>
                <li className="flex gap-3"><Download size={18} className="text-primary shrink-0" /> เลือก "ติดตั้งแอป" หรือ "เพิ่มลงในหน้าจอหลัก"</li>
              </ol>
            )}
            <p className="text-xs text-slate-400">ต้องเปิดผ่าน HTTPS หรือ localhost และไม่ใช่โหมดไม่ระบุตัวตน จึงจะติดตั้งได้</p>
          </div>
        </div>
      )}
    </>
  );
}

