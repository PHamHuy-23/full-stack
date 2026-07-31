import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  FileText, Plus, Pin, Trash2, Eye, Code 
} from 'lucide-react';
import { marked } from 'marked';

export const NotesView: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useDevCanvas();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const selectedNote = notes.find(n => n.id === selectedNoteId);
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  const filteredNotes = notes.filter(n => {
    if (tagFilter && !n.tags.includes(tagFilter)) return false;
    return true;
  });

  const handleCreateNote = () => {
    const newNote = {
      title: 'Untitled Note ' + (notes.length + 1),
      content: `# New Developer Note\n\nWrite your markdown notes, API contracts, or architectural blueprints here...\n\n- [ ] Task 1\n- [ ] Task 2`,
      tags: ['Docs'],
      isPinned: false,
    };
    addNote(newNote);
  };

  const renderMarkdownHTML = (markdown: string) => {
    try {
      return { __html: marked.parse(markdown) };
    } catch {
      return { __html: markdown };
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 pb-6 animate-in fade-in duration-300">
      <div className="w-80 glass-panel rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Notes & Docs ({filteredNotes.length})
            </h3>
            <button
              onClick={handleCreateNote}
              className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1 pb-2 border-b border-white/10">
            <button
              onClick={() => setTagFilter(null)}
              className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${
                tagFilter === null ? 'bg-purple-500 text-white font-bold' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${
                  tagFilter === tag ? 'bg-purple-500 text-white font-bold' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredNotes.map(note => {
              const isSelected = note.id === selectedNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500/50 shadow-md shadow-purple-950/50'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate max-w-[170px]">
                      {note.title}
                    </span>
                    {note.isPinned && (
                      <Pin className="w-3 h-3 text-purple-400 fill-purple-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 font-mono">
                    {note.content.replace(/#|\*|`/g, '')}
                  </p>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono pt-1">
                    <span>{note.updatedAt}</span>
                    <div className="flex gap-1">
                      {note.tags.map((t, idx) => (
                        <span key={idx} className="text-purple-300">#{t}</span>
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
        {selectedNote ? (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                className="bg-transparent text-lg font-bold text-white focus:outline-none border-b border-transparent focus:border-purple-500/50 pb-0.5 flex-1"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateNote(selectedNote.id, { isPinned: !selectedNote.isPinned })}
                  className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                    selectedNote.isPinned 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                      : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                  }`}
                  title="Pin note"
                >
                  <Pin className="w-4 h-4" />
                </button>

                <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold">
                  <button
                    onClick={() => setIsPreviewMode(false)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      !isPreviewMode ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Editor</span>
                  </button>
                  <button
                    onClick={() => setIsPreviewMode(true)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      isPreviewMode ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    deleteNote(selectedNote.id);
                    setSelectedNoteId(notes.find(n => n.id !== selectedNote.id)?.id || null);
                  }}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                  title="Delete Note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pt-2">
              {!isPreviewMode ? (
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                  placeholder="Write your note content using Markdown formatting..."
                  className="w-full h-full bg-transparent text-slate-200 font-mono text-sm leading-relaxed focus:outline-none resize-none"
                />
              ) : (
                <div 
                  className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed font-sans space-y-3"
                  dangerouslySetInnerHTML={renderMarkdownHTML(selectedNote.content)}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
            <FileText className="w-12 h-12 text-slate-600" />
            <p className="text-sm font-medium">Select a note from the left or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};
