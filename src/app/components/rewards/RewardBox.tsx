import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { RewardType } from './RewardWheel';

interface RewardBoxProps {
  reward: RewardType;
  onContinue: () => void;
}

const REWARD_CONTENT = {
  'discount-7': {
    titleAr: '🎉 ممتاز جداً!',
    titleFr: '🎉 Formidable!',
    rewardAr: 'خصم 7%',
    rewardFr: 'Remise de 7%',
    descAr: 'خصم 7% على المبلغ الإجمالي لمشروعك',
    descFr: 'Remise de 7% sur le montant total de votre projet',
    icon: '🎁',
  },
  'discount-10': {
    titleAr: '🎉 رائع جداً!',
    titleFr: '🎉 Fantastique!',
    rewardAr: 'خصم 10%',
    rewardFr: 'Remise de 10%',
    descAr: 'خصم 10% على المبلغ الإجمالي لمشروعك',
    descFr: 'Remise de 10% sur le montant total de votre projet',
    icon: '🏷️',
  },
  '3d-kitchen': {
    titleAr: '🎉 تهانينا!',
    titleFr: '🎉 Félicitations!',
    rewardAr: 'دراسة 3D مجانية للمطبخ',
    rewardFr: 'Étude 3D cuisine offerte',
    descAr: 'احصل على تصميم ثلاثي الأبعاد احترافي لمطبخك',
    descFr: 'Obtenez un design 3D professionnel pour votre cuisine',
    icon: '🎨',
  },
  'spin-again': {
    titleAr: '🎉 فرصة إضافية!',
    titleFr: '🎉 Nouvelle chance!',
    rewardAr: 'أعد الدوران',
    rewardFr: 'Retournez!',
    descAr: 'يمكنك إدارة العجلة مرة أخرى للحصول على عرض جديد',
    descFr: 'Vous pouvez faire tourner la roue à nouveau pour un nouveau cadeau',
    icon: '🔄',
  },
  'voucher-500': {
    titleAr: '🎉 مبروك!',
    titleFr: '🎉 Bravo!',
    rewardAr: 'قسيمة شراء 500 درهم',
    rewardFr: "Bon d'achat 500 DH",
    descAr: 'خصم فوري بقيمة 500 درهم على مشروعك',
    descFr: 'Réduction immédiate de 500 DH sur votre projet',
    icon: '💰',
  },
  'voucher-1000': {
    titleAr: '🎉 عرض استثنائي!',
    titleFr: '🎉 Offre exceptionnelle!',
    rewardAr: 'قسيمة شراء 1000 درهم',
    rewardFr: "Bon d'achat 1000 DH",
    descAr: 'خصم فوري بقيمة 1000 درهم على مشروعك',
    descFr: 'Réduction immédiate de 1000 DH sur votre projet',
    icon: '💎',
  },
};

export function RewardBox({ reward, onContinue }: RewardBoxProps) {
  const { language, dir } = useLanguage();
  const { playSound } = useSoundEffects();
  const [isOpen, setIsOpen] = useState(false);
  const content = REWARD_CONTENT[reward];

  useEffect(() => {
    // Auto-open after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      playSound('submit');
    }, 500);
    return () => clearTimeout(timer);
  }, [playSound]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4" dir={dir}>
      {/* Box Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Closed Box
            <motion.div
              key="closed-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Box Shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-2xl transform translate-y-2 blur-xl"></div>
              
              {/* Box Body */}
              <div className="relative w-64 h-64">
                {/* Box Top */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-2xl border-4 border-amber-800"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-amber-900"></div>
                </motion.div>
                
                {/* Box Bottom */}
                <div className="absolute inset-x-0 top-16 bottom-0 bg-gradient-to-b from-amber-600 to-amber-700 rounded-b-2xl border-4 border-amber-800 border-t-0">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    <Gift className="w-20 h-20 text-amber-100" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Open Box with Reward
            <motion.div
              key="open-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8 max-w-lg w-full"
            >
              {/* Sparkles Animation */}
              <div className="absolute -top-4 -right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </motion.div>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="text-8xl"
                >
                  {content.icon}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {language === 'ar' ? content.titleAr : content.titleFr}
                </motion.h2>

                {/* Reward */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6"
                >
                  <div className="text-2xl font-bold text-amber-900 mb-2">
                    {language === 'ar' ? content.rewardAr : content.rewardFr}
                  </div>
                  <div className="text-sm text-amber-700">
                    {language === 'ar' ? content.descAr : content.descFr}
                  </div>
                </motion.div>

                {/* Terms */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'العرض صالح بعد التأكيد على المشروع'
                        : "L'offre est valable après validation du projet"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'أي تغيير في الأبعاد أو المواد قد يؤثر على السعر النهائي'
                        : 'Toute modification des dimensions ou matériaux peut impacter le prix final'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'فريقنا سيتواصل معك للتأكيد'
                        : 'Notre équipe vous contactera pour confirmation'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-amber-700 font-semibold">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      {language === 'ar'
                        ? 'العرض صالح لمدة 48 ساعة'
                        : "Offre valable 48h"}
                    </span>
                  </div>
                </motion.div>

                {/* Continue Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => {
                    playSound('click');
                    onContinue();
                  }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {reward === 'spin-again'
                    ? (language === 'ar' ? 'أدر العجلة مرة أخرى 🎡' : 'Tournez à nouveau 🎡')
                    : (language === 'ar' ? 'ابدأ مشروعي 🚀' : 'Commencer mon projet 🚀')
                  }
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}