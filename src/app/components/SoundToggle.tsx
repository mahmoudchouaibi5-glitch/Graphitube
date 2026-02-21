import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';

export function SoundToggle() {
  const { isMuted, toggleMute, playSound } = useSoundEffects();

  const handleToggle = () => {
    if (isMuted) {
      // إذا كان مكتوم، شغله وشغل صوت تجريبي
      toggleMute();
      setTimeout(() => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
      }, 100);
    } else {
      toggleMute();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-50 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
      title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
      aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
