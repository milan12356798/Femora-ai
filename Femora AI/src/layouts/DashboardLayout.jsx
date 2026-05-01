import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, CalendarHeart, Baby, ActivitySquare, Settings, LogOut, Menu, Droplets, Sparkles, Bell, LineChart, Stethoscope, HeartPulse, Bot } from 'lucide-react'

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', path: '/dashboard' },
  { icon: <CalendarHeart className="w-5 h-5" />, label: 'Cycle Tracker', path: '/tracker' },
  { icon: <Baby className="w-5 h-5" />, label: 'Pregnancy', path: '/pregnancy' },
  { icon: <HeartPulse className="w-5 h-5" />, label: 'PCOS Wellness', path: '/pcos' },
  { icon: <Stethoscope className="w-5 h-5" />, label: 'High-Risk Pregnancy', path: '/pregnancy-wellness' },
  { icon: <Bot className="w-5 h-5" />, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: <ActivitySquare className="w-5 h-5" />, label: 'Wellness', path: '/wellness' },
  { icon: <LineChart className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
  { icon: <Bell className="w-5 h-5" />, label: 'Reminders', path: '/reminders' },
]

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth')
    } catch (err) {
      console.error("Failed to logout", err)
    }
  }

  // Get user display name or fallback to email prefix
  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72
        bg-white/70 backdrop-blur-2xl border-r border-white/50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shrink-0
        shadow-xl shadow-lavender-500/5
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-7 border-b border-slate-100/60 shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-500 to-pink-500 flex items-center justify-center shadow-lg shadow-lavender-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-slate-800">
              Femora<span className="gradient-text">AI</span>
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</p>
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-lavender-500/10 to-pink-500/10 text-lavender-700 font-semibold shadow-sm border border-lavender-200/40'
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'}
                `}
              >
                <span className={isActive ? 'text-lavender-500' : ''}>{item.icon}</span>
                {item.label}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-lavender-500" />}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-slate-100/60 space-y-1 shrink-0">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-white/60 hover:text-slate-700 transition-all text-sm">
            <Settings className="w-5 h-5" /> Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all text-sm"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col min-h-screen relative w-full">
        {/* Background decorations - fixed to viewport */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-lavender-100/40 to-purple-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-pink-100/40 to-rose-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Top bar - sticky */}
        <header className="sticky top-0 h-20 bg-white/50 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-6 lg:px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/60 transition-colors text-slate-500"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-heading font-semibold text-lg text-slate-800">Welcome back, {userName} <span className="emoji">👋</span></h2>
              <p className="text-xs text-slate-400 hidden sm:block">Here's your health summary for today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2.5 rounded-xl bg-white/60 border border-slate-100 hover:bg-white hover:shadow-sm transition-all text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>
            {/* Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-300 to-pink-300 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-[10px] bg-white overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userName}&backgroundColor=transparent`}
                  alt={userName}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 lg:p-10 flex-1 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
