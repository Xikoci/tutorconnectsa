
import React, { useState } from 'react';
import { Teacher } from '../types.ts';
import { SUBJECTS, GRADES } from '../mockData.ts';
import { Star, MapPin, Search } from 'lucide-react';

interface FindTutorsProps {
  teachers: Teacher[];
  onViewProfile: (teacher: Teacher) => void;
  onBookTeacher: (teacher: Teacher) => void;
}

export const FindTutors: React.FC<FindTutorsProps> = ({ teachers, onViewProfile, onBookTeacher }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || t.subjects.includes(selectedSubject);
    const matchesGrade = selectedGrade === 'All' || t.grades.includes(selectedGrade);
    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 transition-colors">
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-16 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search by name or keyword..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
              <select 
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="All">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select 
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="All">All Grades</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 text-slate-500 dark:text-slate-400 text-sm">
          Showing {filteredTeachers.length} qualified teachers
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition flex flex-col h-full">
              <div className="p-6 flex-grow cursor-pointer" onClick={() => onViewProfile(teacher)}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900" />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-teal-600 transition">{teacher.name}</h3>
                      <div className="flex items-center text-amber-500 text-sm">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 font-semibold">{teacher.rating}</span>
                        <span className="text-slate-400 dark:text-slate-500 ml-1">({teacher.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{teacher.bio}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.subjects.slice(0, 3).map(sub => (
                    <span key={sub} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Hourly Rate</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">R{teacher.hourlyRate}</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onViewProfile(teacher)}
                        className="px-3 py-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg transition"
                    >
                        View Profile
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onBookTeacher(teacher); }}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition shadow-sm hover:shadow-md"
                    >
                        Book Lesson
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
