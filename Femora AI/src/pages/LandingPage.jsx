import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Activity, Calendar, Shield, Sparkles, ChevronRight, ArrowRight, Star } from 'lucide-react'

const features = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Smart Cycle Tracking',
    desc: 'AI-powered predictions for your periods and ovulation with accuracy that improves over time.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Health Insights',
    desc: 'Personalized wellness analysis, symptom patterns, and actionable health recommendations.',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Pregnancy Mode',
    desc: 'Week-by-week tracking, baby size comparisons, and trimester-specific health guidance.',
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Private & Secure',
    desc: 'End-to-end encryption ensures your most sensitive health data stays yours alone.',
    color: 'from-indigo-500 to-violet-500',
    bg: 'bg-indigo-50',
  },
]

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '99.2%', label: 'Prediction Accuracy' },
  { value: '4.9', label: 'App Store Rating', icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-lavender-200/60 to-purple-200/40 rounded-full blur-3xl blob" />
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/50 to-rose-200/30 rounded-full blur-3xl blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-lavender-100/30 rounded-full blur-3xl blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full top-0 z-50"
      >
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto glass-card !rounded-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-500 to-pink-500 flex items-center justify-center shadow-lg shadow-lavender-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight text-slate-800">
                  Femora<span className="gradient-text">AI</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-sm font-medium text-slate-500 hover:text-lavender-600 transition-colors">Features</a>
                <a href="#stats" className="text-sm font-medium text-slate-500 hover:text-lavender-600 transition-colors">About</a>
                <Link to="/auth" className="text-sm font-bold text-slate-600 hover:text-lavender-600 transition-colors">Sign In</Link>
                <Link
                  to="/dashboard"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-lavender-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-lavender-500/25 hover:shadow-xl hover:shadow-lavender-500/30 transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Mobile menu button */}
              <Link
                to="/auth"
                className="md:hidden px-4 py-2 rounded-xl bg-gradient-to-r from-lavender-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-lavender-500/25"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ===== Hero Section ===== */}
      <section className="pt-36 md:pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-lavender-200/60 text-sm font-semibold text-lavender-600 shadow-sm mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now in public beta
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-slate-900 leading-[1.08] mb-8 tracking-tight">
                Understand your{' '}
                <span className="gradient-text">body</span>{' '}
                with intelligent{' '}
                <span className="gradient-text">insights</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
                Femora AI uses advanced algorithms to track your cycle, predict ovulation, and monitor your wellness — all in one beautiful, private dashboard.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/auth"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-lavender-500 via-purple-500 to-pink-500 animated-gradient text-white font-bold text-lg shadow-xl shadow-lavender-500/25 hover:shadow-2xl hover:shadow-lavender-500/30 transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  Get Started Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm text-slate-700 font-semibold text-lg hover:bg-white hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            id="stats"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 max-w-2xl mx-auto"
          >
            <div className="glass-card px-8 py-6 flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-0">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-2xl md:text-3xl font-heading font-bold text-slate-800">{stat.value}</span>
                    {stat.icon}
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-lavender-500 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mt-3">
              Everything you need in <span className="gradient-text">one place</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-7 group cursor-default"
              >
                <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lavender-500 via-purple-500 to-pink-500 animated-gradient p-12 md:p-16 text-center shadow-2xl shadow-lavender-500/20"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Start your wellness journey today
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of women who trust Femora AI to understand their bodies better.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-lavender-600 font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                Open Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-10 px-6 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-lavender-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-slate-700">FemoraAI</span>
          </div>
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Femora AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
