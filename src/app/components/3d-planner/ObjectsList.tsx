import { PlacedObject } from './KitchenPlanner3D';
import { Eye, EyeOff, Trash2, Copy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation, getObjectName } from './translations';

interface ObjectsListProps {
  objects: PlacedObject[];
  selectedId: number | null;
  onSelect: (timestamp: number) => void;
  onDelete: (timestamp: number) => void;
  onDuplicate: (timestamp: number) => void;
  mobile?: boolean;
}

export function ObjectsList({
  objects,
  selectedId,
  onSelect,
  onDelete,
  onDuplicate,
  mobile = false
}: ObjectsListProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  if (objects.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${isRTL ? 'text-right' : ''}`}>
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {getKitchenTranslation(language, 'noObjectsYet')}
        </h3>
        <p className="text-sm text-gray-500">
          {getKitchenTranslation(language, 'addObjectsFromLibrary')}
        </p>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col bg-white ${isRTL ? 'text-right' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="text-xl">📋</span>
          <span>{getKitchenTranslation(language, 'layers')}</span>
          <span className="ml-auto text-sm font-normal text-gray-600 bg-white px-2 py-1 rounded-full">
            {objects.length}
          </span>
        </h2>
      </div>

      {/* Objects List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {objects.map((obj, index) => {
            const isSelected = obj.timestamp === selectedId;
            
            return (
              <div
                key={obj.timestamp}
                onClick={() => onSelect(obj.timestamp)}
                className={`group relative rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`flex items-center gap-3 p-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    isSelected ? 'bg-amber-100' : 'bg-gray-50'
                  }`}>
                    {obj.item.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {getObjectName(language, obj.item.id)}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                      <span>#{objects.length - index}</span>
                      <span>•</span>
                      <span>{obj.position.x.toFixed(1)}, {obj.position.y.toFixed(1)}, {obj.position.z.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Actions - Show on hover or when selected */}
                  <div className={`flex items-center gap-1 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(obj.timestamp);
                      }}
                      className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                      title={getKitchenTranslation(language, 'duplicate')}
                    >
                      <Copy className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(obj.timestamp);
                      }}
                      className="p-1.5 hover:bg-red-100 rounded transition-colors"
                      title={getKitchenTranslation(language, 'deleteObject')}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-1 h-full bg-amber-500 rounded-l`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-lg p-2">
            <div className="text-xs text-gray-500">{getKitchenTranslation(language, 'total')}</div>
            <div className="text-lg font-bold text-gray-900">{objects.length}</div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="text-xs text-gray-500">{getKitchenTranslation(language, 'selected')}</div>
            <div className="text-lg font-bold text-amber-600">{selectedId ? '1' : '0'}</div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="text-xs text-gray-500">{getKitchenTranslation(language, 'visible')}</div>
            <div className="text-lg font-bold text-green-600">{objects.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
