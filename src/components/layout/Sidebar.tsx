import React from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import type { ActiveView } from '../../types/devcanvas';
import { 
  LayoutDashboard, FolderGit2, Sun, Calendar as CalendarIcon, 
  FileText, CheckSquare, Code2, Bookmark as BookmarkIcon, 
  Bot, Timer, Settings as SettingsIcon, Sparkles, ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeView, setActiveView, 
    projects, selectedProjectId, setSelectedProjectId,
    tasks, notes, snippets
  } = useDevCanvas();

  const activeTasksCount = tasks.filter(t => t.status !== 'done').length;
  const pinnedNotesCount = notes.filter(n => n.isPinned).length;

  const mainNav: { id: ActiveView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'today', label: 'Today', icon: <Sun className="w-4 h-4 text-amber-400" />, badge: activeTasksCount },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />, badge: projects.length },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon className="w-4 h-4 text-emerald-400" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="w-4 h-4 text-purple-400" />, badge: pinnedNotesCount },
    { id: 'tasks', label: 'Task Board', icon: <CheckSquare className="w-4 h-4 text-blue-400" /> },
    { id: 'snippets', label: 'Code Snippets', icon: <Code2 className="w-4 h-4 text-cyan-400" />, badge: snippets.length },
    { id: 'bookmarks', label: 'Bookmarks', icon: <BookmarkIcon className="w-4 h-4 text-pink-400" /> },
    { id: 'aichat', label: 'AI Chat', icon: <Bot className="w-4 h-4 text-violet-400" /> },
    { id: 'pomodoro', label: 'Pomodoro', icon: <Timer className="w-4 h-4 text-red-400" /> },
  ];

  return (
    <aside className="w-64 h-screen glass-sidebar flex flex-col justify-between p-4 sticky top-0 z-30 select-none">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                DevCanvas
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  PRO
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono">Dev SaaS Workbench</p>
            </div>
          </div>
        </div>

        <div className="px-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span>Filter Project</span>
            {selectedProjectId && (
              <button 
                onClick={() => setSelectedProjectId(null)}
                className="text-[10px] text-indigo-400 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedProjectId(null)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedProjectId === null
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span>All Projects</span>
              </div>
            </button>
            {projects.map(proj => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedProjectId === proj.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: proj.color }} />
                  <span className="truncate">{proj.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <nav className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-3">
            Menu
          </div>
          {mainNav.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/30 shadow-md shadow-indigo-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                      isActive 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white/10 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'settings'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            <span>Settings & Themes</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
