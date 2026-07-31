import type { UserProfile, Project, Task, Note, Snippet, Bookmark, PomodoroSession, ChatMessage, ThemeMode } from '../types/devcanvas';

const INITIAL_USER: UserProfile = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'Senior Full-Stack Architect',
  email: 'alex.devcanvas@io.dev',
  streakDays: 14,
  pomodorosCompletedToday: 6,
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'DevCanvas SaaS Studio',
    description: 'All-in-one developer productivity workbench with glassmorphism UI & rich tooling.',
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Monaco', 'Vite'],
    color: '#6366f1',
    githubUrl: 'https://github.com/devcanvas/studio',
    demoUrl: 'https://devcanvas.app',
    status: 'active',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-31',
  },
  {
    id: 'proj-2',
    name: 'NeuralFlow AI Engine',
    description: 'High-throughput LLM streaming proxy with intelligent rate limiting and caching.',
    techStack: ['Rust', 'Tokio', 'Axum', 'Redis', 'Docker'],
    color: '#ec4899',
    githubUrl: 'https://github.com/devcanvas/neural-flow',
    status: 'active',
    createdAt: '2026-07-10',
    updatedAt: '2026-07-30',
  },
  {
    id: 'proj-3',
    name: 'HyperScale Database Driver',
    description: 'Zero-allocation distributed database client library for high concurrency applications.',
    techStack: ['Go', 'gRPC', 'Protobuf', 'PostgreSQL'],
    color: '#10b981',
    githubUrl: 'https://github.com/devcanvas/hyperscale-go',
    status: 'completed',
    createdAt: '2026-06-15',
    updatedAt: '2026-07-25',
  },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Implement Monaco Editor Markdown Live Sync',
    description: 'Connect Monaco editor instance to live Marked HTML renderer with synchronized scrolling.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-08-01',
    estimatedHours: 4,
    actualHours: 2.5,
    tags: ['Frontend', 'Monaco', 'UI'],
    createdAt: '2026-07-30',
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Design Glassmorphism Theme Preset Switcher',
    description: 'Add Cyberpunk, Midnight Blue, Emerald Neon, and Light Glass theme styles.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-07-31',
    estimatedHours: 3,
    actualHours: 3,
    tags: ['CSS', 'Design', 'Theme'],
    createdAt: '2026-07-29',
  },
  {
    id: 'task-3',
    projectId: 'proj-2',
    title: 'Implement Token Bucket Rate Limiting Middleware',
    description: 'Add leaky bucket algorithm in Axum with Redis sliding window backstop.',
    status: 'todo',
    priority: 'urgent',
    dueDate: '2026-08-03',
    estimatedHours: 6,
    actualHours: 0,
    tags: ['Backend', 'Rust', 'Performance'],
    createdAt: '2026-07-31',
  },
  {
    id: 'task-4',
    projectId: 'proj-1',
    title: 'Integrate Pomodoro Audio Feedback & Confetti',
    description: 'Trigger celebration animation upon completing 25-minute focus session.',
    status: 'done',
    priority: 'low',
    dueDate: '2026-07-31',
    estimatedHours: 2,
    actualHours: 1.5,
    tags: ['Feature', 'UX'],
    createdAt: '2026-07-30',
  },
  {
    id: 'task-5',
    projectId: 'proj-2',
    title: 'Benchmark LLM Stream Chunk Latency',
    description: 'Run k6 load tests targeting 5,000 concurrent SSE streams.',
    status: 'backlog',
    priority: 'high',
    dueDate: '2026-08-05',
    estimatedHours: 8,
    actualHours: 0,
    tags: ['DevOps', 'Benchmark'],
    createdAt: '2026-07-28',
  },
  {
    id: 'task-6',
    projectId: 'proj-3',
    title: 'Publish v2.4 Release to Cargo Registry',
    description: 'Update CHANGELOG, tag v2.4.0, run CI/CD publish pipeline.',
    status: 'done',
    priority: 'urgent',
    dueDate: '2026-07-25',
    estimatedHours: 2,
    actualHours: 2,
    tags: ['Release', 'Go'],
    createdAt: '2026-07-24',
  }
];

const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    projectId: 'proj-1',
    title: '🚀 DevCanvas Design System Specs',
    content: `# DevCanvas Design System

Welcome to **DevCanvas**! Here are the core visual identity rules for building ultra-clean SaaS interfaces:

## 🎨 Color Palette & Themes
- **Cyberpunk Dark**: Background \`#090d16\`, Accents Cyan \`#06b6d4\`, Neon Violet \`#8b5cf6\`
- **Midnight Blue**: Background \`#0f172a\`, Accents Indigo \`#6366f1\`, Sky \`#0ea5e9\`
- **Emerald Glow**: Background \`#064e3b\`, Accents Mint \`#10b981\`, Amber \`#f59e0b\`

## 💎 Glassmorphism Recipe
\`\`\`css
background: rgba(15, 23, 42, 0.65);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
\`\`\`

## ⚡ Keyboard Shortcuts
- \`Ctrl + K\` - Open Global Command Palette
- \`Ctrl + Enter\` - Run Snippet / Submit Note
- \`Alt + P\` - Toggle Pomodoro Focus Timer
`,
    tags: ['Design', 'Docs', 'Architecture'],
    isPinned: true,
    createdAt: '2026-07-28',
    updatedAt: '2026-07-31',
  },
  {
    id: 'note-2',
    projectId: 'proj-2',
    title: '⚡ Rust Tokio SSE Streaming Architecture',
    content: `# LLM SSE Proxy Architecture

Notes on implementing async zero-copy streaming:

1. **Axum Route Handling**:
   - Use \`axum::response::Sse\` with \`tokio_stream::wrappers::ReceiverStream\`.
   - Ensure channel buffer size is tuned to \`32\` to prevent memory inflation during client stalls.

2. **Error Recovery Strategy**:
   - Fallback to backup API gateway endpoint on HTTP 429 rate limit.
   - Retain last processed token index in client session state.
`,
    tags: ['Rust', 'Backend', 'LLM'],
    isPinned: false,
    createdAt: '2026-07-29',
    updatedAt: '2026-07-30',
  }
];

const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 'snip-1',
    projectId: 'proj-1',
    title: 'Custom React Debounced State Hook',
    description: 'Utility hook to delay state updates for auto-saving search or editor inputs.',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}`,
    tags: ['React', 'Hooks', 'TypeScript'],
    isFavorite: true,
    createdAt: '2026-07-25',
  },
  {
    id: 'snip-2',
    projectId: 'proj-2',
    title: 'Axum Async Rate Limiter Middleware',
    description: 'Sliding window token bucket implementation in Rust for Axum framework.',
    language: 'rust',
    code: `use axum::{
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use std::sync::Arc;

pub async fn rate_limit_middleware<B>(
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    let client_ip = req.headers()
        .get("x-forwarded-for")
        .and_then(|hv| hv.to_str().ok())
        .unwrap_or("127.0.0.1");

    println!("Request from IP: {}", client_ip);
    
    Ok(next.run(req).await)
}`,
    tags: ['Rust', 'Axum', 'Middleware'],
    isFavorite: true,
    createdAt: '2026-07-27',
  },
  {
    id: 'snip-3',
    projectId: 'proj-1',
    title: 'Glassmorphic CSS Card Component',
    description: 'Reusable Tailwind CSS utility classes for frosted glass cards with gradient glow hover.',
    language: 'css',
    code: `.glass-card {
  background: rgba(18, 24, 38, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
}`,
    tags: ['CSS', 'Tailwind', 'UI'],
    isFavorite: false,
    createdAt: '2026-07-28',
  }
];

const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    title: 'Tailwind CSS Documentation',
    url: 'https://tailwindcss.com/docs',
    category: 'docs',
    description: 'Official Tailwind CSS documentation and utility class search.',
    tags: ['CSS', 'Styling', 'Docs'],
    iconUrl: 'https://tailwindcss.com/favicons/favicon-32x32.png',
    createdAt: '2026-07-15',
  },
  {
    id: 'bm-2',
    title: 'Lucide Icons Directory',
    url: 'https://lucide.dev/icons',
    category: 'design',
    description: 'Beautiful & consistent icon suite for modern web applications.',
    tags: ['Icons', 'UI', 'Design'],
    iconUrl: 'https://lucide.dev/favicon.ico',
    createdAt: '2026-07-18',
  },
  {
    id: 'bm-3',
    title: 'Rust Standard Library Docs',
    url: 'https://doc.rust-lang.org/std/',
    category: 'docs',
    description: 'API reference for standard library types and modules.',
    tags: ['Rust', 'Backend', 'Docs'],
    createdAt: '2026-07-20',
  },
  {
    id: 'bm-4',
    title: 'Ray.so Code Image Generator',
    url: 'https://ray.so',
    category: 'tools',
    description: 'Create beautiful screenshots of your code snippets for Twitter/GitHub.',
    tags: ['Tools', 'Code', 'Screenshots'],
    createdAt: '2026-07-22',
  },
  {
    id: 'bm-5',
    title: 'Excalidraw Visual Canvas',
    url: 'https://excalidraw.com',
    category: 'tools',
    description: 'Virtual whiteboard for sketching architecture diagrams and flowcharts.',
    tags: ['Diagrams', 'Architecture', 'Whiteboard'],
    createdAt: '2026-07-25',
  }
];

const INITIAL_POMODORO_SESSIONS: PomodoroSession[] = [
  { id: 'pomo-1', durationMinutes: 25, mode: 'work', completedAt: '2026-07-31T09:00:00Z', taskId: 'task-1' },
  { id: 'pomo-2', durationMinutes: 25, mode: 'work', completedAt: '2026-07-31T10:00:00Z', taskId: 'task-1' },
  { id: 'pomo-3', durationMinutes: 25, mode: 'work', completedAt: '2026-07-31T11:30:00Z', taskId: 'task-2' },
  { id: 'pomo-4', durationMinutes: 25, mode: 'work', completedAt: '2026-07-31T14:15:00Z', taskId: 'task-4' },
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello Alex! I am your **DevCanvas AI Assistant**. I can help you debug code, write unit tests, refactor Rust/TypeScript, generate SQL queries, or draft technical notes. What are we building today?',
    timestamp: '09:00 AM',
  }
];

export class StorageService {
  private static getKey(key: string): string {
    return `devcanvas_${key}`;
  }

  public static getUser(): UserProfile {
    const data = localStorage.getItem(this.getKey('user'));
    return data ? JSON.parse(data) : INITIAL_USER;
  }

  public static saveUser(user: UserProfile): void {
    localStorage.setItem(this.getKey('user'), JSON.stringify(user));
  }

  public static getTheme(): ThemeMode {
    const theme = localStorage.getItem(this.getKey('theme'));
    return (theme as ThemeMode) || 'cyberpunk';
  }

  public static saveTheme(theme: ThemeMode): void {
    localStorage.setItem(this.getKey('theme'), theme);
  }

  public static getProjects(): Project[] {
    const data = localStorage.getItem(this.getKey('projects'));
    return data ? JSON.parse(data) : INITIAL_PROJECTS;
  }

  public static saveProjects(projects: Project[]): void {
    localStorage.setItem(this.getKey('projects'), JSON.stringify(projects));
  }

  public static getTasks(): Task[] {
    const data = localStorage.getItem(this.getKey('tasks'));
    return data ? JSON.parse(data) : INITIAL_TASKS;
  }

  public static saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.getKey('tasks'), JSON.stringify(tasks));
  }

  public static getNotes(): Note[] {
    const data = localStorage.getItem(this.getKey('notes'));
    return data ? JSON.parse(data) : INITIAL_NOTES;
  }

  public static saveNotes(notes: Note[]): void {
    localStorage.setItem(this.getKey('notes'), JSON.stringify(notes));
  }

  public static getSnippets(): Snippet[] {
    const data = localStorage.getItem(this.getKey('snippets'));
    return data ? JSON.parse(data) : INITIAL_SNIPPETS;
  }

  public static saveSnippets(snippets: Snippet[]): void {
    localStorage.setItem(this.getKey('snippets'), JSON.stringify(snippets));
  }

  public static getBookmarks(): Bookmark[] {
    const data = localStorage.getItem(this.getKey('bookmarks'));
    return data ? JSON.parse(data) : INITIAL_BOOKMARKS;
  }

  public static saveBookmarks(bookmarks: Bookmark[]): void {
    localStorage.setItem(this.getKey('bookmarks'), JSON.stringify(bookmarks));
  }

  public static getPomodoroSessions(): PomodoroSession[] {
    const data = localStorage.getItem(this.getKey('pomodoros'));
    return data ? JSON.parse(data) : INITIAL_POMODORO_SESSIONS;
  }

  public static savePomodoroSessions(sessions: PomodoroSession[]): void {
    localStorage.setItem(this.getKey('pomodoros'), JSON.stringify(sessions));
  }

  public static getChatMessages(): ChatMessage[] {
    const data = localStorage.getItem(this.getKey('chat'));
    return data ? JSON.parse(data) : INITIAL_CHAT_MESSAGES;
  }

  public static saveChatMessages(messages: ChatMessage[]): void {
    localStorage.setItem(this.getKey('chat'), JSON.stringify(messages));
  }
}
