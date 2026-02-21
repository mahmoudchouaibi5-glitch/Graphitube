import { useState } from 'react';
import { MarbleDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Upload, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface Step11Props {
  data: MarbleDetails;
  onChange: (data: MarbleDetails) => void;
}

export function Step11MarbleDetails({ data, onChange }: Step11Props) {
  const { t, dir } = useLanguage();
  const [showColorInput, setShowColorInput] = useState<'image' | 'link' | null>(null);

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step11.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step11.subtitle}</p>
      </div>

      {/* Material Source Selection */}
      <div className="p-4 border-2 border-amber-300 bg-amber-50 rounded-lg">
        <Label className="text-gray-900 font-semibold mb-3 block">{t.kitchenSteps.step11.materialSource}</Label>
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
              <RadioGroupItem value="graphitube" id="marble-graphitube" className="mt-0.5" />
              <Label htmlFor="marble-graphitube" className="cursor-pointer font-normal">
                <div className="font-medium">{t.kitchenSteps.step11.graphitubeOption}</div>
                <div className="text-sm text-gray-600">{t.kitchenSteps.step11.graphitubeDescription}</div>
              </Label>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <RadioGroupItem value="custom" id="marble-custom" className="mt-0.5" />
              <Label htmlFor="marble-custom" className="cursor-pointer font-normal">
                <div className="font-medium">{t.kitchenSteps.step11.customOption}</div>
                <div className="text-sm text-gray-600">{t.kitchenSteps.step11.customDescription}</div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* If Graphitube selection */}
      {data.isGraphitubeSelection && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <Label htmlFor="graphitubeRef" className="text-gray-900 font-medium mb-2 block">
            {t.kitchenSteps.step11.graphitubeRefLabel}
          </Label>
          <Input
            id="graphitubeRef"
            type="text"
            value={data.graphitubeRef || ''}
            onChange={(e) => onChange({ ...data, graphitubeRef: e.target.value })}
            placeholder={t.kitchenSteps.step11.graphitubeRefPlaceholder}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}

      {/* Warning for custom material */}
      {data.isCustomMaterial && (
        <div className="p-4 bg-orange-50 border border-orange-300 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-orange-900 leading-relaxed">
            {t.kitchenSteps.step11.customWarning}
          </p>
        </div>
      )}

      {/* Surface Type */}
      <div>
        <Label htmlFor="surfaceType" className="text-gray-900">
          {t.kitchenSteps.step11.surfaceTypeLabel}
        </Label>
        <Input
          id="surfaceType"
          type="text"
          value={data.surfaceType || ''}
          onChange={(e) => onChange({ ...data, surfaceType: e.target.value })}
          placeholder={t.kitchenSteps.step11.surfaceTypePlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      {/* Thickness */}
      <div>
        <Label htmlFor="thickness" className="text-gray-900">
          {t.kitchenSteps.step11.thicknessLabel}
        </Label>
        <Input
          id="thickness"
          type="text"
          value={data.thickness || ''}
          onChange={(e) => onChange({ ...data, thickness: e.target.value })}
          placeholder={t.kitchenSteps.step11.thicknessPlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      {/* Edge Shape */}
      <div>
        <Label htmlFor="edgeShape" className="text-gray-900">
          {t.kitchenSteps.step11.edgeShapeLabel}
        </Label>
        <Input
          id="edgeShape"
          type="text"
          value={data.edgeShape || ''}
          onChange={(e) => onChange({ ...data, edgeShape: e.target.value })}
          placeholder={t.kitchenSteps.step11.edgeShapePlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      {/* Color */}
      <div>
        <Label htmlFor="marbleColor" className="text-gray-900">
          {t.kitchenSteps.step11.colorLabel}
        </Label>
        <Input
          id="marbleColor"
          type="text"
          value={data.color || ''}
          onChange={(e) => onChange({ ...data, color: e.target.value })}
          placeholder={t.kitchenSteps.step11.colorPlaceholder}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          {t.kitchenSteps.step11.colorNote}
        </p>
      </div>

      {/* Color Reference */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
        <Label className="text-gray-900 font-medium">{t.kitchenSteps.step11.colorReferenceLabel}</Label>
        
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
            {t.kitchenSteps.step11.uploadImage}
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
            {t.kitchenSteps.step11.addLink}
          </button>
        </div>

        {showColorInput === 'image' && (
          <div>
            <Label htmlFor="marbleColorImage" className="text-sm">{t.kitchenSteps.step11.imageUrlLabel}</Label>
            <Input
              id="marbleColorImage"
              type="url"
              value={data.colorImage || ''}
              onChange={(e) => onChange({ ...data, colorImage: e.target.value })}
              placeholder={t.kitchenSteps.step11.imageUrlPlaceholder}
              className="mt-1.5"
            />
          </div>
        )}

        {showColorInput === 'link' && (
          <div>
            <Label htmlFor="marbleColorLink" className="text-sm">{t.kitchenSteps.step11.colorLinkLabel}</Label>
            <Input
              id="marbleColorLink"
              type="url"
              value={data.colorLink || ''}
              onChange={(e) => onChange({ ...data, colorLink: e.target.value })}
              placeholder={t.kitchenSteps.step11.colorLinkPlaceholder}
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      {/* Has Openings */}
      <div className="p-4 border border-gray-200 rounded-lg">
        <Label className="text-gray-900 font-semibold mb-3 block">
          {t.kitchenSteps.step11.openingsQuestion}
        </Label>
        <RadioGroup
          value={data.hasOpenings ? 'yes' : 'no'}
          onValueChange={(value) => onChange({ ...data, hasOpenings: value === 'yes' })}
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="yes" id="openings-yes" />
              <Label htmlFor="openings-yes" className="cursor-pointer font-normal">
                {t.common.yes}
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="no" id="openings-no" />
              <Label htmlFor="openings-no" className="cursor-pointer font-normal">
                {t.common.no}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Additional Notes */}
      <div>
        <Label htmlFor="marbleNotes" className="text-gray-900">
          {t.kitchenSteps.step11.notesLabel}
        </Label>
        <Textarea
          id="marbleNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder={t.kitchenSteps.step11.notesPlaceholder}
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}