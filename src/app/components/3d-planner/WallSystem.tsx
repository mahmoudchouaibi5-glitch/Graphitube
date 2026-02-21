import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation } from './translations';
import { Plus, Minus, Grid3x3, Maximize2 } from 'lucide-react';

export interface RoomDimensions {
  width: number;  // meters
  depth: number;  // meters
  height: number; // meters
}

export interface Wall {
  id: string;
  position: 'front' | 'back' | 'left' | 'right';
  hasWindow: boolean;
  hasDoor: boolean;
}

interface WallSystemProps {
  dimensions: RoomDimensions;
  walls: Wall[];
  onDimensionsChange: (dimensions: RoomDimensions) => void;
  onWallToggle: (wallId: string, type: 'window' | 'door') => void;
  mobile?: boolean;
}

export function WallSystem({
  dimensions,
  walls,
  onDimensionsChange,
  onWallToggle,
  mobile = false
}: WallSystemProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  const handleDimensionChange = (key: keyof RoomDimensions, delta: number) => {
    const newValue = Math.max(2, Math.min(10, dimensions[key] + delta));
    onDimensionsChange({
      ...dimensions,
      [key]: newValue
    });
  };

  const wallLabels: Record<string, string> = {
    front: getKitchenTranslation(language, 'wallFront'),
    back: getKitchenTranslation(language, 'wallBack'),
    left: getKitchenTranslation(language, 'wallLeft'),
    right: getKitchenTranslation(language, 'wallRight'),
  };

  return (
    <div className={`bg-white rounded-lg ${mobile ? '' : 'shadow-lg border border-gray-200'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className={`text-lg font-bold text-gray-800 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Grid3x3 className="w-5 h-5 text-amber-600" />
          {getKitchenTranslation(language, 'roomSettings')}
        </h3>
      </div>

      {/* Room Dimensions */}
      <div className="p-4 space-y-4">
        <div>
          <h4 className={`text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <Maximize2 className="w-4 h-4" />
            {getKitchenTranslation(language, 'roomDimensions')}
          </h4>
          
          {/* Width */}
          <div className={`mb-3 ${isRTL ? 'text-right' : ''}`}>
            <label className="text-xs text-gray-600 mb-1 block">
              {getKitchenTranslation(language, 'width')} (m)
            </label>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleDimensionChange('width', -0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center font-mono font-semibold text-gray-800">
                {dimensions.width.toFixed(1)}m
              </div>
              <button
                onClick={() => handleDimensionChange('width', 0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Depth */}
          <div className={`mb-3 ${isRTL ? 'text-right' : ''}`}>
            <label className="text-xs text-gray-600 mb-1 block">
              {getKitchenTranslation(language, 'depth')} (m)
            </label>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleDimensionChange('depth', -0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center font-mono font-semibold text-gray-800">
                {dimensions.depth.toFixed(1)}m
              </div>
              <button
                onClick={() => handleDimensionChange('depth', 0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Height */}
          <div className={`${isRTL ? 'text-right' : ''}`}>
            <label className="text-xs text-gray-600 mb-1 block">
              {getKitchenTranslation(language, 'height')} (m)
            </label>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => handleDimensionChange('height', -0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-center font-mono font-semibold text-gray-800">
                {dimensions.height.toFixed(1)}m
              </div>
              <button
                onClick={() => handleDimensionChange('height', 0.1)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Walls */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className={`text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right' : ''}`}>
            {getKitchenTranslation(language, 'walls')}
          </h4>
          <div className="space-y-2">
            {walls.map(wall => (
              <div 
                key={wall.id}
                className={`p-3 bg-gray-50 rounded-lg ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`text-xs font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : ''}`}>
                  {wallLabels[wall.position]}
                </div>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => onWallToggle(wall.id, 'window')}
                    className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                      wall.hasWindow
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    🪟 {getKitchenTranslation(language, 'window')}
                  </button>
                  <button
                    onClick={() => onWallToggle(wall.id, 'door')}
                    className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                      wall.hasDoor
                        ? 'bg-green-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    🚪 {getKitchenTranslation(language, 'door')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
