import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '0609394003';

export function WhatsAppButton() {
  const { t } = useLanguage();

  const handleClick = () => {
    window.open(`https://wa.me/212${WHATSAPP_NUMBER.slice(1)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium">{t.whatsapp.buttonText}</span>
    </button>
  );
}
