import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, AlertCircle, Loader2, Heart, Activity, RotateCcw } from 'lucide-react';

export default function AiAssistant() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('femora_chat_history');
      return saved ? JSON.parse(saved) : [
        {
          role: 'assistant',
          content: "Hello! I'm Femora AI. I can help answer questions about your cycle, pregnancy, PCOS, or general wellness. How are you feeling today?",
          suggestions: ["Why is my period late?", "Pregnancy wellness tips", "What are common PCOS symptoms?"]
        }
      ];
    } catch (e) {
      console.error("Failed to load chat history", e);
      return [
        {
          role: 'assistant',
          content: "Hello! I'm Femora AI. I can help answer questions about your cycle, pregnancy, PCOS, or general wellness. How are you feeling today?",
          suggestions: ["Why is my period late?", "Pregnancy wellness tips", "What are common PCOS symptoms?"]
        }
      ];
    }
  });
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      localStorage.setItem('femora_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history", e);
    }
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    const initialMessage = [
      {
        role: 'assistant',
        content: "Hello! I'm Femora AI. I can help answer questions about your cycle, pregnancy, PCOS, or general wellness. How are you feeling today?",
        suggestions: ["Why is my period late?", "Pregnancy wellness tips", "What are common PCOS symptoms?"]
      }
    ];
    setMessages(initialMessage);
    localStorage.removeItem('femora_chat_history');
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Format history for API (excluding suggestions and recent user message)
      const history = messages.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Gather user data for personalization
      const userData = {
        cycle_status: localStorage.getItem('femora_cycle_status') || 'Normal',
        last_logged_mood: localStorage.getItem('femora_last_mood') || 'Neutral',
        app_persona: 'FemoraAI Premium User'
      };

      const response = await fetch('http://localhost:8000/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history,
          userData: userData
        })
      });

      if (!response.ok) throw new Error("I'm having trouble responding right now. Please try again.");

      const data = await response.json();
      
      if (data.status === "success") {
        setMessages([...newMessages, {
          role: 'assistant',
          content: data.data.reply,
          suggestions: data.data.suggestions
        }]);
      } else {
        throw new Error(data.message || "I'm having trouble responding right now. Please try again.");
      }
    } catch (error) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: error.message || "I'm having trouble responding right now. Please try again.",
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col relative px-4 pb-10">
      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-heading font-bold text-slate-800 flex items-center gap-2">
            Femora Health AI
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-lavender-100 text-lavender-600 text-[9px] font-bold uppercase tracking-widest border border-lavender-200">
              MedGemma x Vertex
            </span>
          </h1>
          <button 
            onClick={clearChat}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            title="Clear conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
           <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5 uppercase tracking-tighter">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             AI Live
           </p>
           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-500 to-pink-500 flex items-center justify-center shadow-md">
             <Sparkles className="w-5 h-5 text-white" />
           </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="mb-4 bg-slate-800 text-slate-200 rounded-xl p-3 flex gap-3 items-center shadow-md">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-[11px] leading-tight opacity-90">
          <strong className="text-white">Disclaimer:</strong> Not a substitute for medical advice. Visit a doctor for serious symptoms.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] overflow-hidden flex flex-col shadow-2xl shadow-slate-200/50 border border-white relative">
        
        {/* Messages Area */}
        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-400 border border-slate-100' 
                    : 'bg-gradient-to-br from-lavender-500 to-pink-500 text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-5 py-3 rounded-2xl leading-relaxed text-[14px] whitespace-pre-wrap break-words ${
                    msg.role === 'user'
                      ? 'bg-slate-800 text-white rounded-tr-none shadow-lg'
                      : msg.isError 
                        ? 'bg-rose-50 text-rose-600 border border-rose-100 rounded-tl-none'
                        : 'bg-white text-slate-700 shadow-md border border-slate-50 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(suggestion)}
                          disabled={loading}
                          className="px-3 py-1.5 bg-white/80 hover:bg-white text-slate-600 text-[11px] font-bold rounded-full border border-slate-100 shadow-sm hover:text-lavender-600 transition-all disabled:opacity-50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-lavender-100 text-lavender-500 flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white/50 px-5 py-3 rounded-2xl rounded-tl-none border border-slate-50 flex gap-1.5 items-center shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lavender-300 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-lavender-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-lavender-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100/50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="relative"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading}
              className="w-full pl-5 pr-16 py-3.5 bg-white border-0 rounded-2xl shadow-lg shadow-slate-200/30 focus:ring-4 focus:ring-lavender-400/20 outline-none transition-all text-slate-700 disabled:opacity-50 placeholder:text-slate-300 text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-lavender-600 to-pink-600 hover:from-lavender-700 hover:to-pink-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
