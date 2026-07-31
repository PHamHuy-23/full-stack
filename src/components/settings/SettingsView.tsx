import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Settings, Palette, Key, Download, Check, Command 
} from 'lucide-react';
import type { ThemeMode } from '../../types/devcanvas';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useDevCanvas();
  const [apiKey, setApiKey] = useState('sk-devcanvas-xxxxxxxxxxxx');
  const [isSaved, setIsSaved] = useState(false);

  const themes: { id: ThemeMode; name: string; desc: string; colors: string[] }[] = [
    { id: 'cyberpunk', name: 'Cyberpunk Dark', desc: 'Neon Indigo background with cyan & violet accents.', colors: ['#090d16', '#6366f1', '#06b6d4', '#8b5cf6'] },
    { id: 'midnight', name: 'Midnight Blue', desc: 'Deep slate blue palette for minimal night coding.', colors: ['#0b1329', '#38bdf8', '#4f46e5', '#f43f5e'] },
    { id: 'emerald', name: 'Emerald Neon', desc: 'Futuristic matrix green layout with amber highlights.', colors: ['#051b14', '#10b981', '#14b8a6', '#f59e0b'] },
    { id: 'light', name: 'Light Glass', desc: 'Clean frosted light workspace for high visibility.', colors: ['#f8fafc', '#4338ca', '#0284c7', '#db2777'] },
  ];

  const handleExportData = () => {
    const data = {
      user: localStorage.getItem('devcanvas_user'),
      projects: localStorage.getItem('devcanvas_projects'),
      tasks: localStorage.getItem('devcanvas_tasks'),
      notes: localStorage.getItem('devcanvas_notes'),
      snippets: localStorage.getItem('devcanvas_snippets'),
      bookmarks: localStorage.getItem('devcanvas_bookmarks'),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devcanvas_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          Settings & Preferences
        </h2>
        <p className="text-xs text-slate-400">
          Customize UI theme presets, AI API keys, and workspace backup options.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          Appearance & Visual Theme
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themes.map(t => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-3 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500/50 ring-2 ring-indigo-500/30'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
                <p className="text-[11px] text-slate-400">{t.desc}</p>

                <div className="flex gap-2">
                  {t.colors.map((c, idx) => (
                    <div key={idx} className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-violet-400" />
          AI Copilot API Configuration
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">OpenAI / Custom LLM Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-violet-500"
              />
              <button
                onClick={() => setIsSaved(true)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-md shadow-violet-600/30 transition-all"
              >
                {isSaved ? 'Saved!' : 'Save Key'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-400" />
          Workspace Data Backup
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Export all your local notes, tasks, code snippets, and bookmarks into a JSON backup file.
          </p>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Command className="w-4 h-4 text-cyan-400" />
          Keyboard Shortcuts Cheat Sheet
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          {[
            { key: 'Ctrl + K', desc: 'Open Quick Command Palette' },
            { key: 'Ctrl + Enter', desc: 'Submit AI Chat / Note' },
            { key: 'Alt + P', desc: 'Toggle Pomodoro Timer' },
            { key: 'Esc', desc: 'Close Modals & Popups' },
          ].map((sc, idx) => (
            <div key={idx} className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">{sc.desc}</span>
              <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10">{sc.key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
