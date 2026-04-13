import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  CalendarDays, 
  Ticket, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  GraduationCap,
  Cpu,
  Wrench
} from 'lucide-react';

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
        <path d="M 50 10 A 40 40 0 0 1 90 50 L 80 50 A 30 30 0 0 0 50 20 Z" fill="#1e40af" />
        <path d="M 50 90 A 40 40 0 0 1 10 50 L 20 50 A 30 30 0 0 0 50 80 Z" fill="#b45309" />
      </svg>
      <div className="relative z-10 bg-white rounded-full p-1 border-2 border-blue-800">
        <Cpu size={16} className="text-blue-800" />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-black tracking-tighter text-blue-900">UniCore</span>
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-amber-600">360</span>
        <GraduationCap size={14} className="text-amber-600 -rotate-12" />
      </div>
    </div>
  </div>
);

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/api/oauth2/authorization/google';
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE – Branding & Feature Highlights */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-blue-800 to-amber-800 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Logo className="text-white" />

          <div className="space-y-8">
            <h1 className="text-5xl font-black tracking-tight leading-tight">
              Smart Campus<br />
              Operations Hub
            </h1>
            <p className="text-lg text-blue-100 max-w-md">
              One platform to manage facilities, bookings, incident tickets, and real‑time notifications – all with role‑based access.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3 text-sm font-medium">
                <Building2 size={20} className="text-amber-300" />
                <span>Facilities & Asset Catalogue</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <CalendarDays size={20} className="text-amber-300" />
                <span>Booking Management with Conflict Checking</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Wrench size={20} className="text-amber-300" />
                <span>Incident Ticketing (images, workflow)</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <ShieldCheck size={20} className="text-amber-300" />
                <span>Role‑Based Dashboards (User, Technician, Admin)</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-blue-200">
            © 2026 UniCore 360 – Built for PAF IT3030
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <Logo className="justify-center mb-6" />
            <h2 className="text-2xl font-black text-zinc-900">Welcome Back</h2>
            <p className="text-zinc-500 text-sm mt-1">Sign in with your Google account</p>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-zinc-200 rounded-2xl font-bold text-zinc-700 hover:bg-zinc-50 transition-all active:scale-[0.98] shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              <ArrowRight size={16} className="rotate-180" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}