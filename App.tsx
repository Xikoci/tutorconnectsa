
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Home } from './views/Home.tsx';
import { FindTutors } from './views/FindTutors.tsx';
import { TeacherDashboard } from './views/TeacherDashboard.tsx';
import { StudentDashboard } from './views/StudentDashboard.tsx';
import { Classroom } from './views/Classroom.tsx';
import { TeacherProfile } from './views/TeacherProfile.tsx';
import { LaunchRoadmap } from './views/LaunchRoadmap.tsx';
import { PaymentModal } from './components/PaymentModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { User, UserRole, Booking, Teacher, Review } from './types.ts';
import { MOCK_TEACHERS, MOCK_BOOKINGS } from './mockData.ts';
import { Rocket, CheckCircle, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'signup'>('login');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);
  const [selectedTeacherIdForProfile, setSelectedTeacherIdForProfile] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setIsAuthModalOpen(false);
    
    if (authenticatedUser.role === UserRole.TEACHER) {
      setView('teacher-dashboard');
    } else {
      if (!selectedTeacherForBooking) {
        setView('student-dashboard');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    setNotification({ message: "You have been logged out safely.", type: 'success' });
  };

  const handleBookTeacher = (teacher: Teacher) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    setSelectedTeacherForBooking(teacher);
    setIsPaymentModalOpen(true);
  };

  const handleViewProfile = (teacher: Teacher) => {
    setSelectedTeacherIdForProfile(teacher.id);
    setView('teacher-profile');
  };

  const handleBookingConfirmed = (details: { date: string; time: string; method: string }) => {
    if (!user || !selectedTeacherForBooking) return;

    const platformFee = 30;
    const tutorFee = selectedTeacherForBooking.hourlyRate;
    const totalPaid = tutorFee + platformFee;

    const newBooking: Booking = {
      id: `b${Date.now()}`,
      teacherId: selectedTeacherForBooking.id,
      studentId: user.id,
      teacherName: selectedTeacherForBooking.name,
      studentName: user.name,
      subject: selectedTeacherForBooking.subjects[0],
      date: details.date,
      time: details.time,
      duration: 1,
      tutorFee: tutorFee,
      platformFee: platformFee,
      totalPaid: totalPaid,
      status: 'upcoming',
      meetLink: `room-${Date.now()}`,
      paymentMethod: details.method
    };

    setBookings(prev => [newBooking, ...prev]);
    setIsPaymentModalOpen(false);
    setSelectedTeacherForBooking(null);
    setView('student-dashboard');
    setNotification({ 
      message: `Lesson with ${newBooking.teacherName} successfully booked for ${new Date(details.date).toLocaleDateString()} at ${details.time}!`, 
      type: 'success' 
    });
  };

  const handleAddReview = (teacherId: string, rating: number, comment: string) => {
    if (!user) {
        openAuthModal('login');
        return;
    }

    const newReview: Review = {
        id: `r${Date.now()}`,
        studentName: user.name,
        rating,
        comment,
        date: new Date().toLocaleDateString()
    };

    setTeachers(prev => prev.map(t => {
        if (t.id === teacherId) {
            const updatedReviews = [newReview, ...t.reviews];
            const newTotalRating = updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length;
            return {
                ...t,
                reviews: updatedReviews,
                reviewsCount: updatedReviews.length,
                rating: Number(newTotalRating.toFixed(1))
            };
        }
        return t;
    }));
    setNotification({ message: "Thank you! Your review has been posted.", type: 'success' });
  };

  const handleJoinClass = (bookingId: string) => {
    setActiveBookingId(bookingId);
    setView('classroom');
  };

  const currentProfileTeacher = teachers.find(t => t.id === selectedTeacherIdForProfile);

  const renderView = () => {
    switch(view) {
      case 'home':
        return <Home onFindTutors={() => setView('search')} onJoinAsTeacher={() => openAuthModal('signup')} />;
      case 'search':
        return <FindTutors teachers={teachers} onBookTeacher={handleBookTeacher} onViewProfile={handleViewProfile} />;
      case 'teacher-profile':
        return currentProfileTeacher ? (
          <TeacherProfile 
            teacher={currentProfileTeacher} 
            onBook={() => handleBookTeacher(currentProfileTeacher)}
            onBack={() => setView('search')}
            onAddReview={(rating, comment) => handleAddReview(currentProfileTeacher.id, rating, comment)}
          />
        ) : <FindTutors teachers={teachers} onBookTeacher={handleBookTeacher} onViewProfile={handleViewProfile} />;
      case 'teacher-dashboard':
        return user?.role === UserRole.TEACHER ? (
          <TeacherDashboard user={user} bookings={bookings} onJoinClass={handleJoinClass} />
        ) : <Home onFindTutors={() => setView('search')} onJoinAsTeacher={() => openAuthModal('signup')} />;
      case 'student-dashboard':
        return user?.role === UserRole.STUDENT ? (
          <StudentDashboard user={user} bookings={bookings} onJoinClass={handleJoinClass} />
        ) : <Home onFindTutors={() => setView('search')} onJoinAsTeacher={() => openAuthModal('signup')} />;
      case 'classroom':
        return <Classroom user={user} bookingId={activeBookingId} onLeave={() => setView(user?.role === UserRole.TEACHER ? 'teacher-dashboard' : 'student-dashboard')} />;
      case 'roadmap':
        return <LaunchRoadmap />;
      default:
        return <Home onFindTutors={() => setView('search')} onJoinAsTeacher={() => openAuthModal('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {view !== 'classroom' && (
        <Navbar 
          user={user} 
          onNavigate={setView} 
          onLogout={handleLogout}
          onLoginClick={() => openAuthModal('login')}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-[100] max-w-sm w-full animate-slide-up md:animate-scale-in">
          <div className={`p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border ${
            notification.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
              : 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
              <p className="text-sm font-bold leading-tight">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <main>
        {renderView()}
      </main>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        teacher={selectedTeacherForBooking}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmBooking={handleBookingConfirmed}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalInitialMode}
      />

      {/* Admin Floating Shortcut for the Launch Control Center */}
      {view === 'home' && (
        <button 
          onClick={() => setView('roadmap')}
          className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform z-40 border border-slate-700"
        >
          <Rocket size={20} className="text-teal-400" />
          <span className="font-bold text-sm">Launch Control</span>
        </button>
      )}
    </div>
  );
}
