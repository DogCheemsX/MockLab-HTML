import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { testData } from '../../data/testData';
import { questionBank } from '../../data/questionBank';
import { UniversityKey } from '../../types/test';
import { UseTestSessionReturn } from '../../hooks/useTestSession';

interface TestInfoScreenProps {
  testSession: UseTestSessionReturn;
}

export const TestInfoScreen: React.FC<TestInfoScreenProps> = React.memo(({ testSession }) => {
  const { uniKey, typeId } = useParams<{ uniKey: string; typeId: string }>();
  const navigate = useNavigate();

  const key = uniKey as UniversityKey;
  const uniData = testData[key];

  if (!uniData || !typeId) {
    return <Navigate to="/select-university" replace />;
  }

  const selectedOpt = uniData.options.find((o) => o.id === typeId);
  const typeName = selectedOpt ? selectedOpt.name : typeId;
  const infoData = uniData.info || (uniData.infoMap ? uniData.infoMap[typeId] : null);

  if (!infoData) {
    return <Navigate to={`/select-type/${uniKey}`} replace />;
  }

  const handleStartTest = () => {
    const questions = questionBank[typeId] || [];
    if (questions.length === 0) {
      alert('No questions found for this test category.');
      return;
    }

    const durationMinutes = parseInt(infoData.time.split(' ')[0], 10) || 120;
    testSession.initSession(questions, key, typeId, typeName, durationMinutes);
    navigate('/test-runner?q=1');
  };

  return (
    <div id="screen-info" className="w-full max-w-md flex flex-col items-center">
      <button
        onClick={() => navigate(`/select-type/${uniKey}`)}
        className="self-start mb-6 text-sm font-bold text-gray-400 hover:text-white transition-colors"
      >
        ← Back
      </button>
      <h1 id="info-title" className="text-3xl font-extrabold mb-6 tracking-tight text-center text-indigo-400">
        {typeName}
      </h1>
      <div className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl p-6 shadow-lg mb-8 text-left">
        <div className="mb-4">
          <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Duration</span>
          <span id="info-time" className="text-lg font-bold text-gray-100">
            {infoData.time}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider">Total Marks</span>
          <span id="info-marks" className="text-lg font-bold text-gray-100">
            {infoData.marks}
          </span>
        </div>
        <div>
          <span className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Subject Breakdown</span>
          <ul id="info-breakdown" className="list-none space-y-1 text-md font-medium text-gray-300">
            {infoData.breakdown.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleStartTest}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-extrabold text-xl py-4 px-6 rounded-xl shadow-lg"
      >
        START TEST
      </button>
    </div>
  );
});

TestInfoScreen.displayName = 'TestInfoScreen';
