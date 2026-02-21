import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export type RewardType = 
  | 'discount-7'
  | 'discount-10'
  | '3d-kitchen'
  | 'spin-again'
  | 'voucher-500'
  | 'voucher-1000';

interface RewardWheelProps {
  onComplete: (reward: RewardType) => void;
}

const REWARDS: { type: RewardType; labelAr: string; labelFr: string; color: string }[] = [
  { type: 'discount-7', labelAr: 'خصم 7%', labelFr: 'Remise 7%', color: '#8B7355' },
  { type: 'discount-10', labelAr: 'خصم 10%', labelFr: 'Remise 10%', color: '#2C2C2C' },
  { type: '3d-kitchen', labelAr: '3D للمطبخ', labelFr: 'Étude 3D cuisine', color: '#D4AF78' },
  { type: 'spin-again', labelAr: 'أعد الدوران', labelFr: 'Retournez!', color: '#6B5A4D' },
  { type: 'voucher-500', labelAr: 'قسيمة 500 DH', labelFr: 'Bon 500 DH', color: '#A68968' },
  { type: 'voucher-1000', labelAr: 'قسيمة 1000 DH', labelFr: 'Bon 1000 DH', color: '#3D3D3D' },
];

export function RewardWheel({ onComplete }: RewardWheelProps) {
  const { language, t } = useLanguage();
  const { playSound } = useSoundEffects();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const spinSoundIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    playSound('click');
    setIsSpinning(true);

    // Random selection
    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    const selectedReward = REWARDS[randomIndex];
    
    // Calculate rotation with overshoot for bounce effect
    const segmentAngle = 360 / REWARDS.length;
    const baseRotation = 1800 + (randomIndex * segmentAngle); // 5 rotations + target
    const overshoot = 25; // Degrees to overshoot before bouncing back
    
    // Play spinning sound repeatedly
    let frequency = 150; // Start with low frequency
    spinSoundIntervalRef.current = setInterval(() => {
      playSound('spin');
      frequency += 5; // Gradually increase pitch as it slows down
    }, 80); // Play sound every 80ms
    
    // Animate with keyframes: fast start -> slow down -> overshoot -> bounce back
    setRotation(baseRotation + overshoot);
    
    // Stop spinning sound and bounce back to final position
    setTimeout(() => {
      if (spinSoundIntervalRef.current) {
        clearInterval(spinSoundIntervalRef.current);
      }
      playSound('bounce'); // 🏀 صوت الارتداد
      setRotation(baseRotation);
    }, 4200);

    // Wait 2 seconds after stopping, then show reward box
    setTimeout(() => {
      playSound('submit');
      onComplete(selectedReward.type);
    }, 6700); // 4200ms spin + 500ms settle + 2000ms wait = 6700ms
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      {/* Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold text-white">
          {language === 'ar' ? '🎁 احصل على هديتك!' : '🎁 Obtenez votre cadeau!'}
        </h2>
        <p className="text-white/80">
          {language === 'ar' ? 'أدر العجلة واكتشف عرضك الحصري' : 'Tournez la roue et découvrez votre offre exclusive'}
        </p>
      </motion.div>

      {/* Wheel Container */}
      <div className="relative">
        {/* Arrow Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path 
              d="M18 4 L25 18 L18 16 L11 18 Z" 
              fill="#8B6A4E"
              stroke="#6B5A4D"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Wooden Wheel - Tree Trunk Cross Section */}
        <motion.div
          className="relative w-80 h-80"
          animate={{ rotate: rotation }}
          transition={{ 
            duration: isSpinning && rotation > 100 ? 4.2 : 0.8,
            ease: isSpinning && rotation > 100 ? [0.25, 0.46, 0.45, 0.94] : [0.34, 1.56, 0.64, 1]
          }}
          style={{ transformOrigin: 'center' }}
        >
          {/* Main wooden disc */}
          <div className="absolute inset-0 rounded-full overflow-hidden" style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <svg width="320" height="320" viewBox="0 0 320 320">
              <defs>
                {/* Natural wood grain gradient with variations */}
                <radialGradient id="woodGrain" cx="48%" cy="52%">
                  <stop offset="0%" stopColor="#F4E4C1" />
                  <stop offset="15%" stopColor="#E8D4A8" />
                  <stop offset="30%" stopColor="#DCC799" />
                  <stop offset="45%" stopColor="#D2B48C" />
                  <stop offset="60%" stopColor="#C8A882" />
                  <stop offset="75%" stopColor="#B8956F" />
                  <stop offset="90%" stopColor="#A0826D" />
                  <stop offset="100%" stopColor="#8B7355" />
                </radialGradient>

                {/* Organic tree rings with irregular spacing */}
                <pattern id="treeRings" x="0" y="0" width="320" height="320" patternUnits="userSpaceOnUse">
                  {/* Outer rings - wider spacing */}
                  <ellipse cx="158" cy="162" rx="152" ry="150" fill="none" stroke="#7A6047" strokeWidth="3.5" opacity="0.45" />
                  <ellipse cx="159" cy="161" rx="146" ry="144" fill="none" stroke="#6B5A4D" strokeWidth="2" opacity="0.25" />
                  <ellipse cx="157" cy="163" rx="138" ry="136" fill="none" stroke="#8B7355" strokeWidth="4" opacity="0.5" />
                  <ellipse cx="160" cy="160" rx="130" ry="128" fill="none" stroke="#967259" strokeWidth="2.5" opacity="0.3" />
                  
                  {/* Middle rings - tighter */}
                  <ellipse cx="158" cy="161" rx="120" ry="119" fill="none" stroke="#8B7355" strokeWidth="3" opacity="0.4" />
                  <ellipse cx="161" cy="159" rx="110" ry="108" fill="none" stroke="#A0826D" strokeWidth="2" opacity="0.3" />
                  <ellipse cx="159" cy="162" rx="98" ry="97" fill="none" stroke="#8B7355" strokeWidth="3.5" opacity="0.45" />
                  <ellipse cx="160" cy="160" rx="88" ry="86" fill="none" stroke="#7A6047" strokeWidth="2" opacity="0.35" />
                  
                  {/* Inner rings - very tight */}
                  <ellipse cx="161" cy="161" rx="76" ry="75" fill="none" stroke="#8B7355" strokeWidth="4" opacity="0.5" />
                  <ellipse cx="159" cy="159" rx="64" ry="63" fill="none" stroke="#6B5A4D" strokeWidth="2.5" opacity="0.4" />
                  <ellipse cx="160" cy="162" rx="52" ry="51" fill="none" stroke="#8B7355" strokeWidth="3" opacity="0.45" />
                  <ellipse cx="158" cy="160" rx="40" ry="39" fill="none" stroke="#7A6047" strokeWidth="2.5" opacity="0.4" />
                  <ellipse cx="161" cy="161" rx="28" ry="27" fill="none" stroke="#6B5A4D" strokeWidth="3" opacity="0.5" />
                  <ellipse cx="160" cy="159" rx="18" ry="17" fill="none" stroke="#5D4E41" strokeWidth="2" opacity="0.45" />
                </pattern>

                {/* Wood texture noise */}
                <filter id="woodTexture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" />
                  <feColorMatrix type="saturate" values="0.3"/>
                  <feComponentTransfer>
                    <feFuncA type="discrete" tableValues="0 0.05"/>
                  </feComponentTransfer>
                  <feBlend in="SourceGraphic" mode="multiply"/>
                </filter>

                {/* 3D depth shadow */}
                <filter id="woodShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
                  <feOffset dx="0" dy="6" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Inner shadow for depth */}
                <radialGradient id="innerShadow">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="85%" stopColor="transparent" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                </radialGradient>
              </defs>

              {/* Base wooden circle with gradient */}
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="url(#woodGrain)"
                filter="url(#woodShadow)"
              />

              {/* Wood texture overlay */}
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="url(#woodGrain)"
                filter="url(#woodTexture)"
                opacity="0.6"
              />

              {/* Tree rings overlay */}
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="url(#treeRings)"
              />

              {/* Natural wood cracks */}
              <path 
                d="M160 10 Q162 60, 165 110 T160 156" 
                stroke="#5D4E41" 
                strokeWidth="1.5" 
                fill="none" 
                opacity="0.3"
              />
              <path 
                d="M310 160 Q260 158, 210 162 T160 160" 
                stroke="#5D4E41" 
                strokeWidth="1" 
                fill="none" 
                opacity="0.25"
              />

              {/* Outer bark edge - irregular */}
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="none" 
                stroke="#5D4E41" 
                strokeWidth="6"
                opacity="0.8"
                strokeDasharray="2,1"
              />
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="none" 
                stroke="#6B5A4D" 
                strokeWidth="3"
                opacity="0.5"
              />

              {/* Inner shadow overlay */}
              <circle 
                cx="160" 
                cy="160" 
                r="156" 
                fill="url(#innerShadow)"
              />

              {/* Section dividers - natural grain lines */}
              {REWARDS.map((reward, index) => {
                const angle = (360 / REWARDS.length) * index - 90;
                const startAngle = angle * (Math.PI / 180);
                
                const innerRadius = 50;
                const outerRadius = 152;
                
                const x1 = 160 + Math.cos(startAngle) * innerRadius;
                const y1 = 160 + Math.sin(startAngle) * innerRadius;
                const x2 = 160 + Math.cos(startAngle) * outerRadius;
                const y2 = 160 + Math.sin(startAngle) * outerRadius;
                
                return (
                  <g key={reward.type}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#5D4E41"
                      strokeWidth="2"
                      opacity="0.35"
                    />
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#4A3F35"
                      strokeWidth="1"
                      opacity="0.2"
                      strokeDasharray="3,2"
                    />
                  </g>
                );
              })}

              {/* Natural knots (wood imperfections) */}
              <ellipse cx="220" cy="100" rx="8" ry="6" fill="#5D4E41" opacity="0.4" />
              <ellipse cx="220" cy="100" rx="5" ry="4" fill="#4A3F35" opacity="0.6" />
              <ellipse cx="95" cy="230" rx="6" ry="7" fill="#6B5A4D" opacity="0.35" />
              <ellipse cx="95" cy="230" rx="3" ry="4" fill="#5D4E41" opacity="0.5" />
              <ellipse cx="240" cy="220" rx="5" ry="5" fill="#5D4E41" opacity="0.3" />

              {/* Center heartwood (darker center) */}
              <circle cx="160" cy="160" r="54" fill="#C19A6B" opacity="0.9" />
              <circle cx="160" cy="160" r="50" fill="#B8956F" opacity="0.85" />
              <circle cx="160" cy="160" r="44" fill="#A0826D" opacity="0.8" />
              <circle cx="160" cy="160" r="38" fill="#8B7355" opacity="0.75" />
              
              {/* Center decorative circles */}
              <circle cx="160" cy="160" r="36" fill="#8B7355" opacity="0.95" />
              <circle cx="160" cy="160" r="32" fill="#A68968" opacity="0.9" />
              <circle cx="160" cy="160" r="28" fill="#C19A6B" opacity="0.85" />
              <circle cx="160" cy="160" r="24" fill="#8B7355" opacity="0.8" />
            </svg>

            {/* Reward Labels positioned on wood */}
            <div className="absolute inset-0">
              {REWARDS.map((reward, index) => {
                const angle = (360 / REWARDS.length) * index;
                const radius = 105;
                const x = 160 + Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = 160 + Math.sin((angle - 90) * Math.PI / 180) * radius;

                return (
                  <div
                    key={reward.type}
                    className="absolute text-center pointer-events-none"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      width: '85px',
                    }}
                  >
                    <div 
                      className="font-bold text-xs px-3 py-2.5 rounded-lg leading-tight"
                      style={{
                        color: '#FFFFFF',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        backgroundColor: reward.color,
                        border: '2.5px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)',
                      }}
                    >
                      {language === 'ar' ? reward.labelAr : reward.labelFr}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Realistic floating shadow */}
          <div 
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
              transform: 'translateY(14px) scale(0.9)',
              filter: 'blur(10px)',
            }}
          />
        </motion.div>
      </div>

      {/* Spin Button */}
      {!isSpinning && (
        <motion.button
          onClick={handleSpin}
          className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'ar' ? 'أدر العجلة' : 'Tourner'}
        </motion.button>
      )}

      {isSpinning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full font-medium text-gray-700 border-2 border-amber-200"
        >
          {language === 'ar' ? 'جاري الدوران...' : 'En cours...'}
        </motion.div>
      )}
    </div>
  );
}