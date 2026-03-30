import { motion } from 'framer-motion';

interface BadgeProps {
  id: string;
  name: string;
  icon: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export default function Badge({ name, icon, desc, unlocked }: BadgeProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center relative"
      whileHover={unlocked ? { y: -2 } : {}}
      style={{ opacity: unlocked ? 1 : 0.5, filter: unlocked ? 'none' : 'grayscale(1)' }}
      title={desc}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 relative"
        style={{
          background: unlocked ? 'var(--bg-card)' : 'var(--bg)',
          border: unlocked ? '2px solid var(--primary)' : '2px dashed var(--border)',
          boxShadow: unlocked ? '0 4px 12px rgba(34,166,113,0.15)' : 'none'
        }}
      >
        {icon}
        {unlocked && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center" style={{ color: 'var(--primary)' }}>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
      </div>
      <span className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>{name}</span>
    </motion.div>
  );
}
