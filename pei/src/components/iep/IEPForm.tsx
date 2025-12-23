import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { ProgressIndicator } from './ProgressIndicator';
import { CoverStep } from './steps/CoverStep';
import { StudentProfileStep } from './steps/StudentProfileStep';
import { PerformanceStep } from './steps/PerformanceStep';
import { GoalsStep } from './steps/GoalsStep';
import { ProgressStep } from './steps/ProgressStep';
import { ServicesStep } from './steps/ServicesStep';
import { SupplementaryAidsStep } from './steps/SupplementaryAidsStep';
import { ParticipationStep } from './steps/ParticipationStep';
import { ConsentStep } from './steps/ConsentStep';
import { FinalDocumentStep } from './steps/FinalDocumentStep';

export const IEPForm: React.FC = () => {
  const { currentStep } = useIEP();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CoverStep />;
      case 1:
        return <StudentProfileStep />;
      case 2:
        return <PerformanceStep />;
      case 3:
        return <GoalsStep />;
      case 4:
        return <ProgressStep />;
      case 5:
        return <ServicesStep />;
      case 6:
        return <SupplementaryAidsStep />;
      case 7:
        return <ParticipationStep />;
      case 8:
        return <ConsentStep />;
      case 9:
        return <FinalDocumentStep />;
      default:
        return <CoverStep />;
    }
  };

  return (
    <div className="min-h-screen">
      <ProgressIndicator />
      <main className="max-w-5xl mx-auto px-4 py-8 pt-24">
        {renderStep()}
      </main>
    </div>
  );
};
