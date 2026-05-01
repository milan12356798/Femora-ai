import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Heart, Activity, Droplet, Sun, Moon, Info } from 'lucide-react'

export default function PeriodTracker() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0])
  const [cycleLength, setCycleLength] = useState(28)
  const [symptoms, setSymptoms] = useState([])
  const [mood, setMood] = useState('')

  // Calculations
  const calculateCycle = () => {
    const lastDate = new Date(lastPeriod)
    
    // Next Period
    const nextDate = new Date(lastDate)
    nextDate.setDate(lastDate.getDate() + parseInt(cycleLength))
    
    // Ovulation (usually 14 days before next period)
    const ovulationDate = new Date(nextDate)
    ovulationDate.setDate(nextDate.getDate() - 14)
    
    // Fertility Window
    const fertilityStart = new Date(ovulationDate)
    fertilityStart.setDate(ovulationDate.getDate() - 4)
    const fertilityEnd = new Date(ovulationDate)
    fertilityEnd.setDate(ovulationDate.getDate() + 1)

    // Current Phase
    const today = new Date()
    const diffTime = Math.abs(today - lastDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    let phase = 'Follicular'
    if (diffDays <= 5) phase = 'Menstrual'
    else if (diffDays >= 10 && diffDays <= 16) phase = 'Ovulation'
    else if (diffDays > 16) phase = 'Luteal'

    return {
      nextDate: nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fertilityWindow: `${fertilityStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertilityEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
      phase
    }
  }

  const cycleData = calculateCycle()

  const toggleSymptom = (symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const availableSymptoms = [
    { id: 'cramps', label: 'Cramps', icon: '⚡' },
    { id: 'headache', label: 'Headache', icon: '🤕' },
    { id: 'bloating', label: 'Bloating', icon: '🎈' },
    { id: 'fatigue', label: 'Fatigue', icon: '🥱' },
    { id: 'acne', label: 'Acne', icon: '😶‍🌫️' },
    { id: 'tender', label: 'Tender Breasts', icon: '🌸' },
  ]

  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'anxious', label: 'Anxious', emoji: '😰' },
    { id: 'angry', label: 'Angry', emoji: '😠' },
  ]

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <motion.div 
      className="max-w-5xl mx-auto space-y-8"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-800">Cycle Tracker</h1>
        <p className="text-slate-500 mt-1">Log your symptoms and track your cycle phases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Inputs */}
        <motion.div variants={itemVars} className="lg:col-span-1 space-y-6">
          
          <div className="glass-card bg-white/60 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-lavender-500" /> Cycle Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Last Period Started</label>
                <input 
                  type="date" 
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:ring-2 focus:ring-lavender-400 focus:border-transparent outline-none transition-all text-slate-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Average Cycle Length (Days)</label>
                <input 
                  type="number" 
                  min="20" max="45"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 focus:ring-2 focus:ring-lavender-400 focus:border-transparent outline-none transition-all text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="glass-card bg-white/60 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-500" /> Today's Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableSymptoms.map(symp => (
                <button
                  key={symp.id}
                  onClick={() => toggleSymptom(symp.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 border
                    ${symptoms.includes(symp.id) 
                      ? 'bg-pink-100 border-pink-200 text-pink-700 shadow-sm' 
                      : 'bg-white/50 border-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <span>{symp.icon}</span> {symp.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card bg-white/60 p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" /> Today's Mood
            </h3>
            <div className="flex justify-between">
              {moods.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 
                    ${mood === m.id ? 'bg-white shadow-sm ring-2 ring-lavender-300 scale-110' : 'opacity-60 hover:opacity-100'}
                  `}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Right Column - Results */}
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-6">
          
          {/* Main Status Card */}
          <div className="glass-card bg-gradient-to-br from-lavender-50 to-pink-50 p-8 border-lavender-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Sun className="w-48 h-48 text-lavender-600" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-lavender-600 font-semibold mb-1 uppercase tracking-wider text-sm">Current Phase</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-800 mb-2">
                  {cycleData.phase}
                </h2>
                <p className="text-slate-600 flex items-center gap-2">
                  <Info className="w-4 h-4" /> 
                  {cycleData.phase === 'Menstrual' && "Time to rest and recover."}
                  {cycleData.phase === 'Follicular' && "Energy levels are rising."}
                  {cycleData.phase === 'Ovulation' && "Peak energy and fertility."}
                  {cycleData.phase === 'Luteal' && "Winding down, focus on self-care."}
                </p>
              </div>
              
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-tr from-lavender-200 to-pink-200 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold text-slate-800">{new Date().getDate()}</span>
                  <span className="text-xs text-slate-500 uppercase font-semibold">{new Date().toLocaleString('default', { month: 'short' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card bg-white/50 p-6 text-center group">
              <div className="w-12 h-12 mx-auto bg-rose-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 text-rose-500" />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">Next Period</p>
              <p className="text-xl font-heading font-bold text-slate-800">{cycleData.nextDate}</p>
            </div>

            <div className="glass-card bg-white/50 p-6 text-center group">
              <div className="w-12 h-12 mx-auto bg-lavender-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-lavender-600" />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">Ovulation Day</p>
              <p className="text-xl font-heading font-bold text-slate-800">{cycleData.ovulationDate}</p>
            </div>

            <div className="glass-card bg-white/50 p-6 text-center group">
              <div className="w-12 h-12 mx-auto bg-pink-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">Fertile Window</p>
              <p className="text-lg font-heading font-bold text-slate-800">{cycleData.fertilityWindow}</p>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  )
}
