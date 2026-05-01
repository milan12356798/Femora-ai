import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import PeriodTracker from './pages/PeriodTracker'
import PregnancyTracker from './pages/PregnancyTracker'
import WellnessTracker from './pages/WellnessTracker'
import Reminders from './pages/Reminders'
import AnalyticsDashboard from './pages/AnalyticsDashboard'
import PCOSWellness from './pages/PCOSWellness'
import PregnancyWellness from './pages/PregnancyWellness'
import AiAssistant from './pages/AiAssistant'

// Helper component to protect routes
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return <Navigate to="/auth" />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracker" element={<PeriodTracker />} />
          <Route path="/pregnancy" element={<PregnancyTracker />} />
          <Route path="/wellness" element={<WellnessTracker />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/pcos" element={<PCOSWellness />} />
          <Route path="/pregnancy-wellness" element={<PregnancyWellness />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
