import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CalendarDays, 
  Ticket, 
  Bell, 
  ArrowRight, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  LayoutDashboard,
  GraduationCap,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Circular Arrows (Simplified SVG representation) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
        <path 
          d="M 50 10 A 40 40 0 0 1 90 50 L 80 50 A 30 30 0 0 0 50 20 Z" 
          fill="#1e40af" 
        />
        <path 
          d="M 50 90 A 40 40 0 0 1 10 50 L 20 50 A 30 30 0 0 0 50 80 Z" 
          fill="#b45309" 
        />
      </svg>
      {/* Brain/Circuit Icon */}
      <div className="relative z-10 bg-white rounded-full p-1 border-2 border-blue-800">
        <Cpu size={20} className="text-blue-800" />
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-2xl font-black tracking-tighter text-blue-900">UniCore</span>
      <div className="flex items-center gap-1">
        <span className="text-xl font-bold text-amber-600">360</span>
        <GraduationCap size={16} className="text-amber-600 -rotate-12" />
      </div>
    </div>
  </div>
);

const ModuleCard = ({ icon: Icon, title, description, features, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-3">{title}</h3>
    <p className="text-zinc-500 mb-6 text-sm leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
          <CheckCircle2 size={16} className="text-emerald-500" />
          {f}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#modules" className="text-sm font-semibold text-zinc-600 hover:text-blue-700 transition-colors">Modules</a>
            <a href="#dashboards" className="text-sm font-semibold text-zinc-600 hover:text-blue-700 transition-colors">Dashboards</a>
            <a href="#about" className="text-sm font-semibold text-zinc-600 hover:text-blue-700 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-2.5 text-sm font-bold text-blue-900 bg-blue-50 rounded-full hover:bg-blue-100 transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-8">
              <ShieldCheck size={14} />
              Official PAF Assignment 2026
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-zinc-900 leading-[1.05] mb-8 tracking-tight">
              Smart Campus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Operations Hub</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-10 max-w-xl">
              A unified platform for modernizing university day-to-day operations. Manage facilities, bookings, and incident handling with role-based precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/login" 
                className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-200 flex items-center gap-2 group"
              >
                Explore Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex -space-x-3 items-center ml-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?u=${i}`} 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    alt="User"
                  />
                ))}
                <div className="pl-6 text-sm font-bold text-zinc-400">
                  Trusted by 500+ Staff
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] rotate-3 shadow-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white max-w-xs">
                  <LayoutDashboard size={48} className="mb-4" />
                  <h4 className="text-2xl font-bold mb-2">Integrated Hub</h4>
                  <p className="text-sm opacity-80">Real-time analytics and resource tracking at your fingertips.</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 animate-bounce-slow">
              <CalendarDays className="text-amber-500 mb-2" size={32} />
              <div className="text-xs font-bold text-zinc-400 uppercase">Bookings</div>
              <div className="text-xl font-black text-zinc-900">12 Active</div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 animate-pulse">
              <Ticket className="text-blue-500 mb-2" size={32} />
              <div className="text-xs font-bold text-zinc-400 uppercase">Tickets</div>
              <div className="text-xl font-black text-zinc-900">4 Pending</div>
            </div>
          </motion.div>
        </section>

        {/* Modules Section */}
        <section id="modules" className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tight">Core System Modules</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-lg">Designed to meet the minimum requirements of the PAF 2026 assignment with excellence.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ModuleCard 
                icon={Building2}
                title="Facilities & Assets"
                description="Maintain a comprehensive catalogue of lecture halls, labs, and equipment with detailed metadata."
                colorClass="bg-blue-600"
                features={["Resource Metadata", "Status Tracking", "Advanced Filtering"]}
              />
              <ModuleCard 
                icon={CalendarDays}
                title="Booking Management"
                description="Streamlined workflow for resource requests with built-in conflict prevention logic."
                colorClass="bg-amber-600"
                features={["Conflict Checking", "Approval Workflow", "User History"]}
              />
              <ModuleCard 
                icon={Wrench}
                title="Maintenance & Incident"
                description="Report faults, assign technicians, and track resolution progress with image attachments."
                colorClass="bg-zinc-900"
                features={["Image Attachments", "Technician Assignment", "Status Updates"]}
              />
            </div>
          </div>
        </section>

        {/* Dashboards Section */}
        <section id="dashboards" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-5xl font-black mb-8 leading-tight">Three Specialized <br />Dashboards</h2>
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">User Dashboard</h4>
                        <p className="text-blue-200 text-sm">For Students & Staff to browse, book, and report issues.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Wrench size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">Technician Dashboard</h4>
                        <p className="text-blue-200 text-sm">For maintenance teams to manage tasks and update workflow.</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">Admin Dashboard</h4>
                        <p className="text-blue-200 text-sm">For managers to oversee operations and view analytics.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-lg font-bold">System Overview</div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo className="scale-75 origin-left" />
          <div className="text-sm text-zinc-400 font-medium">
            © 2026 UniCore 360 Operations Hub. Built for PAF IT3030.
          </div>
          <div className="flex gap-6">
            <Bell size={20} className="text-zinc-400 hover:text-blue-600 cursor-pointer transition-colors" />
            <ShieldCheck size={20} className="text-zinc-400 hover:text-blue-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}