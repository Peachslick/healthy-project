import { useState } from 'react';
import { Download, X, Share, MoreVertical, PlusSquare, ChevronRight, CheckCircle2 } from 'lucide-react';

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
        <div className="fixed inset-0 z-[60] bg-slate-900/50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setHelp(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">วิธีติดตั้งแอปบนอุปกรณ์</h3>
              <button onClick={() => setHelp(false)} aria-label="ปิด" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"><X size={18} /></button>
            </div>

            {pwa.isIOS ? (
              <div className="space-y-3">
                <p className="text-xs text-primary font-medium bg-accent rounded-xl px-3 py-2">
                  สำหรับ iPhone / iPad (เปิดด้วย Safari)
                </p>
                <ol className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div className="flex-1">
                      <p className="font-medium">กดปุ่ม "แชร์" (Share)</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        ไอคอน <Share size={14} className="text-primary inline" /> ที่แถบเมนูด้านล่างของ Safari
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div className="flex-1">
                      <p className="font-medium">เลื่อนลงมาแล้วกด "ดูเพิ่มเติม" (หากไม่เจอ)</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        เลื่อนลงมาด้านล่างของเมนูแชร์ <ChevronRight size={14} className="text-slate-400 inline" />
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div className="flex-1">
                      <p className="font-medium">เลือก "เพิ่มไปยังหน้าจอโฮม"</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        (Add to Home Screen) ไอคอนรูป <PlusSquare size={14} className="text-primary inline" />
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <div className="flex-1">
                      <p className="font-medium">กดปุ่ม "เพิ่ม" (Add) มุมขวาบน</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        ไอคอนแอปจะไปปรากฏที่หน้าจอโฮมทันที <CheckCircle2 size={14} className="text-emerald-500 inline" />
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            ) : (
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><MoreVertical size={18} className="text-primary shrink-0" /> เปิดด้วย Chrome หรือ Edge แล้วกดเมนู ⋮ มุมขวาบน</li>
                <li className="flex gap-3"><Download size={18} className="text-primary shrink-0" /> เลือก "ติดตั้งแอป" หรือ "เพิ่มลงในหน้าจอหลัก"</li>
              </ol>
            )}
            <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-100">
              *ต้องเปิดผ่าน HTTPS หรือ localhost (ไม่อยู่ในโหมดแท็บส่วนตัว)
            </p>
          </div>
        </div>
      )}
    </>
  );
}

