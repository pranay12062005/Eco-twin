import { Home, BarChart3, ScanLine, Activity, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const NavButton = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const active = path === to;
    return (
      <button
        onClick={() => navigate(to)}
        className="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer transition-colors"
        style={{ color: active ? 'var(--primary)' : 'var(--text-tertiary)' }}
      >
        <Icon className="w-5 h-5" />
        <span className="text-[10px] font-semibold">{label}</span>
      </button>
    );
  };

  return (
    <nav className="flex items-center justify-around py-2 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] fixed bottom-0 left-0 right-0 z-50 transition-colors"
      style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(24px)', borderTop: '1px solid var(--border-light)' }}>
      <NavButton to="/closet" icon={Home} label="Closet" />
      <NavButton to="/dashboard" icon={BarChart3} label="Stats" />

      {/* Center Scan FAB */}
      <button
        onClick={() => navigate('/scan')}
        className="w-14 h-14 -mt-6 rounded-full flex items-center justify-center border-0 cursor-pointer text-white relative group"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          boxShadow: '0 4px 20px rgba(34,166,113,0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <ScanLine className="w-6 h-6" />
      </button>

      <NavButton to="/scan" icon={Activity} label="Scan" />
      <NavButton to="/profile" icon={User} label="Profile" />
    </nav>
  );
}
