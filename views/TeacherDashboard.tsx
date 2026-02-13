
import React, { useState } from 'react';
import { User, Booking, Teacher, VerificationStatus } from '../types.ts';
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
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  ChevronRight,
  FileText,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { syncScheduleToGoogle, generateGoogleCalendarLink } from '../services/calendarService.ts';
import { verifySaceRegistry } from '../services/verificationService.ts';

interface TeacherDashboardProps {
  user: User;
  bookings: Booking[];
  onJoinClass: (bookingId: string) => void;
  onUpdateTutorStatus?: (status: VerificationStatus) => void;
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

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, bookings, onJoinClass, onUpdateTutorStatus }) => {
  const teacher = user as Teacher;
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success'>('idle');
  
  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [saceInput, setSaceInput] = useState(teacher.saceNumber || '');
  const [idInput, setIdInput] = useState(teacher.idNumber || '');

  const [availability, setAvailability] = useState<{ [day: string]: string[] }>(teacher.availability || {
    "Monday": ["14:00", "15:00", "16:00"],
    "Tuesday": ["15:00", "16:00"],
    "Wednesday": ["14:00", "16:00", "17:00"],
    "Thursday": ["15:00", "17:00"],
    "Friday": ["14:00", "15:00"],
    "Saturday": [],
    "Sunday": []
  });

  const handleManualVerify = async () => {
    if (!saceInput || !idInput) return;
    setIsVerifying(true);
    const result = await verifySaceRegistry(saceInput, idInput);
    setIsVerifying(false);
    
    if (result.success && onUpdateTutorStatus) {
      onUpdateTutorStatus(result.status);
    } else {
      alert(result.message);
    }
  };

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

  const getStatusBadge = () => {
    switch(teacher.verificationStatus) {
      case VerificationStatus.VERIFIED:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"><ShieldCheck size={12} /> Verified Educator</span>;
      case VerificationStatus.PENDING:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"><RefreshCcw size={12} className="animate-spin" /> Pending Review</span>;
      case VerificationStatus.REJECTED:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"><ShieldX size={12} /> Verification Failed</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700"><Info size={12} /> Action Required</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
      
      {/* Verification Status Banners */}
      {teacher.verificationStatus === VerificationStatus.VERIFIED && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 flex items-center gap-4 animate-scale-in">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <div className="flex-grow">
             <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wide">Account Fully Verified</h4>
             <p className="text-xs text-emerald-700 dark:text-emerald-400">Your SACE credentials have been approved. You are now a trusted platform educator.</p>
          </div>
          <CheckCircle className="text-emerald-500" size={20} />
        </div>
      )}

      {teacher.verificationStatus === VerificationStatus.PENDING && (
        <div className="mb-8 p-6 rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-scale-in">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-amber-100 text-amber-600">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-amber-900 dark:text-amber-100">Verification Under Review</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 opacity-90">
                Our admin team is checking your SACE registry record. This usually takes 24-48 hours.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs bg-amber-100/50 px-4 py-2 rounded-full">
             <Loader2 size={16} className="animate-spin" /> Step 2: Finalizing Check
          </div>
        </div>
      )}

      {teacher.verificationStatus === VerificationStatus.REJECTED && (
        <div className="mb-8 p-6 rounded-3xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-scale-in">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-red-100 text-red-600">
              <ShieldX size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-red-900 dark:text-red-100">Verification Failed</h3>
              <p className="text-sm text-red-700 dark:text-red-400 opacity-90">
                We couldn't verify your SACE number. Please ensure it matches your ID and re-submit.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Correct SACE Number" 
              className="px-4 py-3 rounded-xl bg-white border border-red-200 text-slate-900 outline-none focus:ring-2 focus:ring-red-500"
              value={saceInput}
              onChange={e => setSaceInput(e.target.value)}
            />
            <button 
              onClick={handleManualVerify}
              disabled={isVerifying}
              className="px-6 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? <Loader2 size={18} className="animate-spin" /> : 'Re-verify'}
            </button>
          </div>
        </div>
      )}

      {teacher.verificationStatus === VerificationStatus.NOT_STARTED && (
        <div className="mb-8 p-6 rounded-3xl bg-indigo-600 border border-indigo-400 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl animate-scale-in">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-white/10 text-white">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Verify Your SACE Status</h3>
              <p className="text-sm text-indigo-100 opacity-90">
                To start accepting payments, we need to verify your SACE registration and South African ID.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="SACE Number" 
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/50"
              value={saceInput}
              onChange={e => setSaceInput(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="ID Number" 
              className="px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 outline-none focus:ring-2 focus:ring-white/50"
              value={idInput}
              onChange={e => setIdInput(e.target.value)}
            />
            <button 
              onClick={handleManualVerify}
              disabled={isVerifying || !saceInput || !idInput}
              className="px-6 py-3 bg-white text-indigo-700 font-black rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isVerifying ? <Loader2 size={18} className="animate-spin" /> : 'Verify Now'}
            </button>
          </div>
        </div>
      )}

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
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Teacher Dashboard</h1>
            {getStatusBadge()}
          </div>
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
          </div>

          <div className="lg:col-span-4 space-y-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};
