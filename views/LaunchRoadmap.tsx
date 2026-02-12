
import React, { useState } from 'react';
import { Rocket, CheckCircle2, ShieldCheck, Globe, CreditCard, Users, Zap, DollarSign, Target, MessageCircle, BarChart3, Lock } from 'lucide-react';

export const LaunchRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'blueprint'>('roadmap');

  const steps = [
    {
      category: 'Tech',
      title: 'Host on Vercel (SA Region)',
      desc: 'Deploy to "Cape Town (South)" edge nodes for the lowest possible latency during video lessons.',
      action: 'Connect GitHub',
      icon: <Globe className="text-blue-500" />
    },
    {
      category: 'Fin',
      title: 'Enable PayFast / Ozow',
      desc: 'Configure your Merchant ID in payfastService.ts to start accepting Instant EFT and Capitec Pay.',
      action: 'Link Merchant ID',
      icon: <CreditCard className="text-emerald-500" />
    },
    {
      category: 'Legal',
      title: 'SACE & ID Verification',
      desc: 'Integrate a simple KYC flow to verify Teacher SACE numbers against the national database.',
      action: 'Setup KYC',
      icon: <ShieldCheck className="text-purple-500" />
    },
    {
      category: 'Growth',
      title: 'WhatsApp Referral Engine',
      desc: 'The "Secret Sauce" for SA: Build a bot that shares student results to parent WhatsApp groups.',
      action: 'Launch Bot',
      icon: <MessageCircle className="text-amber-500" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in transition-colors">
      <div className="text-center mb-12">
        <div className="inline-flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab('roadmap')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'roadmap' ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-sm' : 'text-slate-500'}`}
          >
            Launch Roadmap
          </button>
          <button 
            onClick={() => setActiveTab('blueprint')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'blueprint' ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-sm' : 'text-slate-500'}`}
          >
            Product Blueprint
          </button>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Launch Control Center 🇿🇦</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Your mission control for taking TutorConnect SA to market today.</p>
      </div>

      {activeTab === 'roadmap' ? (
        <div className="grid gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-8 hover:border-teal-500 transition-all group">
              <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl group-hover:rotate-6 transition-transform">
                {step.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 bg-slate-900 dark:bg-slate-700 rounded-md">{step.category}</span>
                  <span className="text-xs text-teal-600 font-bold">Priority: High</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg">{step.desc}</p>
              </div>
              <button className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-teal-600 hover:text-white dark:text-slate-300 text-slate-700 rounded-xl font-bold transition-all whitespace-nowrap">
                {step.action}
              </button>
            </div>
          ))}

          <div className="mt-12 bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <Rocket size={56} className="mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-black mb-4">Ready to go Live?</h2>
              <p className="mb-8 opacity-90 text-lg max-w-xl mx-auto">Once these 4 steps are green, you are ready to process your first R1,000 in lesson fees today.</p>
              <button className="px-12 py-5 bg-white text-teal-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm ring-4 ring-white/20">
                Initiate Production Deploy
              </button>
            </div>
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <Zap size={200} fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-scale-in">
           <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                    <Target size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">What You Are Selling</h3>
              </div>
              <ul className="space-y-4">
                 <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                       <span className="block font-bold text-slate-900 dark:text-white">Academic Performance</span>
                       <p className="text-sm text-slate-500">Not just lessons, but guaranteed mark improvement for Matric students.</p>
                    </div>
                 </li>
                 <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                       <span className="block font-bold text-slate-900 dark:text-white">Escrow Peace of Mind</span>
                       <p className="text-sm text-slate-500">A safe way to pay tutors without risk of being scammed or Ghosted.</p>
                    </div>
                 </li>
                 <li className="flex gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                       <span className="block font-bold text-slate-900 dark:text-white">Time for Parents</span>
                       <p className="text-sm text-slate-500">Vetted tutors take the heavy lifting of homework off busy parents' hands.</p>
                    </div>
                 </li>
              </ul>
           </div>

           <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                    <DollarSign size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Model</h3>
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Platform Fee</span>
                       <span className="text-teal-600 font-black">15%</span>
                    </div>
                    <p className="text-xs text-slate-500">Taken from every lesson. If a teacher charges R200, you keep R30.</p>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Premium Placement</span>
                       <span className="text-teal-600 font-black">R99 / mo</span>
                    </div>
                    <p className="text-xs text-slate-500">Upsell for teachers to appear at the top of search results.</p>
                 </div>
                 <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-sm font-bold text-teal-800 dark:text-teal-400">Monthly Projection</span>
                       <span className="text-teal-700 dark:text-teal-400 font-black">R15k - R45k</span>
                    </div>
                    <p className="text-xs text-teal-600 dark:text-teal-500">Estimated initial gross profit with 50 active students.</p>
                 </div>
              </div>
           </div>

           <div className="md:col-span-2 bg-slate-900 p-8 rounded-3xl text-white">
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="text-center p-4">
                    <Lock size={32} className="mx-auto mb-4 text-teal-400" />
                    <h4 className="font-bold mb-2">Escrow Protected</h4>
                    <p className="text-xs text-slate-400">Payments are 100% secure via PayFast & Ozow EFT.</p>
                 </div>
                 <div className="text-center p-4 border-x border-slate-800">
                    <BarChart3 size={32} className="mx-auto mb-4 text-teal-400" />
                    <h4 className="font-bold mb-2">Performance Tracking</h4>
                    <p className="text-xs text-slate-400">Visual progress reports for every student.</p>
                 </div>
                 <div className="text-center p-4">
                    <Users size={32} className="mx-auto mb-4 text-teal-400" />
                    <h4 className="font-bold mb-2">Verified SACE</h4>
                    <p className="text-xs text-slate-400">Only educators with valid ID & SACE are allowed to teach.</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
