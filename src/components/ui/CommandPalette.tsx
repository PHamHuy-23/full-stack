import React, { useState, useEffect } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Search, X, LayoutDashboard, FileText, Code2, CheckSquare, 
  Bot, Timer
} from 'lucide-react';
import type { ActiveView } from '../../types/devcanvas';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, setIsCommandPaletteOpen, 
    setActiveView, tasks, notes, snippets,
    setTheme
  } = useDevCanvas();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()));
  const filteredSnippets = snippets.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-950/80 overflow-hidden flex flex-col max-h-[70vh]">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            placeholder="Type a command or search tasks, notes, snippets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 overflow-y-auto space-y-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {[
                { label: 'Dashboard', view: 'dashboard' as ActiveView, icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" /> },
                { label: 'Task Board', view: 'tasks' as ActiveView, icon: <CheckSquare className="w-4 h-4 text-blue-400" /> },
                { label: 'Notes', view: 'notes' as ActiveView, icon: <FileText className="w-4 h-4 text-purple-400" /> },
                { label: 'Code Snippets', view: 'snippets' as ActiveView, icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
                { label: 'AI Developer Assistant', view: 'aichat' as ActiveView, icon: <Bot className="w-4 h-4 text-violet-400" /> },
                { label: 'Pomodoro Timer', view: 'pomodoro' as ActiveView, icon: <Timer className="w-4 h-4 text-red-400" /> },
              ].map(item => (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
              Themes
            </div>
            <div className="flex gap-2 px-1">
              {[
                { name: 'cyberpunk', color: 'bg-indigo-500' },
                { name: 'midnight', color: 'bg-sky-500' },
                { name: 'emerald', color: 'bg-emerald-500' },
                { name: 'light', color: 'bg-amber-400' }
              ].map(t => (
                <button
                  key={t.name}
                  onClick={() => { setTheme(t.name as any); setIsCommandPaletteOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 capitalize border border-white/10"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {query.trim() !== '' && filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1">
                {filteredTasks.slice(0, 4).map(t => (
                  <button
                    key={t.id}
                    onClick={() => navigateTo('tasks')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase px-2 py-0.5 rounded bg-indigo-500/10">
                      {t.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== '' && filteredNotes.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                Notes ({filteredNotes.length})
              </div>
              <div className="space-y-1">
                {filteredNotes.slice(0, 4).map(n => (
                  <button
                    key={n.id}
                    onClick={() => navigateTo('notes')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span className="truncate">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Note</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== '' && filteredSnippets.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                Snippets ({filteredSnippets.length})
              </div>
              <div className="space-y-1">
                {filteredSnippets.slice(0, 4).map(s => (
                  <button
                    key={s.id}
                    onClick={() => navigateTo('snippets')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10">
                      {s.language}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 bg-black/20 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Tip: Press ESC to dismiss</span>
          <span>DevCanvas Quick Command System</span>
        </div>
      </div>
    </div>
  );
};
