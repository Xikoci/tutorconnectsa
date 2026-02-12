
import React, { useState, useEffect } from 'react';
import { Teacher } from '../types.ts';
import { X, Calendar, Clock, CreditCard, ShieldCheck, Loader2, CheckCircle, Info, Sun, Sunset, Moon, Sparkles, Trophy, BookOpen, User as UserIcon } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  teacher: Teacher | null;
  onClose: () => void;
  onConfirmBooking: (details: { date: string; time: string; method: string }) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, teacher, onClose, onConfirmBooking }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDate('');
      setTime('');
      setPaymentMethod('');
    }
  }, [isOpen]);

  if (!isOpen || !teacher) return null;

  const handlePayment = () => {
    setStep(3);
    setTimeout(() => {
      setStep(4);
    }, 2000);
  };

  const handleFinish = () => {
    onConfirmBooking({ date, time, method: paymentMethod });
  };

  const platformFee = 30; // Flat fee
  const total = teacher.hourlyRate + platformFee;

  // Simulate slot categorization
  const timeSlots = [
    { time: "08:00", cat: "morning" }, { time: "09:00", cat: "morning" }, { time: "10:00", cat: "morning" }, { time: "11:00", cat: "morning" },
    { time: "12:00", cat: "afternoon" }, { time: "13:00", cat: "afternoon" }, { time: "14:00", cat: "afternoon" }, { time: "15:00", cat: "afternoon" }, { time: "16:00", cat: "afternoon" }, { time: "17:00", cat: "afternoon" },
    { time: "18:00", cat: "evening" }, { time: "19:00", cat: "evening" }
  ];

  const getAvailableSlots = () => {
    if (!date) return [];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDay = dayNames[new Date(date).getDay()];
    return teacher.availability[selectedDay] || [];
  };

  const availableSlots = getAvailableSlots();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in transition-colors border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">
            {step === 1 ? 'Book a Lesson' : step === 2 ? 'Secure Checkout' : step === 3 ? 'Processing Payment' : 'Booking Confirmed'}
          </h3>
          {step !== 4 && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="p-6">
            {step === 1 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900" />
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white">{teacher.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{teacher.subjects[0]} • R{teacher.hourlyRate}/hr</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px] mb-2">1. Select Date</label>
                        <div className="relative">
                          <input 
                              type="date" 
                              className="w-full pl-4 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                              value={date}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => { setDate(e.target.value); setTime(''); }}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        </div>
                    </div>

                    {date && (
                      <div className="animate-fade-in">
                          <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[10px] mb-2">2. Pick a Time Slot</label>
                          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                            {['morning', 'afternoon', 'evening'].map(category => {
                              const categorySlots = timeSlots.filter(s => s.cat === category && availableSlots.includes(s.time));
                              if (categorySlots.length === 0) return null;

                              return (
                                <div key={category}>
                                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase mb-2">
                                    {category === 'morning' && <Sun size={12} />}
                                    {category === 'afternoon' && <Sunset size={12} />}
                                    {category === 'evening' && <Moon size={12} />}
                                    {category}
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    {categorySlots.map(slot => (
                                      <button
                                        key={slot.time}
                                        onClick={() => setTime(slot.time)}
                                        className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                                          time === slot.time 
                                            ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20 ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-800' 
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-500'
                                        }`}
                                      >
                                        {slot.time}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                      </div>
                    )}

                    {!date && (
                      <div className="py-12 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-2xl text-center">
                        <Clock className="mx-auto text-slate-200 dark:text-slate-700 mb-2" size={32} />
                        <p className="text-slate-400 text-xs font-medium">Please select a date first</p>
                      </div>
                    )}

                    <button 
                        onClick={() => setStep(2)}
                        disabled={!date || !time}
                        className="w-full mt-4 py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white font-black rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                    >
                        Review Booking <ArrowRight size={18} />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Lesson Summary</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Date & Time</span>
                                <span className="font-bold text-slate-900 dark:text-white">{new Date(date).toLocaleDateString()} at {time}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Lesson Rate</span>
                                <span className="font-bold text-slate-900 dark:text-white">R{teacher.hourlyRate}.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Platform Fee</span>
                                <span className="font-bold text-slate-900 dark:text-white">R{platformFee}.00</span>
                            </div>
                            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between text-lg font-black text-teal-600">
                                <span>Total to Pay</span>
                                <span>R{total}.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-400">Payment Method</label>
                        <div className="grid grid-cols-1 gap-2">
                            <button 
                                onClick={() => setPaymentMethod('payfast')}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition ${paymentMethod === 'payfast' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' : 'border-slate-200 dark:border-slate-700'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-[10px]">PAYFAST</div>
                                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">PayFast Instant EFT</span>
                                </div>
                            </button>
                            <button 
                                onClick={() => setPaymentMethod('ozow')}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition ${paymentMethod === 'ozow' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' : 'border-slate-200 dark:border-slate-700'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-[10px]">OZOW</div>
                                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Ozow Capitec Pay</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={!paymentMethod}
                        className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-black rounded-xl transition shadow-lg"
                    >
                        Pay R{total}.00
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={48} className="text-teal-600 animate-spin" />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Securing Funds...</h4>
                </div>
            )}

            {step === 4 && (
                <div className="py-2 flex flex-col items-center justify-center text-center animate-scale-in">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xl shadow-emerald-500/10">
                          <CheckCircle size={56} />
                      </div>
                      <Sparkles className="absolute -top-2 -right-2 text-amber-500 animate-pulse" size={24} />
                      <Sparkles className="absolute -bottom-2 -left-2 text-teal-400 animate-bounce" size={20} />
                    </div>
                    
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Lesson Booked!</h4>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">You're all set! Thank you for choosing TutorConnect SA.</p>
                    
                    <div className="w-full bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8 text-left space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                                <UserIcon size={16} className="text-teal-600" />
                            </div>
                            <div className="text-sm">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-widest">Tutor</span>
                                <span className="font-bold text-slate-800 dark:text-white">{teacher.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                                <BookOpen size={16} className="text-teal-600" />
                            </div>
                            <div className="text-sm">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-widest">Subject</span>
                                <span className="font-bold text-slate-800 dark:text-white">{teacher.subjects[0]}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                                <Calendar size={16} className="text-teal-600" />
                            </div>
                            <div className="text-sm">
                                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-widest">Schedule</span>
                                <span className="font-bold text-slate-800 dark:text-white">{new Date(date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long' })} at {time}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleFinish}
                        className="w-full py-4 bg-slate-900 dark:bg-slate-700 hover:bg-black text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                        Go to My Dashboard <Trophy size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Internal icon for the button above
const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
