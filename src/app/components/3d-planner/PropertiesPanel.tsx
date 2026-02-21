import { PlacedObject } from './KitchenPlanner3D';
import { X, Trash2, Move, RotateCw, Maximize2, Palette, Ruler, Copy, Library, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation, getObjectName, getCategoryName } from './translations';
import { useState } from 'react';

interface PropertiesPanelProps {
  object: PlacedObject;
  onUpdate: (updates: Partial<PlacedObject>) => void;
  onDelete: () => void;
  onDeselect: () => void;
  onDuplicate?: () => void;
  mobile?: boolean;
  onShowLibrary?: () => void;
}

export function PropertiesPanel({
  object,
  onUpdate,
  onDelete,
  onDeselect,
  onDuplicate,
  mobile = false,
  onShowLibrary
}: PropertiesPanelProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  // Default base dimensions if not defined (for backward compatibility)
  // Map of default dimensions by object type
  const defaultDimensionsMap: Record<string, { width: number; height: number; depth: number }> = {
    'fridge': { width: 0.7, height: 1.8, depth: 0.7 },
    'oven': { width: 0.6, height: 0.65, depth: 0.6 },
    'cabinet-base': { width: 0.6, height: 0.85, depth: 0.6 },
    'cabinet-wall': { width: 0.6, height: 0.7, depth: 0.35 },
    'sink': { width: 0.6, height: 0.05, depth: 0.6 },
    'countertop': { width: 1.2, height: 0.05, depth: 0.6 },
    'dishwasher': { width: 0.6, height: 0.85, depth: 0.6 },
    'stove': { width: 0.6, height: 0.08, depth: 0.6 }
  };

  const baseDimensions = object.item.baseDimensions || defaultDimensionsMap[object.item.id] || {
    width: 0.6,
    height: 0.85,
    depth: 0.6
  };

  // Calculate actual dimensions considering rotation
  // When rotated 90° or 270° on Y axis, width and depth swap
  // When rotated 90° or 270° on X or Z axis, height swaps with one dimension
  const getActualDimensions = () => {
    const { x: rotX, y: rotY, z: rotZ } = object.rotation;
    let width = baseDimensions.width * object.scale.x;
    let height = baseDimensions.height * object.scale.y;
    let depth = baseDimensions.depth * object.scale.z;

    // Normalize rotations to 0-360
    const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;
    const normRotY = normalizeAngle(rotY);
    const normRotX = normalizeAngle(rotX);
    const normRotZ = normalizeAngle(rotZ);

    // Check if rotated 90° or 270° on Y axis (swap width and depth)
    const isRotatedY = (normRotY > 45 && normRotY < 135) || (normRotY > 225 && normRotY < 315);
    
    // Check if rotated 90° or 270° on X axis (swap height and depth)
    const isRotatedX = (normRotX > 45 && normRotX < 135) || (normRotX > 225 && normRotX < 315);
    
    // Check if rotated 90° or 270° on Z axis (swap width and height)
    const isRotatedZ = (normRotZ > 45 && normRotZ < 135) || (normRotZ > 225 && normRotZ < 315);

    let finalWidth = width;
    let finalHeight = height;
    let finalDepth = depth;

    // Apply Y rotation (most common - swaps X and Z)
    if (isRotatedY) {
      [finalWidth, finalDepth] = [finalDepth, finalWidth];
    }

    // Apply X rotation (swaps Y and Z)
    if (isRotatedX) {
      [finalHeight, finalDepth] = [finalDepth, finalHeight];
    }

    // Apply Z rotation (swaps X and Y)
    if (isRotatedZ) {
      [finalWidth, finalHeight] = [finalHeight, finalWidth];
    }

    return {
      width: finalWidth,
      height: finalHeight,
      depth: finalDepth
    };
  };

  const actualDimensions = getActualDimensions();

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    onUpdate({
      position: { ...object.position, [axis]: value }
    });
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    onUpdate({
      rotation: { ...object.rotation, [axis]: value }
    });
  };

  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    onUpdate({
      scale: { ...object.scale, [axis]: value }
    });
  };

  const handleDimensionChange = (axis: 'x' | 'y' | 'z', realValue: number) => {
    // Calculate scale from real dimension: scale = realValue / baseDimension
    const baseDimension = axis === 'x' 
      ? baseDimensions.width
      : axis === 'y' 
      ? baseDimensions.height
      : baseDimensions.depth;
    
    const newScale = realValue / baseDimension;
    
    onUpdate({
      scale: { ...object.scale, [axis]: newScale }
    });
  };

  const handleUniformScaleChange = (value: number) => {
    onUpdate({
      scale: { x: value, y: value, z: value }
    });
  };

  const handleColorChange = (color: string) => {
    onUpdate({ color });
  };

  const getColorPresets = () => [
    { name: getKitchenTranslation(language, 'white'), value: '#f5f5f5' },
    { name: getKitchenTranslation(language, 'gray'), value: '#808080' },
    { name: getKitchenTranslation(language, 'black'), value: '#2a2a2a' },
  ];

  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className={`h-full flex flex-col ${isRTL ? 'text-right' : ''}`}>
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-2xl">{object.item.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900">
              {getObjectName(language, object.item.id)}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {getCategoryName(language, object.item.category)}
            </p>
          </div>
        </div>
        <button
          onClick={onDeselect}
          className="p-2 hover:bg-amber-200 rounded-lg transition-colors"
          aria-label="Close properties"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Back to Library Button - Only show in Mobile mode */}
        {onShowLibrary && mobile && (
          <button
            onClick={onShowLibrary}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Library className="w-5 h-5" />
            {getKitchenTranslation(language, 'showLibrary')}
          </button>
        )}

        {/* Measurements / Dimensions */}
        <div>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Ruler className="w-4 h-4 text-teal-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              {getKitchenTranslation(language, 'measurements')}
            </h4>
          </div>
          
          {/* Visual indicator showing base vs actual dimensions */}
          <div className={`mb-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-2 border-teal-300 shadow-sm ${mobile ? 'p-5' : ''}`}>
            <div className={`${mobile ? 'text-base' : 'text-sm'} font-bold text-teal-900 mb-3 ${isRTL ? 'text-right' : ''}`}>
              📏 {getKitchenTranslation(language, 'actualDimensions')}:
            </div>
            <div className={`grid grid-cols-3 gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`bg-white rounded-lg ${mobile ? 'p-4' : 'p-3'} border-2 border-red-300 shadow-sm`}>
                <div className={`${mobile ? 'text-sm' : 'text-xs'} font-medium text-gray-600 mb-1`}>{getKitchenTranslation(language, 'width')}</div>
                <div className={`${mobile ? 'text-2xl' : 'text-lg'} font-bold text-red-600`}>{actualDimensions.width.toFixed(2)}m</div>
              </div>
              <div className={`bg-white rounded-lg ${mobile ? 'p-4' : 'p-3'} border-2 border-green-300 shadow-sm`}>
                <div className={`${mobile ? 'text-sm' : 'text-xs'} font-medium text-gray-600 mb-1`}>{getKitchenTranslation(language, 'height')}</div>
                <div className={`${mobile ? 'text-2xl' : 'text-lg'} font-bold text-green-600`}>{actualDimensions.height.toFixed(2)}m</div>
              </div>
              <div className={`bg-white rounded-lg ${mobile ? 'p-4' : 'p-3'} border-2 border-blue-300 shadow-sm`}>
                <div className={`${mobile ? 'text-sm' : 'text-xs'} font-medium text-gray-600 mb-1`}>{getKitchenTranslation(language, 'depth')}</div>
                <div className={`${mobile ? 'text-2xl' : 'text-lg'} font-bold text-blue-600`}>{actualDimensions.depth.toFixed(2)}m</div>
              </div>
            </div>
            
            {/* Show rotation status */}
            {(object.rotation.x !== 0 || object.rotation.y !== 0 || object.rotation.z !== 0) && (
              <div className={`mt-3 ${mobile ? 'text-sm' : 'text-xs'} font-medium text-teal-700 ${isRTL ? 'text-right' : ''}`}>
                <span className="inline-flex items-center gap-1">
                  <RotateCw className={`${mobile ? 'w-4 h-4' : 'w-3 h-3'}`} />
                  {getKitchenTranslation(language, 'rotated')}:
                  {object.rotation.x !== 0 && ` X:${object.rotation.x.toFixed(0)}°`}
                  {object.rotation.y !== 0 && ` Y:${object.rotation.y.toFixed(0)}°`}
                  {object.rotation.z !== 0 && ` Z:${object.rotation.z.toFixed(0)}°`}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <PropertySlider
              label={getKitchenTranslation(language, 'width')}
              value={actualDimensions.width}
              onChange={(v) => handleDimensionChange('x', v)}
              min={0.1}
              max={5}
              step={0.01}
              color="red"
              unit="m"
              isRTL={isRTL}
            />
            <PropertySlider
              label={getKitchenTranslation(language, 'height')}
              value={actualDimensions.height}
              onChange={(v) => handleDimensionChange('y', v)}
              min={0.1}
              max={5}
              step={0.01}
              color="green"
              unit="m"
              isRTL={isRTL}
            />
            <PropertySlider
              label={getKitchenTranslation(language, 'depth')}
              value={actualDimensions.depth}
              onChange={(v) => handleDimensionChange('z', v)}
              min={0.1}
              max={5}
              step={0.01}
              color="blue"
              unit="m"
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Move className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              {getKitchenTranslation(language, 'position')}
            </h4>
          </div>
          <div className="space-y-2">
            <PropertySlider
              label="X"
              value={object.position.x}
              onChange={(v) => handlePositionChange('x', v)}
              min={-8}
              max={8}
              step={0.1}
              color="red"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Y"
              value={object.position.y}
              onChange={(v) => handlePositionChange('y', v)}
              min={0}
              max={5}
              step={0.1}
              color="green"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Z"
              value={object.position.z}
              onChange={(v) => handlePositionChange('z', v)}
              min={-8}
              max={8}
              step={0.1}
              color="blue"
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Rotation */}
        <div>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <RotateCw className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              {getKitchenTranslation(language, 'rotation')}
            </h4>
          </div>
          <div className="space-y-2">
            <PropertySlider
              label="X"
              value={object.rotation.x}
              onChange={(v) => handleRotationChange('x', v)}
              min={0}
              max={360}
              step={5}
              color="red"
              unit="°"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Y"
              value={object.rotation.y}
              onChange={(v) => handleRotationChange('y', v)}
              min={0}
              max={360}
              step={5}
              color="green"
              unit="°"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Z"
              value={object.rotation.z}
              onChange={(v) => handleRotationChange('z', v)}
              min={0}
              max={360}
              step={5}
              color="blue"
              unit="°"
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Scale */}
        <div>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Maximize2 className="w-4 h-4 text-orange-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              {getKitchenTranslation(language, 'scale')}
            </h4>
          </div>
          <div className="space-y-2">
            <PropertySlider
              label={getKitchenTranslation(language, 'uniformScale')}
              value={object.scale.x}
              onChange={handleUniformScaleChange}
              min={0.1}
              max={3}
              step={0.1}
              color="orange"
              isRTL={isRTL}
            />
            <PropertySlider
              label="X"
              value={object.scale.x}
              onChange={(v) => handleScaleChange('x', v)}
              min={0.1}
              max={3}
              step={0.1}
              color="red"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Y"
              value={object.scale.y}
              onChange={(v) => handleScaleChange('y', v)}
              min={0.1}
              max={3}
              step={0.1}
              color="green"
              isRTL={isRTL}
            />
            <PropertySlider
              label="Z"
              value={object.scale.z}
              onChange={(v) => handleScaleChange('z', v)}
              min={0.1}
              max={3}
              step={0.1}
              color="blue"
              isRTL={isRTL}
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Palette className="w-4 h-4 text-pink-600" />
            <h4 className="font-semibold text-sm text-gray-900">
              {getKitchenTranslation(language, 'color')}
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {getColorPresets().map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`w-full aspect-square rounded-lg border-2 transition-all ${
                  object.color === color.value
                    ? 'border-amber-500 scale-110 shadow-lg'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {getKitchenTranslation(language, 'customColor')}
            </label>
            <input
              type="color"
              value={object.color || '#8b6f47'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="mt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ChevronDown className="w-4 h-4" />
            {getKitchenTranslation(language, 'advancedSettings')}
          </button>
          {showAdvanced && (
            <div className="mt-3 space-y-2">
              <PropertySlider
                label="X"
                value={object.position.x}
                onChange={(v) => handlePositionChange('x', v)}
                min={-8}
                max={8}
                step={0.1}
                color="red"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Y"
                value={object.position.y}
                onChange={(v) => handlePositionChange('y', v)}
                min={0}
                max={5}
                step={0.1}
                color="green"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Z"
                value={object.position.z}
                onChange={(v) => handlePositionChange('z', v)}
                min={-8}
                max={8}
                step={0.1}
                color="blue"
                isRTL={isRTL}
              />
              <PropertySlider
                label="X"
                value={object.rotation.x}
                onChange={(v) => handleRotationChange('x', v)}
                min={0}
                max={360}
                step={5}
                color="red"
                unit="°"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Y"
                value={object.rotation.y}
                onChange={(v) => handleRotationChange('y', v)}
                min={0}
                max={360}
                step={5}
                color="green"
                unit="°"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Z"
                value={object.rotation.z}
                onChange={(v) => handleRotationChange('z', v)}
                min={0}
                max={360}
                step={5}
                color="blue"
                unit="°"
                isRTL={isRTL}
              />
              <PropertySlider
                label={getKitchenTranslation(language, 'uniformScale')}
                value={object.scale.x}
                onChange={handleUniformScaleChange}
                min={0.1}
                max={3}
                step={0.1}
                color="orange"
                isRTL={isRTL}
              />
              <PropertySlider
                label="X"
                value={object.scale.x}
                onChange={(v) => handleScaleChange('x', v)}
                min={0.1}
                max={3}
                step={0.1}
                color="red"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Y"
                value={object.scale.y}
                onChange={(v) => handleScaleChange('y', v)}
                min={0.1}
                max={3}
                step={0.1}
                color="green"
                isRTL={isRTL}
              />
              <PropertySlider
                label="Z"
                value={object.scale.z}
                onChange={(v) => handleScaleChange('z', v)}
                min={0.1}
                max={3}
                step={0.1}
                color="blue"
                isRTL={isRTL}
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
        {onDuplicate && (
          <button
            onClick={onDuplicate}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Copy className="w-4 h-4" />
            {getKitchenTranslation(language, 'duplicate')}
          </button>
        )}
        <button
          onClick={onDelete}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Trash2 className="w-4 h-4" />
          {getKitchenTranslation(language, 'deleteObject')}
        </button>
      </div>
    </div>
  );
}

interface PropertySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  color: 'red' | 'green' | 'blue' | 'orange';
  unit?: string;
  isRTL?: boolean;
}

function PropertySlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  color,
  unit = '',
  isRTL = false
}: PropertySliderProps) {
  const colorClasses = {
    red: 'accent-red-500',
    green: 'accent-green-500',
    blue: 'accent-blue-500',
    orange: 'accent-orange-500'
  };

  const labelColors = {
    red: 'text-red-600 bg-red-50',
    green: 'text-green-600 bg-green-50',
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50'
  };

  const labelWidth = label.length > 2 ? 'w-auto px-2' : 'w-8';
  
  // Use 2 decimal places for measurements (step 0.01), 1 for others
  const decimals = step === 0.01 ? 2 : 1;

  return (
    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`${labelWidth} h-8 rounded-lg flex items-center justify-center font-bold text-sm ${labelColors[color]}`}>
        {label}
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={`flex-1 ${colorClasses[color]}`}
        dir="ltr"
      />
      <input
        type="number"
        value={value.toFixed(decimals)}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val >= min && val <= max) {
            onChange(val);
          }
        }}
        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center"
        step={step}
        min={min}
        max={max}
      />
      {unit && <span className="text-xs text-gray-500 w-4">{unit}</span>}
    </div>
  );
}