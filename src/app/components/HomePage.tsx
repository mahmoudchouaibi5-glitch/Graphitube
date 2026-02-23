import { ChefHat, Sofa, Languages, Sparkles, ArrowLeft, Gift, CheckCircle, Phone, Box } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import logoImage from 'figma:asset/6f91f3b908b32fa8844a582da8663295bc35c793.png';
import kitchenImage from 'figma:asset/b0b59150596a9ef6fe5982059890804bb97b7f84.png';
import salonImage from 'figma:asset/c64b18e48ca7eeefe0b33eb0c06482c9651e8b83.png';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { SoundCard } from './SoundCard';
import { Button } from './ui/button';

const WHATSAPP_NUMBER = '0612345678';

interface HomePageProps {
  onSelectProject: (type: 'kitchen' | 'salon') => void;
}

export function HomePage({ onSelectProject }: HomePageProps) {
  const navigate = useNavigate();
  const { t, language, setLanguage, dir } = useLanguage();
  const { playSound } = useSoundEffects();

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Graphitube" className="h-6 w-auto" />
          </div>
          <Languages
            className="cursor-pointer"
            onClick={() => {
              playSound('click');
              setLanguage(language === 'ar' ? 'fr' : 'ar');
            }}
          />
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
            <Sparkles className="w-4 h-4" />
            <span>{t.homePage.badge}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t.homePage.welcome}
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            {t.homePage.subtitle}
          </p>

          <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            {t.homePage.description}
          </p>
        </div>

        {/* عرض ترحيبي احترافي */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'عرض خاص للعملاء الجدد' : 'Offre spéciale nouveaux clients'}
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              {/* الميزة 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'ar' ? 'استشاة مجانية' : 'Consultation gratuite'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'زيارة منزلية مع مصمم متخصص' : 'Visite à domicile avec designer'}
                </p>
              </div>

              {/* الميزة 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'ar' ? 'خصم 5%' : 'Réduction 5%'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'على الطلب الأول لكل عميل جديد' : 'Sur première commande'}
                </p>
              </div>

              {/* الميزة 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {language === 'ar' ? 'تصميم 3D مجاني' : 'Design 3D gratuit'}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'لرؤية مشروعك قبل التنفيذ' : 'Visualisez avant réalisation'}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800">
                <Phone className="w-5 h-5" />
                <p className="text-sm font-medium">
                  {language === 'ar' 
                    ? 'العرض ساري حتى نهاية فبراير 2026' 
                    : 'Offre valable jusqu\'à fin février 2026'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* 3D Kitchen Planner Card */}
          <SoundCard
            className="group cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 overflow-hidden hover:shadow-xl rounded-xl"
            onClick={() => {
              playSound('click');
              navigate('/kitchen-planner');
            }}
            soundType="click"
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <Box className="w-24 h-24 text-white/20" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full`}>
                <span className="text-xs font-bold text-blue-600">NEW 3D</span>
              </div>
              <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm p-3 rounded-full`}>
                <ChefHat className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? '🎨 مصمم المطبخ 3D' : '🎨 Kitchen Planner 3D'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'صمم مطبخك بنفسك باستخدام مصممنا ثلاثي الأبعاد التفاعلي'
                  : 'Concevez votre cuisine avec notre planificateur 3D interactif'}
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {language === 'ar' ? 'ابدأ التصميم' : 'Commencer'}
                <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </div>
          </SoundCard>
          
          {/* Kitchen Wizard Card */}
          <SoundCard
            className="group cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-all duration-300 overflow-hidden hover:shadow-xl rounded-xl"
            onClick={() => {
              playSound('click');
              navigate('/المطبخ/معلومات-العميل');
            }}
            soundType="click"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={kitchenImage}
                alt={language === 'ar' ? 'طلب عرض أسعار مطبخ' : 'Demande devis cuisine'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm p-3 rounded-full`}>
                <ChefHat className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? '🍳 طلب مطبخ' : '🍳 Demande cuisine'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar'
                  ? 'احصل على عرض سعر مخصص لمطبخك من خلال الإجابة على أسئلة بسيطة'
                  : 'Obtenez un devis personnalisé pour votre cuisine en répondant à quelques questions'}
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                {language === 'ar' ? 'ابدأ الطلب' : 'Commencer'}
                <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </div>
          </SoundCard>
          
          {/* Salon Card */}
          <SoundCard
            className="group cursor-pointer border-2 border-gray-200 hover:border-amber-500 transition-all duration-300 overflow-hidden hover:shadow-xl rounded-xl"
            onClick={() => {
              playSound('click');
              onSelectProject('salon');
              navigate('/الصالون/معلومات-العميل');
            }}
            soundType="click"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={salonImage}
                alt={t.homePage.salonTitle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm p-3 rounded-full`}>
                <Sofa className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.homePage.salonTitle}</h3>
              <p className="text-gray-600 mb-4">
                {t.homePage.salonDescription}
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                {t.homePage.salonButton}
                <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
              </Button>
            </div>
          </SoundCard>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-sm text-blue-900 leading-relaxed">
            {t.homePage.infoNotice}
            <br />
            {t.homePage.whatsappContact}{' '}
            <a
              href={`https://wa.me/212${WHATSAPP_NUMBER.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700 hover:text-blue-900 underline"
            >
              واتساب {WHATSAPP_NUMBER}
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 bg-white/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            {t.homePage.footerCopyright}
          </p>
        </div>
      </footer>
    </div>
  );
}