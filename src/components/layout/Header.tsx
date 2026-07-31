import React from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Search, Flame, Command, Zap, Timer, CheckCircle2 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, theme, setTheme, 
    setIsCommandPaletteOpen, 
    setActiveView,
    tasks
  } = useDevCanvas();

  const completedTodayTasks = tasks.filter(t => t.status === 'done').length;

  const cycleTheme = () => {
    const modes: ('cyberpunk' | 'midnight' | 'emerald' | 'light')[] = ['cyberpunk', 'midnight', 'emerald', 'light'];
    const nextIdx = (modes.indexOf(theme) + 1) % modes.length;
    setTheme(modes[nextIdx]);
  };

  return (
    <header className="h-16 px-6 glass-panel border-b border-white/10 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10 hover:border-indigo-500/40 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-xs">Search tasks, notes, snippets, commands...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-white/10 text-slate-400 border border-white/10">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-bounce" />
          <span>{user.streakDays} Day Streak</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{completedTodayTasks} Tasks Done</span>
        </div>

        <button
          onClick={() => setActiveView('pomodoro')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-all"
        >
          <Timer className="w-4 h-4 animate-spin-slow" />
          <span className="hidden sm:inline">Pomodoro</span>
          <span className="px-1.5 py-0.2 rounded bg-red-500/20 font-mono text-[11px]">
            {user.pomodorosCompletedToday}
          </span>
        </button>

        <div className="h-6 w-px bg-white/10 mx-1" />

        <button
          onClick={cycleTheme}
          title={`Current theme: ${theme}. Click to change.`}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all capitalize text-xs flex items-center gap-1.5"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="hidden xl:inline">{theme}</span>
        </button>

        <div className="flex items-center gap-3 pl-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50 object-cover"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-white leading-none">{user.name}</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
