import { HeightCeilingInfo } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { ArrowUp, Ruler } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step4Props {
  data: HeightCeilingInfo;
  onChange: (data: HeightCeilingInfo) => void;
}

export function Step4HeightCeiling({ data, onChange }: Step4Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step4.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step4.subtitle}</p>
      </div>

      {/* Does kitchen reach ceiling? */}
      <div className="space-y-3">
        <Label className="text-gray-900 font-semibold flex items-center gap-2">
          <ArrowUp className="w-5 h-5 text-amber-600" />
          {t.kitchenSteps.step4.reachesCeilingQ}
        </Label>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                reachesCeiling: true,
              })
            }
            className={`p-4 border-2 rounded-xl font-medium transition-all ${
              data.reachesCeiling
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 text-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{t.kitchenSteps.step4.yesReaches}</div>
              <div className="text-xs opacity-75">{t.kitchenSteps.step4.yesReachesDesc}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                reachesCeiling: false,
                totalHeight: undefined,
              })
            }
            className={`p-4 border-2 rounded-xl font-medium transition-all ${
              !data.reachesCeiling
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 text-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{t.kitchenSteps.step4.noReaches}</div>
              <div className="text-xs opacity-75">{t.kitchenSteps.step4.noReachesDesc}</div>
            </div>
          </button>
        </div>
      </div>

      {/* If reaches ceiling, ask for total height */}
      {data.reachesCeiling && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <Ruler className="w-5 h-5" />
            <span>{t.kitchenSteps.step4.totalHeightLabel}</span>
          </div>
          <div>
            <Label htmlFor="totalHeight" className="text-gray-900 text-sm mb-2 block">
              {t.kitchenSteps.step4.totalHeightLabel}
            </Label>
            <Input
              id="totalHeight"
              type="number"
              step="0.1"
              min="0"
              value={data.totalHeight || ''}
              onChange={(e) => onChange({ ...data, totalHeight: parseFloat(e.target.value) || undefined })}
              placeholder={t.kitchenSteps.step4.totalHeightPlaceholder}
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              dir="ltr"
            />
            <p className="text-xs text-blue-700 mt-1.5">
              {t.kitchenSteps.step4.heightNote}
            </p>
          </div>
        </div>
      )}

      {/* Ceiling type */}
      <div className="space-y-3">
        <Label className="text-gray-900 font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          {t.kitchenSteps.step4.ceilingTypeQ}
        </Label>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                ceilingType: 'flat',
                highestPoint: undefined,
                lowestPoint: undefined,
              })
            }
            className={`p-4 border-2 rounded-xl font-medium transition-all ${
              data.ceilingType === 'flat' || !data.ceilingType
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 text-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{t.kitchenSteps.step4.flat}</div>
              <div className="text-xs opacity-75">{t.kitchenSteps.step4.flatDesc}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                ceilingType: 'uneven',
              })
            }
            className={`p-4 border-2 rounded-xl font-medium transition-all ${
              data.ceilingType === 'uneven'
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 text-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{t.kitchenSteps.step4.uneven}</div>
              <div className="text-xs opacity-75">{t.kitchenSteps.step4.unevenDesc}</div>
            </div>
          </button>
        </div>
      </div>

      {/* If ceiling is uneven */}
      {data.ceilingType === 'uneven' && (
        <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Ruler className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{t.kitchenSteps.step4.unevenTitle}</h4>
              <p className="text-sm text-gray-700">
                {t.kitchenSteps.step4.unevenSubtitle}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <Label htmlFor="highestPoint" className="text-gray-900 font-medium mb-2 flex items-center gap-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                {t.kitchenSteps.step4.highestPoint}
              </Label>
              <Input
                id="highestPoint"
                type="number"
                step="0.1"
                min="0"
                value={data.highestPoint || ''}
                onChange={(e) => onChange({ ...data, highestPoint: parseFloat(e.target.value) || undefined })}
                placeholder={t.kitchenSteps.step4.totalHeightPlaceholder}
                className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">{t.kitchenSteps.step3.meters}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <Label htmlFor="lowestPoint" className="text-gray-900 font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                {t.kitchenSteps.step4.lowestPoint}
              </Label>
              <Input
                id="lowestPoint"
                type="number"
                step="0.1"
                min="0"
                value={data.lowestPoint || ''}
                onChange={(e) => onChange({ ...data, lowestPoint: parseFloat(e.target.value) || undefined })}
                placeholder={t.kitchenSteps.step4.totalHeightPlaceholder}
                className="border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">{t.kitchenSteps.step3.meters}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900 leading-relaxed">
          {t.kitchenSteps.step4.generalNote}
        </p>
      </div>
    </div>
  );
}