
import React, { useState } from 'react';
import { User, Booking } from '../types.ts';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  Video, 
  ArrowUpRight, 
  Wallet, 
  History,
  Info,
  Loader2,
  CheckCircle,
  ExternalLink,
  Save,
  Trash2,
  RefreshCcw
} from 'lucide-react';
import { syncScheduleToGoogle, generateGoogleCalendarLink } from '../services/calendarService.ts';

interface TeacherDashboardProps {
  user: User;
  bookings: Booking[];
  onJoinClass: (bookingId: string) => void;
}

const weeklyData = [
  { name: 'Mon', income: 450 },
  { name: 'Tue', income: 720 },
  { name: 'Wed', income: 300 },
  { name: 'Thu', income: 900 },
  { name: 'Fri', income: 550 },
  { name: 'Sat', income: 1200 },
  { name: 'Sun', income: 800 },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, bookings, onJoinClass }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success'>('idle');

  const [availability, setAvailability] = useState<{ [day: string]: string[] }>({
    "Monday": ["14:00", "15:00", "16:00"],
    "Tuesday": ["15:00", "16:00"],
    "Wednesday": ["14:00", "16:00", "17:00"],
    "Thursday": ["15:00", "17:00"],
    "Friday": ["14:00", "15:00"],
    "Saturday": [],
    "Sunday": []
  });

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const currentDaySlots = prev[day] || [];
      const newDaySlots = currentDaySlots.includes(time)
        ? currentDaySlots.filter(t => t !== time)
        : [...currentDaySlots, time].sort();
      return { ...prev, [day]: newDaySlots };
    });
  };

  const handleSaveAvailability = () => {
    setIsSavingAvailability(true);
    setTimeout(() => {
      setIsSavingAvailability(false);
    }, 1500);
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const totalEarnings = user.balance || 0;

  const handleCalendarSync = async () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    const success = await syncScheduleToGoogle(upcomingBookings, availability);
    if (success) {
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsSyncing(false);
      setSyncStatus('success');
      setShowSyncModal(true);
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  };

  const maxIncome = Math.max(...weeklyData.map(d => d.income));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
      {/* Sync Success Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-200 dark:border-slate-700 animate-scale-in">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-500" size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Calendar Synced!</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
              We've pushed {upcomingBookings.length} classes and your weekly availability slots to your Google Calendar.
            </p>
            <button 
              onClick={() => setShowSyncModal(false)}
              className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-2xl hover:bg-black transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Teacher Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your students, earnings, and schedule in one place.</p>
        </div>
        <div className="flex flex-col items-end">
          <button 
            onClick={handleCalendarSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 ${
              syncStatus === 'success' 
              ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
              : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
            } disabled:opacity-80 disabled:cursor-not-allowed`}
          >
            {isSyncing ? (
              <Loader2 size={18} className="animate-spin" />
            ) : syncStatus === 'success' ? (
              <CheckCircle size={18} />
            ) : (
              <Calendar size={18} />
            )}
            {isSyncing ? 'Syncing...' : syncStatus === 'success' ? 'Synced with Google' : 'Sync Google Calendar'}
          </button>
          {lastSynced && (
            <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
              Last Synced: {lastSynced}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Net Earnings</span>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <Wallet className="text-emerald-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">R{totalEarnings.toLocaleString()}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center font-bold">
              <ArrowUpRight size={14} className="mr-1" /> Available for Payout
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Active Classes</span>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Video className="text-blue-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{upcomingBookings.length}</div>
            <div className="text-xs text-slate-400 mt-1">Next: Today at 14:00</div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Hours Taught</span>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Clock className="text-amber-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">142h</div>
            <div className="text-xs text-slate-400 mt-1">Avg. 15h per week</div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">Student Growth</span>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Users className="text-purple-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">+8</div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-bold">Total: 28 Students</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar size={20} className="text-teal-600" /> Weekly Availability Manager
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Click slots to toggle your working hours across the week.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setAvailability(Object.fromEntries(DAYS.map(d => [d, []])))}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Clear All"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={handleSaveAvailability}
                    disabled={isSavingAvailability}
                    className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold rounded-xl hover:bg-teal-600 transition-all flex items-center gap-2 shadow-lg"
                  >
                    {isSavingAvailability ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSavingAvailability ? 'Saving...' : 'Save Schedule'}
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto p-4 sm:p-8">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-3 mb-6">
                    <div className="h-10"></div>
                    {DAYS.map(day => (
                      <div key={day} className="text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{day.slice(0, 3)}</span>
                      </div>
                    ))}
                    
                    {TIME_SLOTS.map(time => (
                      <React.Fragment key={time}>
                        <div className="flex items-center justify-center">
                          <span className="text-[10px] font-bold text-slate-500">{time}</span>
                        </div>
                        {DAYS.map(day => {
                          const isAvailable = availability[day]?.includes(time);
                          return (
                            <button
                              key={`${day}-${time}`}
                              onClick={() => toggleSlot(day, time)}
                              className={`h-10 rounded-xl transition-all border-2 flex items-center justify-center group ${
                                isAvailable 
                                ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/10' 
                                : 'bg-slate-50 dark:bg-slate-900 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                              }`}
                            >
                              {isAvailable ? <CheckCircle size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-teal-400"></div>}
                            </button>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Earnings Performance</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your weekly revenue after platform fees</p>
                </div>
                <button className="px-3 py-1 text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <RefreshCcw size={12} /> Week
                </button>
              </div>
              <div className="h-64 flex items-end justify-between px-2 gap-4">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-grow flex flex-col items-center group">
                    <div className="relative w-full flex flex-col items-center">
                      <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-teal-600">R{d.income}</div>
                      <div 
                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 ease-out ${i === 5 ? 'bg-teal-600' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300'}`}
                        style={{ height: `${(d.income / maxIncome) * 100}%`, minHeight: '4px' }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-tighter">{d.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <section className="bg-teal-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="font-bold text-teal-100 mb-6 flex items-center justify-between text-xs uppercase tracking-widest">
                   Payout Balance <Info size={14} />
                 </h3>
                 <div className="text-5xl font-black mb-2 tracking-tight">R{totalEarnings.toLocaleString()}</div>
                 <p className="text-teal-200 text-sm mb-8 leading-relaxed">Cleared and available for withdrawal to your South African bank account.</p>
                 <button className="w-full py-4 bg-white text-teal-800 font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg transform group-hover:-translate-y-1 transition-transform">
                   Request Payout Now
                 </button>
               </div>
               <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-teal-600 rounded-full opacity-30 blur-3xl group-hover:scale-110 transition-transform"></div>
            </section>

            <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-slate-900 dark:text-white text-lg">Upcoming Classes</h3>
                <span className="text-[10px] bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full font-black uppercase tracking-wider animate-pulse">Live</span>
              </div>
              <div className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <div key={booking.id} className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 group relative hover:border-teal-500/50 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-slate-900 dark:text-white truncate pr-6">{booking.studentName}</div>
                        <a 
                          href={generateGoogleCalendarLink(booking)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-5 right-5 text-slate-400 hover:text-teal-600 transition-colors"
                          title="Sync to Google Calendar"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-6">{booking.subject} • Today at {booking.time}</div>
                      <button 
                        onClick={() => onJoinClass(booking.id)}
                        className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-600/10 uppercase tracking-widest"
                      >
                        <Video size={14} /> Enter Classroom
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 text-sm italic border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                    No classes scheduled for today.
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-widest text-xs">
                  <History size={16} className="text-slate-400" /> Recent History
                </h3>
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {bookings.filter(b => b.status === 'completed').slice(0, 4).map(b => (
                  <div key={b.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100">{b.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{b.subject} • {new Date(b.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900 dark:text-white">R{b.tutorFee}</div>
                      <div className="text-[9px] text-teal-600 font-bold uppercase">Earned</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/50 hover:text-teal-600 transition-colors">
                View All Activity
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
