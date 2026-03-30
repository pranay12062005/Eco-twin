import { motion } from 'framer-motion';
import { Leaf, ArrowRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center px-10"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, rgba(34,166,113,0.06) 50%, rgba(34,166,113,0.12) 100%)' }}
      variants={variants} initial="initial" animate="animate" exit="exit"
    >
      <motion.div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 8px 32px rgba(34,166,113,0.35)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Leaf className="w-10 h-10 text-white" />
      </motion.div>

      <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
        Eco<span style={{ color: 'var(--primary)' }}>Twin</span>
      </h1>
      <p className="text-sm mb-12 max-w-[260px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Your AI-powered sustainable fashion companion. Know the impact of every piece you wear.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-[280px]">
        <button
          onClick={() => navigate('/closet')}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white font-semibold text-sm cursor-pointer border-0"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 4px 16px rgba(34,166,113,0.3)' }}
        >
          <ArrowRight className="w-5 h-5" /> Get Started
        </button>
        <button
          onClick={() => navigate('/auth')}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm cursor-pointer"
          style={{ background: 'var(--bg-card)', color: 'var(--primary)', border: '1.5px solid var(--border)', boxShadow: '0 1px 3px rgba(20,112,73,0.06)' }}
        >
          <LogIn className="w-5 h-5" /> Sign In
        </button>
      </div>
    </motion.div>
  );
}
