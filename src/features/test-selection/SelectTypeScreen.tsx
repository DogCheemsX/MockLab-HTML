import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { UniversityKey } from '../../types/test';
import { UserProfile } from '../../types/auth';
import { PremiumModal } from '../../components/modals/PremiumModal';

interface SelectTypeScreenProps {
  userData: UserProfile | null;
}

export const SelectTypeScreen: React.FC<SelectTypeScreenProps> = React.memo(({ userData }) => {
  const { uniKey } = useParams<{ uniKey: string }>();
  const navigate = useNavigate();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const key = uniKey as UniversityKey;
  const uniData = testData[key];

  if (!uniData) {
    return <Navigate to="/select-university" replace />;
  }

  const handleSelectType = (typeId: string) => {
    if (typeId === 'nat-ie' && (!userData || userData.isPremium === false)) {
      setIsPremiumModalOpen(true);
      return;
    }
    navigate(`/test-info/${uniKey}/${typeId}`);
  };

  return (
    <div id="screen-type" className="w-full max-w-md flex flex-col items-center">
      <button
        onClick={() => navigate('/select-university')}
        className="self-start mb-6 text-sm font-bold text-gray-400 hover:text-white transition-colors"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Select Test Type</h1>
      <div id="type-options" className="w-full space-y-3">
        {uniData.options.map((opt) => {
          const isLocked = opt.id === 'nat-ie';
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectType(opt.id)}
              className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
            >
              {isLocked ? `🔒 ${opt.name}` : opt.name}
            </button>
          );
        })}
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
});

SelectTypeScreen.displayName = 'SelectTypeScreen';
