import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopNavProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export default function TopNav({ title, onBack, showBack = true, rightAction }: TopNavProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 pt-12 z-40 sticky top-0"
      style={{ background: 'var(--bg)', transition: 'background-color 0.3s ease' }}>
      <div className="w-10">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center border-0 cursor-pointer"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      <h1 className="text-lg font-bold flex-1 text-center" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h1>

      <div className="w-10 flex justify-end">
        {rightAction}
      </div>
    </div>
  );
}
