import React, { useState } from 'react';
import { useIEP, stepConfig } from '@/context/IEPContext';
import { Check, ChevronDown } from 'lucide-react';

export const ProgressIndicator: React.FC = () => {
  const { currentStep, currentSubStep, setCurrentStep, totalSubSteps } = useIEP();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed top-0 left-0 right-0 glass z-50 no-print transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Collapsed state - always visible */}
        <div 
          className={`flex items-center justify-between py-3 transition-all duration-300 ${isExpanded ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {currentStep + 1}
            </div>
            <div>
              <p className="text-sm font-semibold">{stepConfig[currentStep].name}</p>
              {totalSubSteps > 1 && (
                <p className="text-xs text-muted-foreground">
                  {stepConfig[currentStep].subSteps[currentSubStep]}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={toggleExpanded}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm"
          >
            <span className="text-xs">Etapa {currentStep + 1} de {stepConfig.length}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded state */}
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[220px] py-4' : 'max-h-0'}`}>
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button 
              onClick={toggleExpanded}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm"
            >
              <span>Fechar</span>
              <ChevronDown className="w-4 h-4 rotate-180" />
            </button>
          </div>
          {/* Main steps */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pt-2 pb-2 scrollbar-hide">
            {stepConfig.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`group flex flex-col items-center gap-2 min-w-[70px] transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 scale-105' 
                      : isCompleted 
                        ? 'opacity-80 hover:opacity-100' 
                        : 'opacity-40 hover:opacity-60'
                  }`}
                >
                  <div 
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20' 
                        : isCompleted 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Sub-steps indicator */}
          {totalSubSteps > 1 && (
            <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-border/50">
              {stepConfig[currentStep].subSteps.map((subStep, index) => {
                const isActive = index === currentSubStep;
                const isCompleted = index < currentSubStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                        : isCompleted
                          ? 'bg-accent/20 text-accent-foreground'
                          : 'text-muted-foreground'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                      isActive
                        ? 'bg-primary-foreground text-primary'
                        : isCompleted
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <Check className="w-3 h-3" /> : index + 1}
                    </span>
                    <span className="hidden sm:inline">{subStep}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
