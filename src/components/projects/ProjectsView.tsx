import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  FolderGit2, Plus, GitBranch, ExternalLink, Trash2, X 
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, addProject, deleteProject, tasks, setSelectedProjectId, setActiveView } = useDevCanvas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjColor, setNewProjColor] = useState('#6366f1');
  const [newProjGithub, setNewProjGithub] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    addProject({
      name: newProjName,
      description: newProjDesc,
      techStack: newProjTech.split(',').map(t => t.trim()).filter(Boolean),
      color: newProjColor,
      githubUrl: newProjGithub || undefined,
      status: 'active',
    });

    setNewProjName('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjGithub('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            Projects Overview & Repositories
          </h2>
          <p className="text-xs text-slate-400">
            Manage your active software projects, stack tags, and milestone progress.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => {
          const projTasks = tasks.filter(t => t.projectId === proj.id);
          const doneTasks = projTasks.filter(t => t.status === 'done').length;
          const progress = projTasks.length > 0 ? Math.round((doneTasks / projTasks.length) * 100) : 0;

          return (
            <div
              key={proj.id}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                      style={{ backgroundColor: proj.color }}
                    >
                      {proj.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {proj.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2">
                  {proj.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-lg bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Progress & Quick Links */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Tasks Completed</span>
                    <span className="text-indigo-400 font-bold">{doneTasks} / {projTasks.length} ({progress}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, backgroundColor: proj.color }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {proj.githubUrl ? (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  ) : <div />}

                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setActiveView('tasks');
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:underline font-semibold"
                  >
                    <span>View Tasks</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                Create New Project
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., DevCanvas UI Studio"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  placeholder="Short description of the project objective..."
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Rust, Tailwind"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Accent Color</label>
                <div className="flex gap-2">
                  {['#6366f1', '#ec4899', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewProjColor(color)}
                      className={`w-7 h-7 rounded-lg transition-transform ${newProjColor === color ? 'scale-110 ring-2 ring-white' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">GitHub URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={newProjGithub}
                  onChange={(e) => setNewProjGithub(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
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
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
