import React from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  FolderGit2, CheckSquare, FileText, Code2, Timer, 
  Sparkles, ArrowUpRight, Play, Bot, CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { 
    user, projects, tasks, notes, snippets, 
    setActiveView, moveTaskStatus
  } = useDevCanvas();

  const pendingTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'done');
  const pinnedNotes = notes.filter(n => n.isPinned);

  const activityData = [
    { day: 'Mon', focusMinutes: 120, tasksDone: 4 },
    { day: 'Tue', focusMinutes: 150, tasksDone: 6 },
    { day: 'Wed', focusMinutes: 90, tasksDone: 3 },
    { day: 'Thu', focusMinutes: 180, tasksDone: 7 },
    { day: 'Fri', focusMinutes: 140, tasksDone: 5 },
    { day: 'Sat', focusMinutes: 60, tasksDone: 2 },
    { day: 'Sun', focusMinutes: 100, tasksDone: 4 },
  ];

  const projectStats = projects.map(p => {
    const projTasks = tasks.filter(t => t.projectId === p.id);
    const completed = projTasks.filter(t => t.status === 'done').length;
    const total = projTasks.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { name: p.name, percent, color: p.color, total, completed };
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/20 border border-indigo-500/30">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> DevCanvas Workspace Ready
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              You have <span className="text-amber-400 font-semibold">{pendingTasks.length} pending tasks</span> and{' '}
              <span className="text-indigo-400 font-semibold">{urgentTasks.length} urgent items</span> scheduled for today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('pomodoro')}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Focus Session</span>
            </button>
            <button
              onClick={() => setActiveView('aichat')}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all"
            >
              <Bot className="w-4 h-4 text-violet-400" />
              <span>Ask Dev AI</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: projects.length, icon: <FolderGit2 className="w-5 h-5 text-indigo-400" />, view: 'projects' as const, sub: '3 repositories linked' },
          { label: 'Pending Tasks', value: pendingTasks.length, icon: <CheckSquare className="w-5 h-5 text-blue-400" />, view: 'tasks' as const, sub: `${doneTasks.length} completed` },
          { label: 'Code Snippets', value: snippets.length, icon: <Code2 className="w-5 h-5 text-cyan-400" />, view: 'snippets' as const, sub: 'TS, Rust, CSS, SQL' },
          { label: 'Notes & Docs', value: notes.length, icon: <FileText className="w-5 h-5 text-purple-400" />, view: 'notes' as const, sub: `${pinnedNotes.length} pinned` },
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveView(card.view)}
            className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{card.label}</span>
              <div className="p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-white font-mono">{card.value}</div>
              <div className="text-[11px] text-slate-400 mt-1">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Timer className="w-4 h-4 text-indigo-400" />
                Focus & Development Velocity
              </h3>
              <p className="text-xs text-slate-400">Weekly Focus Time (Minutes)</p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Avg 130 min/day
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="focusMinutes" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#focusGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              Project Completion Progress
            </h3>
            <div className="space-y-4">
              {projectStats.map((p, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate">{p.name}</span>
                    <span className="font-mono text-indigo-400 font-bold">{p.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.percent}%`, backgroundColor: p.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('projects')}
            className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Manage All Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-400" />
              Today's High-Priority Focus
            </h3>
            <button
              onClick={() => setActiveView('tasks')}
              className="text-xs text-indigo-400 hover:underline font-semibold"
            >
              View Board
            </button>
          </div>

          <div className="space-y-2">
            {pendingTasks.slice(0, 4).map(task => (
              <div
                key={task.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 flex items-center justify-between gap-3 transition-all"
              >
                <div className="flex items-center gap-3 truncate">
                  <button
                    onClick={() => moveTaskStatus(task.id, 'done')}
                    className="w-5 h-5 rounded-md border border-slate-500 hover:border-emerald-400 flex items-center justify-center transition-colors group"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-transparent group-hover:text-emerald-400" />
                  </button>
                  <div className="truncate">
                    <div className="text-xs font-medium text-slate-200 truncate">{task.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold ${
                        task.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'high' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-300'
                      }`}>
                        {task.priority}
                      </span>
                      {task.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] text-slate-400 font-mono">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-slate-300">
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Pinned Notes & Quick Reference
            </h3>
            <button
              onClick={() => setActiveView('notes')}
              className="text-xs text-purple-400 hover:underline font-semibold"
            >
              Open Editor
            </button>
          </div>

          <div className="space-y-3">
            {notes.slice(0, 2).map(note => (
              <div
                key={note.id}
                onClick={() => setActiveView('notes')}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{note.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{note.updatedAt}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 font-mono opacity-80">
                  {note.content.replace(/#|\*|`/g, '')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
