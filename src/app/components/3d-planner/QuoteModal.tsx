import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation } from './translations';
import { PlacedObject } from './KitchenPlanner3D';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  objects: PlacedObject[];
  screenshot?: string;
}

export function QuoteModal({ isOpen, onClose, objects, screenshot }: QuoteModalProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare design summary
    const designSummary = {
      totalObjects: objects.length,
      objects: objects.map(obj => ({
        type: obj.item.name,
        id: obj.item.id,
        position: obj.position,
        rotation: obj.rotation
      })),
      screenshot: screenshot || null,
      timestamp: new Date().toISOString()
    };

    // TODO: Send to backend
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${isRTL ? 'text-right' : ''}`}>
        {/* Header */}
        <div className={`sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {getKitchenTranslation(language, 'requestQuote')}
            </h2>
            <p className="text-amber-100 text-sm">
              {getKitchenTranslation(language, 'quoteDescription')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {getKitchenTranslation(language, 'quoteSuccess')}
              </h3>
              <p className="text-gray-600">
                {getKitchenTranslation(language, 'quoteSuccessMessage')}
              </p>
            </div>
          ) : (
            <>
              {/* Design Summary */}
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className={`text-sm font-semibold text-amber-900 mb-2 ${isRTL ? 'text-right' : ''}`}>
                  {getKitchenTranslation(language, 'designSummary')}
                </h3>
                <p className={`text-sm text-amber-700 ${isRTL ? 'text-right' : ''}`}>
                  {objects.length} {objects.length === 1 ? getKitchenTranslation(language, 'objectCount') : getKitchenTranslation(language, 'objectsCount')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                    {getKitchenTranslation(language, 'fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    placeholder={getKitchenTranslation(language, 'namePlaceholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                    {getKitchenTranslation(language, 'email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    placeholder={getKitchenTranslation(language, 'emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                    {getKitchenTranslation(language, 'phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                    placeholder={getKitchenTranslation(language, 'phonePlaceholder')}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'text-right' : ''}`}>
                    {getKitchenTranslation(language, 'additionalNotes')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${isRTL ? 'text-right' : ''}`}
                    placeholder={getKitchenTranslation(language, 'notesPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {getKitchenTranslation(language, 'sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {getKitchenTranslation(language, 'sendRequest')}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}