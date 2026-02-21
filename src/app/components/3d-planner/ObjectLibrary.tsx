import { ObjectItem } from './KitchenPlanner3D';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation, getObjectName, getCategoryName } from './translations';

interface ObjectLibraryProps {
  items: ObjectItem[];
  onAddObject: (item: ObjectItem) => void;
  mobile?: boolean;
}

export function ObjectLibrary({ items, onAddObject, mobile = false }: ObjectLibraryProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ObjectItem[]>);

  const categoryIcons = {
    appliances: '🔌',
    cabinets: '📦',
    furniture: '🪑'
  };

  if (mobile) {
    return (
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category}>
            <h3 className={`text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
              {categoryIcons[category as keyof typeof categoryIcons]} {getCategoryName(language, category)}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {categoryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onAddObject(item)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-amber-50 border-2 border-transparent hover:border-amber-500 rounded-xl transition-all active:scale-95"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {getObjectName(language, item.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`p-4 space-y-6 ${isRTL ? 'text-right' : ''}`}>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          {getKitchenTranslation(language, 'libraryTitle')}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {getKitchenTranslation(language, 'instruction1').replace('• ', '')}
        </p>
      </div>

      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            {categoryIcons[category as keyof typeof categoryIcons]} {getCategoryName(language, category)}
          </h3>
          <div className="space-y-2">
            {categoryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onAddObject(item)}
                className={`w-full flex items-center gap-3 p-3 bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-500 rounded-lg transition-all group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 group-hover:bg-amber-100 rounded-lg text-2xl">
                  {item.icon}
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="text-sm font-medium text-gray-800">
                    {getObjectName(language, item.id)}
                  </div>
                </div>
                <div className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}