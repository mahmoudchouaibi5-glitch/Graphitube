import { useState } from 'react';
import { DoorSystemInfo } from '../../../types/kitchen';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { Upload, Link as LinkIcon, Sparkles, Circle, DoorOpen, Image as ImageIcon, Palette } from 'lucide-react';

interface Step9Props {
  data: DoorSystemInfo;
  onChange: (data: DoorSystemInfo) => void;
}

export function Step9DoorSystem({ data, onChange }: Step9Props) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();
  const [showColorInput, setShowColorInput] = useState<'image' | 'link' | null>(null);

  return (
    <div className="space-y-8" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step9.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step9.subtitle}</p>
      </div>

      {/* Door Installation */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <DoorOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step9.systemQ}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step9.subtitle}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              onChange({ ...data, installation: 'inset' });
              playSound('click');
            }}
            className={`p-5 border-2 rounded-xl transition-all group hover:shadow-lg ${
              data.installation === 'inset'
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${
                data.installation === 'inset'
                  ? 'bg-purple-100 border-purple-300'
                  : 'bg-gray-50 border-gray-200 group-hover:bg-purple-50'
              }`}>
                <div className="relative">
                  <div className={`w-8 h-8 border-2 rounded ${
                    data.installation === 'inset' ? 'border-purple-600' : 'border-gray-400'
                  }`}></div>
                  <div className={`absolute inset-1 border-2 rounded ${
                    data.installation === 'inset' ? 'bg-purple-200 border-purple-500' : 'bg-gray-200 border-gray-500'
                  }`}></div>
                </div>
              </div>
              <div className="flex-1 text-right">
                <div className="font-bold text-gray-900 mb-1">{t.kitchenSteps.step9.inset}</div>
                <div className="text-sm text-gray-600 mb-2">{t.kitchenSteps.step9.insetDesc}</div>
                <div className="text-xs text-gray-500 font-medium">(Inset / Intégrée)</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({ ...data, installation: 'overlay' });
              playSound('click');
            }}
            className={`p-5 border-2 rounded-xl transition-all group hover:shadow-lg ${
              data.installation === 'overlay'
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${
                data.installation === 'overlay'
                  ? 'bg-purple-100 border-purple-300'
                  : 'bg-gray-50 border-gray-200 group-hover:bg-purple-50'
              }`}>
                <div className="relative">
                  <div className={`w-8 h-8 border-2 rounded ${
                    data.installation === 'overlay' ? 'border-purple-600' : 'border-gray-400'
                  }`}></div>
                  <div className={`absolute -inset-1 border-2 rounded ${
                    data.installation === 'overlay' ? 'bg-purple-200 border-purple-500' : 'bg-gray-200 border-gray-500'
                  }`}></div>
                </div>
              </div>
              <div className="flex-1 text-right">
                <div className="font-bold text-gray-900 mb-1">{t.kitchenSteps.step9.overlay}</div>
                <div className="text-sm text-gray-600 mb-2">{t.kitchenSteps.step9.overlayDesc}</div>
                <div className="text-xs text-gray-500 font-medium">(Overlay / Appliquée)</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Finish Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step9.finishType}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step9.finishTypeDesc}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              onChange({ ...data, finish: 'glossy' });
              playSound('click');
            }}
            className={`p-5 border-2 rounded-xl transition-all group hover:shadow-lg ${
              data.finish === 'glossy'
                ? 'border-amber-500 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${
                data.finish === 'glossy'
                  ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300 shadow-inner'
                  : 'bg-gray-50 border-gray-200 group-hover:bg-amber-50'
              }`}>
                <Sparkles className={`w-8 h-8 ${
                  data.finish === 'glossy' ? 'text-amber-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1 text-right">
                <div className="font-bold text-gray-900 mb-1">{t.kitchenSteps.step9.glossy}</div>
                <div className="text-sm text-gray-600 mb-2">{t.kitchenSteps.step9.glossyDesc}</div>
                <div className="text-xs text-gray-500 font-medium">(Glossy)</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({ ...data, finish: 'matte' });
              playSound('click');
            }}
            className={`p-5 border-2 rounded-xl transition-all group hover:shadow-lg ${
              data.finish === 'matte'
                ? 'border-amber-500 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${
                data.finish === 'matte'
                  ? 'bg-gray-100 border-amber-300'
                  : 'bg-gray-50 border-gray-200 group-hover:bg-amber-50'
              }`}>
                <Circle className={`w-8 h-8 ${
                  data.finish === 'matte' ? 'text-gray-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1 text-right">
                <div className="font-bold text-gray-900 mb-1">{t.kitchenSteps.step9.matte}</div>
                <div className="text-sm text-gray-600 mb-2">{t.kitchenSteps.step9.matteDesc}</div>
                <div className="text-xs text-gray-500 font-medium">(Matte)</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Kitchen Color */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {t.kitchenSteps.step9.colorQ} <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step9.colorQDesc}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl p-5">
          <Input
            id="kitchenColor"
            type="text"
            value={data.kitchenColor}
            onChange={(e) => onChange({ ...data, kitchenColor: e.target.value })}
            placeholder={t.kitchenSteps.step9.colorPlaceholder}
            className="text-lg border-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500 bg-white"
          />
          <div className="mt-3 flex items-start gap-2 text-sm text-pink-900">
            <div className="text-xl">💡</div>
            <p className="leading-relaxed">
              {t.kitchenSteps.step9.colorNote}
            </p>
          </div>
        </div>
      </div>

      {/* Color Reference (Optional) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step9.colorRef}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step9.colorRefDesc}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setShowColorInput(showColorInput === 'image' ? null : 'image')}
              className={`flex-1 px-4 py-3 border-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                showColorInput === 'image'
                  ? 'border-blue-500 bg-blue-100 text-blue-900 shadow-md'
                  : 'border-blue-300 bg-white hover:border-blue-400 text-blue-700'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>{t.kitchenSteps.step9.uploadImage}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowColorInput(showColorInput === 'link' ? null : 'link')}
              className={`flex-1 px-4 py-3 border-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                showColorInput === 'link'
                  ? 'border-blue-500 bg-blue-100 text-blue-900 shadow-md'
                  : 'border-blue-300 bg-white hover:border-blue-400 text-blue-700'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              <span>{t.kitchenSteps.step9.addLink}</span>
            </button>
          </div>

          {showColorInput === 'image' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="colorImage" className="text-blue-900 font-medium mb-2 block">
                {t.kitchenSteps.step9.imageLink}
              </Label>
              <Input
                id="colorImage"
                type="url"
                value={data.colorImage || ''}
                onChange={(e) => onChange({ ...data, colorImage: e.target.value })}
                placeholder="https://example.com/color-image.jpg"
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          {showColorInput === 'link' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="colorLink" className="text-blue-900 font-medium mb-2 block">
                {t.kitchenSteps.step9.refLink}
              </Label>
              <Input
                id="colorLink"
                type="url"
                value={data.colorLink || ''}
                onChange={(e) => onChange({ ...data, colorLink: e.target.value })}
                placeholder="https://example.com/color-reference"
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Glass Doors with Aluminum */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" opacity="0.3"/>
              <rect x="6" y="6" width="12" height="12" rx="1" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step9.glassDoors}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step9.glassDoorsDesc}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-5">
          <Label htmlFor="glassDoors" className="text-cyan-900 font-medium mb-2 block">
            {t.kitchenSteps.step9.glassDoorsCount}
          </Label>
          <Input
            id="glassDoors"
            type="number"
            min="0"
            value={data.glassDoorsWithAluminum || ''}
            onChange={(e) =>
              onChange({ ...data, glassDoorsWithAluminum: parseInt(e.target.value) || undefined })
            }
            placeholder={t.kitchenSteps.step9.example2}
            className="border-2 border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 text-lg"
            dir="ltr"
          />
          <p className="text-xs text-cyan-800 mt-2 flex items-start gap-2">
            <span>💡</span>
            <span>{t.kitchenSteps.step9.glassDoorsNote}</span>
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0 text-2xl">✨</div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">{t.common.tip}</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              {t.kitchenSteps.step9.finishTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}