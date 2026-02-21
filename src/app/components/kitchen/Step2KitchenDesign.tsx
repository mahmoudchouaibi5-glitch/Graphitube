import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { KitchenDimensions, KitchenDesignType } from '../../types';
import { Textarea } from '../ui/textarea';

interface Step2KitchenDesignProps {
  data: KitchenDimensions;
  onChange: (data: KitchenDimensions) => void;
}

const kitchenTypes: { value: KitchenDesignType; label: string; icon: string }[] = [
  { value: 'straight', label: 'مطبخ مستقيم (I)', icon: '━' },
  { value: 'l-shape', label: 'مطبخ على شكل حرف L', icon: '┗' },
  { value: 'u-shape', label: 'مطبخ على شكل حرف U', icon: '┗┛' },
  { value: 'g-shape', label: 'مطبخ على شكل حرف G', icon: '┗┛┓' },
  { value: 'island', label: 'مطبخ مستقيم مع جزيرة', icon: '━ ▭' },
  { value: 'other', label: 'تصميم آخر (يُرجى التوضيح)', icon: '?' },
];

export function Step2KitchenDesign({ data, onChange }: Step2KitchenDesignProps) {
  const handleTypeChange = (type: KitchenDesignType) => {
    // ✅ فقط تحديث نوع التصميم دون حذف البيانات الأخرى
    // إذا كان المستخدم يختار نفس النوع، لا نعمل شيء
    if (data.type === type) {
      return; // نفس النوع، لا داعي للتحديث
    }
    
    // ✅ نحافظ على البيانات الموجودة ونضيف النوع الجديد فقط
    onChange({
      ...data, // نحافظ على كل البيانات القديمة
      type,
    });
  };

  const handleCustomDescriptionChange = (value: string) => {
    onChange({ ...data, customDescription: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">تفاصيل المطبخ المطلوب</h2>
        <p className="text-gray-600">اختر نوع تصميم المطبخ الذي يناسب مساحتك</p>
      </div>

      <div>
        <Label className="text-base mb-4 block">نوع تصميم المطبخ</Label>
        <div className="grid md:grid-cols-2 gap-4">
          {kitchenTypes.map((type) => (
            <Card
              key={type.value}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                data.type === type.value
                  ? 'border-2 border-amber-500 bg-amber-50'
                  : 'border-2 border-gray-200 hover:border-amber-300'
              }`}
              onClick={() => handleTypeChange(type.value)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl font-mono">
                  {type.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                </div>
                {data.type === type.value && (
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {data.type === 'other' && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <Label htmlFor="customDescription" className="text-base mb-2 block">
            وصف التصميم المخصص
          </Label>
          <Textarea
            id="customDescription"
            value={data.customDescription || ''}
            onChange={(e) => handleCustomDescriptionChange(e.target.value)}
            placeholder="صف لنا التصميم الذي تريده بالتفصيل..."
            className="mt-2 min-h-[120px]"
          />
          <p className="text-sm text-blue-800 mt-4">
            بما أن هذا التصميم خاص ومخصص، سيتم التواصل معكم هاتفياً من طرف فريق Graphitube لتوضيح التفاصيل وتقديم عرض الثمن المناسب.
          </p>
        </div>
      )}
    </div>
  );
}