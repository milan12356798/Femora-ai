import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Moon, Droplets, Brain, Weight, Smile, TrendingUp, TrendingDown,
  Minus, Plus, Sparkles, Target, Zap, Heart
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

/* ===== Sample Data ===== */
const weeklyWellness = [
  { day: 'Mon', sleep: 7.2, water: 2.1, stress: 3, weight: 58.2, mood: 4 },
  { day: 'Tue', sleep: 6.5, water: 1.8, stress: 5, weight: 58.1, mood: 3 },
  { day: 'Wed', sleep: 8.1, water: 2.4, stress: 2, weight: 58.0, mood: 5 },
  { day: 'Thu', sleep: 7.0, water: 2.0, stress: 4, weight: 58.3, mood: 3 },
  { day: 'Fri', sleep: 7.8, water: 2.3, stress: 3, weight: 58.1, mood: 4 },
  { day: 'Sat', sleep: 8.5, water: 2.6, stress: 1, weight: 57.9, mood: 5 },
  { day: 'Sun', sleep: 7.4, water: 2.2, stress: 2, weight: 58.0, mood: 4 },
]

const monthlyWeight = [
  { wk: 'W1', weight: 58.5 }, { wk: 'W2', weight: 58.3 },
  { wk: 'W3', weight: 58.1 }, { wk: 'W4', weight: 58.0 },
]

const radarData = [
  { metric: 'Sleep', value: 82, fullMark: 100 },
  { metric: 'Hydration', value: 75, fullMark: 100 },
  { metric: 'Stress Mgmt', value: 68, fullMark: 100 },
  { metric: 'Nutrition', value: 85, fullMark: 100 },
  { metric: 'Activity', value: 72, fullMark: 100 },
  { metric: 'Mood', value: 80, fullMark: 100 },
]

const moodEmojis = ['😢', '😟', '😐', '🙂', '😊']
const stressLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High']

/* ===== Custom Tooltip ===== */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/50 px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function WellnessTracker() {
  /* ---------- Today's Log State ---------- */
  const [todaySleep, setTodaySleep] = useState(7.5)
  const [todayWater, setTodayWater] = useState(5) // glasses
  const [todayStress, setTodayStress] = useState(2) // 0-4
  const [todayWeight, setTodayWeight] = useState(58.0)
  const [todayMood, setTodayMood] = useState(3) // 0-4

  /* ---------- Wellness Score ---------- */
  const wellnessScore = useMemo(() => {
    const sleepScore = Math.min(100, (todaySleep / 8) * 100)
    const waterScore = Math.min(100, (todayWater / 8) * 100)
    const stressScore = ((4 - todayStress) / 4) * 100
    const moodScore = (todayMood / 4) * 100
    return Math.round((sleepScore + waterScore + stressScore + moodScore) / 4)
  }, [todaySleep, todayWater, todayStress, todayMood])

  const scoreColor = wellnessScore >= 80 ? 'text-emerald-500' : wellnessScore >= 60 ? 'text-amber-500' : 'text-rose-500'
  const scoreGradient = wellnessScore >= 80 ? 'from-emerald-400 to-teal-500' : wellnessScore >= 60 ? 'from-amber-400 to-orange-500' : 'from-rose-400 to-red-500'
  const scoreLabel = wellnessScore >= 80 ? 'Excellent' : wellnessScore >= 60 ? 'Good' : 'Needs Attention'

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  return (
    <motion.div className="max-w-6xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-800">Wellness Tracker</h1>
        <p className="text-slate-500 mt-1">Track your daily wellness metrics and see your trends.</p>
      </div>

      {/* ===== Row 1: Score + Quick Input ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Wellness Score Ring */}
        <motion.div variants={item} className="glass-card bg-gradient-to-br from-lavender-50/80 to-pink-50/80 p-7 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Wellness Score</p>
          <div className="relative w-36 h-36 mb-4">
            {/* Background ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - wellnessScore / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-heading font-extrabold ${scoreColor}`}>{wellnessScore}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${scoreGradient} text-white`}>
            {scoreLabel}
          </span>
        </motion.div>

        {/* Quick Log Cards */}
        <motion.div variants={item} className="glass-card bg-white/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl"><Moon className="w-5 h-5 text-indigo-500" /></div>
            <h3 className="font-semibold text-slate-700 text-sm">Sleep</h3>
            <span className="ml-auto text-xs text-slate-400">hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setTodaySleep(s => Math.max(0, +(s - 0.5).toFixed(1)))} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><Minus className="w-4 h-4 text-slate-500" /></button>
            <span className="text-3xl font-heading font-bold text-slate-800">{todaySleep}</span>
            <button onClick={() => setTodaySleep(s => Math.min(12, +(s + 0.5).toFixed(1)))} className="w-9 h-9 rounded-xl bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center transition-colors"><Plus className="w-4 h-4 text-indigo-600" /></button>
          </div>
          <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${Math.min(100, (todaySleep / 8) * 100)}%` }} className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-500" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Goal: 8 hrs</p>
        </motion.div>

        <motion.div variants={item} className="glass-card bg-white/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sky-50 rounded-xl"><Droplets className="w-5 h-5 text-sky-500" /></div>
            <h3 className="font-semibold text-slate-700 text-sm">Water</h3>
            <span className="ml-auto text-xs text-slate-400">glasses</span>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={() => setTodayWater(w => Math.max(0, w - 1))} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><Minus className="w-4 h-4 text-slate-500" /></button>
            <span className="text-3xl font-heading font-bold text-slate-800">{todayWater}</span>
            <button onClick={() => setTodayWater(w => Math.min(15, w + 1))} className="w-9 h-9 rounded-xl bg-sky-100 hover:bg-sky-200 flex items-center justify-center transition-colors"><Plus className="w-4 h-4 text-sky-600" /></button>
          </div>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i < todayWater ? 'bg-sky-400' : 'bg-slate-100'}`} />
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Goal: 8 glasses</p>
        </motion.div>

        <motion.div variants={item} className="glass-card bg-white/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-xl"><Brain className="w-5 h-5 text-orange-500" /></div>
            <h3 className="font-semibold text-slate-700 text-sm">Stress</h3>
          </div>
          <div className="flex justify-between items-center mb-3">
            {[0, 1, 2, 3, 4].map(level => (
              <button
                key={level}
                onClick={() => setTodayStress(level)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
                  ${todayStress === level
                    ? 'bg-gradient-to-br from-orange-400 to-rose-500 text-white shadow-md scale-110'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                {level + 1}
              </button>
            ))}
          </div>
          <p className={`text-sm font-semibold text-center ${todayStress <= 1 ? 'text-emerald-500' : todayStress <= 2 ? 'text-amber-500' : 'text-rose-500'}`}>
            {stressLabels[todayStress]}
          </p>
        </motion.div>
      </div>

      {/* ===== Row 2: Mood + Weight ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Mood Selector */}
        <motion.div variants={item} className="glass-card bg-white/50 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-pink-50 rounded-xl"><Smile className="w-5 h-5 text-pink-500" /></div>
            <div>
              <h3 className="font-semibold text-slate-700">Today's Mood</h3>
              <p className="text-xs text-slate-400">How are you feeling right now?</p>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-50/60 p-3 rounded-2xl border border-white">
            {moodEmojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => setTodayMood(idx)}
                className={`text-3xl p-3 rounded-xl transition-all duration-200
                  ${todayMood === idx
                    ? 'bg-white shadow-lg ring-2 ring-lavender-300 scale-115'
                    : 'opacity-40 hover:opacity-80 hover:scale-105'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Weight Input */}
        <motion.div variants={item} className="glass-card bg-white/50 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-emerald-50 rounded-xl"><Weight className="w-5 h-5 text-emerald-500" /></div>
            <div>
              <h3 className="font-semibold text-slate-700">Weight</h3>
              <p className="text-xs text-slate-400">Track your weekly trend</p>
            </div>
            <div className="ml-auto flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
              <TrendingDown className="w-3.5 h-3.5" /> -0.5 kg
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setTodayWeight(w => Math.max(30, +(w - 0.1).toFixed(1)))} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><Minus className="w-4 h-4 text-slate-500" /></button>
              <div className="text-center">
                <span className="text-4xl font-heading font-extrabold text-slate-800">{todayWeight}</span>
                <span className="text-sm text-slate-400 ml-1">kg</span>
              </div>
              <button onClick={() => setTodayWeight(w => Math.min(200, +(w + 0.1).toFixed(1)))} className="w-9 h-9 rounded-xl bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors"><Plus className="w-4 h-4 text-emerald-600" /></button>
            </div>
            <div className="w-full sm:flex-1 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyWeight} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                  <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                  <XAxis dataKey="wk" hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== Row 3: Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Sleep & Water Trend — wide */}
        <motion.div variants={item} className="lg:col-span-3 glass-card bg-white/60 p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-semibold text-slate-800 text-lg">Sleep & Hydration Trends</h3>
              <p className="text-xs text-slate-400 mt-0.5">This week overview</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-400" />Sleep (hrs)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-sky-400" />Water (L)</span>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyWellness} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sleep" name="Sleep" stroke="#818cf8" strokeWidth={2.5} fill="url(#sleepGrad)" dot={{ r: 4, fill: '#818cf8', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="water" name="Water" stroke="#38bdf8" strokeWidth={2.5} fill="url(#waterGrad)" dot={{ r: 4, fill: '#38bdf8', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card bg-white/60 p-7 flex flex-col">
          <h3 className="font-heading font-semibold text-slate-800 text-lg mb-1">Health Radar</h3>
          <p className="text-xs text-slate-400 mb-4">Overall balance snapshot</p>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name="Score" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ===== Row 4: Stress Trend + Analytics Cards ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Stress Trend Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-50 rounded-xl"><Brain className="w-5 h-5 text-orange-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Stress & Mood Patterns</h3>
              <p className="text-xs text-slate-400">Correlation over the week</p>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWellness} margin={{ top: 0, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="stress" name="Stress" fill="#fb923c" radius={[6, 6, 0, 0]} barSize={18} />
                <Bar dataKey="mood" name="Mood" fill="#a78bfa" radius={[6, 6, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400" />Stress Level</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-400" />Mood Score</span>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div variants={item} className="space-y-4">
          {[
            { icon: <Moon className="w-5 h-5 text-indigo-500" />, label: 'Avg Sleep', value: '7.5 hrs', trend: '+0.3', up: true, bg: 'bg-indigo-50' },
            { icon: <Droplets className="w-5 h-5 text-sky-500" />, label: 'Avg Water', value: '2.2 L', trend: '+0.4', up: true, bg: 'bg-sky-50' },
            { icon: <Brain className="w-5 h-5 text-orange-500" />, label: 'Avg Stress', value: '2.9 / 5', trend: '-0.5', up: false, bg: 'bg-orange-50' },
            { icon: <Heart className="w-5 h-5 text-pink-500" />, label: 'Avg Mood', value: '4.0 / 5', trend: '+0.2', up: true, bg: 'bg-pink-50' },
          ].map((stat, i) => (
            <div key={i} className="glass-card bg-white/50 p-4 flex items-center gap-4">
              <div className={`p-2.5 ${stat.bg} rounded-xl shrink-0`}>{stat.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                <p className="text-lg font-heading font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {stat.trend}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===== Row 5: Insights Banner ===== */}
      <motion.div variants={item} className="glass-card bg-gradient-to-r from-lavender-50 to-pink-50 p-6 border-lavender-100/50">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-lavender-400 to-pink-500 rounded-2xl text-white shadow-lg shadow-lavender-500/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-slate-800 mb-1">AI Wellness Insight</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your sleep quality has improved by <strong>12%</strong> this week. Combined with lower stress levels on weekends,
              your overall wellness trend is positive. Keep maintaining a consistent bedtime routine for best results.
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold shrink-0">
            <TrendingUp className="w-4 h-4" /> +12%
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
