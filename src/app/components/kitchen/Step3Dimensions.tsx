import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { KitchenDimensions } from '../../types';
import { Ruler } from 'lucide-react';

interface Step3DimensionsProps {
  data: KitchenDimensions;
  onChange: (data: KitchenDimensions) => void;
}

export function Step3Dimensions({ data, onChange }: Step3DimensionsProps) {
  const handleChange = (field: keyof KitchenDimensions, value: string) => {
    onChange({ ...data, [field]: value ? parseFloat(value) : undefined });
  };

  if (data.type === 'other') {
    return null; // Skip dimensions for custom designs
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">الأبعاد التقريبية</h2>
        <p className="text-gray-600">أدخل الأبعاد بالمتر (يمكنك استخدام الكسور العشرية مثل 3.5)</p>
      </div>

      <div className="space-y-4">
        {data.type === 'straight' && (
          <div>
            <Label htmlFor="side1" className="text-base flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              الطول الكلي (متر)
            </Label>
            <Input
              id="side1"
              type="number"
              step="0.1"
              min="0"
              value={data.side1 || ''}
              onChange={(e) => handleChange('side1', e.target.value)}
              placeholder="مثال: 4.5"
              className="mt-2 text-lg"
            />
          </div>
        )}

        {data.type === 'l-shape' && (
          <>
            <div>
              <Label htmlFor="side1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الأول (متر)
              </Label>
              <Input
                id="side1"
                type="number"
                step="0.1"
                min="0"
                value={data.side1 || ''}
                onChange={(e) => handleChange('side1', e.target.value)}
                placeholder="مثال: 4.5"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الثاني (متر)
              </Label>
              <Input
                id="side2"
                type="number"
                step="0.1"
                min="0"
                value={data.side2 || ''}
                onChange={(e) => handleChange('side2', e.target.value)}
                placeholder="مثال: 3.0"
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {data.type === 'u-shape' && (
          <>
            <div>
              <Label htmlFor="side1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الأول (متر)
              </Label>
              <Input
                id="side1"
                type="number"
                step="0.1"
                min="0"
                value={data.side1 || ''}
                onChange={(e) => handleChange('side1', e.target.value)}
                placeholder="مثال: 3.0"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الثاني (الوسط) (متر)
              </Label>
              <Input
                id="side2"
                type="number"
                step="0.1"
                min="0"
                value={data.side2 || ''}
                onChange={(e) => handleChange('side2', e.target.value)}
                placeholder="مثال: 4.0"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side3" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الثالث (متر)
              </Label>
              <Input
                id="side3"
                type="number"
                step="0.1"
                min="0"
                value={data.side3 || ''}
                onChange={(e) => handleChange('side3', e.target.value)}
                placeholder="مثال: 3.0"
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {data.type === 'g-shape' && (
          <>
            <div>
              <Label htmlFor="side1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الأول (متر)
              </Label>
              <Input
                id="side1"
                type="number"
                step="0.1"
                min="0"
                value={data.side1 || ''}
                onChange={(e) => handleChange('side1', e.target.value)}
                placeholder="مثال: 3.0"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side2" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الثاني (متر)
              </Label>
              <Input
                id="side2"
                type="number"
                step="0.1"
                min="0"
                value={data.side2 || ''}
                onChange={(e) => handleChange('side2', e.target.value)}
                placeholder="مثال: 4.0"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side3" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الضلع الثالث (متر)
              </Label>
              <Input
                id="side3"
                type="number"
                step="0.1"
                min="0"
                value={data.side3 || ''}
                onChange={(e) => handleChange('side3', e.target.value)}
                placeholder="مثال: 3.0"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label htmlFor="side4" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                امتداد حرف G (الجزء الرابع) (متر)
              </Label>
              <Input
                id="side4"
                type="number"
                step="0.1"
                min="0"
                value={data.side4 || ''}
                onChange={(e) => handleChange('side4', e.target.value)}
                placeholder="مثال: 2.0"
                className="mt-2 text-lg"
              />
            </div>
          </>
        )}

        {data.type === 'island' && (
          <>
            <div>
              <Label htmlFor="side1" className="text-base flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                الطول الكلي للمطبخ (متر)
              </Label>
              <Input
                id="side1"
                type="number"
                step="0.1"
                min="0"
                value={data.side1 || ''}
                onChange={(e) => handleChange('side1', e.target.value)}
                placeholder="مثال: 5.0"
                className="mt-2 text-lg"
              />
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-3">أبعاد الجزيرة</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="islandLength" className="text-base flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    طول الجزيرة (متر)
                  </Label>
                  <Input
                    id="islandLength"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.islandLength || ''}
                    onChange={(e) => handleChange('islandLength', e.target.value)}
                    placeholder="مثال: 2.0"
                    className="mt-2 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="islandWidth" className="text-base flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    عرض الجزيرة (متر)
                  </Label>
                  <Input
                    id="islandWidth"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.islandWidth || ''}
                    onChange={(e) => handleChange('islandWidth', e.target.value)}
                    placeholder="مثال: 1.0"
                    className="mt-2 text-lg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 القياسات التقريبية كافية في هذه المرحلة. سيتم أخذ القياسات الدقيقة من طرف فريقنا عند الزيارة الميدانية.
        </p>
      </div>
    </div>
  );
}