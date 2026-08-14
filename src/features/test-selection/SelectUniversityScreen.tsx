import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversityKey } from '../../types/test';

export const SelectUniversityScreen: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const handleSelectUniversity = (uniKey: UniversityKey) => {
    navigate(`/select-type/${uniKey}`);
  };

  return (
    <div id="screen-home" className="w-full max-w-md flex flex-col items-center">
      <button
        onClick={() => navigate('/')}
        className="self-start mb-6 text-sm font-bold text-gray-400 hover:text-white transition-colors"
      >
        ← Back to Home
      </button>
      <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-center">Select Test</h1>

      <div className="w-full space-y-3">
        <button
          onClick={() => handleSelectUniversity('COMSATS')}
          className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
        >
          COMSATS Admission Test (NTS NAT)
        </button>
        <button
          onClick={() => handleSelectUniversity('PIEAS')}
          className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
        >
          PIEAS Admission Test
        </button>
        <button
          onClick={() => handleSelectUniversity('AIR')}
          className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
        >
          Air Admission Test
        </button>
        <button
          onClick={() => handleSelectUniversity('BAHRIA')}
          className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
        >
          Bahria Admission Test
        </button>
        <button
          onClick={() => handleSelectUniversity('NTS')}
          className="w-full bg-gray-800 border-2 border-gray-700 hover:border-white hover:bg-white hover:text-black transition-all font-bold text-lg py-4 px-6 rounded-xl shadow-sm text-left"
        >
          OR NTS NAT
        </button>
      </div>
    </div>
  );
});

SelectUniversityScreen.displayName = 'SelectUniversityScreen';
