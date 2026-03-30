import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -20 },
};

export default function AuthScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/closet');
    }, 1200);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: 'var(--bg)' }}
      variants={variants} initial="initial" animate="animate" exit="exit"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Sign in to sync your sustainable closet</p>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
            <input type="email" placeholder="Email Address" required
              className="flex-1 border-0 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <Lock className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
            <input type="password" placeholder="Password" required
              className="flex-1 border-0 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text-primary)' }} />
          </div>

          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-semibold text-sm mt-4 cursor-pointer border-0"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
            <LogIn className="w-5 h-5" /> {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-tertiary)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)' }}>Sign up</a>
        </p>
      </div>
    </motion.div>
  );
}
