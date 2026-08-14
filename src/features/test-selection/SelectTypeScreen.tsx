import React from 'react';
import { TestOption } from '../../types/test';

interface SelectTypeScreenProps {
  options: TestOption[];
  onSelectType: (typeId: string, typeName: string) => void;
  onBack: () => void;
}

export const SelectTypeScreen: React.FC<SelectTypeScreenProps> = React.memo(
  ({ options, onSelectType, onBack }) => {
    return (
      <div id="screen-type" className="w-full max-w-md flex flex-col items-center">
        <button
          onClick={onBack}
          className="self-start mb-6 text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Select Test Type</h1>
        <div id="type-options" className="w-full space-y-3">
          {options.map((opt) => {
            const isLocked = opt.id === 'nat-ie';
            return (
              <button
                key={opt.id}
                onClick={() => onSelectType(opt.id, opt.name)}
                className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
              >
                {isLocked ? `🔒 ${opt.name}` : opt.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

SelectTypeScreen.displayName = 'SelectTypeScreen';
