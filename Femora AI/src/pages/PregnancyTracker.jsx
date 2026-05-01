import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Baby, Heart, Apple, Lightbulb, CalendarDays, Ruler, Weight, Sparkles, ChevronRight, Info } from 'lucide-react'

/* ===== Static Data ===== */
const weeklyData = {
  4:  { size: 'Poppy Seed', emoji: '🌱', length: '0.1 cm', weight: '<1 g',   tip: 'Start taking prenatal vitamins with folic acid daily.' },
  5:  { size: 'Sesame Seed', emoji: '🫘', length: '0.2 cm', weight: '<1 g',   tip: 'Nausea may begin — keep crackers handy for mornings.' },
  6:  { size: 'Sweet Pea', emoji: '🌸', length: '0.6 cm', weight: '<1 g',   tip: 'Your baby\'s heart is starting to beat this week!' },
  7:  { size: 'Blueberry', emoji: '🫐', length: '1.3 cm', weight: '<1 g',   tip: 'Stay hydrated — aim for 8-10 glasses of water a day.' },
  8:  { size: 'Raspberry', emoji: '🍇', length: '1.6 cm', weight: '1 g',    tip: 'Fingers and toes are forming. Eat iron-rich foods.' },
  9:  { size: 'Cherry', emoji: '🍒', length: '2.3 cm', weight: '2 g',    tip: 'Rest when you can — fatigue is very normal right now.' },
  10: { size: 'Strawberry', emoji: '🍓', length: '3.1 cm', weight: '4 g',    tip: 'Baby can now move, though you won\'t feel it yet.' },
  11: { size: 'Fig', emoji: '🫒', length: '4.1 cm', weight: '7 g',    tip: 'Include calcium-rich foods like yogurt and cheese.' },
  12: { size: 'Lime', emoji: '🍈', length: '5.4 cm', weight: '14 g',   tip: 'You\'re almost through the first trimester! Energy may return soon.' },
  13: { size: 'Peach', emoji: '🍑', length: '7.4 cm', weight: '23 g',   tip: 'Vocal cords are forming. Talk or sing to your baby!' },
  14: { size: 'Lemon', emoji: '🍋', length: '8.7 cm', weight: '43 g',   tip: 'Second trimester begins! Many women feel more energetic.' },
  16: { size: 'Avocado', emoji: '🥑', length: '11.6 cm', weight: '100 g',  tip: 'Baby can hear sounds. Play some gentle music.' },
  18: { size: 'Bell Pepper', emoji: '🫑', length: '14.2 cm', weight: '190 g',  tip: 'You might start feeling baby kicks — called quickening.' },
  20: { size: 'Banana', emoji: '🍌', length: '16.4 cm', weight: '300 g',  tip: 'Halfway there! Schedule your anatomy scan if not done.' },
  22: { size: 'Papaya', emoji: '🥭', length: '19 cm', weight: '430 g',  tip: 'Stretch marks may appear. Keep skin moisturized.' },
  24: { size: 'Corn Ear', emoji: '🌽', length: '21 cm', weight: '600 g',  tip: 'Baby can now respond to your voice and touch.' },
  26: { size: 'Lettuce', emoji: '🥬', length: '23 cm', weight: '760 g',  tip: 'Eyes are opening. Maintain a balanced diet with omega-3s.' },
  28: { size: 'Eggplant', emoji: '🍆', length: '25 cm', weight: '1 kg',   tip: 'Third trimester! Baby is practicing breathing motions.' },
  30: { size: 'Cabbage', emoji: '🥗', length: '27 cm', weight: '1.3 kg',  tip: 'Braxton Hicks contractions may start. Stay hydrated.' },
  32: { size: 'Squash', emoji: '🎃', length: '29 cm', weight: '1.7 kg',  tip: 'Baby is gaining fat layers. Eat healthy fats like nuts.' },
  34: { size: 'Cantaloupe', emoji: '🍈', length: '32 cm', weight: '2.1 kg',  tip: 'Lungs are maturing rapidly. Start packing your hospital bag.' },
  36: { size: 'Honeydew', emoji: '🍉', length: '34 cm', weight: '2.6 kg',  tip: 'Baby is nearly full-term. Practice breathing exercises.' },
  38: { size: 'Pumpkin', emoji: '🎃', length: '35 cm', weight: '3 kg',   tip: 'Baby could arrive any day! Rest and prepare your space.' },
  40: { size: 'Watermelon', emoji: '🍉', length: '36 cm', weight: '3.4 kg',  tip: 'Due date! Stay calm and follow your birth plan. You got this! 🎉' },
}

const nutritionTips = [
  { label: 'Folic Acid', desc: '400-800 mcg daily for neural development', color: 'from-green-400 to-emerald-500', icon: '🥦' },
  { label: 'Iron', desc: '27 mg daily to prevent anemia', color: 'from-red-400 to-rose-500', icon: '🥩' },
  { label: 'Calcium', desc: '1,000 mg daily for bone development', color: 'from-sky-400 to-blue-500', icon: '🥛' },
  { label: 'Omega-3', desc: 'DHA for brain & eye development', color: 'from-amber-400 to-orange-500', icon: '🐟' },
]

function getClosestWeekData(week) {
  const keys = Object.keys(weeklyData).map(Number).sort((a, b) => a - b)
  if (week < keys[0]) return weeklyData[keys[0]]
  let closest = keys[0]
  for (const k of keys) {
    if (k <= week) closest = k
    else break
  }
  return weeklyData[closest]
}

export default function PregnancyTracker() {
  const today = new Date()
  const defaultLMP = new Date(today)
  defaultLMP.setDate(today.getDate() - 98) // default ~ 14 weeks ago
  const [lmpDate, setLmpDate] = useState(defaultLMP.toISOString().split('T')[0])

  const pregnancy = useMemo(() => {
    const lmp = new Date(lmpDate)
    const diffMs = today - lmp
    const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7

    const dueDate = new Date(lmp)
    dueDate.setDate(lmp.getDate() + 280)

    const daysLeft = Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)))
    const progressPct = Math.min(100, Math.round((totalDays / 280) * 100))

    let trimester = 1
    if (weeks >= 28) trimester = 3
    else if (weeks >= 13) trimester = 2

    const clampedWeek = Math.min(Math.max(weeks, 4), 40)
    const weekInfo = getClosestWeekData(clampedWeek)

    return { weeks, days, dueDate, daysLeft, progressPct, trimester, weekInfo, totalDays }
  }, [lmpDate])

  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  const trimesterColors = {
    1: { bg: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-200/50', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
    2: { bg: 'from-pink-500/10 to-rose-500/10', border: 'border-pink-200/50', text: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
    3: { bg: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-200/50', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  }
  const tc = trimesterColors[pregnancy.trimester]

  return (
    <motion.div className="max-w-5xl mx-auto space-y-8" variants={containerVars} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-800">Pregnancy Tracker</h1>
          <p className="text-slate-500 mt-1">Monitor your journey week by week.</p>
        </div>
        <div className="glass-card bg-white/60 p-1 pl-4 flex items-center gap-3 !rounded-2xl">
          <CalendarDays className="w-5 h-5 text-lavender-500 shrink-0" />
          <label className="text-sm text-slate-500 shrink-0">LMP Date</label>
          <input
            type="date"
            value={lmpDate}
            onChange={e => setLmpDate(e.target.value)}
            className="px-3 py-2 rounded-xl border-0 bg-white/80 focus:ring-2 focus:ring-lavender-400 outline-none text-slate-700 text-sm font-medium"
          />
        </div>
      </div>

      {/* ===== Hero Status Card ===== */}
      <motion.div variants={item} className={`glass-card bg-gradient-to-br ${tc.bg} p-8 ${tc.border} relative overflow-hidden`}>
        {/* Decorative */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Left — week display */}
          <div className="flex flex-col items-center lg:items-start">
            <span className={`text-xs font-bold uppercase tracking-widest ${tc.text} mb-2`}>
              Trimester {pregnancy.trimester}
            </span>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-6xl font-heading font-extrabold text-slate-800">{pregnancy.weeks}</span>
              <span className="text-xl text-slate-500 font-medium">weeks</span>
              <span className="text-3xl font-heading font-bold text-slate-600">+{pregnancy.days}</span>
              <span className="text-lg text-slate-400">days</span>
            </div>
            <p className="text-sm text-slate-500">
              Due {pregnancy.dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="ml-2 text-slate-400">({pregnancy.daysLeft} days left)</span>
            </p>
          </div>

          {/* Center — baby illustration */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-pink-200 to-lavender-200 flex items-center justify-center shadow-xl shadow-pink-200/40">
                <span className="text-6xl">{pregnancy.weekInfo.emoji}</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-white rounded-full shadow-md text-sm font-semibold text-slate-700 whitespace-nowrap">
                {pregnancy.weekInfo.size}
              </div>
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/70 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                <Ruler className="w-5 h-5 text-lavender-500" />
              </div>
              <p className="text-lg font-bold text-slate-800">{pregnancy.weekInfo.length}</p>
              <p className="text-xs text-slate-400">Length</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-white/70 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                <Weight className="w-5 h-5 text-pink-500" />
              </div>
              <p className="text-lg font-bold text-slate-800">{pregnancy.weekInfo.weight}</p>
              <p className="text-xs text-slate-400">Weight</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-8">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Week 1</span>
            <span>Week 13</span>
            <span>Week 28</span>
            <span>Week 40</span>
          </div>
          <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pregnancy.progressPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-lavender-400 via-pink-400 to-rose-400 relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-pink-400 shadow-md" />
            </motion.div>
          </div>
          {/* Trimester markers */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-semibold text-violet-400 uppercase">1st Tri</span>
            <span className="text-[10px] font-semibold text-pink-400 uppercase">2nd Tri</span>
            <span className="text-[10px] font-semibold text-amber-400 uppercase">3rd Tri</span>
          </div>
        </div>
      </motion.div>

      {/* ===== Two Column Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Weekly Tip Card */}
        <motion.div variants={item} className="lg:col-span-3 glass-card bg-white/60 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-400 to-purple-500 flex items-center justify-center shadow-md">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-slate-800">Week {pregnancy.weeks} Wellness Tip</h3>
              <p className="text-xs text-slate-400">Personalized for your stage</p>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-r from-lavender-50 to-pink-50 rounded-2xl border border-lavender-100/50">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-lavender-400 shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed">{pregnancy.weekInfo.tip}</p>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Upcoming Milestones</p>
            <div className="space-y-3">
              {[
                { wk: 12, label: 'First trimester screening', done: pregnancy.weeks >= 12 },
                { wk: 20, label: 'Anatomy ultrasound scan', done: pregnancy.weeks >= 20 },
                { wk: 28, label: 'Glucose tolerance test', done: pregnancy.weeks >= 28 },
                { wk: 36, label: 'Group B strep screening', done: pregnancy.weeks >= 36 },
              ].map((ms, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${ms.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {ms.done ? '✓' : ms.wk}
                  </div>
                  <p className={`text-sm ${ms.done ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}`}>
                    {ms.label}
                  </p>
                  {!ms.done && (
                    <span className="ml-auto text-xs text-slate-400">Week {ms.wk}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Nutrition Column */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <div className="glass-card bg-white/60 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-slate-800">Nutrition Focus</h3>
            </div>
            <div className="space-y-4">
              {nutritionTips.map((n, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="text-xl">{n.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">{n.label}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{n.desc}</p>
                    <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${60 + Math.random() * 35}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                        className={`h-full rounded-full bg-gradient-to-r ${n.color}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick info card */}
          <div className="glass-card bg-gradient-to-br from-pink-50 to-rose-50 p-6 border-pink-100/50">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="font-heading font-semibold text-slate-800">Did You Know?</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {pregnancy.trimester === 1 && "Your baby\u0027s vital organs are forming right now. Avoid raw fish, unpasteurized cheese, and limit caffeine to 200mg/day."}
              {pregnancy.trimester === 2 && "Your baby can now recognize your voice! This is a great time to start bonding through reading and music."}
              {pregnancy.trimester === 3 && "Baby is gaining about half a pound per week now. Practice perineal massage and pack your hospital bag!"}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
