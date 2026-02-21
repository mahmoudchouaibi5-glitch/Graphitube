import { PlacedObject } from './KitchenPlanner3D';
import { X, Trash2, Move, RotateCw, Maximize2, Palette, Ruler, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getKitchenTranslation, getObjectName, getCategoryName } from './translations';
import { useState } from 'react';

interface PropertiesPanelMobileProps {
  object: PlacedObject;
  onUpdate: (updates: Partial<PlacedObject>) => void;
  onDelete: () => void;
  onDeselect: () => void;
  onDuplicate?: () => void;
}

export function PropertiesPanelMobile({
  object,
  onUpdate,
  onDelete,
  onDeselect,
  onDuplicate
}: PropertiesPanelMobileProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar' || language === 'darija';

  // Accordion states
  const [openSection, setOpenSection] = useState<'name' | 'size' | 'position' | 'rotation' | 'color' | null>('name');

  // Default base dimensions
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

  const getActualDimensions = () => {
    const { x: rotX, y: rotY, z: rotZ } = object.rotation;
    let width = baseDimensions.width * object.scale.x;
    let height = baseDimensions.height * object.scale.y;
    let depth = baseDimensions.depth * object.scale.z;

    const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;
    const normRotY = normalizeAngle(rotY);
    const normRotX = normalizeAngle(rotX);
    const normRotZ = normalizeAngle(rotZ);

    const isRotatedY = (normRotY > 45 && normRotY < 135) || (normRotY > 225 && normRotY < 315);
    const isRotatedX = (normRotX > 45 && normRotX < 135) || (normRotX > 225 && normRotX < 315);
    const isRotatedZ = (normRotZ > 45 && normRotZ < 135) || (normRotZ > 225 && normRotZ < 315);

    let finalWidth = width;
    let finalHeight = height;
    let finalDepth = depth;

    if (isRotatedY) [finalWidth, finalDepth] = [finalDepth, finalWidth];
    if (isRotatedX) [finalHeight, finalDepth] = [finalDepth, finalHeight];
    if (isRotatedZ) [finalWidth, finalHeight] = [finalHeight, finalWidth];

    return { width: finalWidth, height: finalHeight, depth: finalDepth };
  };

  const actualDimensions = getActualDimensions();

  const handleDimensionChange = (axis: 'x' | 'y' | 'z', realValue: number) => {
    const baseDimension = axis === 'x' ? baseDimensions.width : axis === 'y' ? baseDimensions.height : baseDimensions.depth;
    const newScale = realValue / baseDimension;
    onUpdate({ scale: { ...object.scale, [axis]: newScale } });
  };

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    onUpdate({ position: { ...object.position, [axis]: value } });
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    onUpdate({ rotation: { ...object.rotation, [axis]: value } });
  };

  const handleColorChange = (color: string) => {
    onUpdate({ color });
  };

  const getColorPresets = () => [
    { name: getKitchenTranslation(language, 'white'), value: '#f5f5f5' },
    { name: getKitchenTranslation(language, 'gray'), value: '#808080' },
    { name: getKitchenTranslation(language, 'black'), value: '#2a2a2a' },
  ];

  const toggleSection = (section: typeof openSection) => {
    setOpenSection(openSection === section ? null : section);
  };

  const AccordionSection = ({ 
    id, 
    icon, 
    title, 
    children,
    preview
  }: { 
    id: typeof openSection; 
    icon: React.ReactNode; 
    title: string; 
    children: React.ReactNode;
    preview?: React.ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => toggleSection(id)}
          className={`w-full flex items-center justify-between p-5 transition-all ${
            isOpen ? 'bg-gradient-to-r from-amber-100 to-amber-50' : 'bg-white hover:bg-gray-50'
          } ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="text-2xl">{icon}</div>
            <div className={isRTL ? 'text-right' : ''}>
              <h4 className="font-bold text-lg text-gray-900">{title}</h4>
              {!isOpen && preview && (
                <div className="text-xs text-gray-600 mt-1 font-medium">
                  {preview}
                </div>
              )}
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-amber-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </button>
        {isOpen && (
          <div className="p-5 bg-gradient-to-b from-white to-gray-50 border-t-2 border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`h-full flex flex-col ${isRTL ? 'text-right' : ''}`}>
      {/* Compact Header */}
      <div className={`p-3 border-b-2 border-amber-300 flex items-center justify-between bg-gradient-to-r from-amber-100 to-amber-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-3xl">{object.item.icon}</span>
          <div>
            <h3 className="font-bold text-base text-gray-900">{getObjectName(language, object.item.id)}</h3>
            <p className="text-xs text-gray-600">{getCategoryName(language, object.item.category)}</p>
          </div>
        </div>
        <button onClick={onDeselect} className="p-2 hover:bg-amber-200 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-100">
        {/* Name & Category */}
        <AccordionSection 
          id="name" 
          icon="📝" 
          title={getKitchenTranslation(language, 'objectInfo')}
          preview={`${getObjectName(language, object.item.id)} • ${getCategoryName(language, object.item.category)}`}
        >
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">{getKitchenTranslation(language, 'name')}</div>
              <div className="text-xl font-bold text-gray-900">{getObjectName(language, object.item.id)}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">{getKitchenTranslation(language, 'category')}</div>
              <div className="text-xl font-bold text-gray-900 capitalize">{getCategoryName(language, object.item.category)}</div>
            </div>
          </div>
        </AccordionSection>

        {/* Size/Dimensions */}
        <AccordionSection 
          id="size" 
          icon={<Ruler className="w-6 h-6 text-teal-600" />} 
          title={getKitchenTranslation(language, 'measurements')}
          preview={
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">{actualDimensions.width.toFixed(2)}m</span>
              <span>×</span>
              <span className="text-green-600 font-bold">{actualDimensions.height.toFixed(2)}m</span>
              <span>×</span>
              <span className="text-blue-600 font-bold">{actualDimensions.depth.toFixed(2)}m</span>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Visual Dimensions Display */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-4 border-2 border-red-300 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">{getKitchenTranslation(language, 'width')}</div>
                <div className="text-2xl font-bold text-red-600">{actualDimensions.width.toFixed(2)}m</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">{getKitchenTranslation(language, 'height')}</div>
                <div className="text-2xl font-bold text-green-600">{actualDimensions.height.toFixed(2)}m</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">{getKitchenTranslation(language, 'depth')}</div>
                <div className="text-2xl font-bold text-blue-600">{actualDimensions.depth.toFixed(2)}m</div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 bg-white p-4 rounded-lg">
              <MobileSlider
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
              <MobileSlider
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
              <MobileSlider
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
        </AccordionSection>

        {/* Position */}
        <AccordionSection 
          id="position" 
          icon={<Move className="w-6 h-6 text-blue-600" />} 
          title={getKitchenTranslation(language, 'position')}
          preview={`X: ${object.position.x.toFixed(1)} • Y: ${object.position.y.toFixed(1)} • Z: ${object.position.z.toFixed(1)}`}
        >
          <div className="space-y-3 bg-white p-4 rounded-lg">
            <MobileSlider
              label="X"
              value={object.position.x}
              onChange={(v) => handlePositionChange('x', v)}
              min={-8}
              max={8}
              step={0.1}
              color="red"
              isRTL={isRTL}
            />
            <MobileSlider
              label="Y"
              value={object.position.y}
              onChange={(v) => handlePositionChange('y', v)}
              min={0}
              max={5}
              step={0.1}
              color="green"
              isRTL={isRTL}
            />
            <MobileSlider
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
        </AccordionSection>

        {/* Rotation */}
        <AccordionSection 
          id="rotation" 
          icon={<RotateCw className="w-6 h-6 text-purple-600" />} 
          title={getKitchenTranslation(language, 'rotation')}
          preview={`X: ${object.rotation.x.toFixed(0)}° • Y: ${object.rotation.y.toFixed(0)}° • Z: ${object.rotation.z.toFixed(0)}°`}
        >
          <div className="space-y-3 bg-white p-4 rounded-lg">
            <MobileSlider
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
            <MobileSlider
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
            <MobileSlider
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
        </AccordionSection>

        {/* Color */}
        <AccordionSection 
          id="color" 
          icon={<Palette className="w-6 h-6 text-pink-600" />} 
          title={getKitchenTranslation(language, 'color')}
          preview={
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded border-2 border-gray-400" 
                style={{ backgroundColor: object.color || '#8b6f47' }}
              />
              <span className="font-mono text-xs">{object.color || '#8b6f47'}</span>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {getColorPresets().map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={`w-full aspect-square rounded-xl border-4 transition-all shadow-lg ${
                    object.color === color.value
                      ? 'border-amber-500 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <div className="bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getKitchenTranslation(language, 'customColor')}
              </label>
              <input
                type="color"
                value={object.color || '#8b6f47'}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full h-14 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </AccordionSection>
      </div>

      {/* Actions - Always Visible */}
      <div className="p-3 border-t-2 border-gray-300 bg-white space-y-2 shadow-2xl">
        {onDuplicate && (
          <button
            onClick={onDuplicate}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-base shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Copy className="w-5 h-5" />
            {getKitchenTranslation(language, 'duplicate')}
          </button>
        )}
        <button
          onClick={onDelete}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-bold text-base shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Trash2 className="w-5 h-5" />
          {getKitchenTranslation(language, 'deleteObject')}
        </button>
      </div>
    </div>
  );
}

interface MobileSliderProps {
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

function MobileSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  color,
  unit = '',
  isRTL = false
}: MobileSliderProps) {
  const colorClasses = {
    red: 'accent-red-500',
    green: 'accent-green-500',
    blue: 'accent-blue-500',
    orange: 'accent-orange-500'
  };

  const labelColors = {
    red: 'text-red-600 bg-red-100 border-red-300',
    green: 'text-green-600 bg-green-100 border-green-300',
    blue: 'text-blue-600 bg-blue-100 border-blue-300',
    orange: 'text-orange-600 bg-orange-100 border-orange-300'
  };

  const decimals = step === 0.01 ? 2 : 1;

  return (
    <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`px-3 py-1.5 rounded-lg font-bold text-sm border-2 ${labelColors[color]}`}>
          {label}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value.toFixed(decimals)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val >= min && val <= max) onChange(val);
            }}
            className="w-20 px-3 py-1.5 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center font-bold"
            step={step}
            min={min}
            max={max}
          />
          {unit && <span className="text-sm text-gray-600 font-medium">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={`w-full h-3 ${colorClasses[color]}`}
        dir="ltr"
      />
    </div>
  );
}