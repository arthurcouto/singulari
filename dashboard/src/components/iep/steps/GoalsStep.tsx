import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { FormField } from '../FormField';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GoalsStep: React.FC = () => {
  const { data, updateData } = useIEP();
  const { academicGoals } = data;

  const updateGoal = (index: number, field: string, value: string) => {
    const newGoals = [...academicGoals];
    newGoals[index] = { ...newGoals[index], [field]: value };
    updateData({ academicGoals: newGoals });
  };

  const addGoal = () => {
    updateData({
      academicGoals: [...academicGoals, { subject: '', goal: '', measurable: '', attainable: '', relevant: '', timeBased: '' }],
    });
  };

  const removeGoal = (index: number) => {
    if (academicGoals.length > 1) {
      const newGoals = academicGoals.filter((_, i) => i !== index);
      updateData({ academicGoals: newGoals });
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">Metas Anuais</h1>
          <div className="form-divider w-full max-w-md" />
        </div>
        <SectionBadge number={3} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">🎯 Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          As metas anuais definem o que esperamos que seu filho alcance em um período de 12 meses. Elas devem ser desafiadoras, mas alcançáveis, e sempre baseadas nas necessidades identificadas na avaliação.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 O que são Metas S.M.A.R.T.?</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li><strong>S</strong> - Específica: Clara e bem definida</li>
            <li><strong>M</strong> - Mensurável: Pode ser medida objetivamente</li>
            <li><strong>A</strong> - Alcançável: Realista para o aluno</li>
            <li><strong>R</strong> - Relevante: Importante para o desenvolvimento</li>
            <li><strong>T</strong> - Temporal: Com prazo definido</li>
          </ul>
        </div>
      </section>

      {/* S.M.A.R.T. Goals */}
      <section className="pt-6">
        <h2 className="text-2xl font-bold mb-6">Metas Acadêmicas S.M.A.R.T.</h2>
        
        {academicGoals.map((goal, index) => (
          <div key={index} className="space-y-6 mb-12 border-l-4 border-foreground pl-6 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Meta Específica {index + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeGoal(index)}
                disabled={academicGoals.length <= 1}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Matéria"
                value={goal.subject}
                onChange={(v) => updateGoal(index, 'subject', v)}
                placeholder="Português"
              />
            </div>

            <FormField
              label="Declaração da Meta"
              value={goal.goal}
              onChange={(v) => updateGoal(index, 'goal', v)}
              type="textarea"
              placeholder="João Silva melhorará sua compreensão de leitura usando estratégias para decodificar palavras desconhecidas ao ler com 90% de precisão ao ler uma passagem de 150 palavras."
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/30 p-4 rounded-sm">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Mensurável</h4>
                <FormField
                  label=""
                  value={goal.measurable}
                  onChange={(v) => updateGoal(index, 'measurable', v)}
                  type="textarea"
                  placeholder="Medido em contos curtos, parágrafos ou tarefas com cerca de 150 palavras. 90% de precisão medido pelo sucesso na identificação de palavras desconhecidas."
                  rows={3}
                />
              </div>
              <div className="bg-secondary/30 p-4 rounded-sm">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Alcançável</h4>
                <FormField
                  label=""
                  value={goal.attainable}
                  onChange={(v) => updateGoal(index, 'attainable', v)}
                  type="textarea"
                  placeholder="Alinha-se com a expectativa do fonoaudiólogo de um nível de leitura da 8ª série. Pode ser feito em casa e na sala de aula."
                  rows={3}
                />
              </div>
              <div className="bg-secondary/30 p-4 rounded-sm">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Relevante</h4>
                <FormField
                  label=""
                  value={goal.relevant}
                  onChange={(v) => updateGoal(index, 'relevant', v)}
                  type="textarea"
                  placeholder="Alinha-se com exercícios de classe como leitura em pequenos grupos, tarefas de leitura individual e leituras para casa."
                  rows={3}
                />
              </div>
              <div className="bg-secondary/30 p-4 rounded-sm">
                <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Temporal</h4>
                <FormField
                  label=""
                  value={goal.timeBased}
                  onChange={(v) => updateGoal(index, 'timeBased', v)}
                  type="textarea"
                  placeholder="Avaliado uma vez por mês pelo professor. Avaliação final no final do ano letivo."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addGoal}
          className="mb-8"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Meta
        </Button>

      </section>

      <NavigationButtons />
    </div>
  );
};