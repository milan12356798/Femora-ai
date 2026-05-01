import { motion } from 'framer-motion'
import { Calendar, Droplet, Activity, Heart, CupSoda, Sparkles, TrendingUp, Moon, Sun, Flame } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const wellnessData = [
  { day: 'Mon', score: 75 }, { day: 'Tue', score: 82 },
  { day: 'Wed', score: 68 }, { day: 'Thu', score: 85 },
  { day: 'Fri', score: 90 }, { day: 'Sat', score: 94 },
  { day: 'Sun', score: 88 },
]

const sleepData = [
  { day: 'Mon', hrs: 7.2 }, { day: 'Tue', hrs: 6.5 },
  { day: 'Wed', hrs: 8.1 }, { day: 'Thu', hrs: 7.0 },
  { day: 'Fri', hrs: 7.8 }, { day: 'Sat', hrs: 8.5 },
  { day: 'Sun', hrs: 7.4 },
]

export default function Dashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  return (
    <motion.div className="max-w-6xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-800">Your Health Overview</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your body today.</p>
        </div>
        <button className="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-white/70 border border-slate-100 shadow-sm font-medium text-sm text-slate-700 hover:bg-white hover:shadow-md transition-all flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-lavender-500" /> Log Symptoms
        </button>
      </div>

      {/* ===== Top Row — 3 Primary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Period Card */}
        <motion.div variants={item} className="glass-card bg-white/50 p-6 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 opacity-[0.06] group-hover:scale-110 transition-transform duration-500">
            <Droplet className="w-32 h-32 text-rose-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-rose-100 rounded-xl"><Droplet className="w-5 h-5 text-rose-500" /></div>
              <h3 className="font-semibold text-slate-700">Next Period</h3>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-heading font-extrabold text-slate-900">4</span>
              <span className="text-lg font-medium text-slate-400">days left</span>
            </div>
            <p className="text-sm text-slate-500 mb-5">Expected to start on Oct 24</p>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, ease: 'easeOut' }} className="bg-gradient-to-r from-rose-300 to-rose-500 h-full rounded-full" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Day 24 of 28</p>
          </div>
        </motion.div>

        {/* Ovulation Card */}
        <motion.div variants={item} className="glass-card bg-white/50 p-6 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 opacity-[0.06] group-hover:scale-110 transition-transform duration-500">
            <Activity className="w-32 h-32 text-lavender-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-lavender-100 rounded-xl"><Activity className="w-5 h-5 text-lavender-600" /></div>
              <h3 className="font-semibold text-slate-700">Fertile Window</h3>
              <span className="ml-auto px-2.5 py-0.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold">ACTIVE</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-heading font-extrabold text-slate-900">High</span>
              <span className="text-lg font-medium text-slate-400">chance</span>
            </div>
            <p className="text-sm text-slate-500 mb-5">Peak ovulation in 2 days</p>
            <div className="flex gap-1.5">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className={`flex-1 h-2.5 rounded-full transition-colors ${i === 4 ? 'bg-lavender-500 pulse-ring' : i > 2 && i < 6 ? 'bg-lavender-300' : 'bg-slate-200'}`} />
              ))}
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-slate-400 font-medium">
              <span>Low</span><span>Peak</span><span>Low</span>
            </div>
          </div>
        </motion.div>

        {/* Pregnancy Card */}
        <motion.div variants={item} className="glass-card bg-gradient-to-br from-pink-50 to-rose-50 p-6 border-pink-100/50">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-white rounded-xl shadow-sm"><Heart className="w-5 h-5 text-pink-500" /></div>
            <h3 className="font-semibold text-slate-700">Pregnancy</h3>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-heading font-extrabold text-slate-900">Wk 14</span>
          </div>
          <p className="text-sm text-slate-600 mb-4">Baby is the size of a lemon 🍋</p>
          <div className="p-3 bg-white/70 rounded-xl border border-white flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">You might experience more energy this week as you enter the second trimester.</p>
          </div>
        </motion.div>
      </div>

      {/* ===== Second Row — Chart + Side Cards ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Wellness Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card bg-white/60 p-7 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-semibold text-slate-800 text-lg">Wellness Score</h3>
              <p className="text-sm text-slate-400">Based on symptoms, sleep & activity</p>
            </div>
            <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-sm font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +12%
            </div>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wellnessData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[50, 100]} />
                <Tooltip
                  contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: '10px 14px' }}
                  itemStyle={{ color: '#64748b', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" dot={{ r: 4, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side column */}
        <div className="space-y-6 flex flex-col">

          {/* Water Intake */}
          <motion.div variants={item} className="glass-card bg-white/50 p-5 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sky-50 rounded-xl"><CupSoda className="w-5 h-5 text-sky-500" /></div>
              <h3 className="font-semibold text-slate-700 text-sm">Water Intake</h3>
              <span className="ml-auto text-xs text-slate-400 font-medium">48%</span>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-heading font-bold text-slate-900">1.2</span>
              <span className="text-sm text-slate-400 mb-1">/ 2.5 L</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '48%' }} transition={{ duration: 1 }} className="bg-gradient-to-r from-sky-300 to-blue-400 h-full rounded-full" />
            </div>
            <div className="flex gap-1 mt-3">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${i <= 5 ? 'bg-sky-100 text-sky-500' : 'bg-slate-50 text-slate-300'}`}>
                  💧
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div variants={item} className="glass-card bg-white/50 p-5 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700 text-sm">Today's Mood</h3>
              <span className="text-xs text-lavender-500 font-semibold">Logged ✓</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-2xl border border-white">
              {['😢', '😐', '🙂', '😊', '🥰'].map((emoji, idx) => (
                <button
                  key={idx}
                  className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 ${idx === 3 ? 'bg-white shadow-sm ring-2 ring-lavender-200 scale-110' : 'opacity-50 hover:opacity-100'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== Third Row — Sleep + Quick Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Sleep Chart */}
        <motion.div variants={item} className="md:col-span-2 glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-indigo-50 rounded-xl"><Moon className="w-5 h-5 text-indigo-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Sleep Pattern</h3>
              <p className="text-xs text-slate-400">Avg 7.5 hrs this week</p>
            </div>
          </div>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[5, 10]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="hrs" fill="#818cf8" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={item} className="space-y-4">
          {[
            { icon: <Flame className="w-5 h-5 text-orange-500" />, label: 'Calories Burned', value: '1,847', bg: 'bg-orange-50' },
            { icon: <Sun className="w-5 h-5 text-amber-500" />, label: 'Steps Today', value: '6,324', bg: 'bg-amber-50' },
            { icon: <Activity className="w-5 h-5 text-emerald-500" />, label: 'Active Minutes', value: '42 min', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <div key={i} className="glass-card bg-white/50 p-4 flex items-center gap-4">
              <div className={`p-2.5 ${stat.bg} rounded-xl`}>{stat.icon}</div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                <p className="text-lg font-heading font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
