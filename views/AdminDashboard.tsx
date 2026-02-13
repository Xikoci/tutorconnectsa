
import React, { useState } from 'react';
import { Teacher, VerificationStatus } from '../types.ts';
import { ShieldCheck, UserCheck, UserX, FileText, ExternalLink, Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';

interface AdminDashboardProps {
  teachers: Teacher[];
  onVerify: (teacherId: string, status: VerificationStatus) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ teachers, onVerify }) => {
  const [filter, setFilter] = useState<VerificationStatus | 'ALL'>('PENDING');

  const pendingTeachers = teachers.filter(t => 
    filter === 'ALL' ? true : t.verificationStatus === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-teal-600" size={32} /> Safety & Verification
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review SACE credentials and ID documents to approve new teachers.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['PENDING', 'VERIFIED', 'REJECTED', 'ALL'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-sm' : 'text-slate-500'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Teacher</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">SACE / ID Number</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {pendingTeachers.length > 0 ? pendingTeachers.map(teacher => (
              <tr key={teacher.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={teacher.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{teacher.name}</div>
                      <div className="text-xs text-slate-500">{teacher.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex flex-col">
                    <span className="font-bold">{teacher.saceNumber || 'N/A'}</span>
                    <span className="text-[10px] opacity-70">ID: {teacher.idNumber || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    teacher.verificationStatus === VerificationStatus.VERIFIED ? 'bg-emerald-100 text-emerald-700' :
                    teacher.verificationStatus === VerificationStatus.REJECTED ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {teacher.verificationStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-teal-600 transition" title="View Docs">
                      <FileText size={18} />
                    </button>
                    {teacher.verificationStatus !== VerificationStatus.VERIFIED && (
                      <button 
                        onClick={() => onVerify(teacher.id, VerificationStatus.VERIFIED)}
                        className="p-2 text-slate-400 hover:text-emerald-600 transition" 
                        title="Approve"
                      >
                        <UserCheck size={18} />
                      </button>
                    )}
                    {teacher.verificationStatus !== VerificationStatus.REJECTED && (
                      <button 
                        onClick={() => onVerify(teacher.id, VerificationStatus.REJECTED)}
                        className="p-2 text-slate-400 hover:text-red-600 transition" 
                        title="Reject"
                      >
                        <UserX size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                   <div className="max-w-xs mx-auto">
                      <CheckCircle className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-400 font-medium">No teachers currently match this filter.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
