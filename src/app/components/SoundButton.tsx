import { Button } from './ui/button';
import { useSoundEffects } from '../hooks/useSoundEffects';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './ui/button';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    soundType?: 'click' | 'step' | 'success' | 'error' | 'submit';
  };

export function SoundButton({ 
  onClick, 
  soundType = 'click',
  ...props 
}: ButtonProps) {
  const { playSound } = useSoundEffects();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound(soundType); // 🔊 صوت للزر
    onClick?.(e);
  };

  return <Button onClick={handleClick} {...props} />;
}
