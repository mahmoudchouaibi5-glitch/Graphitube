import { useSoundEffects } from '../hooks/useSoundEffects';

interface SoundCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  soundType?: 'click' | 'step' | 'success';
  selected?: boolean;
}

export function SoundCard({ 
  children, 
  onClick, 
  className = '',
  soundType = 'click',
  selected = false
}: SoundCardProps) {
  const { playSound } = useSoundEffects();

  const handleClick = () => {
    playSound(soundType); // 🔊 صوت للبطاقة
    onClick?.();
  };

  return (
    <div 
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
}
