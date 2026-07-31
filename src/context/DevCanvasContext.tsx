import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  UserProfile, Project, Task, Note, Snippet, Bookmark, 
  PomodoroSession, ChatMessage, ActiveView, ThemeMode, TaskStatus
} from '../types/devcanvas';
import { StorageService } from '../services/storage';
import confetti from 'canvas-confetti';

interface DevCanvasContextType {
  user: UserProfile;
  updateUser: (user: Partial<UserProfile>) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  projects: Project[];
  addProject: (proj: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTaskStatus: (id: string, newStatus: TaskStatus) => void;

  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  snippets: Snippet[];
  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt'>) => void;
  updateSnippet: (id: string, snippet: Partial<Snippet>) => void;
  deleteSnippet: (id: string) => void;

  bookmarks: Bookmark[];
  addBookmark: (bm: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  updateBookmark: (id: string, bm: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;

  pomodoroSessions: PomodoroSession[];
  logPomodoroSession: (session: Omit<PomodoroSession, 'id' | 'completedAt'>) => void;

  chatMessages: ChatMessage[];
  sendChatMessage: (userText: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (isOpen: boolean) => void;
  triggerConfetti: () => void;
}

const DevCanvasContext = createContext<DevCanvasContextType | undefined>(undefined);

export const DevCanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile>(() => StorageService.getUser());
  const [theme, setThemeState] = useState<ThemeMode>(() => StorageService.getTheme());
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [tasks, setTasks] = useState<Task[]>(() => StorageService.getTasks());
  const [notes, setNotes] = useState<Note[]>(() => StorageService.getNotes());
  const [snippets, setSnippets] = useState<Snippet[]>(() => StorageService.getSnippets());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => StorageService.getBookmarks());
  const [pomodoroSessions, setPomodoroSessions] = useState<PomodoroSession[]>(() => StorageService.getPomodoroSessions());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => StorageService.getChatMessages());

  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    StorageService.saveTheme(theme);
  }, [theme]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#ec4899', '#10b981', '#06b6d4', '#f59e0b'],
      });
    } catch {
      // Fallback
    }
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    const newUser = { ...user, ...updated };
    setUserState(newUser);
    StorageService.saveUser(newUser);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const addProject = (projData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    StorageService.saveProjects(updated);
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedData, updatedAt: new Date().toISOString().split('T')[0] } : p);
    setProjects(updated);
    StorageService.saveProjects(updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    StorageService.saveProjects(updated);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const updateTask = (id: string, updatedData: Partial<Task>) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...updatedData } : t);
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const moveTaskStatus = (id: string, newStatus: TaskStatus) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        if (newStatus === 'done' && t.status !== 'done') {
          triggerConfetti();
        }
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTasks(updated);
    StorageService.saveTasks(updated);
  };

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const updateNote = (id: string, updatedData: Partial<Note>) => {
    const updated = notes.map(n => n.id === id ? { ...n, ...updatedData, updatedAt: new Date().toISOString().split('T')[0] } : n);
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    StorageService.saveNotes(updated);
  };

  const addSnippet = (snipData: Omit<Snippet, 'id' | 'createdAt'>) => {
    const newSnip: Snippet = {
      ...snipData,
      id: `snip-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newSnip, ...snippets];
    setSnippets(updated);
    StorageService.saveSnippets(updated);
  };

  const updateSnippet = (id: string, updatedData: Partial<Snippet>) => {
    const updated = snippets.map(s => s.id === id ? { ...s, ...updatedData } : s);
    setSnippets(updated);
    StorageService.saveSnippets(updated);
  };

  const deleteSnippet = (id: string) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    StorageService.saveSnippets(updated);
  };

  const addBookmark = (bmData: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBm: Bookmark = {
      ...bmData,
      id: `bm-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newBm, ...bookmarks];
    setBookmarks(updated);
    StorageService.saveBookmarks(updated);
  };

  const updateBookmark = (id: string, updatedData: Partial<Bookmark>) => {
    const updated = bookmarks.map(b => b.id === id ? { ...b, ...updatedData } : b);
    setBookmarks(updated);
    StorageService.saveBookmarks(updated);
  };

  const deleteBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    StorageService.saveBookmarks(updated);
  };

  const logPomodoroSession = (sessionData: Omit<PomodoroSession, 'id' | 'completedAt'>) => {
    const newSession: PomodoroSession = {
      ...sessionData,
      id: `pomo-${Date.now()}`,
      completedAt: new Date().toISOString(),
    };
    const updated = [newSession, ...pomodoroSessions];
    setPomodoroSessions(updated);
    StorageService.savePomodoroSessions(updated);

    if (sessionData.mode === 'work') {
      updateUser({ pomodorosCompletedToday: user.pomodorosCompletedToday + 1 });
      triggerConfetti();
    }
  };

  const sendChatMessage = (userText: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedWithUser = [...chatMessages, userMsg];
    setChatMessages(updatedWithUser);

    setTimeout(() => {
      let aiText = `I analyzed your request regarding **"${userText.slice(0, 30)}..."**. Here is the recommended technical approach:`;
      let codeSnippet: ChatMessage['codeSnippet'] = undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('rust') || lower.includes('tokio') || lower.includes('async')) {
        aiText = `Here is an optimized asynchronous pattern using Rust & Tokio channels for zero-allocation task dispatching:`;
        codeSnippet = {
          language: 'rust',
          code: `use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(100);

    tokio::spawn(async move {
        tx.send("DevCanvas async payload").await.unwrap();
    });

    while let Some(message) = rx.recv().await {
        println!("Received: {}", message);
    }
}`,
        };
      } else if (lower.includes('react') || lower.includes('typescript') || lower.includes('component')) {
        aiText = `Here is a reusable React TypeScript component with glassmorphic styling and memoized event handlers:`;
        codeSnippet = {
          language: 'typescript',
          code: `import React, { memo } from 'react';

interface DevCardProps {
  title: string;
  badgeText: string;
  onAction?: () => void;
}

export const DevCard = memo<DevCardProps>(({ title, badgeText, onAction }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-400 font-mono">
          {badgeText}
        </span>
      </div>
    </div>
  );
});`,
        };
      } else if (lower.includes('sql') || lower.includes('database') || lower.includes('query')) {
        aiText = `Here is an optimized PostgreSQL query with CTE and window functions for analytics aggregation:`;
        codeSnippet = {
          language: 'sql',
          code: `WITH daily_stats AS (
  SELECT 
    project_id,
    DATE(completed_at) AS session_date,
    COUNT(*) AS total_pomodoros,
    SUM(duration_minutes) AS focus_minutes
  FROM pomodoro_sessions
  GROUP BY project_id, DATE(completed_at)
)
SELECT 
  p.name AS project_name,
  ds.session_date,
  ds.focus_minutes,
  RANK() OVER (PARTITION BY ds.session_date ORDER BY ds.focus_minutes DESC) AS rank
FROM daily_stats ds
JOIN projects p ON p.id = ds.project_id
ORDER BY ds.session_date DESC;`,
        };
      } else {
        aiText += `\n\n1. **Modularity**: Break component boundaries into single-responsibility custom hooks.\n2. **Type Safety**: Enforce strict interface contracts with TypeScript discriminated unions.\n3. **Performance**: Utilize CSS GPU acceleration (\`transform\`, \`opacity\`) for 60fps animations.`;
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiText,
        codeSnippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const finalMessages = [...updatedWithUser, aiMsg];
      setChatMessages(finalMessages);
      StorageService.saveChatMessages(finalMessages);
    }, 600);
  };

  return (
    <DevCanvasContext.Provider value={{
      user, updateUser,
      theme, setTheme,
      activeView, setActiveView,
      selectedProjectId, setSelectedProjectId,
      projects, addProject, updateProject, deleteProject,
      tasks, addTask, updateTask, deleteTask, moveTaskStatus,
      notes, addNote, updateNote, deleteNote,
      snippets, addSnippet, updateSnippet, deleteSnippet,
      bookmarks, addBookmark, updateBookmark, deleteBookmark,
      pomodoroSessions, logPomodoroSession,
      chatMessages, sendChatMessage,
      searchQuery, setSearchQuery,
      isCommandPaletteOpen, setIsCommandPaletteOpen,
      triggerConfetti,
    }}>
      {children}
    </DevCanvasContext.Provider>
  );
};

export const useDevCanvas = () => {
  const context = useContext(DevCanvasContext);
  if (!context) {
    throw new Error('useDevCanvas must be used within a DevCanvasProvider');
  }
  return context;
};
