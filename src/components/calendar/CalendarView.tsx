import React, { useState } from 'react';
import { useDevCanvas } from '../../context/DevCanvasContext';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight 
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { tasks } = useDevCanvas();
  const [currentMonth, setCurrentMonth] = useState(7); // July 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(31);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getTasksForDay = (day: number) => {
    const dayStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate === dayStr);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            Developer Calendar & Milestones
          </h2>
          <p className="text-xs text-slate-400">
            Schedule task deadlines, sprint releases, and project milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-bold font-mono">
            <button onClick={prevMonth} className="p-1 hover:text-emerald-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <button onClick={nextMonth} className="p-1 hover:text-emerald-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-semibold text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, idx) => (
            <div key={idx} className="py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-28 rounded-xl bg-transparent" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const dayTasks = getTasksForDay(day);
            const isToday = day === 31 && currentMonth === 7 && currentYear === 2026;
            const isSelected = selectedDay === day;

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-28 p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isToday 
                    ? 'bg-emerald-600/20 border-emerald-500/50 ring-2 ring-emerald-500/40' 
                    : isSelected 
                    ? 'bg-white/10 border-white/30' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isToday ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {day}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-16">
                  {dayTasks.map(t => (
                    <div
                      key={t.id}
                      className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono truncate border border-emerald-500/30"
                    >
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
