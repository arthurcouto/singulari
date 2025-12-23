import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Checkbox } from '@/components/ui/checkbox';

export const ParticipationStep: React.FC = () => {
  const { data, updateData } = useIEP();
  const { participation } = data;

  const frequencyOptions = [
    'Sala de Aula Regular',
    'Inclusão Parcial/Integrada',
    'Sala de Educação Especial',
    'Programa Especializado',
  ];

  const assistanceOptions = [
    'Nenhuma',
    'Com Apoio de Auxiliar',
    'Com Apoio de Professor',
  ];

  // Parse frequency as array (multiple selection)
  const selectedFrequencies = participation.frequency ? participation.frequency.split(',').filter(Boolean) : [];

  const handleFrequencyChange = (option: string, checked: boolean) => {
    let newFrequencies: string[];
    if (checked) {
      newFrequencies = [...selectedFrequencies, option];
    } else {
      newFrequencies = selectedFrequencies.filter(f => f !== option);
    }
    updateData({
      participation: { ...participation, frequency: newFrequencies.join(',') },
    });
  };

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">Participação e Extensão da Não Participação</h1>
          <div className="form-divider w-full max-w-2xl" />
        </div>
        <SectionBadge number={7} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">🏫 Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Esta seção define onde e como seu filho participará das atividades escolares. O objetivo é garantir que ele seja incluído na sala de aula regular o máximo possível, com os apoios necessários.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Princípio do Ambiente Menos Restritivo (LRE)</h4>
          <p className="text-xs text-muted-foreground">
            A lei exige que alunos com deficiência sejam educados junto com seus colegas sem deficiência na maior medida possível. A remoção da sala regular só deve ocorrer quando os apoios não forem suficientes.
          </p>
        </div>
      </section>

      {/* Participation Type */}
      <section className="pt-6">
        <h2 className="text-2xl font-bold mb-6">Tipo de Participação</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4">Frequência</h3>
            <p className="text-sm text-muted-foreground mb-4">Selecione todas as opções aplicáveis:</p>
            <div className="space-y-2">
              {frequencyOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-secondary/50 rounded-sm transition-colors border border-transparent hover:border-border">
                  <Checkbox
                    checked={selectedFrequencies.includes(option)}
                    onCheckedChange={(checked) => handleFrequencyChange(option, checked as boolean)}
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Assistência</h3>
            <p className="text-sm text-muted-foreground mb-4">Selecione uma opção:</p>
            <div className="space-y-2">
              {assistanceOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-secondary/50 rounded-sm transition-colors border border-transparent hover:border-border">
                  <input
                    type="radio"
                    name="participationAssistance"
                    value={option}
                    checked={participation.assistance === option}
                    onChange={(e) => updateData({
                      participation: { ...participation, assistance: e.target.value },
                    })}
                    className="w-4 h-4 border-2 border-foreground"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <GuideBox glossary={[
          { term: 'LRE', definition: 'Ambiente Menos Restritivo' },
          { term: 'Inclusão', definition: 'Participação plena com apoios necessários' },
          { term: 'AEE', definition: 'Atendimento Educacional Especializado' },
        ]}>
          <p className="mb-2"><strong>💡 Entendendo as Opções:</strong></p>
          <ul className="text-xs space-y-1">
            <li><strong>Sala Regular:</strong> O aluno passa todo o tempo com colegas sem deficiência</li>
            <li><strong>Inclusão Parcial:</strong> Combina tempo na sala regular com atendimento especializado</li>
            <li><strong>Sala Especial:</strong> Atendimento em grupo menor com professor especializado</li>
            <li><strong>Programa Especializado:</strong> Atendimento em instituição especializada</li>
          </ul>
        </GuideBox>
      </section>

      {/* Rights Information */}
      <section className="border-2 border-foreground p-6 rounded-sm">
        <h3 className="font-bold mb-4">⚖️ Seus Direitos</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A lei exige que os alunos com deficiências sejam educados no ambiente menos restritivo (LRE). Isso significa que o distrito deve mostrar que tentou fornecer serviços ao aluno em um ambiente de sala de aula o mais próximo possível do ambiente de educação geral.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm">
          <p className="text-xs text-muted-foreground">
            <strong>Importante:</strong> Se você discordar da colocação proposta, você tem o direito de solicitar uma revisão. A escola deve justificar por que um ambiente mais inclusivo não é adequado.
          </p>
        </div>
      </section>

      <NavigationButtons />
    </div>
  );
};