import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  CheckSquare, Plus, Trash2, Clock, X 
} from 'lucide-react';
import type { TaskStatus, Priority } from '../../types/devcanvas';

export const TaskBoardView: React.FC = () => {
  const { 
    tasks, addTask, deleteTask, moveTaskStatus, 
    projects, selectedProjectId, setSelectedProjectId 
  } = useDevCanvas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newProjId, setNewProjId] = useState(projects[0]?.id || '');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [newStatus, setNewStatus] = useState<TaskStatus>('todo');
  const [newEstHours, setNewEstHours] = useState(3);
  const [newTags, setNewTags] = useState('Frontend, Feature');

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'backlog', label: 'Backlog', color: 'border-slate-500/30 text-slate-400 bg-slate-500/10' },
    { id: 'todo', label: 'To Do', color: 'border-blue-500/30 text-blue-400 bg-blue-500/10' },
    { id: 'in_progress', label: 'In Progress', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
    { id: 'done', label: 'Completed', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' },
  ];

  const filteredTasks = selectedProjectId
    ? tasks.filter(t => t.projectId === selectedProjectId)
    : tasks;

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTaskId) {
      moveTaskStatus(draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle,
      description: newDesc,
      projectId: newProjId || projects[0]?.id || 'proj-1',
      status: newStatus,
      priority: newPriority,
      estimatedHours: newEstHours,
      actualHours: 0,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-400" />
            Developer Kanban Board
          </h2>
          <p className="text-xs text-slate-400">
            Drag and drop tasks between execution stages to track development velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedProjectId || ''}
            onChange={(e) => setSelectedProjectId(e.target.value || null)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="">All Projects ({tasks.length} Tasks)</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
              className="glass-panel rounded-2xl p-4 flex flex-col justify-between min-h-[500px] border border-white/10 bg-slate-900/40"
            >
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-2.5 rounded-xl border ${col.color}`}>
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    {col.label}
                  </span>
                  <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[350px]">
                  {colTasks.map(task => {
                    const proj = projects.find(p => p.id === task.projectId);

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className="glass-panel glass-panel-hover p-4 rounded-xl space-y-3 cursor-grab active:cursor-grabbing border border-white/10 bg-slate-900/80 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                            {task.title}
                          </h4>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-400 rounded transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {task.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-[10px] pt-1">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold uppercase ${
                            task.priority === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            task.priority === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            task.priority === 'medium' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {task.priority}
                          </span>

                          {proj && (
                            <div className="flex items-center gap-1.5 font-mono text-slate-400">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.color }} />
                              <span className="truncate max-w-[100px]">{proj.name}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                          <div className="flex gap-1">
                            {task.tags.map((t, idx) => (
                              <span key={idx}>#{t}</span>
                            ))}
                          </div>
                          {task.estimatedHours && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{task.estimatedHours}h</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setNewStatus(col.id);
                  setIsModalOpen(true);
                }}
                className="w-full mt-4 py-2 rounded-xl border border-dashed border-white/10 hover:border-blue-500/40 text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-400" />
                Create Developer Task
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Fix WebSocket Reconnection Memory Leak"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project</label>
                <select
                  value={newProjId}
                  onChange={(e) => setNewProjId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:border-blue-500 font-mono"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent 🔥</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={newEstHours}
                    onChange={(e) => setNewEstHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Backend, API, Bugfix"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Task details and acceptance criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
