import { useState } from 'react';
import { TilesDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Upload, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface Step12Props {
  data: TilesDetails;
  onChange: (data: TilesDetails) => void;
}

export function Step12TilesDetails({ data, onChange }: Step12Props) {
  const { t, dir } = useLanguage();
  const [showColorInput, setShowColorInput] = useState<'image' | 'link' | null>(null);

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step12.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step12.subtitle}</p>
      </div>

      {/* Material Source Selection */}
      <div className="p-4 border-2 border-amber-300 bg-amber-50 rounded-lg">
        <Label className="text-gray-900 font-semibold mb-3 block">{t.kitchenSteps.step12.materialSource}</Label>
        <RadioGroup
          value={
            data.isGraphitubeSelection
              ? 'graphitube'
              : data.isCustomMaterial
              ? 'custom'
              : 'graphitube'
          }
          onValueChange={(value) =>
            onChange({
              ...data,
              isGraphitubeSelection: value === 'graphitube',
              isCustomMaterial: value === 'custom',
            })
          }
        >
          <div className="space-y-2">
            <div className="flex items-start space-x-2 space-x-reverse">
              <RadioGroupItem value="graphitube" id="tiles-graphitube" className="mt-0.5" />
              <Label htmlFor="tiles-graphitube" className="cursor-pointer font-normal">
                <div className="font-medium">{t.kitchenSteps.step12.graphitubeOption}</div>
                <div className="text-sm text-gray-600">{t.kitchenSteps.step12.graphitubeDescription}</div>
              </Label>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <RadioGroupItem value="custom" id="tiles-custom" className="mt-0.5" />
              <Label htmlFor="tiles-custom" className="cursor-pointer font-normal">
                <div className="font-medium">{t.kitchenSteps.step12.customOption}</div>
                <div className="text-sm text-gray-600">{t.kitchenSteps.step12.customDescription}</div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* If Graphitube selection */}
      {data.isGraphitubeSelection && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <Label htmlFor="tilesGraphitubeRef" className="text-gray-900 font-medium mb-2 block">
            {t.kitchenSteps.step12.graphitubeRefLabel}
          </Label>
          <Input
            id="tilesGraphitubeRef"
            type="text"
            value={data.graphitubeRef || ''}
            onChange={(e) => onChange({ ...data, graphitubeRef: e.target.value })}
            placeholder={t.kitchenSteps.step12.graphitubeRefPlaceholder}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}

      {/* Warning for custom material */}
      {data.isCustomMaterial && (
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-900 leading-relaxed">
            {t.kitchenSteps.step12.customWarning}
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="tilesScope" className="text-gray-900">{t.kitchenSteps.step12.scopeLabel}</Label>
        <Input
          id="tilesScope"
          type="text"
          value={data.scope || ''}
          onChange={(e) => onChange({ ...data, scope: e.target.value })}
          placeholder={t.kitchenSteps.step12.scopePlaceholder}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="tilesType" className="text-gray-900">{t.kitchenSteps.step12.typeLabel}</Label>
        <Input
          id="tilesType"
          type="text"
          value={data.type || ''}
          onChange={(e) => onChange({ ...data, type: e.target.value })}
          placeholder={t.kitchenSteps.step12.typePlaceholder}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="tilesSize" className="text-gray-900">{t.kitchenSteps.step12.sizeLabel}</Label>
        <Input
          id="tilesSize"
          type="text"
          value={data.size || ''}
          onChange={(e) => onChange({ ...data, size: e.target.value })}
          placeholder={t.kitchenSteps.step12.sizePlaceholder}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="tilesColor" className="text-gray-900">{t.kitchenSteps.step12.colorLabel}</Label>
        <Input
          id="tilesColor"
          type="text"
          value={data.color || ''}
          onChange={(e) => onChange({ ...data, color: e.target.value })}
          placeholder={t.kitchenSteps.step12.colorPlaceholder}
          className="mt-1.5"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          {t.kitchenSteps.step12.colorNote}
        </p>
      </div>

      {/* Color Reference */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
        <Label className="text-gray-900 font-medium">{t.kitchenSteps.step12.colorReferenceLabel}</Label>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowColorInput(showColorInput === 'image' ? null : 'image')}
            className={`flex-1 px-4 py-2 border-2 rounded-lg font-medium transition-all ${
              showColorInput === 'image'
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-300 hover:border-amber-400 text-gray-700'
            }`}
          >
            <Upload className="w-4 h-4 inline ml-2" />
            {t.kitchenSteps.step12.uploadImage}
          </button>
          <button
            type="button"
            onClick={() => setShowColorInput(showColorInput === 'link' ? null : 'link')}
            className={`flex-1 px-4 py-2 border-2 rounded-lg font-medium transition-all ${
              showColorInput === 'link'
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-300 hover:border-amber-400 text-gray-700'
            }`}
          >
            <LinkIcon className="w-4 h-4 inline ml-2" />
            {t.kitchenSteps.step12.addLink}
          </button>
        </div>

        {showColorInput === 'image' && (
          <div>
            <Label htmlFor="tilesColorImage" className="text-sm">{t.kitchenSteps.step12.imageUrlLabel}</Label>
            <Input
              id="tilesColorImage"
              type="url"
              value={data.colorImage || ''}
              onChange={(e) => onChange({ ...data, colorImage: e.target.value })}
              placeholder={t.kitchenSteps.step12.imageUrlPlaceholder}
              className="mt-1.5"
            />
          </div>
        )}

        {showColorInput === 'link' && (
          <div>
            <Label htmlFor="tilesColorLink" className="text-sm">{t.kitchenSteps.step12.colorLinkLabel}</Label>
            <Input
              id="tilesColorLink"
              type="url"
              value={data.colorLink || ''}
              onChange={(e) => onChange({ ...data, colorLink: e.target.value })}
              placeholder={t.kitchenSteps.step12.colorLinkPlaceholder}
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="tilesNotes" className="text-gray-900">{t.kitchenSteps.step12.notesLabel}</Label>
        <Textarea
          id="tilesNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step12.notesPlaceholder}
          rows={3}
          className="mt-1.5"
        />
      </div>
    </div>
  );
}