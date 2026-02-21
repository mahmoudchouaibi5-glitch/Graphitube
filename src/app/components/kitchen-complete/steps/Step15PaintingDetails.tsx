import { useState } from 'react';
import { PaintingDetails } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface Step15Props {
  data: PaintingDetails;
  onChange: (data: PaintingDetails) => void;
}

export function Step15PaintingDetails({ data, onChange }: Step15Props) {
  const { t, dir } = useLanguage();
  const [showColorInput, setShowColorInput] = useState<'image' | 'link' | null>(null);

  return (
    <div className="space-y-6" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step15.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step15.subtitle}</p>
      </div>

      <div>
        <Label htmlFor="paintingScope" className="text-gray-900">{t.kitchenSteps.step15.paintingScope}</Label>
        <Input
          id="paintingScope"
          type="text"
          value={data.scope || ''}
          onChange={(e) => onChange({ ...data, scope: e.target.value })}
          placeholder="مثال: السقف، الجدران، الكل..."
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="paintType" className="text-gray-900">{t.kitchenSteps.step15.paintType}</Label>
        <Input
          id="paintType"
          type="text"
          value={data.paintType || ''}
          onChange={(e) => onChange({ ...data, paintType: e.target.value })}
          placeholder="مثال: صباغة عادية، دهان زيتي، صباغة بلاستيكية..."
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div>
        <Label htmlFor="paintingColor" className="text-gray-900">{t.kitchenSteps.step15.paintingColor}</Label>
        <Input
          id="paintingColor"
          type="text"
          value={data.color || ''}
          onChange={(e) => onChange({ ...data, color: e.target.value })}
          placeholder="مثال: أبيض، بيج، رمادي فاتح..."
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          اكتب اسم اللون أو المرجع فقط، وسيتم اقتراح اللون المناسب من طرف Graphitube.
        </p>
      </div>

      {/* Color Reference */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
        <Label className="text-gray-900 font-medium">{t.kitchenSteps.step15.colorReference}</Label>
        
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
            تحميل صورة
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
            إضافة رابط
          </button>
        </div>

        {showColorInput === 'image' && (
          <div>
            <Label htmlFor="paintingColorImage" className="text-sm">{t.kitchenSteps.step15.colorImage}</Label>
            <Input
              id="paintingColorImage"
              type="url"
              value={data.colorImage || ''}
              onChange={(e) => onChange({ ...data, colorImage: e.target.value })}
              placeholder="https://example.com/paint-color.jpg"
              className="mt-1.5"
            />
          </div>
        )}

        {showColorInput === 'link' && (
          <div>
            <Label htmlFor="paintingColorLink" className="text-sm">{t.kitchenSteps.step15.colorLink}</Label>
            <Input
              id="paintingColorLink"
              type="url"
              value={data.colorLink || ''}
              onChange={(e) => onChange({ ...data, colorLink: e.target.value })}
              placeholder="https://example.com/paint-reference"
              className="mt-1.5"
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="paintingNotes" className="text-gray-900">{t.kitchenSteps.step15.paintingNotes}</Label>
        <Textarea
          id="paintingNotes"
          value={data.notes || ''}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="أي ملاحظات إضافية..."
          rows={3}
          className="mt-1.5 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}