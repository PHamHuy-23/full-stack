import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { Bot, Send, Copy, Check } from 'lucide-react';

export const AIChatView: React.FC = () => {
  const { chatMessages, sendChatMessage } = useDevCanvas();
  const [inputText, setInputText] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const presetPrompts = [
    { title: '⚡ Refactor Async Function', text: 'Refactor my async function to handle rate-limiting and zero allocation.' },
    { title: '🐛 Debug Memory Leak', text: 'How do I detect and fix memory leaks in React single-page apps?' },
    { title: '📊 Write SQL CTE Window Query', text: 'Write a PostgreSQL CTE query for calculating 7-day rolling active user averages.' },
    { title: '🧪 Generate Unit Test', text: 'Generate a comprehensive Jest / React Testing Library test suite for a custom hook.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col justify-between glass-panel rounded-2xl p-6 overflow-hidden animate-in fade-in duration-300">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              DevCanvas AI Assistant
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono font-bold rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                GPT-4o Dev Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Context-aware developer copilot for code generation, refactoring, and debugging.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {chatMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
            }`}>
              {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
            </div>

            <div className={`space-y-3 p-4 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/40 rounded-tr-none'
                : 'bg-slate-900/80 text-slate-200 border border-white/10 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

              {msg.codeSnippet && (
                <div className="rounded-xl overflow-hidden border border-violet-500/30 bg-slate-950/90 space-y-2 mt-2">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-violet-950/40 border-b border-violet-500/20 font-mono text-[10px]">
                    <span className="uppercase text-violet-300 font-bold">{msg.codeSnippet.language}</span>
                    <button
                      onClick={() => handleCopyCode(msg.codeSnippet!.code, msg.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedCodeId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
                    {msg.codeSnippet.code}
                  </pre>
                </div>
              )}

              <div className="text-[9px] text-slate-500 font-mono text-right">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/10 space-y-3">
        <div className="flex flex-wrap gap-2">
          {presetPrompts.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => sendChatMessage(preset.text)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-violet-600/20 hover:border-violet-500/30 border border-white/10 text-[11px] text-slate-300 hover:text-white transition-all text-left"
            >
              {preset.title}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask AI assistant to write code, explain error logs, or design APIs..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 text-xs"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
