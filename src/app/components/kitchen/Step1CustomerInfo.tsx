import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { CustomerInfo } from '../../types';

interface Step1CustomerInfoProps {
  data: CustomerInfo;
  onChange: (data: CustomerInfo) => void;
}

export function Step1CustomerInfo({ data, onChange }: Step1CustomerInfoProps) {
  // Safe defaults
  const safeData = data || { fullName: '', phone: '', address: '', city: '' };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">معلومات التواصل</h2>
        <p className="text-gray-600">املأ بياناتك الشخصية للتواصل معك</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-gray-900">
            الاسم الكامل <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            value={safeData.fullName || ''}
            onChange={(e) => onChange({ ...safeData, fullName: e.target.value })}
            placeholder="أدخل اسمك الكامل"
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-900">
            رقم الهاتف <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={safeData.phone || ''}
            onChange={(e) => onChange({ ...safeData, phone: e.target.value })}
            placeholder="0612345678"
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            dir="ltr"
            required
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-900">
            العنوان
          </Label>
          <Input
            id="address"
            type="text"
            value={safeData.address || ''}
            onChange={(e) => onChange({ ...safeData, address: e.target.value })}
            placeholder="المدينة أو المنطقة"
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-gray-900">
            المدينة
          </Label>
          <Input
            id="city"
            type="text"
            value={safeData.city || ''}
            onChange={(e) => onChange({ ...safeData, city: e.target.value })}
            placeholder="الدار البيضاء، الرباط، مراكش..."
            className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
      </div>
    </div>
  );
}