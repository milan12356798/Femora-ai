import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { AlertCircle, Activity, Heart, Sparkles, Plus, CalendarDays, Brain, Moon, TrendingUp, TrendingDown } from 'lucide-react'
import { getAIInsights } from '../services/aiService'

// Dummy Data
const hormonalTrends = [
  { month: 'Jan', acne: 4, mood: 6, fatigue: 3 },
  { month: 'Feb', acne: 5, mood: 7, fatigue: 5 },
  { month: 'Mar', acne: 3, mood: 4, fatigue: 2 },
  { month: 'Apr', acne: 6, mood: 8, fatigue: 6 },
  { month: 'May', acne: 7, mood: 9, fatigue: 8 },
  { month: 'Jun', acne: 4, mood: 5, fatigue: 4 },
]

const cycleHistory = [
  { month: 'Jan', length: 35, expected: 28 },
  { month: 'Feb', length: 42, expected: 28 },
  { month: 'Mar', length: 30, expected: 28 },
  { month: 'Apr', length: 48, expected: 28 },
  { month: 'May', length: 0, expected: 28 }, // Missed
  { month: 'Jun', length: 38, expected: 28 },
]

const radarData = [
  { metric: 'Cycle Regularity', value: 45, fullMark: 100 },
  { metric: 'Skin Health', value: 60, fullMark: 100 },
  { metric: 'Mood Stability', value: 55, fullMark: 100 },
  { metric: 'Energy Levels', value: 65, fullMark: 100 },
  { metric: 'Stress Mgmt', value: 50, fullMark: 100 },
  { metric: 'Sleep Quality', value: 70, fullMark: 100 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/50 px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.color || p.fill }}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function PCOSWellness() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

  const [logSeverity, setLogSeverity] = useState(3)
  const [selectedSymptom, setSelectedSymptom] = useState("Hormonal Acne")
  const [aiData, setAiData] = useState({
    insights: [
      "Cycle variability increased this month.",
      "Stress and sleep patterns may be affecting hormonal wellness.",
      "Irregular wellness trends detected in late May."
    ],
    score: 58
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogSymptom = async () => {
    setIsLoading(true)
    const result = await getAIInsights([selectedSymptom], logSeverity)
    if (result) {
      setAiData(result)
    }
    setIsLoading(false)
  }

  return (
    <motion.div className="max-w-6xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-800">PCOS Wellness Monitoring</h1>
        <p className="text-slate-500 mt-1">Track long-term hormonal trends, cycle variability, and preventive wellness insights.</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-medium text-indigo-600">
          <AlertCircle className="w-4 h-4" />
          <span>Educational tracking only. Do not use for medical diagnosis or prediction.</span>
        </div>
      </div>

      {/* AI Insights Banner */}
      <motion.div variants={item} className="glass-card bg-gradient-to-r from-lavender-50 to-pink-50 p-6 border-lavender-100/50 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="p-4 bg-gradient-to-br from-lavender-400 to-pink-500 rounded-2xl text-white shadow-lg shadow-lavender-500/20 shrink-0">
          <Sparkles className={`w-8 h-8 ${isLoading ? 'animate-pulse' : ''}`} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-heading font-semibold text-slate-800 flex items-center gap-2">
            Wellness AI Insights
            {isLoading && <span className="text-[10px] bg-white/50 px-2 py-0.5 rounded-full animate-pulse text-lavender-600">Updating...</span>}
          </h3>
          <ul className="text-sm text-slate-600 space-y-1">
            {aiData.insights.map((insight, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-pink-400' : index === 1 ? 'bg-indigo-400' : 'bg-orange-400'}`} />
                {insight}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-white/60 rounded-xl border border-white min-w-[120px]">
          <span className="text-sm font-semibold text-slate-500">Wellness Score</span>
          <span className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-lavender-500 to-pink-500">
            {aiData.score}
          </span>
        </div>
      </motion.div>

      {/* Grid Row 1: Cycle Variability & Symptom Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cycle Irregularity Chart */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 rounded-xl"><CalendarDays className="w-5 h-5 text-rose-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Cycle Irregularity Tracker</h3>
              <p className="text-xs text-slate-400">Tracking missed or variable periods</p>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cycleHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 60]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingTop: '10px' }} />
                <Bar dataKey="length" name="Actual Length" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="expected" name="Expected Baseline" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4">Note: 0 denotes a missed period.</p>
        </motion.div>

        {/* Hormonal Wellness Radar */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-xl"><Activity className="w-5 h-5 text-purple-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Hormonal Balance Profile</h3>
              <p className="text-xs text-slate-400">Current 30-day snapshot</p>
            </div>
          </div>
          <div className="h-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name="Score" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* Grid Row 2: Hormonal Symptom Trends */}
      <motion.div variants={item} className="glass-card bg-white/60 p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl"><Brain className="w-5 h-5 text-indigo-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Long-Term Hormonal Trends</h3>
              <p className="text-xs text-slate-400">Severity mapping (1-10)</p>
            </div>
          </div>
          <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hormonalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="acne" name="Acne Frequency" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              <Line type="monotone" dataKey="mood" name="Mood Swings" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              <Line type="monotone" dataKey="fatigue" name="Fatigue" stroke="#eab308" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Grid Row 3: Quick Log & Analytics summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div variants={item} className="glass-card bg-white/60 p-6 md:col-span-1">
          <h3 className="font-heading font-semibold text-slate-800 mb-4">Quick Symptom Log</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Acne / Skin Severity</label>
              <input type="range" min="1" max="10" value={logSeverity} onChange={e => setLogSeverity(e.target.value)} className="w-full accent-pink-500" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>Mild</span><span>Severe</span></div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Symptom Type</label>
              <select 
                value={selectedSymptom}
                onChange={e => setSelectedSymptom(e.target.value)}
                className="w-full p-2.5 rounded-xl border-0 bg-slate-50 focus:ring-2 focus:ring-lavender-400 outline-none text-sm text-slate-700"
              >
                <option>Hormonal Acne</option>
                <option>Mood Swings</option>
                <option>Fatigue</option>
                <option>Hair Thinning</option>
              </select>
            </div>
            <button 
              onClick={handleLogSymptom}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lavender-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Log Symptom
                </>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card bg-white/60 p-6 md:col-span-2 grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col justify-center">
            <TrendingUp className="w-6 h-6 text-rose-500 mb-2" />
            <p className="text-xs text-slate-500 font-medium">Avg Cycle Variation</p>
            <p className="text-2xl font-heading font-bold text-slate-800">+7 Days</p>
            <p className="text-xs text-slate-400 mt-1">Higher than baseline</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col justify-center">
            <Moon className="w-6 h-6 text-indigo-500 mb-2" />
            <p className="text-xs text-slate-500 font-medium">Sleep vs Fatigue</p>
            <p className="text-2xl font-heading font-bold text-slate-800">82%</p>
            <p className="text-xs text-slate-400 mt-1">Strong negative correlation</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col justify-center">
            <TrendingDown className="w-6 h-6 text-emerald-500 mb-2" />
            <p className="text-xs text-slate-500 font-medium">Weight Fluctuation</p>
            <p className="text-2xl font-heading font-bold text-slate-800">-1.2 kg</p>
            <p className="text-xs text-slate-400 mt-1">Stable this month</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col justify-center">
            <Heart className="w-6 h-6 text-pink-500 mb-2" />
            <p className="text-xs text-slate-500 font-medium">Preventive Checks</p>
            <p className="text-2xl font-heading font-bold text-slate-800">2/3</p>
            <p className="text-xs text-slate-400 mt-1">Routines completed</p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
