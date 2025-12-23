import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { FormField } from '../FormField';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PerformanceStep: React.FC = () => {
  const { data, updateData, currentSubStep } = useIEP();
  const { teacherEvaluations, strengthsLimitations } = data;

  const updateEvaluation = (index: number, field: string, value: string) => {
    const newEvaluations = [...teacherEvaluations];
    newEvaluations[index] = { ...newEvaluations[index], [field]: value };
    updateData({ teacherEvaluations: newEvaluations });
  };

  const addEvaluation = () => {
    updateData({
      teacherEvaluations: [...teacherEvaluations, { subject: '', teacher: '', date: '', evaluation: '' }],
    });
  };

  const removeEvaluation = (index: number) => {
    if (teacherEvaluations.length > 1) {
      const newEvaluations = teacherEvaluations.filter((_, i) => i !== index);
      updateData({ teacherEvaluations: newEvaluations });
    }
  };

  const updateStrength = (index: number, value: string) => {
    const newStrengths = [...strengthsLimitations.strengths];
    newStrengths[index] = value;
    updateData({
      strengthsLimitations: { ...strengthsLimitations, strengths: newStrengths },
    });
  };

  const updateLimitation = (index: number, value: string) => {
    const newLimitations = [...strengthsLimitations.limitations];
    newLimitations[index] = value;
    updateData({
      strengthsLimitations: { ...strengthsLimitations, limitations: newLimitations },
    });
  };

  const addStrengthLimitation = () => {
    updateData({
      strengthsLimitations: {
        strengths: [...strengthsLimitations.strengths, ''],
        limitations: [...strengthsLimitations.limitations, ''],
      },
    });
  };

  const removeStrengthLimitation = (index: number) => {
    if (strengthsLimitations.strengths.length > 1) {
      updateData({
        strengthsLimitations: {
          strengths: strengthsLimitations.strengths.filter((_, i) => i !== index),
          limitations: strengthsLimitations.limitations.filter((_, i) => i !== index),
        },
      });
    }
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-6">Avaliação do Professor</h2>
            
            <div className="space-y-8">
              {teacherEvaluations.map((evaluation, index) => (
                <div key={index} className="border-l-4 border-foreground pl-6 relative">
                  <div className="absolute top-0 right-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeEvaluation(index)}
                      disabled={teacherEvaluations.length <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-12">
                    <FormField
                      label="Matéria"
                      value={evaluation.subject}
                      onChange={(v) => updateEvaluation(index, 'subject', v)}
                      placeholder="Português"
                    />
                    <FormField
                      label="Professor"
                      value={evaluation.teacher}
                      onChange={(v) => updateEvaluation(index, 'teacher', v)}
                      placeholder="Nome do Professor"
                    />
                    <FormField
                      label="Data"
                      value={evaluation.date}
                      onChange={(v) => updateEvaluation(index, 'date', v)}
                      placeholder="19/06/2019"
                    />
                  </div>
                  <FormField
                    label="Avaliação"
                    value={evaluation.evaluation}
                    onChange={(v) => updateEvaluation(index, 'evaluation', v)}
                    type="textarea"
                    placeholder="Escreva a avaliação do professor sobre o desempenho do aluno nesta matéria..."
                    rows={5}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addEvaluation}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Avaliação
              </Button>
            </div>

            <GuideBox glossary={[
              { term: 'PLAAFP', definition: 'Nível atual de desempenho acadêmico e funcional' },
              { term: 'AEE', definition: 'Atendimento Educacional Especializado' },
            ]}>
              <p><strong>💡 Dica para Pais:</strong> Se você discordar de alguma avaliação, anote suas observações. Você pode solicitar uma reunião para discutir os pontos de divergência.</p>
            </GuideBox>
          </section>
        );

      case 1:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Pontos Fortes e Limitações</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground">
                ⚖️ Identificar pontos fortes e limitações ajuda a equipe a desenvolver estratégias personalizadas. Lembre-se: todos têm pontos fortes que podem ser usados para superar desafios!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold border-b-2 border-foreground pb-2">
                <div className="col-span-5">Ponto Forte</div>
                <div className="col-span-5">Limitação</div>
                <div className="col-span-2 text-center">Ações</div>
              </div>

              {strengthsLimitations.strengths.map((strength, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      className="iep-input"
                      value={strength}
                      onChange={(e) => updateStrength(index, e.target.value)}
                      placeholder={`Ponto forte ${index + 1}`}
                    />
                  </div>
                  <div className="col-span-5">
                    <input
                      type="text"
                      className="iep-input"
                      value={strengthsLimitations.limitations[index] || ''}
                      onChange={(e) => updateLimitation(index, e.target.value)}
                      placeholder={`Limitação ${index + 1}`}
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeStrengthLimitation(index)}
                      disabled={strengthsLimitations.strengths.length <= 1}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addStrengthLimitation}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Linha
              </Button>
            </div>

            <GuideBox glossary={[
              { term: 'Ponto Forte', definition: 'Habilidade ou característica positiva do aluno' },
              { term: 'Limitação', definition: 'Área que precisa de apoio ou desenvolvimento' },
            ]}>
              <p><strong>💡 Exemplos de Pontos Fortes:</strong> Boa memória visual, criatividade, empatia, interesse em tecnologia, habilidade musical.</p>
              <p className="mt-2"><strong>💡 Exemplos de Limitações:</strong> Dificuldade de concentração, ansiedade em situações sociais, leitura abaixo do esperado.</p>
            </GuideBox>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">Nível Atual de Desempenho Acadêmico</h1>
          <div className="form-divider w-full max-w-2xl" />
        </div>
        <SectionBadge number={2} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">📊 Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          O PLAAFP (Presente Nível de Desempenho Acadêmico e Funcional) descreve como seu filho está se saindo academicamente neste momento. É como uma "fotografia" das habilidades e necessidades atuais.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Por que é importante?</h4>
          <p className="text-xs text-muted-foreground">
            Esta avaliação deve ser atualizada anualmente e serve como base para definir metas realistas. A Lei nº 13.146/2015 garante que seu filho tenha direito a uma avaliação completa e individualizada.
          </p>
        </div>
      </section>

      {renderSubStep()}

      <NavigationButtons />
    </div>
  );
};