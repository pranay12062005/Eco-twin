import { Leaf, AlertCircle, Hand } from 'lucide-react';

interface ScoreBarProps {
  score: number;
}

export default function ScoreBar({ score }: ScoreBarProps) {
  let colorVar = 'var(--primary)';
  let Icon = Leaf;
  let label = 'Excellent';

  if (score < 40) {
    colorVar = 'var(--danger)';
    Icon = Hand;
    label = 'Poor';
  } else if (score < 70) {
    colorVar = '#F5A623'; // Amber
    Icon = AlertCircle;
    label = 'Fair';
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-semibold flex items-center gap-1" style={{ color: colorVar }}>
          <Icon className="w-3 h-3" /> {label}
        </span>
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
          {score}/100
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.max(5, score)}%`, background: colorVar }}
        />
      </div>
    </div>
  );
}
