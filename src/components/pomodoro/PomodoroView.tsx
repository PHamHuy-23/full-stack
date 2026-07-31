import React, { useState, useEffect } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Timer, Play, Pause, RotateCcw, Volume2, VolumeX, 
  Flame, Award 
} from 'lucide-react';

export const PomodoroView: React.FC = () => {
  const { user, logPomodoroSession, pomodoroSessions, tasks } = useDevCanvas();
  
  const [mode, setMode] = useState<'work' | 'short_break' | 'long_break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(tasks[0]?.id);

  const getDuration = (m: 'work' | 'short_break' | 'long_break') => {
    switch (m) {
      case 'work': return 25 * 60;
      case 'short_break': return 5 * 60;
      case 'long_break': return 15 * 60;
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      logPomodoroSession({
        durationMinutes: getDuration(mode) / 60,
        mode,
        taskId: selectedTaskId,
      });
      if (soundEnabled) {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
          osc.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.8);
        } catch {}
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, logPomodoroSession, selectedTaskId, soundEnabled]);

  const switchMode = (newMode: 'work' | 'short_break' | 'long_break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDuration(newMode));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalFocusMinutes = pomodoroSessions
    .filter(s => s.mode === 'work')
    .reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Timer className="w-5 h-5 text-red-400" />
            Developer Focus & Pomodoro Timer
          </h2>
          <p className="text-xs text-slate-400">
            Maintain deep work flow state using 25-minute interval focus cycles.
          </p>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            soundEnabled ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-white/5 text-slate-400 border-white/10'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>Chime Audio {soundEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center space-y-6 border border-red-500/30 max-w-xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex p-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold">
          <button
            onClick={() => switchMode('work')}
            className={`px-4 py-2 rounded-xl transition-all ${
              mode === 'work' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Deep Work (25m)
          </button>
          <button
            onClick={() => switchMode('short_break')}
            className={`px-4 py-2 rounded-xl transition-all ${
              mode === 'short_break' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('long_break')}
            className={`px-4 py-2 rounded-xl transition-all ${
              mode === 'long_break' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        <div className="py-4">
          <div className="text-6xl sm:text-7xl font-mono font-extrabold text-white tracking-widest drop-shadow-lg">
            {formatTime(timeLeft)}
          </div>
          <p className="text-xs text-slate-400 font-mono mt-2 uppercase tracking-wider">
            {mode.replace('_', ' ')} SESSION
          </p>
        </div>

        <div className="w-full max-w-xs space-y-1">
          <label className="text-[11px] font-semibold text-slate-400 uppercase">Link Focus to Task</label>
          <select
            value={selectedTaskId || ''}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-mono"
          >
            <option value="">No task linked</option>
            {tasks.filter(t => t.status !== 'done').map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 hover:scale-105 transition-all"
          >
            {isRunning ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Timer'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono">{user.pomodorosCompletedToday}</div>
            <div className="text-xs text-slate-400">Pomodoros Today</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono">{totalFocusMinutes} min</div>
            <div className="text-xs text-slate-400">Total Focus Time</div>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono">{user.streakDays} Days</div>
            <div className="text-xs text-slate-400">Current Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};
