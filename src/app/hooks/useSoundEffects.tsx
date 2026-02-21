import { useCallback, useEffect, useRef, useState } from 'react';

type SoundType = 'click' | 'success' | 'error' | 'step' | 'submit' | 'blue' | 'green' | 'red' | 'gray' | 'spin' | 'bounce';

interface SoundEffectsHook {
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export function useSoundEffects(): SoundEffectsHook {
  const [isMuted, setIsMuted] = useState(() => {
    // Check localStorage, default to FALSE (sound ON)
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('soundMuted');
      return saved ? JSON.parse(saved) : false; // الصوت مفعل بشكل افتراضي
    } catch {
      return false;
    }
  });

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Web Audio API context
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('soundMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  const playBeep = useCallback((frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    if (isMuted || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    // Resume context if suspended (required by modern browsers)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => {
        console.log('🔇 Failed to resume audio context:', err);
      });
    }

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Smooth fade out to avoid clicks
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (err) {
      console.log('🔇 Failed to play sound:', err);
    }
  }, [isMuted]);

  const playSound = useCallback((type: SoundType) => {
    switch (type) {
      case 'click':
        // صوت نقرة خفيف
        playBeep(800, 0.05, 'sine');
        break;

      case 'step':
        // صوت انتقال للخطوة التالية - نغمة صاعدة
        playBeep(600, 0.1, 'sine');
        setTimeout(() => playBeep(800, 0.1, 'sine'), 80);
        break;

      case 'success':
        // صوت نجاح - 3 نغمات صاعدة
        playBeep(523, 0.1, 'sine'); // C
        setTimeout(() => playBeep(659, 0.1, 'sine'), 100); // E
        setTimeout(() => playBeep(784, 0.15, 'sine'), 200); // G
        break;

      case 'error':
        // صوت خطأ - نغمة هابطة
        playBeep(400, 0.15, 'square');
        setTimeout(() => playBeep(300, 0.2, 'square'), 100);
        break;

      case 'submit':
        // صوت إرسال ناجح - نغمات احتفالية
        playBeep(523, 0.1, 'sine');
        setTimeout(() => playBeep(659, 0.1, 'sine'), 100);
        setTimeout(() => playBeep(784, 0.1, 'sine'), 200);
        setTimeout(() => playBeep(1047, 0.2, 'sine'), 300);
        break;

      case 'blue':
        // 🔵 صوت للون الأزرق - الخطوة الحالية
        playBeep(440, 0.08, 'sine'); // A4
        break;

      case 'green':
        // ✅ صوت للون الأخضر - خطوة صحيحة
        playBeep(523, 0.08, 'sine'); // C5
        break;

      case 'red':
        // 🔴 صوت للون الأحمر - خطوة خاطئة
        playBeep(392, 0.1, 'sine'); // G4
        break;

      case 'gray':
        // ⚫ صوت للون الرمادي - لم يتم الوصول
        playBeep(330, 0.08, 'sine'); // E4
        break;

      case 'spin':
        // 🌀 صوت دوران
        playBeep(440, 0.05, 'triangle'); // A4
        break;

      case 'bounce':
        // 🏀 صوت ركلة
        playBeep(440, 0.05, 'square'); // A4
        break;
    }
  }, [playBeep]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    playSound,
    isMuted,
    toggleMute
  };
}