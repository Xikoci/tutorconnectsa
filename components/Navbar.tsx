
import React from 'react';
import { User, UserRole } from '../types.ts';
import { BookOpen, LogOut, Menu, User as UserIcon, LayoutDashboard, Search, Moon, Sun, Rocket } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onLoginClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, onLoginClick, darkMode, onToggleDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <BookOpen className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            <span className="ml-2 text-xl font-bold text-slate-900 dark:text-white tracking-tight">TutorConnect<span className="text-teal-600 dark:text-teal-400">SA</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => onNavigate('search')} className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition flex items-center gap-1">
              <Search size={18} /> Find Tutors
            </button>
            
            {user && (
              <button 
                onClick={() => onNavigate(user.role === UserRole.TEACHER ? 'teacher-dashboard' : 'student-dashboard')}
                className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium flex items-center gap-1"
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
            )}

            <button 
              onClick={() => onNavigate('roadmap')}
              className="text-slate-500 hover:text-teal-600 transition flex items-center gap-1"
              title="Owner's Launch Control"
            >
              <Rocket size={18} />
            </button>

            <button 
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user.name}</span>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4">
                <button onClick={onLoginClick} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition">Log in</button>
                <button onClick={onLoginClick} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">
                  Sign up
                </button>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
             <button 
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-slate-600 dark:text-slate-300 p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
