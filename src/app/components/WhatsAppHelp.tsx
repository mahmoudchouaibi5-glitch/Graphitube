import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '0609394003';

interface WhatsAppHelpProps {
  stepName?: string;
}

export function WhatsAppHelp({ stepName }: WhatsAppHelpProps) {
  const { t, dir } = useLanguage();

  const message = stepName 
    ? t.whatsapp.helpTemplate.replace('{stepName}', stepName)
    : t.whatsapp.generalHelpTemplate;
    
  const whatsappUrl = `https://wa.me/212${WHATSAPP_NUMBER.slice(1)}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg" dir={dir}>
      <div className="flex items-start gap-3">
        <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-900 mb-1">{t.whatsapp.needHelp}</h4>
          <p className="mb-2 leading-relaxed">
            {t.whatsapp.helpMessage}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20BA5A] transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.whatsapp.buttonText}: {WHATSAPP_NUMBER}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
