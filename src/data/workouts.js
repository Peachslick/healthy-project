// Mock workout data.
// plan: sets + (reps OR holdSeconds) + restSeconds between sets.
// videoId: YouTube video ID (the part after "v=" in the URL). If null, the detail
// page shows a link that searches YouTube using `videoSearch` instead.
export const CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'muscle', label: 'กล้ามเนื้อ' },
  { id: 'arms', label: 'แขน' },
  { id: 'legs', label: 'ขา' },
  { id: 'abs', label: 'หน้าท้อง' },
  { id: 'cardio', label: 'คาร์ดิโอ' },
];

export const LEVELS = { beginner: 'เริ่มต้น' };

export const workouts = [
  {
    id: 'pushup',
    name: 'วิดพื้น',
    nameEn: 'Push-up',
    categories: ['muscle', 'arms'],
    level: 'beginner',
    equipment: 'ไม่ใช้อุปกรณ์',
    emoji: '💪',
    image: '/images/pushup.jpg',
    videoId: 's3z0w-82Y00',
    videoSearch: 'วิธีทำท่า Push Up วิดพื้น ที่ถูกต้อง Fitterminal',
    plan: { sets: 3, reps: 10, restSeconds: 45 },
    muscles: 'อก ไหล่ ไตรเซ็ป และแกนกลางลำตัว',
    description:
      'ท่าพื้นฐานที่ใช้น้ำหนักตัวเอง ช่วยสร้างกล้ามเนื้อส่วนบนและความแข็งแรงของแกนกลางลำตัว ทำได้ทุกที่โดยไม่ต้องใช้อุปกรณ์',
    steps: [
      'วางมือกว้างกว่าหัวไหล่เล็กน้อย นิ้วชี้ไปด้านหน้า',
      'เกร็งหน้าท้องและสะโพก ให้ศีรษะ หลัง และขาเป็นเส้นตรง',
      'หายใจเข้า งอศอกลดตัวลงจนอกเกือบแตะพื้น (ศอกทำมุมประมาณ 45 องศา)',
      'หายใจออก ดันตัวกลับขึ้นจนแขนเกือบตึง',
    ],
    mistakes: ['ก้นโด่งหรือหลังแอ่น', 'กางศอกออกด้านข้างมากเกินไป', 'ก้มหน้าหรือเงยหน้า'],
    beginnerTip: 'ถ้ายังทำไม่ไหว ให้วางเข่าลงบนพื้น (Knee push-up) หรือทำเหลือ 8 ครั้ง',
  },
  {
    id: 'squat',
    name: 'สควอต',
    nameEn: 'Squat',
    categories: ['muscle', 'legs'],
    level: 'beginner',
    equipment: 'ไม่ใช้อุปกรณ์',
    emoji: '🦵',
    image: '/images/squat.jpg',
    videoId: 'wPtq4RNDnaA',
    videoSearch: 'ท่า Squat สควอต ที่ถูกต้อง สำหรับมือใหม่',
    plan: { sets: 3, reps: 15, restSeconds: 45 },
    muscles: 'ต้นขา สะโพก และก้น',
    description: 'ท่าพื้นฐานสร้างความแข็งแรงของช่วงล่าง ช่วยการทรงตัวและเผาผลาญพลังงานได้ดี',
    steps: [
      'ยืนเท้ากว้างเท่าช่วงไหล่ ปลายเท้าชี้ออกเล็กน้อย',
      'ยืดอก เกร็งหน้าท้อง เหยียดแขนไปด้านหน้าเพื่อช่วยทรงตัว',
      'ดันสะโพกไปด้านหลังเหมือนนั่งเก้าอี้ ย่อจนต้นขาขนานพื้น',
      'กดส้นเท้าดันตัวขึ้นกลับท่ายืน',
    ],
    mistakes: ['เข่าหุบเข้าด้านใน', 'ส้นเท้าลอย', 'หลังงอหรือโก่ง'],
    beginnerTip: 'ถ้าทรงตัวยาก ลองย่อลงแตะเก้าอี้ที่วางด้านหลัง',
  },
  {
    id: 'plank',
    name: 'แพลงก์',
    nameEn: 'Plank',
    categories: ['muscle', 'abs'],
    level: 'beginner',
    equipment: 'ไม่ใช้อุปกรณ์',
    emoji: '🧘',
    image: '/images/plank.jpg',
    videoId: 'jDZsXIkwWQ4',
    videoSearch: 'วิธีทำท่า Plank แพลงก์ ที่ถูกต้อง',
    plan: { sets: 3, holdSeconds: 30, restSeconds: 30 },
    muscles: 'หน้าท้อง หลัง และไหล่',
    description: 'ท่าค้างที่ช่วยสร้างความแข็งแรงของแกนกลางลำตัว ลดความเสี่ยงปวดหลัง',
    steps: [
      'วางศอกไว้ใต้ไหล่ ปลายเท้าตั้ง',
      'ยกลำตัวขึ้นให้เป็นเส้นตรงจากศีรษะถึงส้นเท้า',
      'เกร็งหน้าท้องและก้น มองลงพื้น',
      'หายใจเข้าออกสม่ำเสมอ ค้างตามเวลาที่กำหนด',
    ],
    mistakes: ['สะโพกตกหรือโด่งเกินไป', 'กลั้นหายใจ', 'ไหล่ยกขึ้นใกล้หู'],
    beginnerTip: 'ถ้าเหนื่อยมาก ให้วางเข่าลงบนพื้นแล้วค้างต่อ',
  },
  {
    id: 'jumpingjack',
    name: 'กระโดดตบ',
    nameEn: 'Jumping jack',
    categories: ['cardio'],
    level: 'beginner',
    equipment: 'ไม่ใช้อุปกรณ์',
    emoji: '🤸',
    image: '/images/jumpingjack.jpg',
    videoId: 'v_1MKJDaBwg',
    videoSearch: 'วิธีทำท่า Jumping Jack กระโดดตบ ที่ถูกต้อง',
    plan: { sets: 3, holdSeconds: 30, restSeconds: 30 },
    muscles: 'ทั้งตัว เน้นหัวใจและปอด',
    description: 'ท่าคาร์ดิโอเพิ่มอัตราการเต้นของหัวใจ เหมาะใช้วอร์มอัพหรือเผาผลาญพลังงาน',
    steps: [
      'ยืนตรง เท้าชิด แขนแนบลำตัว',
      'กระโดดแยกเท้าออกกว้างกว่าไหล่ พร้อมยกแขนเหนือศีรษะ',
      'กระโดดกลับท่าเริ่มต้น',
      'ทำต่อเนื่องเป็นจังหวะ ลงเท้าเบา ๆ',
    ],
    mistakes: ['ลงเท้าแรงจนเข่ากระแทก', 'หลังโก่ง'],
    beginnerTip: 'ถ้าเข่าไม่ดี ให้ก้าวแยกขาทีละข้างแทนการกระโดด',
  },
  {
    id: 'crunch',
    name: 'ครันช์',
    nameEn: 'Crunch',
    categories: ['abs'],
    level: 'beginner',
    equipment: 'ไม่ใช้อุปกรณ์',
    emoji: '🔥',
    image: '/images/crunch.jpg',
    videoId: 'Xyd_fa5zoEU',
    videoSearch: 'วิธีทำท่า Crunch ครันช์ หน้าท้อง ที่ถูกต้อง',
    plan: { sets: 3, reps: 12, restSeconds: 30 },
    muscles: 'กล้ามเนื้อหน้าท้องส่วนบน',
    description: 'ท่าบริหารหน้าท้องพื้นฐาน เน้นการเกร็งกล้ามเนื้อหน้าท้องอย่างควบคุมได้',
    steps: [
      'นอนหงาย งอเข่า ฝ่าเท้าวางพื้น',
      'วางมือแตะข้างศีรษะ ไม่ดึงคอ',
      'เกร็งหน้าท้อง ยกไหล่ขึ้นจากพื้นเล็กน้อย',
      'ค่อย ๆ ลดตัวลงอย่างช้า ๆ',
    ],
    mistakes: ['ใช้มือดึงคอ', 'ยกตัวสูงจนหลังส่วนล่างลอย', 'ทำเร็วเกินไป'],
    beginnerTip: 'ทำช้า ๆ นับ 2 จังหวะขึ้น 2 จังหวะลง',
  },
  {
    id: 'tricepdip',
    name: 'ไตรเซ็ปดิป',
    nameEn: 'Tricep dip',
    categories: ['arms'],
    level: 'beginner',
    equipment: 'ใช้เก้าอี้',
    emoji: '🪑',
    image: '/images/tricepdip.jpg',
    videoId: '0326dy_-CzM',
    videoSearch: 'วิธีทำท่า Tricep Dip ไตรเซ็ป ด้วยเก้าอี้',
    plan: { sets: 3, reps: 10, restSeconds: 45 },
    muscles: 'ต้นแขนด้านหลัง (ไตรเซ็ป) และไหล่',
    description: 'ท่าสร้างกล้ามเนื้อต้นแขนด้านหลังโดยใช้เก้าอี้ที่มั่นคง',
    steps: [
      'นั่งขอบเก้าอี้ที่มั่นคง มือจับขอบข้างสะโพก',
      'เลื่อนก้นออกจากเก้าอี้ งอเข่า',
      'งอศอกย่อตัวลงประมาณ 90 องศา',
      'ดันตัวกลับขึ้นโดยไม่ยกไหล่',
    ],
    mistakes: ['ใช้เก้าอี้ที่ไม่มั่นคงหรือลื่น', 'ศอกกางออกด้านข้าง', 'ลงลึกเกินจนไหล่เจ็บ'],
    beginnerTip: 'ยิ่งงอเข่ามาก ยิ่งทำง่าย ใช้เก้าอี้ที่ชิดผนัง',
  },
];

// Plan label, e.g. "3 เซ็ต × 10 ครั้ง" or "3 เซ็ต × 30 วินาที"
export const formatPlan = (w) =>
  `${w.plan.sets} เซ็ต × ${w.plan.reps ? `${w.plan.reps} ครั้ง` : `${w.plan.holdSeconds} วินาที`}`;

// Seconds for one working set (reps are estimated at ~3 seconds each)
export const setSeconds = (w) => w.plan.holdSeconds || w.plan.reps * 3;

// Total estimated minutes including rest
export const totalMinutes = (w) =>
  Math.max(1, Math.round((w.plan.sets * setSeconds(w) + (w.plan.sets - 1) * w.plan.restSeconds) / 60));

export const PROGRAMS = [
  {
    id: 'fullbody',
    title: 'ฟิตทั้งตัว เริ่มต้นง่าย',
    subtitle: 'Full Body Starter',
    badge: 'แนะนำประจำวัน',
    desc: 'บริหารครบทุกสัดส่วน กระตุ้นหัวใจและสร้างกล้ามเนื้อพื้นฐานในเซสชันเดียว',
    workoutIds: ['jumpingjack', 'squat', 'pushup', 'plank'],
  },
  {
    id: 'upper_core',
    title: 'กระชับต้นแขน & หน้าท้อง',
    subtitle: 'Upper Body & Core',
    badge: 'สร้างกล้ามเนื้อ',
    desc: 'เน้นความแข็งแรงช่วงบน ต้นแขนไม่ย้วย พร้อมปั้นแกนกลางลำตัวให้เฟิร์ม',
    workoutIds: ['pushup', 'tricepdip', 'crunch', 'plank'],
  },
  {
    id: 'cardio_legs',
    title: 'เบิร์นไว ขาเฟิร์ม',
    subtitle: 'Cardio & Lower Body',
    badge: 'เผาผลาญไขมัน',
    desc: 'เร่งการเผาผลาญพลังงานด้วยคาร์ดิโอสลับกับท่าบริหารต้นขาและสะโพก',
    workoutIds: ['jumpingjack', 'squat', 'crunch'],
  },
];

