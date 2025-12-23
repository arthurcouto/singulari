import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { IEPData, defaultIEPData } from '@/types/iep';

// Define sub-steps for each main step
export const stepConfig = [
  { name: 'Capa', subSteps: ['Informações Básicas'] },
  { name: 'Perfil do Aluno', subSteps: ['Informações do Aluno', 'Equipe do PEI', 'Perfil do Aprendiz'] },
  { name: 'Desempenho', subSteps: ['Avaliação do Professor', 'Pontos Fortes e Limitações'] },
  { name: 'Metas', subSteps: ['Metas Anuais'] },
  { name: 'Progresso', subSteps: ['Relatório e Medição', 'Cadência de Relatórios'] },
  { name: 'Serviços', subSteps: ['Serviços Relacionados'] },
  { name: 'Recursos', subSteps: ['Modificações Ambientais', 'Equipamentos e Estratégias'] },
  { name: 'Participação', subSteps: ['Participação e Extensão'] },
  { name: 'Consentimento', subSteps: ['Salvaguardas Processuais', 'Consentimento Informado'] },
  { name: 'Documento Final', subSteps: ['Visualização e Impressão'] },
];

const STORAGE_KEY = 'iep-form-data';
const STEP_STORAGE_KEY = 'iep-current-step';

interface IEPContextType {
  data: IEPData;
  updateData: (updates: Partial<IEPData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  currentSubStep: number;
  setCurrentSubStep: (subStep: number) => void;
  totalSteps: number;
  totalSubSteps: number;
  goNext: () => void;
  goPrevious: () => void;
  getCurrentStepConfig: () => { name: string; subSteps: string[] };
}

const IEPContext = createContext<IEPContextType | undefined>(undefined);

// Load saved data from localStorage
const loadSavedData = (): IEPData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultIEPData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading saved IEP data:', e);
  }
  return defaultIEPData;
};

// Load saved step from localStorage
const loadSavedStep = (): { step: number; subStep: number } => {
  try {
    const saved = localStorage.getItem(STEP_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading saved step:', e);
  }
  return { step: 0, subStep: 0 };
};

export const IEPProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IEPData>(loadSavedData);
  const savedStep = loadSavedStep();
  const [currentStep, setCurrentStep] = useState(savedStep.step);
  const [currentSubStep, setCurrentSubStep] = useState(savedStep.subStep);
  const totalSteps = stepConfig.length;

  // Auto-save data to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving IEP data:', e);
      }
    }, 500); // Debounce saving

    return () => clearTimeout(timeoutId);
  }, [data]);

  // Save current step to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify({ step: currentStep, subStep: currentSubStep }));
    } catch (e) {
      console.error('Error saving step:', e);
    }
  }, [currentStep, currentSubStep]);

  const getCurrentStepConfig = useCallback(() => stepConfig[currentStep], [currentStep]);
  const totalSubSteps = getCurrentStepConfig().subSteps.length;

  const updateData = useCallback((updates: Partial<IEPData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    const currentConfig = stepConfig[currentStep];
    if (currentSubStep < currentConfig.subSteps.length - 1) {
      setCurrentSubStep(currentSubStep + 1);
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentSubStep(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, currentSubStep, totalSteps]);

  const goPrevious = useCallback(() => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      const prevStepConfig = stepConfig[currentStep - 1];
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(prevStepConfig.subSteps.length - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, currentSubStep]);

  const handleSetCurrentStep = useCallback((step: number) => {
    setCurrentStep(step);
    setCurrentSubStep(0);
  }, []);

  return (
    <IEPContext.Provider value={{ 
      data, 
      updateData, 
      currentStep, 
      setCurrentStep: handleSetCurrentStep, 
      currentSubStep,
      setCurrentSubStep,
      totalSteps, 
      totalSubSteps,
      goNext,
      goPrevious,
      getCurrentStepConfig,
    }}>
      {children}
    </IEPContext.Provider>
  );
};

export const useIEP = () => {
  const context = useContext(IEPContext);
  if (!context) {
    throw new Error('useIEP must be used within an IEPProvider');
  }
  return context;
};
