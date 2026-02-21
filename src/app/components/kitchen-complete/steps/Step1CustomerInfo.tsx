import { CustomerInfo } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { useLanguage } from '../../../contexts/LanguageContext';

interface Step1Props {
  data: CustomerInfo;
  onChange: (data: CustomerInfo) => void;
}

export function Step1CustomerInfo({ data, onChange }: Step1Props) {
  const { t, dir } = useLanguage();
  
  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step1.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step1.subtitle}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-900">
            {t.kitchenSteps.step1.fullName} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            placeholder={t.kitchenSteps.step1.fullNamePlaceholder}
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-900">
            {t.kitchenSteps.step1.phone} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder={t.kitchenSteps.step1.phonePlaceholder}
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            dir="ltr"
            required
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-900">
            {t.kitchenSteps.step1.address}
          </Label>
          <Input
            id="address"
            type="text"
            value={data.address || ''}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            placeholder={t.kitchenSteps.step1.addressPlaceholder}
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-gray-900">
            {t.kitchenSteps.step1.city}
          </Label>
          <Input
            id="city"
            type="text"
            value={data.city || ''}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            placeholder={t.kitchenSteps.step1.cityPlaceholder}
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>
    </div>
  );
}