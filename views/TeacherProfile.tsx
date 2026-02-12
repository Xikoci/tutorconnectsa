
import React, { useState, useEffect } from 'react';
import { Teacher } from '../types.ts';
import { Star, MapPin, GraduationCap, Calendar, CheckCircle, Clock, ShieldCheck, ChevronLeft, Quote, Play, X, MessageSquare, Send, Award, Laptop, Wifi, Mic2, Monitor, Tablet } from 'lucide-react';

interface TeacherProfileProps {
  teacher: Teacher;
  onBook: () => void;
  onBack: () => void;
  onAddReview: (rating: number, comment: string) => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onBook, onBack, onAddReview }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [showVideo, setShowVideo] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0 || !comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddReview(userRating, comment);
      setUserRating(0);
      setComment('');
      setIsSubmitting(false);
    }, 800);
  };

  const getRequirementIcon = (req: string) => {
    const lower = req.toLowerCase();
    if (lower.includes('internet') || lower.includes('fiber')) return <Wifi size={18} />;
    if (lower.includes('tablet') || lower.includes('stylus')) return <Tablet size={18} />;
    if (lower.includes('mic') || lower.includes('headset')) return <Mic2 size={18} />;
    if (lower.includes('webcam') || lower.includes('camera')) return <Monitor size={18} />;
    return <Laptop size={18} />;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32 animate-fade-in transition-colors">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/80 transition-all border border-white/10"
            >
              <X size={24} />
            </button>
            <iframe 
              className="w-full h-full"
              src={teacher.videoUrl ? `${teacher.videoUrl}?autoplay=1` : "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
              title="Teacher Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={onBack}
            className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 mb-6 transition-colors font-medium"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Tutors
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group shrink-0">
              <div className="relative">
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  className="w-32 h-32 md:w-44 md:h-44 rounded-3xl object-cover border-4 border-white dark:border-slate-700 shadow-xl group-hover:scale-[1.02] transition-transform duration-300" 
                />
                <button 
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-teal-600/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                    <Play size={28} fill="currentColor" className="ml-1" />
                  </div>
                </button>
              </div>
              {teacher.verified && (
                <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white p-2 rounded-xl border-4 border-white dark:border-slate-800 shadow-lg">
                   <ShieldCheck size={24} />
                </div>
              )}
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{teacher.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-500">
                      <Star size={18} fill="currentColor" /> {teacher.rating} 
                      <span className="text-slate-400 font-normal">({teacher.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={18} /> Verified Professional
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${teacher.isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                      {teacher.isOnline ? 'Online Now' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                   <button 
                    onClick={onBook}
                    className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-600/20 transition-all transform hover:-translate-y-1"
                   >
                     Book Lesson • R{teacher.hourlyRate}
                   </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {teacher.subjects.map(sub => (
                  <span key={sub} className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold rounded-lg border border-teal-100 dark:border-teal-800">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Quote size={24} className="text-teal-600" /> About the Tutor
              </h2>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
                  {teacher.bio}
                </p>
              </div>
            </section>

            {/* Qualifications & Hardware Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Award size={20} className="text-teal-600" /> Qualifications
                </h3>
                <div className="space-y-4">
                  {teacher.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="mt-1"><CheckCircle size={18} className="text-teal-600" /></div>
                      <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{qual}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Laptop size={20} className="text-teal-600" /> Lesson Hardware
                </h3>
                <div className="space-y-4">
                  {teacher.requirements?.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all hover:bg-white dark:hover:bg-slate-800">
                      <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                        {getRequirementIcon(req)}
                      </div>
                      <span className="text-slate-700 dark:text-slate-200 text-sm font-semibold">{req}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <Star size={24} className="text-teal-600" /> Student Reviews
              </h2>
              
              <div className="space-y-6 mb-12">
                {teacher.reviews.map(review => (
                  <div key={review.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-500">
                          {review.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{review.studentName}</div>
                          <div className="text-xs text-slate-400 font-medium">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="bg-teal-50 dark:bg-teal-900/20 p-8 rounded-3xl border-2 border-dashed border-teal-200 dark:border-teal-800">
                <h4 className="font-black text-teal-900 dark:text-teal-400 mb-6 uppercase tracking-widest text-sm">Share your experience</h4>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rating</div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          className="transition-transform hover:scale-125"
                          onMouseEnter={() => setHoverRating(num)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setUserRating(num)}
                        >
                          <Star 
                            size={32} 
                            className={`${(hoverRating || userRating) >= num ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
                            fill={(hoverRating || userRating) >= num ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea 
                      className="w-full p-4 rounded-2xl border border-teal-200 dark:border-teal-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-[120px]"
                      placeholder="What was it like learning with this teacher?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || userRating === 0 || !comment.trim()}
                    className="px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Review'} <Send size={18} />
                  </button>
                </form>
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 sticky top-24">
              <div className="mb-6">
                <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Standard Rate</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">R{teacher.hourlyRate}</span>
                  <span className="text-slate-400 font-bold">/ hour</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                  <Clock size={18} className="text-teal-600" /> 
                  <span>Lessons are 60 mins long</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                  <Calendar size={18} className="text-teal-600" /> 
                  <span>Flexible rescheduling (24h notice)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                  <MessageSquare size={18} className="text-teal-600" /> 
                  <span>Free 15-min intro call included</span>
                </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-2xl shadow-xl shadow-teal-600/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 mb-4"
              >
                Schedule First Lesson
              </button>
              
              <div className="text-center">
                <span className="text-xs text-slate-400 font-medium">Safe payment via PayFast/Ozow EFT</span>
              </div>
            </div>

            {/* Availability Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
               <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 <Clock size={20} className="text-teal-600" /> Weekly Schedule
               </h4>
               <div className="space-y-3">
                 {days.map(day => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{day}</span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[140px]">
                        {teacher.availability[day]?.length > 0 ? (
                          teacher.availability[day].map(time => (
                            <span key={time} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded">
                              {time}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-300 uppercase font-black">Unavailable</span>
                        )}
                      </div>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Bottom Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-[60] bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 animate-slide-up shadow-2xl md:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase font-black">From</div>
              <div className="text-xl font-black text-slate-900 dark:text-white">R{teacher.hourlyRate}<span className="text-sm font-normal text-slate-500">/hr</span></div>
            </div>
            <button 
              onClick={onBook}
              className="flex-grow py-4 bg-teal-600 text-white font-black rounded-2xl shadow-lg shadow-teal-600/20"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
