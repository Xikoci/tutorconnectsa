
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types.ts';
import { X, Mail, Lock, User as UserIcon, Loader2, ArrowRight } from 'lucide-react';
import { MOCK_TEACHERS } from '../mockData.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setError('');
      setEmail('');
      setPassword('');
      setName('');
      setRole(UserRole.STUDENT);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (isLogin) {
        if (email.toLowerCase() === 'admin@tutorconnect.sa') {
          onAuthSuccess({
            id: 'admin1',
            name: 'Platform Admin',
            email: 'admin@tutorconnect.sa',
            role: UserRole.ADMIN
          });
          return;
        }

        const teacher = MOCK_TEACHERS.find(t => t.email.toLowerCase() === email.toLowerCase());
        
        if (teacher) {
            if (password === 'password') {
                onAuthSuccess(teacher);
            } else {
                setError('Invalid password. (Hint: password)');
            }
            return;
        }

        if (email.toLowerCase() === 'student@tutorconnect.sa') {
             if (password === 'password') {
                onAuthSuccess({
                    id: 's1',
                    name: 'Student User',
                    email: 'student@tutorconnect.sa',
                    role: UserRole.STUDENT,
                    avatar: 'https://picsum.photos/id/100/200/200',
                    balance: 5
                });
             } else {
                 setError('Invalid password. (Hint: password)');
             }
             return;
        }

        setError('User not found. Please sign up or use demo credentials.');
      } else {
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff`,
            balance: 0
        };
        onAuthSuccess(newUser);
      }
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-scale-in transition-colors">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                                placeholder="John Doe"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email"
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">I am a...</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole(UserRole.STUDENT)}
                                className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition ${role === UserRole.STUDENT ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                            >
                                Student / Parent
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole(UserRole.TEACHER)}
                                className={`py-2 px-4 rounded-lg border-2 text-sm font-medium transition ${role === UserRole.TEACHER ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                            >
                                Teacher
                            </button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full" /> {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={toggleMode} className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
            
            {isLogin && (
                 <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 text-center uppercase tracking-wide font-semibold">Demo Credentials</p>
                    <div className="flex flex-col gap-2 text-xs">
                        <button onClick={() => {setEmail('admin@tutorconnect.sa'); setPassword('password');}} className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded text-slate-600 dark:text-slate-400 flex justify-between group transition-colors">
                            <span>Admin: admin@tutorconnect.sa</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                        </button>
                        <button onClick={() => {setEmail('student@tutorconnect.sa'); setPassword('password');}} className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded text-slate-600 dark:text-slate-400 flex justify-between group transition-colors">
                            <span>Student: student@tutorconnect.sa</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                        </button>
                         <button onClick={() => {setEmail('thandi@tutorconnect.sa'); setPassword('password');}} className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded text-slate-600 dark:text-slate-400 flex justify-between group transition-colors">
                            <span>Verified Teacher: thandi@tutorconnect.sa</span>
                             <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                        </button>
                    </div>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};
