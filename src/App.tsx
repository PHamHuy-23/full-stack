import React from 'react';
import { DevCanvasProvider, useDevCanvas } from './context/DevCanvasContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/ui/CommandPalette';

import { DashboardView } from './components/dashboard/DashboardView';
import { ProjectsView } from './components/projects/ProjectsView';
import { TodayView } from './components/today/TodayView';
import { CalendarView } from './components/calendar/CalendarView';
import { NotesView } from './components/notes/NotesView';
import { SnippetsView } from './components/snippets/SnippetsView';
import { TaskBoardView } from './components/tasks/TaskBoardView';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { AIChatView } from './components/aichat/AIChatView';
import { PomodoroView } from './components/pomodoro/PomodoroView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent: React.FC = () => {
  const { activeView } = useDevCanvas();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'projects': return <ProjectsView />;
      case 'today': return <TodayView />;
      case 'calendar': return <CalendarView />;
      case 'notes': return <NotesView />;
      case 'snippets': return <SnippetsView />;
      case 'tasks': return <TaskBoardView />;
      case 'bookmarks': return <BookmarksView />;
      case 'aichat': return <AIChatView />;
      case 'pomodoro': return <PomodoroView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
      <CommandPalette />
    </div>
  );
};

export function App() {
  return (
    <DevCanvasProvider>
      <MainContent />
    </DevCanvasProvider>
  );
}

export default App;
