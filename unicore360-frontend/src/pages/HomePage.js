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
  Wrench,
  LayoutDashboard,
  Users,
  BarChart3
} from 'lucide-react';

// Unified Logo Component to match LoginPage
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
      <span className="text-xl font-black tracking-tighter text-blue-900 uppercase">UniCore</span>
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-amber-600">360</span>
        <GraduationCap size={14} className="text-amber-600 -rotate-12" />
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="p-8 rounded-3xl bg-white border border-zinc-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-2">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-amber-100 selection:text-amber-900">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-zinc-600 hover:text-blue-700 transition-colors">Modules</a>
            <a href="#roles" className="text-sm font-bold text-zinc-600 hover:text-blue-700 transition-colors">Roles</a>
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              System Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 mb-6">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Campus Management</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-zinc-900 leading-[0.9] tracking-tighter mb-8">
              Everything Campus. <br />
              <span className="text-blue-800">One Core.</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-lg mb-10 leading-relaxed">
              UniCore 360 is the centralized nervous system for university operations. 
              Automate facility bookings, manage technical incidents, and track assets with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all group"
              >
                Launch Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
                View Documentation
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:ml-auto"
          >
            <div className="relative z-10 w-full max-w-md aspect-square bg-gradient-to-br from-blue-900 to-blue-700 rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
              <div className="relative h-full flex flex-col justify-end p-10 text-white">
                <BarChart3 size={40} className="mb-4 text-amber-400" />
                <h4 className="text-3xl font-black leading-tight mb-2">Real-time <br />Asset Tracking</h4>
                <p className="text-blue-100 text-sm opacity-80">Monitoring 2,400+ campus resources across 12 departments.</p>
              </div>
            </div>
            {/* Decorative Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Current Status</div>
                  <div className="text-sm font-black text-zinc-800">System Fully Operational</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section id="features" className="py-24 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tight">System Modules</h2>
            <p className="text-zinc-500">Purpose-built for the PAF IT3030 Smart Campus framework.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Building2}
              title="Asset Catalogue"
              desc="Centralized database for lecture halls, labs, and equipment with detailed availability status."
              delay={0.1}
            />
            <FeatureCard 
              icon={CalendarDays}
              title="Smart Bookings"
              desc="Advanced conflict-checking logic ensuring zero overlaps for room and equipment reservations."
              delay={0.2}
            />
            <FeatureCard 
              icon={Wrench}
              title="Maintenance Hub"
              desc="Technician workflow for incident reporting, status updates, and photographic evidence."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section id="roles" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[3rem] overflow-hidden relative p-12 lg:p-20 text-white">
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6">Designed for Every <br />Stakeholder</h2>
                <div className="space-y-6">
                  {[
                    { title: "Students & Staff", desc: "Request resources and report maintenance issues effortlessly.", icon: Users },
                    { title: "Technicians", desc: "View assigned tickets and update maintenance progress in real-time.", icon: Wrench },
                    { title: "Administrators", desc: "Full control over users, asset categories, and global analytics.", icon: ShieldCheck }
                  ].map((role, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-800/50 flex items-center justify-center">
                        <role.icon size={20} className="text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{role.title}</h4>
                        <p className="text-blue-200/60 text-sm leading-relaxed">{role.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-2 shadow-2xl">
                <div className="bg-blue-900/40 rounded-2xl p-8">
                   <LayoutDashboard size={48} className="text-white/20 mb-6" />
                   <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                      <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                      <div className="h-20 w-full bg-white/5 rounded-xl mt-6" />
                   </div>
                   <Link to="/login" className="mt-8 w-full py-4 bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-all">
                      Access Your Role
                      <ArrowRight size={18} />
                   </Link>
                </div>
              </div>
            </div>
            {/* Decorative background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo className="scale-90 origin-left" />
          <p className="text-zinc-400 text-sm font-medium">
            © 2026 UniCore 360 Operations Hub. Built for PAF IT3030.
          </p>
          <div className="flex gap-6 text-zinc-400">
            <ShieldCheck size={20} className="hover:text-blue-600 cursor-pointer transition-colors" />
            <Ticket size={20} className="hover:text-blue-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}