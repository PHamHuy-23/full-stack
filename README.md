# DevCanvas — Modern Developer SaaS Workbench 🚀

![DevCanvas Banner](https://img.shields.io/badge/DevCanvas-SaaS%20Workbench-6366f1?style=for-the-badge&logo=react)
![React 19](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind--CSS-v4.0-06b6d4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=for-the-badge&logo=vite)

**DevCanvas** is an all-in-one developer productivity workbench with a rich, glassmorphic UI. Designed for software engineers, architects, and technical leads to manage projects, tasks, code snippets, notes, bookmarks, focus sessions, and AI copilot interactions in one seamless SaaS interface.

---

## ✨ Features

### 📊 1. Analytics & Executive Dashboard
- **Velocity Metrics:** Interactive focus velocity charts powered by Recharts.
- **Project Progress:** Real-time completion rates per repository/project.
- **Daily Focus:** Instant access to high-priority items and pinned technical docs.

### 🗂️ 2. Projects Overview & Repository Manager
- Tech stack tags, color accents, and GitHub repository shortcuts.
- Project-level task filtering and progress tracking.

### 📝 3. Markdown Notes & Docs Editor
- Dual-mode Markdown editor with live HTML preview powered by `marked`.
- Pinning, tag filtering, and instant search.

### 💻 4. Code Snippet Library (Monaco Editor Integration)
- Integrated **Monaco Editor** with multi-language syntax highlighting (TypeScript, Rust, CSS, SQL, Go, Python, HTML).
- One-click copy to clipboard, language filters, and favorite toggles.

### 📋 5. Drag & Drop Kanban Task Board
- Interactive column workflow (**Backlog**, **To Do**, **In Progress**, **Completed**).
- Priority tags (*Urgent*, *High*, *Medium*, *Low*), estimated hours tracking, and celebratory confetti animations.

### 🔖 6. Developer Bookmarks & Resource Hub
- Categorized developer links (Documentation, Dev Tools, API Services, UI/Design) with URL quick copy and category filters.

### 🤖 7. Dev AI Assistant
- Context-aware developer AI assistant with pre-built prompt shortcuts (*Refactor Async Function*, *Debug Memory Leak*, *SQL CTE Query*, *Unit Test Generator*) and formatted code snippet outputs.

### ⏱️ 8. Focus & Pomodoro Timer
- Customizable 25-minute Deep Work, 5-minute Short Break, and 15-minute Long Break timers.
- Audio chime notifications, task linking, and streak counters.

### 📅 9. Developer Calendar & Milestones
- Monthly calendar grid for tracking task due dates and release milestones.

### 🎨 10. Multi-Theme Engine & Command Palette
- **4 Visual Themes:** Cyberpunk Dark, Midnight Blue, Emerald Neon, and Light Glass.
- **`Ctrl + K` Command Palette** for keyboard-first navigation and instant search.
- Full JSON backup export and restore.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19, TypeScript
- **Styling & Glassmorphism:** Tailwind CSS v4, Custom CSS Tokens
- **Code Editor:** `@monaco-editor/react`
- **Charts & Data Visualization:** `recharts`
- **Icons:** `lucide-react`
- **Markdown Processing:** `marked`
- **Animations & Effects:** `canvas-confetti`
- **Build Tool:** Vite 8

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/PHamHuy-23/full-stack.git
cd full-stack
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`

### 4. Build for production
```bash
npm run build
```

---

## 🗃️ Data Models Overview

- **User:** Profile, avatar, role, focus streak days, completed pomodoros.
- **Project:** ID, title, description, tech stack, color, repository URL, status.
- **Task:** ID, project ID, title, status, priority, due date, estimated/actual hours, tags.
- **Note:** ID, title, markdown content, tags, pinned status.
- **Snippet:** ID, title, language, code content, description, tags, favorite status.
- **Bookmark:** ID, title, URL, category, tags.

---

## 📄 License
MIT © [PHamHuy-23](https://github.com/PHamHuy-23)
