import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, BarChart3, ScanLine, Activity, User, Settings, LogOut, ChevronRight } from 'lucide-react';

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -20 },
};

export default function ProfileScreen() {
  const navigate = useNavigate();
  return (
    <motion.div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}
      variants={variants} initial="initial" animate="animate" exit="exit">
      <div className="flex-1 overflow-y-auto px-5 pt-12 pb-24">
        {/* Avatar */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 overflow-hidden" style={{ borderColor: 'var(--primary)' }}>
            <img src="https://ui-avatars.com/api/?name=Alex+Green&background=random&color=fff&size=128" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Alex Green</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sustainability Enthusiast</p>
        </div>

        {/* Settings Link */}
        <div className="rounded-xl overflow-hidden mb-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
          <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--text-primary)' }}>
            <Settings className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <span className="flex-1 text-left text-sm font-medium">Settings</span>
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>

        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3.5 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--danger)' }}>
            <LogOut className="w-5 h-5" />
            <span className="flex-1 text-left text-sm font-medium">Log Out</span>
          </button>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-tertiary)' }}>Eco-Twin App v7.0.0</p>
      </div>

      <nav className="flex items-center justify-around py-2 px-4 border-t fixed bottom-0 left-0 right-0" style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(24px)', borderColor: 'var(--border-light)' }}>
        <button onClick={() => navigate('/closet')} className="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><Home className="w-5 h-5" /><span className="text-[10px] font-semibold">Closet</span></button>
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><BarChart3 className="w-5 h-5" /><span className="text-[10px] font-semibold">Stats</span></button>
        <button className="w-14 h-14 -mt-6 rounded-full flex items-center justify-center border-0 cursor-pointer text-white" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 4px 20px rgba(34,166,113,0.4)' }}><ScanLine className="w-6 h-6" /></button>
        <button className="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><Activity className="w-5 h-5" /><span className="text-[10px] font-semibold">Scan</span></button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer" style={{ color: 'var(--primary)' }}><User className="w-5 h-5" /><span className="text-[10px] font-semibold">Profile</span></button>
      </nav>
    </motion.div>
  );
}
