
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types.ts';
import { Mic, Video, Monitor, PhoneOff, MessageSquare, Send, X, Sparkles, Brain, Loader2 } from 'lucide-react';
import { chatWithAITutor } from '../services/geminiService.ts';

interface ClassroomProps {
  user: User | null;
  bookingId: string | null;
  onLeave: () => void;
}

export const Classroom: React.FC<ClassroomProps> = ({ user, bookingId, onLeave }) => {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'System', text: 'Welcome to the classroom! Your lesson is being recorded.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'ai'>('chat');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [aiHistory, setAiHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const aiContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMsg = { sender: user?.name || 'Me', text: inputMessage };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
  };

  const askAi = async () => {
    if (!aiInput.trim() || isAiLoading) return;
    
    const userMessage = aiInput;
    setAiInput('');
    setIsAiLoading(true);
    
    const newHistory = [...aiHistory, { role: 'user' as const, parts: [{ text: userMessage }] }];
    setAiHistory(newHistory);

    try {
      const response = await chatWithAITutor(aiHistory, userMessage);
      setAiHistory(prev => [...prev, { role: 'model' as const, parts: [{ text: response }] }]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (aiContainerRef.current) {
      aiContainerRef.current.scrollTop = aiContainerRef.current.scrollHeight;
    }
  }, [aiHistory, isAiLoading]);

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col md:flex-row overflow-hidden">
      {/* Main Video Area */}
      <div className="flex-grow flex flex-col relative">
        <div className="flex-grow p-4 flex items-center justify-center bg-slate-800 m-2 rounded-2xl relative overflow-hidden">
          {/* Mock Video Placeholder */}
          <div className="text-center">
            <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
               <span className="text-4xl">👨‍🏫</span>
            </div>
            <h2 className="text-xl font-semibold">Teacher's Camera</h2>
            <p className="text-slate-400 text-sm mt-2">Connecting via WebRTC...</p>
          </div>
          
          {/* Student PIP */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-slate-900 rounded-xl border border-slate-700 shadow-lg flex items-center justify-center">
             <span className="text-2xl">🎓</span>
             <div className="absolute bottom-2 left-2 text-xs bg-black/50 px-2 py-1 rounded">You</div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-4">
          <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition" title="Mute Microphone"><Mic size={20} /></button>
          <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition" title="Toggle Camera"><Video size={20} /></button>
          <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition" title="Share Screen"><Monitor size={20} /></button>
          <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 transition md:hidden" onClick={() => setIsChatOpen(!isChatOpen)}><MessageSquare size={20} /></button>
          <button onClick={onLeave} className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 font-semibold transition flex items-center gap-2">
            <PhoneOff size={20} /> End Lesson
          </button>
        </div>
      </div>

      {/* Side Panel (Chat & AI) */}
      <div className={`w-full md:w-96 bg-white flex flex-col border-l border-slate-200 transition-all absolute md:relative h-full z-20 transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="h-16 border-b border-slate-200 flex items-center bg-slate-50 px-2">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-grow h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition ${activeTab === 'chat' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-400'}`}
          >
            <MessageSquare size={18} /> Chat
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-grow h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition ${activeTab === 'ai' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
          >
            <Sparkles size={18} /> AI Buddy
          </button>
          <button className="md:hidden p-2 text-slate-500" onClick={() => setIsChatOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {activeTab === 'chat' ? (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50" ref={chatContainerRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'Me' || msg.sender === user?.name ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-1 px-1 font-bold uppercase tracking-wider">
                    {msg.sender}
                  </span>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    (msg.sender === 'Me' || msg.sender === user?.name) 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type message..."
                  className="flex-grow p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none text-slate-800 text-sm bg-slate-50"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl transition shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-indigo-50/30" ref={aiContainerRef}>
              <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg mb-6">
                <h4 className="font-bold flex items-center gap-2 mb-1">
                  <Brain size={18} /> AI Study Buddy
                </h4>
                <p className="text-[11px] opacity-90 leading-tight">I can explain complex concepts, solve quick problems, or summarize your notes based on CAPS/IEB curriculum.</p>
              </div>

              {aiHistory.length === 0 && (
                <div className="text-center py-8 px-4">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Sparkles className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Ask me anything about your current topic!</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <button onClick={() => setAiInput("Explain Newton's 2nd Law simply")} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-indigo-400 transition">Explain Newton's 2nd Law</button>
                    <button onClick={() => setAiInput("How do I balance this chemical equation?")} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-indigo-400 transition">Balance Equations</button>
                  </div>
                </div>
              )}

              {aiHistory.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl max-w-[90%] text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs p-2">
                   <Loader2 size={16} className="animate-spin" /> Study Buddy is thinking...
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask the AI Study Buddy..."
                  className="flex-grow p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 text-sm bg-slate-50"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && askAi()}
                />
                <button 
                  onClick={askAi}
                  disabled={!aiInput.trim() || isAiLoading}
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl transition shadow-md"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
