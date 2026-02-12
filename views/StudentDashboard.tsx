
import React from 'react';
import { User, Booking } from '../types.ts';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  Award, 
  Video, 
  TrendingUp, 
  CheckCircle2, 
  Zap,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Flame,
  Brain,
  Users
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  bookings: Booking[];
  onJoinClass: (bookingId: string) => void;
}

const MASTERY_DATA = [
  { subject: 'Mathematics', progress: 75, lessonsDone: 12, level: 'Advanced', trend: '+5%' },
  { subject: 'Physical Sciences', progress: 45, lessonsDone: 5, level: 'Intermediate', trend: '+12%' },
  { subject: 'English Home Language', progress: 90, lessonsDone: 18, level: 'Expert', trend: 'Stable' },
];

const BADGES = [
  { id: 1, name: 'Maths Whiz', icon: '📐', color: 'bg-blue-100 text-blue-600', earned: true, desc: 'Completed 10 Maths lessons' },
  { id: 2, name: 'Early Bird', icon: '🌅', color: 'bg-orange-100 text-orange-600', earned: true, desc: 'Joined 5 morning classes' },
  { id: 3, name: 'Perfect Attendee', icon: '✅', color: 'bg-green-100 text-green-600', earned: true, desc: 'No missed sessions' },
  { id: 4, name: 'Knowledge Seeker', icon: '📚', color: 'bg-purple-100 text-purple-600', earned: false, desc: 'Study 3 different subjects' },
  { id: 5, name: 'Global Thinker', icon: '🌍', color: 'bg-slate-100 text-slate-400', earned: false, desc: 'Complete 50 total hours' },
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, bookings, onJoinClass }) => {
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const nextLesson = upcomingBookings[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Banner: Welcome & Streak */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
              className="w-16 h-16 rounded-2xl border-2 border-teal-500 p-0.5" 
              alt="Profile" 
            />
            <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white p-1 rounded-lg">
              <CheckCircle2 size={12} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Aweh, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">You've completed <span className="font-bold text-teal-600">{completedBookings.length} lessons</span> so far. Keep it up!</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center px-4 border-r border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1 text-orange-500 font-black text-xl">
              <Flame size={20} fill="currentColor" /> 12
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Day Streak</span>
          </div>
          <div className="flex flex-col items-center px-4 border-r border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1 text-teal-600 font-black text-xl">
              <Zap size={20} fill="currentColor" /> 1,240
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400">XP Points</span>
          </div>
          <button className="bg-slate-900 dark:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
            View Rewards <Trophy size={16} className="text-amber-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Schedule & AI (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Featured Next Lesson */}
          {nextLesson ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-8 text-white shadow-xl shadow-teal-900/20 group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    Next Lesson: Today at {nextLesson.time}
                  </span>
                  <h2 className="text-4xl font-black mb-2">{nextLesson.subject}</h2>
                  <p className="text-teal-100 flex items-center gap-2 font-medium">
                    <Video size={18} /> 60-minute session with {nextLesson.teacherName}
                  </p>
                </div>
                <button 
                  onClick={() => onJoinClass(nextLesson.id)}
                  className="px-8 py-4 bg-white text-teal-800 font-black rounded-2xl shadow-2xl hover:bg-teal-50 transition-colors flex items-center gap-3 transform group-hover:scale-105"
                >
                  Join Classroom <ArrowRight size={20} />
                </button>
              </div>
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-slate-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Lessons Today</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Ready to boost your marks? Find a top tutor for your next session.</p>
              <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition">
                Browse Tutors
              </button>
            </div>
          )}

          {/* Quick AI Help */}
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-white/10 rounded-2xl">
              <Brain size={40} className="text-indigo-200" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Stuck on Homework?</h3>
              <p className="text-indigo-100 text-sm">Our AI Study Buddy can explain concepts instantly.</p>
            </div>
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Ask a quick question..."
                className="w-full md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:bg-white focus:text-slate-900 outline-none transition-all placeholder:text-indigo-200"
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Learning History */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="text-slate-400" size={20} /> Recent Lessons
              </h3>
              <button className="text-xs font-bold text-teal-600 uppercase tracking-widest hover:underline">Full History</button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {completedBookings.length > 0 ? (
                completedBookings.slice(0, 3).map(booking => (
                  <div key={booking.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/30 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{booking.subject}</div>
                        <div className="text-xs text-slate-500">Taught by {booking.teacherName}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{new Date(booking.date).toLocaleDateString()}</div>
                      <div className="text-[10px] text-teal-600 font-bold uppercase">View Notes</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400 text-sm italic">
                  Complete your first lesson to see your history.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Mastery & Social (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="text-teal-600" size={20} /> Mastery
              </h3>
              <TrendingUp size={18} className="text-teal-500" />
            </div>
            
            <div className="space-y-8">
              {MASTERY_DATA.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{item.subject}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-teal-600 dark:text-teal-400">{item.progress}%</span>
                      {item.trend !== 'Stable' && (
                        <span className="block text-[10px] text-emerald-500 font-bold">{item.trend} increase</span>
                      )}
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200 dark:border-slate-600">
                    <div 
                      className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-out group-hover:bg-teal-400" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-4 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
              Full Analytics <ChevronRight size={16} />
            </button>
          </section>

          <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-black text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Award className="text-amber-500" size={20} /> Achievement Hall
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {BADGES.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl transition border ${
                    badge.earned 
                      ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md' 
                      : 'bg-slate-50/50 dark:bg-slate-900/20 border-transparent opacity-60 grayscale'
                  } group`}
                >
                  <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl text-2xl shadow-sm ${badge.earned ? badge.color : 'bg-slate-200 dark:bg-slate-800'} transition-transform group-hover:scale-110`}>
                    {badge.earned ? badge.icon : '🔒'}
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{badge.name}</div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{badge.desc}</p>
                  </div>
                  {badge.earned && <CheckCircle2 size={16} className="text-teal-500" />}
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 dark:bg-slate-800/50 p-6 rounded-3xl text-white relative overflow-hidden group border border-slate-800">
            <div className="relative z-10">
              <h4 className="font-bold text-teal-400 text-xs uppercase tracking-widest mb-2">Refer & Earn</h4>
              <p className="text-xl font-black mb-4">Get R50 for every friend who joins!</p>
              <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all">
                Copy My Code
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Users size={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
