import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SalonDimensions } from '../../types';
import { Ruler } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SalonStep3DimensionsProps {
  data: SalonDimensions;
  onChange: (data: SalonDimensions) => void;
}

export function SalonStep3Dimensions({ data, onChange }: SalonStep3DimensionsProps) {
  const { t } = useLanguage();

  const handleChange = (field: keyof SalonDimensions, value: string) => {
    onChange({ ...data, [field]: value ? parseFloat(value) : undefined });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.salonSteps.step3.title}</h2>
        <p className="text-gray-600">{t.salonSteps.step3.subtitle}</p>
      </div>

      <div className="space-y-4">
        {data.type === 'l-shape' && (
          <>
            <div>
              <Label htmlFor="wallLength1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall1}
              </Label>
              <Input
                id="wallLength1"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength1 || ''}
                onChange={(e) => handleChange('wallLength1', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall2}
              </Label>
              <Input
                id="wallLength2"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength2 || ''}
                onChange={(e) => handleChange('wallLength2', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {data.type === 'u-shape' && (
          <>
            <div>
              <Label htmlFor="wallLength1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall1}
              </Label>
              <Input
                id="wallLength1"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength1 || ''}
                onChange={(e) => handleChange('wallLength1', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall2Middle}
              </Label>
              <Input
                id="wallLength2"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength2 || ''}
                onChange={(e) => handleChange('wallLength2', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength3" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall3}
              </Label>
              <Input
                id="wallLength3"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength3 || ''}
                onChange={(e) => handleChange('wallLength3', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {(data.type === 'square' || data.type === 'rectangular-open' || data.type === 'rectangular-closed') && (
          <>
            <div>
              <Label htmlFor="wallLength1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall1}
              </Label>
              <Input
                id="wallLength1"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength1 || ''}
                onChange={(e) => handleChange('wallLength1', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall2}
              </Label>
              <Input
                id="wallLength2"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength2 || ''}
                onChange={(e) => handleChange('wallLength2', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength3" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall3}
              </Label>
              <Input
                id="wallLength3"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength3 || ''}
                onChange={(e) => handleChange('wallLength3', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="wallLength4" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                {t.salonSteps.step3.wall4}
              </Label>
              <Input
                id="wallLength4"
                type="number"
                step="0.1"
                min="0"
                value={data.wallLength4 || ''}
                onChange={(e) => handleChange('wallLength4', e.target.value)}
                placeholder={t.salonSteps.step3.placeholder}
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {data.type === 'custom-design' && (
          <div className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <p className="text-base text-amber-900 text-center">
              {t.salonSteps.step2.customPriceNote}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          {t.salonSteps.step3.note}
        </p>
      </div>
    </div>
  );
}