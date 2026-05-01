import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, AreaChart, Area, ComposedChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { Activity, AlertTriangle, Droplets, HeartPulse, Stethoscope, Scale, Brain, Moon, Plus } from 'lucide-react'

// Dummy Data
const weeklyTrends = [
  { week: 'Wk 24', bpSys: 118, bpDia: 78, sugar: 95, stress: 3, weight: 68 },
  { week: 'Wk 25', bpSys: 120, bpDia: 80, sugar: 98, stress: 4, weight: 68.5 },
  { week: 'Wk 26', bpSys: 125, bpDia: 82, sugar: 105, stress: 5, weight: 69.2 },
  { week: 'Wk 27', bpSys: 130, bpDia: 85, sugar: 110, stress: 6, weight: 70 },
  { week: 'Wk 28', bpSys: 135, bpDia: 88, sugar: 118, stress: 7, weight: 71 }, // Spikes
  { week: 'Wk 29', bpSys: 128, bpDia: 82, sugar: 100, stress: 5, weight: 71.5 },
]

const symptomSeverity = [
  { day: 'Mon', fatigue: 5, swelling: 2, headache: 1, dizziness: 0 },
  { day: 'Tue', fatigue: 6, swelling: 3, headache: 2, dizziness: 1 },
  { day: 'Wed', fatigue: 8, swelling: 5, headache: 4, dizziness: 2 },
  { day: 'Thu', fatigue: 7, swelling: 4, headache: 3, dizziness: 1 },
  { day: 'Fri', fatigue: 5, swelling: 3, headache: 1, dizziness: 0 },
  { day: 'Sat', fatigue: 4, swelling: 2, headache: 0, dizziness: 0 },
  { day: 'Sun', fatigue: 4, swelling: 2, headache: 1, dizziness: 0 },
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

export default function PregnancyWellness() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

  const [bpSys, setBpSys] = useState(120)
  const [bpDia, setBpDia] = useState(80)
  const [sugar, setSugar] = useState(95)

  return (
    <motion.div className="max-w-6xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-800">Advanced Pregnancy Wellness</h1>
        <p className="text-slate-500 mt-1">Preventive monitoring for blood pressure, blood sugar, and high-risk symptoms.</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-lg text-xs font-medium text-rose-600">
          <AlertTriangle className="w-4 h-4" />
          <span>Educational tool. Not a substitute for medical advice or professional prenatal care.</span>
        </div>
      </div>

      {/* Wellness Alerts & Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <motion.div variants={item} className="glass-card bg-gradient-to-br from-lavender-400 to-pink-500 p-6 text-white flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-2">Pregnancy Wellness Score</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-heading font-extrabold">72</span>
            <span className="text-xl text-white/70">/ 100</span>
          </div>
          <p className="text-sm text-white/90 mt-3 font-medium bg-white/20 px-4 py-1.5 rounded-full">Fair — Needs Monitoring</p>
        </motion.div>

        {/* Alerts List */}
        <motion.div variants={item} className="glass-card bg-white/60 p-6 lg:col-span-2 flex flex-col justify-center">
          <h3 className="font-heading font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-500" /> Weekly Health Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <Droplets className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Hydration levels are low</p>
                <p className="text-xs text-slate-600 mt-0.5">You've averaged 4 glasses this week. Aim for 8-10 to reduce swelling and fatigue.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-100 rounded-xl">
              <Brain className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Stress levels increased this week</p>
                <p className="text-xs text-slate-600 mt-0.5">Elevated stress detected alongside headaches. Monitor symptoms and consult a healthcare professional if needed.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Grid Row: Manual Entry & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Blood Pressure Input */}
        <motion.div variants={item} className="glass-card bg-white/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Blood Pressure</h3>
            <div className="p-1.5 bg-rose-50 rounded-lg"><HeartPulse className="w-4 h-4 text-rose-500" /></div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input type="number" value={bpSys} onChange={e => setBpSys(e.target.value)} className="w-full text-center p-2 rounded-lg bg-slate-50 border-0 outline-none focus:ring-2 focus:ring-rose-300 font-bold text-slate-800" />
            <span className="text-slate-400 font-light">/</span>
            <input type="number" value={bpDia} onChange={e => setBpDia(e.target.value)} className="w-full text-center p-2 rounded-lg bg-slate-50 border-0 outline-none focus:ring-2 focus:ring-rose-300 font-bold text-slate-800" />
          </div>
          <button className="w-full py-2 bg-rose-100 text-rose-600 font-semibold rounded-lg text-xs hover:bg-rose-200 transition-colors">Log Reading</button>
        </motion.div>

        {/* Blood Sugar Input */}
        <motion.div variants={item} className="glass-card bg-white/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Blood Sugar</h3>
            <div className="p-1.5 bg-sky-50 rounded-lg"><Activity className="w-4 h-4 text-sky-500" /></div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <input type="number" value={sugar} onChange={e => setSugar(e.target.value)} className="w-full text-center p-2 rounded-lg bg-slate-50 border-0 outline-none focus:ring-2 focus:ring-sky-300 font-bold text-slate-800" />
            <span className="text-xs font-semibold text-slate-400">mg/dL</span>
          </div>
          <button className="w-full py-2 bg-sky-100 text-sky-600 font-semibold rounded-lg text-xs hover:bg-sky-200 transition-colors">Log Glucose</button>
        </motion.div>

        {/* Quick Log Symptom Button */}
        <motion.div variants={item} className="glass-card bg-white/60 p-5 flex flex-col justify-center items-center border-dashed border-2 border-slate-200 hover:border-lavender-400 transition-colors cursor-pointer group lg:col-span-2">
          <div className="w-12 h-12 rounded-full bg-lavender-50 flex items-center justify-center text-lavender-500 group-hover:scale-110 transition-transform mb-2">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700">Log Daily Symptoms</h3>
          <p className="text-xs text-slate-400 text-center mt-1">Track swelling, dizziness, headaches, and fatigue severity.</p>
        </motion.div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BP and Sugar Trends */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 rounded-xl"><Stethoscope className="w-5 h-5 text-rose-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Vitals Trend Analytics</h3>
              <p className="text-xs text-slate-400">Blood Pressure (Systolic) & Glucose</p>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weeklyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[100, 150]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[80, 130]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                
                <Bar yAxisId="left" dataKey="bpSys" name="BP Systolic (mmHg)" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="sugar" name="Blood Sugar (mg/dL)" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* High-Risk Symptoms Radar / Area */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-xl"><AlertTriangle className="w-5 h-5 text-amber-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Symptom Severity Monitor</h3>
              <p className="text-xs text-slate-400">Tracking swelling, headaches, and dizziness</p>
            </div>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={symptomSeverity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="swellArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="headArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 10]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                
                <Area type="monotone" dataKey="swelling" name="Swelling Severity" stroke="#f59e0b" strokeWidth={2} fill="url(#swellArea)" />
                <Area type="monotone" dataKey="headache" name="Headache Severity" stroke="#a855f7" strokeWidth={2} fill="url(#headArea)" />
                <Area type="monotone" dataKey="dizziness" name="Dizziness" stroke="#ef4444" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
