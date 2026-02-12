
import React from 'react';
import { ArrowRight, CheckCircle, Video, TrendingUp, Shield, Star, Award, Zap } from 'lucide-react';
import { SUBJECTS } from '../mockData.ts';

interface HomeProps {
  onFindTutors: () => void;
  onJoinAsTeacher: () => void;
}

export const Home: React.FC<HomeProps> = ({ onFindTutors, onJoinAsTeacher }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 opacity-95 z-0"></div>
        <div className="absolute inset-0 opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-bold mb-8 animate-fade-in">
            <Award size={16} /> South Africa's #1 Rated Tutoring Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
            Extra Lessons, <br />
            <span className="text-teal-400">Simplified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 font-medium leading-relaxed">
            The easiest way to find and book qualified South African tutors for high-impact 1-on-1 online lessons. 
            <span className="text-white"> Join thousands of students boosting their results today.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <button 
              onClick={onFindTutors}
              className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black rounded-2xl text-lg transition-all shadow-2xl shadow-teal-500/20 flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              Find a Tutor <ArrowRight size={22} />
            </button>
            <button 
              onClick={onJoinAsTeacher}
              className="px-10 py-5 bg-white/5 border-2 border-slate-700 hover:border-teal-500 hover:bg-teal-500/5 text-white font-bold rounded-2xl text-lg transition-all flex items-center justify-center"
            >
              Join as a Teacher
            </button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2 font-bold text-lg"><Shield size={24}/> SACE Verified</div>
             <div className="flex items-center gap-2 font-bold text-lg"><Star size={24} className="text-amber-500 fill-amber-500"/> 4.9 Avg Rating</div>
             <div className="flex items-center gap-2 font-bold text-lg"><CheckCircle size={24}/> PayFast Escrow</div>
          </div>
        </div>
      </div>

      {/* Stats Section (Revenue Proof) */}
      <div className="bg-white dark:bg-slate-800 py-20 border-b border-slate-100 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                 <div className="text-5xl font-black text-teal-600 mb-2">R5.2m+</div>
                 <div className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Payout to SA Teachers</div>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                 <div className="text-5xl font-black text-teal-600 mb-2">92%</div>
                 <div className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Student Mark Increase</div>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                 <div className="text-5xl font-black text-teal-600 mb-2">250+</div>
                 <div className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Vetted Subjects</div>
              </div>
           </div>
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
             <div className="max-w-xl">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Focused on Your Curriculum</h2>
                <p className="text-slate-500 dark:text-slate-400">Our tutors specialize in the South African schooling system, providing expert support for both CAPS and IEB students from Grade 8 through Matric.</p>
             </div>
             <button onClick={onFindTutors} className="text-teal-600 font-bold flex items-center gap-2 hover:underline">See all subjects <ArrowRight size={18}/></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUBJECTS.slice(0, 8).map((sub, idx) => (
              <div key={idx} onClick={onFindTutors} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal-500/50 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 group flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                   <Zap size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-teal-600 transition">{sub}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Expert coaching for Senior Phase & FET</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600 opacity-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black mb-6">Invest in Your Future Today</h2>
          <p className="text-xl text-slate-300 mb-10">Don't wait for final exams. Secure your spot with a top tutor and start seeing results in your very next test.</p>
          <button 
            onClick={onFindTutors}
            className="px-12 py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black rounded-2xl text-lg shadow-2xl transition-all uppercase tracking-widest"
          >
            Find My Tutor Now
          </button>
        </div>
      </div>
    </div>
  );
};
