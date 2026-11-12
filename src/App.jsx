import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import TimerModal from './components/TimerModal';
import WorkoutDetail from './components/WorkoutDetail';
import Home from './pages/Home';
import Stats from './pages/Stats';
import WorkoutPage from './pages/WorkoutPage';
import Profile from './pages/Profile';
import useLocalStorage from './hooks/useLocalStorage';
import usePwaInstall from './hooks/usePwaInstall';

export default function App() {
  const pwa = usePwaInstall();
  const [tab, setTab] = useState('home');
  const [detail, setDetail] = useState(null); // workout shown in detail modal
  const [active, setActive] = useState(null); // single workout or { title, queue } in timer modal
  const [history, setHistory] = useLocalStorage('bm_history', []);
  const [heartRates, setHeartRates] = useLocalStorage('bm_heartrates', []);
  const [profile, setProfile] = useLocalStorage('bm_profile', { name: '', age: '', weight: '', height: '' });

  const startTimer = (w) => {
    setDetail(null);
    setActive({ workout: w });
  };

  const startProgram = ({ title, queue }) => {
    setDetail(null);
    setActive({ workout: queue[0], queue, programTitle: title });
  };

  const handleComplete = ({ workoutId, name, seconds, sets, bpm }) => {
    const date = new Date().toISOString();
    setHistory((h) => [{ id: Date.now(), workoutId, name, seconds, sets, bpm, date }, ...h]);
    if (bpm) setHeartRates((l) => [{ id: Date.now() + 1, bpm, note: `หลัง${name}`, date }, ...l]);
    setActive(null);
    setTab('stats');
  };

  const resetAll = () => {
    setHistory([]);
    setHeartRates([]);
    setProfile({ name: '', age: '', weight: '', height: '' });
  };

  return (
    <div className="min-h-screen pb-28">
      <Header onProfile={() => setTab('profile')} pwa={pwa} />
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {tab === 'home' && <Home onOpen={setDetail} />}
        {tab === 'stats' && <Stats history={history} heartRates={heartRates} setHeartRates={setHeartRates} />}
        {tab === 'workout' && <WorkoutPage onOpen={setDetail} onStartProgram={startProgram} />}
        {tab === 'profile' && <Profile profile={profile} setProfile={setProfile} onReset={resetAll} pwa={pwa} />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
      {detail && <WorkoutDetail workout={detail} onClose={() => setDetail(null)} onStart={startTimer} />}
      {active && (
        <TimerModal
          key={active.programTitle || active.workout.id}
          workout={active.workout}
          queue={active.queue}
          programTitle={active.programTitle}
          onClose={() => setActive(null)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}

