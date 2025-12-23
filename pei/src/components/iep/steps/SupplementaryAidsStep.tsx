import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export const SupplementaryAidsStep: React.FC = () => {
  const { data, updateData, currentSubStep } = useIEP();
  const { supplementaryAids } = data;

  // Environmental Modifications
  const updateEnvironmentalMod = (index: number, field: string, value: string) => {
    const newMods = supplementaryAids.environmentalModifications.map((mod, i) => {
      if (i === index) {
        return { ...mod, [field]: value };
      }
      return mod;
    });
    updateData({
      supplementaryAids: { ...supplementaryAids, environmentalModifications: newMods },
    });
  };

  const addEnvironmentalMod = () => {
    updateData({
      supplementaryAids: {
        ...supplementaryAids,
        environmentalModifications: [...supplementaryAids.environmentalModifications, { location: '', purpose: '', shared: '' }],
      },
    });
  };

  const removeEnvironmentalMod = (index: number) => {
    if (supplementaryAids.environmentalModifications.length > 1) {
      const newMods = supplementaryAids.environmentalModifications.filter((_, i) => i !== index);
      updateData({
        supplementaryAids: { ...supplementaryAids, environmentalModifications: newMods },
      });
    }
  };

  // Special Equipment
  const updateEquipment = (index: number, value: string) => {
    const newEquipment = supplementaryAids.specialEquipment.map((eq, i) => {
      if (i === index) return value;
      return eq;
    });
    updateData({
      supplementaryAids: { ...supplementaryAids, specialEquipment: newEquipment },
    });
  };

  const addEquipment = () => {
    updateData({
      supplementaryAids: {
        ...supplementaryAids,
        specialEquipment: [...supplementaryAids.specialEquipment, ''],
      },
    });
  };

  const removeEquipment = (index: number) => {
    if (supplementaryAids.specialEquipment.length > 1) {
      const newEquipment = supplementaryAids.specialEquipment.filter((_, i) => i !== index);
      updateData({
        supplementaryAids: { ...supplementaryAids, specialEquipment: newEquipment },
      });
    }
  };

  // Comprehension Strategies
  const updateComprehensionStrategy = (index: number, value: string) => {
    const newStrategies = supplementaryAids.comprehensionStrategies.map((s, i) => {
      if (i === index) return value;
      return s;
    });
    updateData({
      supplementaryAids: { ...supplementaryAids, comprehensionStrategies: newStrategies },
    });
  };

  const addComprehensionStrategy = () => {
    updateData({
      supplementaryAids: {
        ...supplementaryAids,
        comprehensionStrategies: [...supplementaryAids.comprehensionStrategies, ''],
      },
    });
  };

  const removeComprehensionStrategy = (index: number) => {
    if (supplementaryAids.comprehensionStrategies.length > 1) {
      const newStrategies = supplementaryAids.comprehensionStrategies.filter((_, i) => i !== index);
      updateData({
        supplementaryAids: { ...supplementaryAids, comprehensionStrategies: newStrategies },
      });
    }
  };

  // Behavior Strategies
  const updateBehaviorStrategy = (index: number, value: string) => {
    const newStrategies = supplementaryAids.behaviorStrategies.map((s, i) => {
      if (i === index) return value;
      return s;
    });
    updateData({
      supplementaryAids: { ...supplementaryAids, behaviorStrategies: newStrategies },
    });
  };

  const addBehaviorStrategy = () => {
    updateData({
      supplementaryAids: {
        ...supplementaryAids,
        behaviorStrategies: [...supplementaryAids.behaviorStrategies, ''],
      },
    });
  };

  const removeBehaviorStrategy = (index: number) => {
    if (supplementaryAids.behaviorStrategies.length > 1) {
      const newStrategies = supplementaryAids.behaviorStrategies.filter((_, i) => i !== index);
      updateData({
        supplementaryAids: { ...supplementaryAids, behaviorStrategies: newStrategies },
      });
    }
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Modificações Ambientais</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground">
                🏫 Modificações ambientais são adaptações no espaço físico da escola que ajudam seu filho a aprender melhor. Podem incluir áreas silenciosas, iluminação especial, ou espaços sensoriais.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th className="text-left py-2 pr-4 font-semibold">Local</th>
                    <th className="text-left py-2 pr-4 font-semibold">Propósito</th>
                    <th className="text-left py-2 pr-4 font-semibold">Compartilhado?</th>
                    <th className="text-left py-2 font-semibold w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {supplementaryAids.environmentalModifications.map((mod, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="py-2 pr-4">
                        <input
                          type="text"
                          className="iep-input"
                          value={mod.location}
                          onChange={(e) => updateEnvironmentalMod(index, 'location', e.target.value)}
                          placeholder="Cantinho da Leitura"
                        />
                      </td>
                      <td className="py-2 pr-4">
                        <input
                          type="text"
                          className="iep-input"
                          value={mod.purpose}
                          onChange={(e) => updateEnvironmentalMod(index, 'purpose', e.target.value)}
                          placeholder="Um espaço sensorial para trabalho privado"
                        />
                      </td>
                      <td className="py-2 pr-4">
                        <input
                          type="text"
                          className="iep-input"
                          value={mod.shared}
                          onChange={(e) => updateEnvironmentalMod(index, 'shared', e.target.value)}
                          placeholder="Sim/Não"
                        />
                      </td>
                      <td className="py-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeEnvironmentalMod(index)}
                          disabled={supplementaryAids.environmentalModifications.length <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              variant="outline"
              onClick={addEnvironmentalMod}
              className="mt-4 gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Modificação
            </Button>

            <GuideBox glossary={[
              { term: 'Sala de Recursos', definition: 'Espaço com materiais adaptados' },
              { term: 'Canto Sensorial', definition: 'Área para regulação sensorial' },
            ]}>
              <p><strong>💡 Exemplos de Modificações:</strong> Cadeira especial, iluminação reduzida, mesa separada, abafadores de ruído, espaço para pausas sensoriais.</p>
            </GuideBox>
          </section>
        );

      case 1:
        return (
          <section className="animate-fade-in pt-8 space-y-12">
            {/* Equipamentos Especiais */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Equipamentos Especiais</h2>
              
              <div className="bg-secondary/50 p-4 rounded-sm mb-6">
                <p className="text-sm text-muted-foreground">
                  🛠️ Equipamentos especiais são ferramentas ou tecnologias que ajudam seu filho a participar das atividades escolares. A escola deve fornecer esses recursos gratuitamente.
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">Adições à Sala de Aula Regular:</p>
              <div className="space-y-3">
                {supplementaryAids.specialEquipment.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-foreground rounded-full flex-shrink-0" />
                    <input
                      type="text"
                      className="iep-input flex-1"
                      value={item}
                      onChange={(e) => updateEquipment(index, e.target.value)}
                      placeholder={`Item de equipamento ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeEquipment(index)}
                      disabled={supplementaryAids.specialEquipment.length <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={addEquipment}
                className="mt-4 gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Equipamento
              </Button>
            </div>

            {/* Estratégias de Ensino */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Estratégias de Ensino</h2>
              
              <div className="bg-secondary/50 p-4 rounded-sm mb-8">
                <p className="text-sm text-muted-foreground">
                  📚 Estratégias personalizadas para ajudar seu filho a entender melhor o conteúdo e a manter um comportamento adequado em sala de aula.
                </p>
              </div>

              {/* Para Compreensão */}
              <h3 className="text-lg font-semibold mb-4 text-primary">Para Compreensão</h3>
              
              <div className="space-y-3">
                {supplementaryAids.comprehensionStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-foreground rounded-full flex-shrink-0" />
                    <input
                      type="text"
                      className="iep-input flex-1"
                      value={strategy}
                      onChange={(e) => updateComprehensionStrategy(index, e.target.value)}
                      placeholder={`Estratégia para compreensão ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeComprehensionStrategy(index)}
                      disabled={supplementaryAids.comprehensionStrategies.length <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={addComprehensionStrategy}
                className="mt-4 gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Estratégia para Compreensão
              </Button>

              {/* Para Comportamento */}
              <h3 className="text-lg font-semibold mb-4 mt-10 text-primary">Para Comportamento</h3>
              
              <div className="space-y-3">
                {supplementaryAids.behaviorStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-foreground rounded-full flex-shrink-0" />
                    <input
                      type="text"
                      className="iep-input flex-1"
                      value={strategy}
                      onChange={(e) => updateBehaviorStrategy(index, e.target.value)}
                      placeholder={`Estratégia para comportamento ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeBehaviorStrategy(index)}
                      disabled={supplementaryAids.behaviorStrategies.length <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={addBehaviorStrategy}
                className="mt-4 gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Estratégia para Comportamento
              </Button>
            </div>

            <GuideBox glossary={[
              { term: 'Reforço Positivo', definition: 'Reconhecimento de comportamentos desejados' },
              { term: 'Apoio Visual', definition: 'Uso de imagens para apoiar a compreensão' },
            ]}>
              <p className="mb-2"><strong>💡 Exemplos de Estratégias:</strong></p>
              <ul className="text-xs space-y-1">
                <li><strong>Compreensão:</strong> Instruções simplificadas, apoio visual, tempo extra, material adaptado</li>
                <li><strong>Comportamento:</strong> Sistema de recompensas, pausas programadas, sinais combinados com o professor</li>
              </ul>
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
          <h1 className="text-4xl font-black mb-2">Recursos e Modificações Suplementares</h1>
          <div className="form-divider w-full max-w-2xl" />
        </div>
        <SectionBadge number={6} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">🛠️ Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Recursos suplementares são adaptações e ferramentas que ajudam seu filho a participar plenamente da vida escolar. Eles são garantidos por lei e devem ser fornecidos gratuitamente pela escola.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Base Legal</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Lei nº 13.146/2015</strong> - Artigo 28: Garante adaptações curriculares e recursos de acessibilidade.</li>
            <li>• <strong>Decreto nº 7.611/2011</strong> - Define o apoio técnico e financeiro para recursos de acessibilidade.</li>
          </ul>
        </div>
      </section>

      {renderSubStep()}

      <NavigationButtons />
    </div>
  );
};