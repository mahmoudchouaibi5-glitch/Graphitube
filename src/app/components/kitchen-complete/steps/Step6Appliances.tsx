import { IntegratedAppliances } from '../../../types/kitchen';
import { Checkbox } from '../../ui/checkbox';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { 
  Flame, 
  Wind, 
  Droplets, 
  CookingPot, 
  WashingMachine, 
  Refrigerator 
} from 'lucide-react';

interface Step6Props {
  data: IntegratedAppliances;
  onChange: (data: IntegratedAppliances) => void;
}

export function Step6Appliances({ data, onChange }: Step6Props) {
  const { t, dir } = useLanguage();
  const { playSound } = useSoundEffects();

  const cookingItems = [
    { 
      key: 'electricOven', 
      label: t.kitchenSteps.step6.electricOven,
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: t.kitchenSteps.step6.electricOvenDesc
    },
    { 
      key: 'stove', 
      label: t.kitchenSteps.step6.stove,
      icon: Flame,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: t.kitchenSteps.step6.stoveDesc
    },
    { 
      key: 'pizzaOven', 
      label: t.kitchenSteps.step6.pizzaOven,
      icon: CookingPot,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: t.kitchenSteps.step6.pizzaOvenDesc
    },
    { 
      key: 'hood', 
      label: t.kitchenSteps.step6.hood,
      icon: Wind,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      description: t.kitchenSteps.step6.hoodDesc
    },
    { 
      key: 'fridge', 
      label: t.kitchenSteps.step6.fridge,
      icon: Refrigerator,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: t.kitchenSteps.step6.fridgeDesc
    },
    { 
      key: 'waterHeater', 
      label: t.kitchenSteps.step6.waterHeater,
      icon: Droplets,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description: t.kitchenSteps.step6.waterHeaterDesc
    },
    { 
      key: 'washingMachine', 
      label: t.kitchenSteps.step6.washingMachine,
      icon: WashingMachine,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: t.kitchenSteps.step6.washingMachineDesc
    },
  ];

  const waterItems = [
    { 
      key: 'singleSink', 
      label: t.kitchenSteps.step6.singleSink,
      icon: Droplets,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      description: t.kitchenSteps.step6.singleSinkDesc
    },
    { 
      key: 'doubleSink', 
      label: t.kitchenSteps.step6.doubleSink,
      icon: Droplets,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: t.kitchenSteps.step6.doubleSinkDesc
    },
    { 
      key: 'faucet', 
      label: t.kitchenSteps.step6.faucet,
      icon: Droplets,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: t.kitchenSteps.step6.faucetDesc
    },
    { 
      key: 'soapDispenser', 
      label: t.kitchenSteps.step6.soapDispenser,
      icon: Droplets,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: t.kitchenSteps.step6.soapDispenserDesc
    },
  ];

  return (
    <div className="space-y-8" dir={dir}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.kitchenSteps.step6.title}</h2>
        <p className="text-gray-600">{t.kitchenSteps.step6.subtitle}</p>
      </div>

      {/* Cooking & Cooling */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step6.cooking}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step6.subtitle}</p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cookingItems.map((item) => {
            const Icon = item.icon;
            const isSelected = data[item.key as keyof IntegratedAppliances] as boolean;
            
            return (
              <label
                key={item.key}
                className={`relative flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all group hover:shadow-lg ${
                  isSelected
                    ? `${item.borderColor} ${item.bgColor} shadow-md scale-[1.02]`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Icon Circle */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? item.bgColor : 'bg-gray-50'
                } border ${isSelected ? item.borderColor : 'border-gray-200'} transition-all`}>
                  <Icon className={`w-6 h-6 ${isSelected ? item.color : 'text-gray-400'} transition-all`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{item.label}</span>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        onChange({ ...data, [item.key]: checked as boolean });
                        playSound('click');
                      }}
                      className="mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 left-2">
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse`}></div>
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Water & Cooling */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t.kitchenSteps.step6.waterAndSink}</h3>
            <p className="text-sm text-gray-600">{t.kitchenSteps.step6.subtitle}</p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {waterItems.map((item) => {
            const Icon = item.icon;
            const isSelected = data[item.key as keyof IntegratedAppliances] as boolean;
            
            return (
              <label
                key={item.key}
                className={`relative flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all group hover:shadow-lg ${
                  isSelected
                    ? `${item.borderColor} ${item.bgColor} shadow-md scale-[1.02]`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {/* Icon Circle */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? item.bgColor : 'bg-gray-50'
                } border ${isSelected ? item.borderColor : 'border-gray-200'} transition-all`}>
                  <Icon className={`w-6 h-6 ${isSelected ? item.color : 'text-gray-400'} transition-all`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{item.label}</span>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        onChange({ ...data, [item.key]: checked as boolean });
                        playSound('click');
                      }}
                      className="mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 left-2">
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse`}></div>
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="flex-shrink-0 text-2xl">💡</div>
          <div className="space-y-1">
            <p className="font-semibold text-blue-900">{t.kitchenSteps.step6.noteTitle}</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              {t.kitchenSteps.step6.noteText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}