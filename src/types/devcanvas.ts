export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';

export type ThemeMode = 'midnight' | 'cyberpunk' | 'emerald' | 'light';

export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  email: string;
  streakDays: number;
  pomodorosCompletedToday: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  color: string;
  githubUrl?: string;
  demoUrl?: string;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  createdAt: string;
}

export interface Note {
  id: string;
  projectId?: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Snippet {
  id: string;
  projectId?: string;
  title: string;
  description?: string;
  language: string;
  code: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: 'docs' | 'tools' | 'api' | 'design' | 'community' | 'other';
  description?: string;
  tags: string[];
  iconUrl?: string;
  createdAt: string;
}

export interface PomodoroSession {
  id: string;
  durationMinutes: number;
  mode: 'work' | 'short_break' | 'long_break';
  completedAt: string;
  taskId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  timestamp: string;
}

export type ActiveView = 
  | 'dashboard'
  | 'projects'
  | 'today'
  | 'calendar'
  | 'notes'
  | 'tasks'
  | 'snippets'
  | 'bookmarks'
  | 'aichat'
  | 'pomodoro'
  | 'settings';
