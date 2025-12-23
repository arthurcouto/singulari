import React, { useRef } from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Paperclip, X, FileText } from 'lucide-react';

export const ProgressStep: React.FC = () => {
  const { data, updateData, currentSubStep } = useIEP();
  const { progressChecklist } = data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateChecklistItem = (index: number, value: string) => {
    const newItems = [...progressChecklist.items];
    newItems[index] = value;
    updateData({
      progressChecklist: { ...progressChecklist, items: newItems },
    });
  };

  const addChecklistItem = () => {
    updateData({
      progressChecklist: { 
        ...progressChecklist, 
        items: [...progressChecklist.items, ''] 
      },
    });
  };

  const removeChecklistItem = (index: number) => {
    if (progressChecklist.items.length > 1) {
      const newItems = progressChecklist.items.filter((_, i) => i !== index);
      updateData({
        progressChecklist: { ...progressChecklist, items: newItems },
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newAttachments = [...(progressChecklist.attachments || [])];
      
      Array.from(files).forEach(file => {
        if (file.type === 'application/pdf') {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              newAttachments.push({ 
                name: file.name, 
                url: event.target.result as string 
              });
              updateData({
                progressChecklist: { ...progressChecklist, attachments: newAttachments },
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = (progressChecklist.attachments || []).filter((_, i) => i !== index);
    updateData({
      progressChecklist: { ...progressChecklist, attachments: newAttachments },
    });
  };

  const frequencyOptions = ['Semanal', 'Mensal', 'Bimestral', 'Anual'];
  const channelOptions = ['Ligação Telefônica', 'Resumo por E-mail', 'WhatsApp', 'Escrito, Diário de Progresso', 'Videoconferência', 'Conferência Presencial'];

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-6">Relatório e Medição</h2>
            
            <div className="mb-8">
              <h3 className="font-bold mb-4">Avaliações de Desenvolvimento</h3>
              <p className="text-sm text-muted-foreground mb-4">Defina os marcos e avaliações para medir o progresso:</p>
              
              <div className="space-y-3">
                {progressChecklist.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-foreground rounded-sm flex-shrink-0 mt-1" />
                    <input
                      type="text"
                      className="iep-input flex-1"
                      value={item}
                      onChange={(e) => updateChecklistItem(index, e.target.value)}
                      placeholder={`Avaliação de desenvolvimento ${index + 1}: ex., Avaliação inicial pelo professor de Português durante a primeira semana`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeChecklistItem(index)}
                      disabled={progressChecklist.items.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={addChecklistItem}
                className="mt-4 gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Avaliação de Desenvolvimento
              </Button>
            </div>

            {/* Attachments Section */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Anexos de Relatórios</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Anexe relatórios de profissionais, laudos médicos, avaliações e outros documentos relevantes (apenas PDF):
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2 mb-4"
              >
                <Paperclip className="w-4 h-4" />
                Anexar PDF
              </Button>

              {progressChecklist.attachments && progressChecklist.attachments.length > 0 && (
                <div className="space-y-2">
                  {progressChecklist.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-sm">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm flex-1 truncate">{attachment.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAttachment(index)}
                        className="flex-shrink-0 h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <GuideBox glossary={[
              { term: 'CBM', definition: 'Medições baseadas no currículo' },
              { term: 'DA', definition: 'Avaliação direta' },
              { term: 'MNT', definition: 'Monitoramento' },
            ]}>
              <p><strong>💡 Dica:</strong> Guarde cópias de todos os relatórios que você receber. Eles são importantes para acompanhar a evolução e para futuras reuniões do PEI.</p>
            </GuideBox>
          </section>
        );

      case 1:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-6">Cadência de Relatórios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">Frequência</h3>
                <div className="space-y-2">
                  {frequencyOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-secondary/50 rounded-sm transition-colors">
                      <input
                        type="radio"
                        name="frequency"
                        value={option}
                        checked={progressChecklist.frequency === option}
                        onChange={(e) => updateData({
                          progressChecklist: { ...progressChecklist, frequency: e.target.value },
                        })}
                        className="w-4 h-4 border-2 border-foreground"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Canal de Comunicação</h3>
                <div className="space-y-2">
                  {channelOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-secondary/50 rounded-sm transition-colors">
                      <input
                        type="radio"
                        name="channel"
                        value={option}
                        checked={progressChecklist.reportingChannel === option}
                        onChange={(e) => updateData({
                          progressChecklist: { ...progressChecklist, reportingChannel: e.target.value },
                        })}
                        className="w-4 h-4 border-2 border-foreground"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <GuideBox>
              <p><strong>💡 Recomendação:</strong> Se possível, escolha uma frequência mensal ou bimestral. Isso permite identificar problemas cedo e fazer ajustes quando necessário.</p>
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
          <h1 className="text-4xl font-black mb-2">Relatório de Progresso</h1>
          <div className="form-divider w-full max-w-md" />
        </div>
        <SectionBadge number={4} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">📊 Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          O monitoramento do progresso é essencial para garantir que as metas do PEI estejam sendo alcançadas. Esta seção define como e quando você será informado sobre o desenvolvimento do seu filho.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Seus Direitos</h4>
          <p className="text-xs text-muted-foreground">
            A Lei nº 13.146/2015 garante que os pais sejam informados regularmente sobre o progresso de seus filhos. Você pode solicitar reuniões adicionais se tiver preocupações.
          </p>
        </div>
      </section>

      {renderSubStep()}

      <NavigationButtons />
    </div>
  );
};