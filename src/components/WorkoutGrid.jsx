import WorkoutCard from './WorkoutCard';

export default function WorkoutGrid({ items, onOpen }) {
  if (items.length === 0) {
    return <p className="text-center text-slate-500 py-10">ไม่พบท่าออกกำลังกายที่ค้นหา</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {items.map((w) => (
        <WorkoutCard key={w.id} workout={w} onOpen={onOpen} />
      ))}
    </div>
  );
}
