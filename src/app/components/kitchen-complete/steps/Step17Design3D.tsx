import { Design3DInfo } from '../../../types/kitchen';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Image, Video, Box, Eye, Check, X } from 'lucide-react';

interface Step17Props {
  data: Design3DInfo;
  onChange: (data: Design3DInfo) => void;
}

export function Step17Design3D({ data, onChange }: Step17Props) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-8" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step17.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step17.subtitle}</p>
      </div>

      {/* Main Question */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Box className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">{t.kitchenSteps.step17.wants3DQ}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step17.subtitle}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Yes Option */}
          <button
            type="button"
            onClick={() => onChange({ ...data, wants3D: true })}
            className={`group relative p-6 border-2 rounded-2xl transition-all hover:shadow-xl ${
              data.wants3D
                ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 hover:border-indigo-300 bg-white'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
                data.wants3D
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg'
                  : 'bg-gray-100 group-hover:bg-indigo-50'
              }`}>
                <Eye className={`w-10 h-10 ${
                  data.wants3D ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'
                }`} />
              </div>
              
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">نعم</span>
                  {data.wants3D && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  أرغب في رؤية تصميم 3D للمطبخ قبل البدء في التنفيذ
                </p>
              </div>

              {/* Benefits */}
              {data.wants3D && (
                <div className="mt-2 space-y-2 w-full">
                  <div className="flex items-center gap-2 text-xs text-indigo-900 bg-white/50 rounded-lg p-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    <span>رؤية واقعية للمطبخ</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-900 bg-white/50 rounded-lg p-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>إمكانية التعديل قبل التنفيذ</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-900 bg-white/50 rounded-lg p-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    <span>تجنب الأخطاء والمفاجآت</span>
                  </div>
                </div>
              )}
            </div>
          </button>

          {/* No Option */}
          <button
            type="button"
            onClick={() => onChange({ ...data, wants3D: false })}
            className={`group relative p-6 border-2 rounded-2xl transition-all hover:shadow-xl ${
              data.wants3D === false
                ? 'border-gray-500 bg-gray-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
                data.wants3D === false
                  ? 'bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg'
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <X className={`w-10 h-10 ${
                  data.wants3D === false ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
              </div>
              
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">لا</span>
                  {data.wants3D === false && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  يمكن البدء مباشرة في التنفيذ بدون تصميم 3D
                </p>
              </div>

              {data.wants3D === false && (
                <div className="mt-2 text-xs text-gray-700 bg-white rounded-lg p-3 w-full">
                  ⚡ سيتم البدء مباشرة في التنفيذ بعد الاتفاق على التفاصيل
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* If wants 3D - Show upload info */}
      {data.wants3D && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-500">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Image className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">لنجعل التصميم أكثر دقة! 📸</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  لمساعدتنا في إعداد تصميم ثلاثي الأبعاد دقيق يطابق مكانك، يمكنك تحميل صور أو فيديو للمطبخ
                </p>
              </div>
            </div>
          </div>

          {/* Upload Options */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Photos */}
            <div className="group bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Image className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-lg mb-2">صور المكان</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>حتى <strong>4 صور</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>من زوايا مختلفة</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>للمطبخ أو الفضاء الحالي</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 <strong>نصيحة:</strong> صور واضحة تشمل الجدران والأرضية والنوافذ
                </p>
              </div>
            </div>

            {/* Video */}
            <div className="group bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-lg mb-2">فيديو للمكان</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span><strong>فيديو واحد</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>بحركة بطيئة شاملة</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>يعرض كامل الفضاء</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-800">
                  💡 <strong>نصيحة:</strong> فيديو من 30 ثانية إلى دقيقة كافٍ
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <div>
                <p className="font-semibold text-amber-900 mb-1">ملاحظة هامة</p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  سيتم طلب هذه الملفات (الصور أو الفيديو) عند التواصل الهاتفي معكم. 
                  يمكنك إرسالها عبر واتساب أو البريد الإلكتروني.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Card */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-teal-900 text-lg">لماذا التصميم ثلاثي الأبعاد؟</p>
            <ul className="space-y-2 text-sm text-teal-800">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>رؤية المطبخ بشكل واقعي قبل البدء في التنفيذ</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>إمكانية إجراء أي تعديلات ضرورية على التصميم مسبقاً</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>تجنب الأخطاء والمفاجآت غير المرغوبة</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>اختيار الألوان والمواد بثقة أكبر</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}