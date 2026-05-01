import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Pill, Droplet, Sun, Moon, Plus, CheckCircle2, Clock, CalendarDays, Activity, Leaf } from 'lucide-react'

// Initial dummy data
const initialReminders = [
  { id: 1, type: 'medication', name: 'Prenatal Vitamin', dosage: '1 tablet', time: '08:00', period: 'AM', taken: true, icon: <Pill className="w-5 h-5" />, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 2, type: 'water', name: 'Morning Hydration', dosage: '2 glasses', time: '09:00', period: 'AM', taken: true, icon: <Droplet className="w-5 h-5" />, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 3, type: 'supplement', name: 'Omega-3', dosage: '1 capsule', time: '13:00', period: 'PM', taken: false, icon: <Leaf className="w-5 h-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 4, type: 'wellness', name: 'Stretch Break', dosage: '10 mins', time: '15:00', period: 'PM', taken: false, icon: <Activity className="w-5 h-5" />, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 5, type: 'medication', name: 'Iron Supplement', dosage: '1 tablet', time: '19:00', period: 'PM', taken: false, icon: <Pill className="w-5 h-5" />, color: 'text-pink-500', bg: 'bg-pink-50' },
  { id: 6, type: 'wellness', name: 'Wind Down', dosage: 'Meditation', time: '21:30', period: 'PM', taken: false, icon: <Moon className="w-5 h-5" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
]

export default function Reminders() {
  const [reminders, setReminders] = useState(initialReminders)
  const [isAdding, setIsAdding] = useState(false)

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, taken: !r.taken } : r))
  }

  const completedCount = reminders.filter(r => r.taken).length
  const progressPct = Math.round((completedCount / reminders.length) * 100)

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

  return (
    <motion.div className="max-w-5xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-800">Daily Reminders</h1>
          <p className="text-slate-500 mt-1">Manage your medications, supplements, and wellness routines.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-lavender-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-lavender-500/30 transition-all active:scale-[0.98] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Reminder
        </button>
      </div>

      {/* Progress & Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress Card */}
        <motion.div variants={item} className="md:col-span-2 glass-card bg-white/60 p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-lavender-200/50 to-pink-200/50 rounded-full blur-3xl -z-10" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-semibold text-slate-800 mb-1">Today's Progress</h3>
              <p className="text-sm text-slate-500 mb-4">You've completed {completedCount} out of {reminders.length} tasks today.</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-heading font-bold text-slate-800">{progressPct}%</span>
                <div className="flex-1 max-w-[200px] h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progressPct}%` }} 
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-lavender-400 to-pink-500 rounded-full"
                  />
                </div>
              </div>
            </div>
            
            {progressPct === 100 && (
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </motion.div>
            )}
            {progressPct < 100 && (
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-100 relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <motion.circle 
                    cx="40" cy="40" r="36" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - progressPct / 100) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <Bell className="w-7 h-7 text-lavender-400" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Next Up Card */}
        <motion.div variants={item} className="glass-card bg-gradient-to-br from-lavender-50 to-purple-50 p-6 border-lavender-100/50 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-lavender-500" />
            <h3 className="font-heading font-semibold text-slate-800">Next Up</h3>
          </div>
          {(() => {
            const next = reminders.find(r => !r.taken)
            if (!next) return <p className="text-slate-500">All caught up for today! 🎉</p>
            return (
              <div>
                <p className="text-2xl font-heading font-bold text-slate-800 mb-1">{next.time} <span className="text-sm font-medium text-slate-500">{next.period}</span></p>
                <p className="text-slate-600 font-medium">{next.name}</p>
                <p className="text-sm text-slate-500">{next.dosage}</p>
              </div>
            )
          })()}
        </motion.div>
      </div>

      {/* Quick Add Menu (Expandable) */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card bg-white/80 p-6 mb-6 border-lavender-100/50 shadow-lg shadow-lavender-500/5">
              <h3 className="font-semibold text-slate-800 mb-4">Quick Add Template</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 rounded-xl border border-slate-100 bg-white hover:bg-violet-50 hover:border-violet-200 transition-all flex flex-col items-center gap-2 text-center group">
                  <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Pill className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-700">Medication</span>
                </button>
                <button className="p-4 rounded-xl border border-slate-100 bg-white hover:bg-sky-50 hover:border-sky-200 transition-all flex flex-col items-center gap-2 text-center group">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Droplet className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-700">Hydration</span>
                </button>
                <button className="p-4 rounded-xl border border-slate-100 bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-all flex flex-col items-center gap-2 text-center group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Leaf className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-700">Supplement</span>
                </button>
                <button className="p-4 rounded-xl border border-slate-100 bg-white hover:bg-orange-50 hover:border-orange-200 transition-all flex flex-col items-center gap-2 text-center group">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Activity className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-700">Activity</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Checklist */}
      <div className="glass-card bg-white/50 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-slate-400" />
            <h3 className="font-heading font-semibold text-lg text-slate-800">Today's Schedule</h3>
          </div>
          <span className="text-sm font-medium text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="space-y-3">
          {reminders.map((reminder) => (
            <motion.div 
              key={reminder.id}
              variants={item}
              className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border
                ${reminder.taken 
                  ? 'bg-slate-50/50 border-transparent opacity-60 hover:opacity-100' 
                  : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}
            >
              <div className="w-20 text-center shrink-0 border-r border-slate-100 pr-4">
                <p className={`font-heading font-bold text-lg ${reminder.taken ? 'text-slate-400' : 'text-slate-700'}`}>{reminder.time}</p>
                <p className="text-xs font-semibold text-slate-400">{reminder.period}</p>
              </div>
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${reminder.bg} ${reminder.color}`}>
                {reminder.icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate transition-colors ${reminder.taken ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                  {reminder.name}
                </p>
                <p className="text-sm text-slate-500 truncate">{reminder.dosage}</p>
              </div>

              <button 
                onClick={() => toggleReminder(reminder.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                  ${reminder.taken 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-slate-200 text-transparent hover:border-lavender-400 hover:bg-lavender-50'}`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
