import { KitchenDimensions, KitchenDesignType } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Ruler } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step3Props {
  designType: KitchenDesignType;
  data: KitchenDimensions;
  onChange: (data: KitchenDimensions) => void;
}

export function Step3Dimensions({ designType, data, onChange }: Step3Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step3.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step3.subtitle}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <Ruler className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 leading-relaxed">
          {t.kitchenSteps.step3.note}
        </p>
      </div>

      <div className="space-y-4">
        {/* Straight Kitchen (I) */}
        {designType === 'straight' && (
          <div>
            <Label htmlFor="straightLength" className="text-gray-900">
              {t.kitchenSteps.step3.straightLength}
            </Label>
            <Input
              id="straightLength"
              type="number"
              step="0.1"
              min="0"
              value={data.straightLength || ''}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                onChange({ ...data, straightLength: value });
              }}
              placeholder={t.kitchenSteps.step3.placeholder}
              className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              dir="ltr"
            />
          </div>
        )}

        {/* L-Shape Kitchen */}
        {designType === 'l-shape' && (
          <>
            <div>
              <Label htmlFor="lSide1" className="text-gray-900">
                {t.kitchenSteps.step3.side1}
              </Label>
              <Input
                id="lSide1"
                type="number"
                step="0.1"
                min="0"
                value={data.lSide1 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, lSide1: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="lSide2" className="text-gray-900">
                {t.kitchenSteps.step3.side2}
              </Label>
              <Input
                id="lSide2"
                type="number"
                step="0.1"
                min="0"
                value={data.lSide2 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, lSide2: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
          </>
        )}

        {/* U-Shape Kitchen */}
        {designType === 'u-shape' && (
          <>
            <div>
              <Label htmlFor="uSide1" className="text-gray-900">
                {t.kitchenSteps.step3.side1}
              </Label>
              <Input
                id="uSide1"
                type="number"
                step="0.1"
                min="0"
                value={data.uSide1 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, uSide1: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="uSide2" className="text-gray-900">
                {t.kitchenSteps.step3.side2}
              </Label>
              <Input
                id="uSide2"
                type="number"
                step="0.1"
                min="0"
                value={data.uSide2 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, uSide2: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="uSide3" className="text-gray-900">
                {t.kitchenSteps.step3.side3}
              </Label>
              <Input
                id="uSide3"
                type="number"
                step="0.1"
                min="0"
                value={data.uSide3 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, uSide3: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
          </>
        )}

        {/* G-Shape Kitchen */}
        {designType === 'g-shape' && (
          <>
            <div>
              <Label htmlFor="gSide1" className="text-gray-900">
                {t.kitchenSteps.step3.side1}
              </Label>
              <Input
                id="gSide1"
                type="number"
                step="0.1"
                min="0"
                value={data.gSide1 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, gSide1: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="gSide2" className="text-gray-900">
                {t.kitchenSteps.step3.side2}
              </Label>
              <Input
                id="gSide2"
                type="number"
                step="0.1"
                min="0"
                value={data.gSide2 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, gSide2: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="gSide3" className="text-gray-900">
                {t.kitchenSteps.step3.side3}
              </Label>
              <Input
                id="gSide3"
                type="number"
                step="0.1"
                min="0"
                value={data.gSide3 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, gSide3: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="gSide4" className="text-gray-900">
                {t.kitchenSteps.step3.side4}
              </Label>
              <Input
                id="gSide4"
                type="number"
                step="0.1"
                min="0"
                value={data.gSide4 || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, gSide4: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
          </>
        )}

        {/* Kitchen with Island */}
        {designType === 'island' && (
          <>
            <div>
              <Label htmlFor="islandKitchenLength" className="text-gray-900">
                {t.kitchenSteps.step3.islandKitchenLength}
              </Label>
              <Input
                id="islandKitchenLength"
                type="number"
                step="0.1"
                min="0"
                value={data.islandKitchenLength || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseFloat(e.target.value) : undefined;
                  onChange({ ...data, islandKitchenLength: value });
                }}
                placeholder={t.kitchenSteps.step3.placeholder}
                className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                dir="ltr"
              />
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">{t.kitchenSteps.step3.islandDimensions}</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="islandLength" className="text-gray-900">
                    {t.kitchenSteps.step3.islandLength}
                  </Label>
                  <Input
                    id="islandLength"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.islandLength || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      onChange({ ...data, islandLength: value });
                    }}
                    placeholder={t.kitchenSteps.step3.placeholder}
                    className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    dir="ltr"
                  />
                </div>
                <div>
                  <Label htmlFor="islandWidth" className="text-gray-900">
                    {t.kitchenSteps.step3.islandWidth}
                  </Label>
                  <Input
                    id="islandWidth"
                    type="number"
                    step="0.1"
                    min="0"
                    value={data.islandWidth || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      onChange({ ...data, islandWidth: value });
                    }}
                    placeholder={t.kitchenSteps.step3.placeholder}
                    className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}