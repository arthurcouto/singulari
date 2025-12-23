import React from 'react';
import { Button } from '@/components/ui/button';
import { useIEP } from '@/context/IEPContext';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export const NavigationButtons: React.FC = () => {
  const { 
    currentStep, 
    currentSubStep, 
    totalSteps, 
    totalSubSteps,
    goNext, 
    goPrevious,
    getCurrentStepConfig,
  } = useIEP();

  const isFirstStep = currentStep === 0 && currentSubStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isLastSubStep = currentSubStep === totalSubSteps - 1;
  const isSecondToLastStep = currentStep === totalSteps - 2 && isLastSubStep;

  const currentConfig = getCurrentStepConfig();

  const progress = ((currentStep + (currentSubStep + 1) / totalSubSteps) / totalSteps) * 100;

  return (
    <div className="mt-16 pt-8 border-t border-border no-print animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progresso geral</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goPrevious}
          disabled={isFirstStep}
          className="gap-2 hover-lift"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>
        
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-foreground">
            Etapa {currentStep + 1} de {totalSteps}
          </span>
          {totalSubSteps > 1 && (
            <span className="text-xs text-muted-foreground">
              {currentConfig.subSteps[currentSubStep]}
            </span>
          )}
        </div>
        
        <Button
          onClick={goNext}
          className="gap-2 hover-lift bg-primary hover:bg-primary/90"
        >
          {isLastStep ? (
            <>
              <FileText className="w-4 h-4" />
              Ver Documento
            </>
          ) : (
            <>
              {isSecondToLastStep ? 'Ver Documento' : 'Próximo'}
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
