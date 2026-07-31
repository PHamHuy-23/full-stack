import React from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { Sun, CheckSquare, Timer, Sparkles, CheckCircle2 } from 'lucide-react';

export const TodayView: React.FC = () => {
  const { tasks, moveTaskStatus, setActiveView, user } = useDevCanvas();

  const todayTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            Today's Developer Agenda
          </h2>
          <p className="text-xs text-slate-400">
            Focus on your top execution priorities for July 31, 2026.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('pomodoro')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Timer className="w-4 h-4" />
            <span>Start Focus Block</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
            <CheckSquare className="w-4 h-4 text-blue-400" />
            Active Tasks ({todayTasks.length})
          </h3>

          <div className="space-y-2">
            {todayTasks.map(task => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 flex items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => moveTaskStatus(task.id, 'done')}
                    className="w-5 h-5 rounded-md border border-slate-500 hover:border-emerald-400 flex items-center justify-center transition-colors group"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-transparent group-hover:text-emerald-400" />
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white">{task.title}</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                      <span className="uppercase text-amber-400 font-bold">#{task.priority}</span>
                      <span>{task.tags.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded bg-white/5">
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Today's Metrics
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Completed Tasks</span>
              <span className="text-emerald-400 font-bold">{doneTasks.length}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Pomodoros Done</span>
              <span className="text-amber-400 font-bold">{user.pomodorosCompletedToday}</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-white/5">
              <span className="text-slate-400">Streak Count</span>
              <span className="text-indigo-400 font-bold">{user.streakDays} Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
