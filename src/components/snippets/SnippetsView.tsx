import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Code2, Plus, Copy, Check, Star, Trash2, Search, X 
} from 'lucide-react';
import Editor from '@monaco-editor/react';

export const SnippetsView: React.FC = () => {
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useDevCanvas();
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(snippets[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLang, setNewLang] = useState('typescript');
  const [newCode, setNewCode] = useState('');
  const [newTags, setNewTags] = useState('');

  const selectedSnippet = snippets.find(s => s.id === selectedSnippetId);
  const languages = Array.from(new Set(snippets.map(s => s.language)));

  const filteredSnippets = snippets.filter(s => {
    if (selectedLanguage && s.language !== selectedLanguage) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    addSnippet({
      title: newTitle,
      description: newDesc,
      language: newLang,
      code: newCode,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      isFavorite: false,
    });

    setNewTitle('');
    setNewDesc('');
    setNewLang('typescript');
    setNewCode('');
    setNewTags('');
    setIsModalOpen(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 pb-6 animate-in fade-in duration-300">
      <div className="w-80 glass-panel rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Code Snippets ({filteredSnippets.length})
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/30"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search code snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-1 pb-2 border-b border-white/10">
            <button
              onClick={() => setSelectedLanguage(null)}
              className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${
                selectedLanguage === null ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-0.5 text-[10px] rounded-md font-mono uppercase ${
                  selectedLanguage === lang ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredSnippets.map(snippet => {
              const isSelected = snippet.id === selectedSnippetId;
              return (
                <div
                  key={snippet.id}
                  onClick={() => setSelectedSnippetId(snippet.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-cyan-600/20 border-cyan-500/50 shadow-md shadow-cyan-950/50'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate max-w-[170px]">
                      {snippet.title}
                    </span>
                    {snippet.isFavorite && (
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="uppercase text-cyan-400 font-bold px-1.5 py-0.2 rounded bg-cyan-500/10">
                      {snippet.language}
                    </span>
                    <div className="flex gap-1 text-slate-400">
                      {snippet.tags.map((t, idx) => (
                        <span key={idx}>#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
        {selectedSnippet ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-bold text-white">{selectedSnippet.title}</h2>
                  <span className="px-2 py-0.5 text-xs font-mono font-bold uppercase rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {selectedSnippet.language}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{selectedSnippet.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateSnippet(selectedSnippet.id, { isFavorite: !selectedSnippet.isFavorite })}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    selectedSnippet.isFavorite ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                  }`}
                >
                  <Star className={`w-4 h-4 ${selectedSnippet.isFavorite ? 'fill-amber-400' : ''}`} />
                </button>

                <button
                  onClick={() => handleCopy(selectedSnippet.code, selectedSnippet.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-600/30 transition-all"
                >
                  {copiedId === selectedSnippet.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    deleteSnippet(selectedSnippet.id);
                    setSelectedSnippetId(snippets.find(s => s.id !== selectedSnippet.id)?.id || null);
                  }}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-slate-950/80">
              <Editor
                height="100%"
                language={selectedSnippet.language}
                theme="vs-dark"
                value={selectedSnippet.code}
                onChange={(val) => val && updateSnippet(selectedSnippet.id, { code: val })}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: 'Fira Code, monospace',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
            <Code2 className="w-12 h-12 text-slate-600" />
            <p className="text-sm font-medium">Select a code snippet to view or create a new one.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                Add Code Snippet
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Snippet Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Debounced State Hook"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Language</label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="rust">Rust</option>
                    <option value="css">CSS</option>
                    <option value="sql">SQL</option>
                    <option value="go">Go</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Hooks, Utility"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Code Content</label>
                <textarea
                  required
                  rows={6}
                  placeholder="// Paste your code here..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-600/30"
                >
                  Save Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
