import React from 'react';
import { ClassicIcon } from './icons/ClassicIcon';
import { SepiaIcon } from './icons/SepiaIcon';
import { BWIcon } from './icons/BWIcon';
import { VignetteIcon } from './icons/VignetteIcon';

export type Effect = 'Classic' | 'Sepia Tone' | 'Black & White' | 'Vignette';

interface EffectSelectorProps {
  selectedEffect: Effect;
  onSelectEffect: (effect: Effect) => void;
}

const effects: { name: Effect; icon: JSX.Element }[] = [
  { name: 'Classic', icon: <ClassicIcon className="w-8 h-8" /> },
  { name: 'Sepia Tone', icon: <SepiaIcon className="w-8 h-8" /> },
  { name: 'Black & White', icon: <BWIcon className="w-8 h-8" /> },
  { name: 'Vignette', icon: <VignetteIcon className="w-8 h-8" /> },
];

const EffectSelector: React.FC<EffectSelectorProps> = ({ selectedEffect, onSelectEffect }) => {
  return (
    <div className="w-full mt-6">
      <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">Choose a Magic Style!</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {effects.map(({ name, icon }) => {
          const isSelected = selectedEffect === name;
          return (
            <button
              key={name}
              onClick={() => onSelectEffect(name)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-2xl 
                border-4 transition-all duration-200 transform
                ${isSelected 
                  ? 'bg-orange-100 border-orange-500 scale-105 shadow-lg' 
                  : 'bg-white/80 border-gray-200 hover:border-orange-300 hover:bg-white'
                }
              `}
              aria-pressed={isSelected}
            >
              <div className="text-orange-500">{icon}</div>
              <span className="mt-2 font-semibold text-sm text-gray-700">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EffectSelector;