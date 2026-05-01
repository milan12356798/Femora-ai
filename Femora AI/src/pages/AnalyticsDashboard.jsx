import { motion } from 'framer-motion'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart
} from 'recharts'
import { CalendarDays, Brain, Droplets, Moon, Weight, Activity, Sparkles, AlertCircle } from 'lucide-react'

// Dummy Data
const cycleData = [
  { month: 'Jan', length: 28, variation: 0 },
  { month: 'Feb', length: 29, variation: 1 },
  { month: 'Mar', length: 27, variation: -1 },
  { month: 'Apr', length: 28, variation: 0 },
  { month: 'May', length: 32, variation: 4 },
  { month: 'Jun', length: 29, variation: 1 },
]

const symptomFrequency = [
  { name: 'Cramps', value: 12 },
  { name: 'Headache', value: 8 },
  { name: 'Bloating', value: 15 },
  { name: 'Fatigue', value: 10 },
  { name: 'Mood Swings', value: 6 },
]

const stressSleepData = [
  { month: 'Jan', stress: 3.2, sleep: 7.5 },
  { month: 'Feb', stress: 4.1, sleep: 6.8 },
  { month: 'Mar', stress: 2.8, sleep: 8.1 },
  { month: 'Apr', stress: 3.5, sleep: 7.2 },
  { month: 'May', stress: 2.5, sleep: 7.9 },
  { month: 'Jun', stress: 2.1, sleep: 8.3 },
]

const hydrationWeightData = [
  { week: 'W1', water: 1.8, weight: 65.2 },
  { week: 'W2', water: 2.1, weight: 65.0 },
  { week: 'W3', water: 2.4, weight: 64.8 },
  { week: 'W4', water: 2.2, weight: 64.5 },
  { week: 'W5', water: 2.5, weight: 64.3 },
  { week: 'W6', water: 2.8, weight: 64.1 },
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

export default function AnalyticsDashboard() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }

  return (
    <motion.div className="max-w-6xl mx-auto space-y-8" variants={container} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-800">Long-Term Analytics</h1>
          <p className="text-slate-500 mt-1">Review your wellness trends over the past 6 months.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100 text-sm font-medium text-slate-600 hover:text-lavender-600 transition-colors">Export Report</button>
          <select className="px-4 py-2 rounded-xl bg-white shadow-sm border border-slate-100 text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-lavender-300">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* AI Insight Banner */}
      <motion.div variants={item} className="glass-card bg-gradient-to-r from-lavender-50 to-pink-50 p-6 border-lavender-100/50 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-lavender-400 to-pink-500 rounded-2xl text-white shadow-lg shadow-lavender-500/20 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-slate-800 mb-1">Your 6-Month Insight</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your cycle consistency has been excellent, averaging 28.5 days. There is a strong negative correlation between your <strong className="text-indigo-500">sleep quality</strong> and <strong className="text-orange-500">stress levels</strong>. When you sleep over 8 hours, your stress drops by 40%.
          </p>
        </div>
      </motion.div>

      {/* Grid Row 1: Cycle & Symptoms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cycle Consistency Chart */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 rounded-xl"><CalendarDays className="w-5 h-5 text-rose-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Cycle Consistency</h3>
              <p className="text-xs text-slate-400">Average: 28.5 Days</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cycleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cycleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[20, 35]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="length" name="Cycle Length (Days)" stroke="#f43f5e" strokeWidth={3} fill="url(#cycleGrad)" dot={{ r: 4, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {cycleData.some(d => d.variation > 3) && (
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4" /> Cycle irregularity detected in May.
            </div>
          )}
        </motion.div>

        {/* Symptom Frequency */}
        <motion.div variants={item} className="glass-card bg-white/60 p-7 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-xl"><Activity className="w-5 h-5 text-purple-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Symptom Frequency</h3>
              <p className="text-xs text-slate-400">Total logs per symptom</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={symptomFrequency} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" name="Occurrences" fill="#a855f7" radius={[0, 6, 6, 0]} barSize={24}>
                  {symptomFrequency.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={index % 2 === 0 ? '#a855f7' : '#c084fc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* Grid Row 2: Stress vs Sleep (Correlation) */}
      <motion.div variants={item} className="glass-card bg-white/60 p-7">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl"><Brain className="w-5 h-5 text-indigo-500" /></div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Stress & Sleep Correlation</h3>
              <p className="text-xs text-slate-400">6-Month Trend Analysis</p>
            </div>
          </div>
          <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={stressSleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[4, 10]} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 5]} />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Sleep Bar */}
              <Bar yAxisId="left" dataKey="sleep" name="Avg Sleep (hrs)" fill="#818cf8" radius={[6, 6, 0, 0]} barSize={32} />
              {/* Stress Line */}
              <Line yAxisId="right" type="monotone" dataKey="stress" name="Avg Stress (1-5)" stroke="#fb923c" strokeWidth={3} dot={{ r: 5, fill: '#fb923c', stroke: '#fff', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Grid Row 3: Hydration & Weight */}
      <motion.div variants={item} className="glass-card bg-white/60 p-7">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="p-2 bg-sky-50 rounded-xl relative z-10 border-2 border-white"><Droplets className="w-5 h-5 text-sky-500" /></div>
              <div className="p-2 bg-emerald-50 rounded-xl relative z-0 border-2 border-white"><Weight className="w-5 h-5 text-emerald-500" /></div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Hydration & Weight Tracker</h3>
              <p className="text-xs text-slate-400">6-Week Progress</p>
            </div>
          </div>
          <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 500 }} />
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={hydrationWeightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="waterArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[1, 4]} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Hydration Area */}
              <Area yAxisId="left" type="monotone" dataKey="water" name="Avg Water (Liters)" stroke="#38bdf8" strokeWidth={3} fill="url(#waterArea)" />
              {/* Weight Line */}
              <Line yAxisId="right" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </motion.div>
  )
}
