import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { FormField } from '../FormField';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';

export const ConsentStep: React.FC = () => {
  const { data, updateData, currentSubStep } = useIEP();
  const { proceduralSafeguards, informedConsent } = data;

  const updateSafeguards = (field: string, value: string) => {
    updateData({
      proceduralSafeguards: { ...proceduralSafeguards, [field]: value },
    });
  };

  const updateConsent = (field: string, value: string | boolean) => {
    updateData({
      informedConsent: { ...informedConsent, [field]: value },
    });
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Salvaguardas Processuais</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                🛡️ As salvaguardas processuais são seus direitos legais como pai ou responsável. Elas garantem que você participe ativamente de todas as decisões sobre a educação do seu filho.
              </p>
              <div className="bg-primary/5 p-3 rounded-sm border-l-4 border-primary mt-3">
                <p className="text-xs">
                  <strong>📖 Seus Direitos Incluem:</strong> Acesso a todos os registros educacionais, participação em todas as reuniões, direito de discordar e solicitar mediação ou audiência.
                </p>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-sm mb-6">
              <p className="text-sm leading-relaxed mb-4">
                <strong>Estado do Rio de Janeiro</strong> — Como pai de um aluno que é ou pode ser elegível para serviços de educação especial, você tem direitos em relação à identificação, avaliação, classificação, desenvolvimento de um PEI, colocação e provisão de educação pública gratuita e apropriada.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Uma cópia dos seus direitos deve ser fornecida a você após o encaminhamento para uma avaliação inicial, quando uma ação disciplinar é proposta, e quando você solicita informações sobre o processo.
              </p>
            </div>

            <h3 className="font-bold mb-4">Representantes da Escola</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Estes são os representantes da escola que podem esclarecer dúvidas sobre o PEI e os direitos do aluno. Os pais e responsáveis podem entrar em contato com eles a qualquer momento:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FormField
                label="Nome"
                value={proceduralSafeguards.representative1Name}
                onChange={(v) => updateSafeguards('representative1Name', v)}
                placeholder="Maria Santos"
              />
              <FormField
                label="Cargo"
                value={proceduralSafeguards.representative1Title}
                onChange={(v) => updateSafeguards('representative1Title', v)}
                placeholder="Diretora de Serviços Especiais"
              />
              <FormField
                label="Contato"
                value={proceduralSafeguards.representative1Contact}
                onChange={(v) => updateSafeguards('representative1Contact', v)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Nome"
                value={proceduralSafeguards.representative2Name}
                onChange={(v) => updateSafeguards('representative2Name', v)}
                placeholder="João Oliveira"
              />
              <FormField
                label="Cargo"
                value={proceduralSafeguards.representative2Title}
                onChange={(v) => updateSafeguards('representative2Title', v)}
                placeholder="Representante do Distrito Escolar"
              />
              <FormField
                label="Contato"
                value={proceduralSafeguards.representative2Contact}
                onChange={(v) => updateSafeguards('representative2Contact', v)}
                placeholder="(11) 88888-8888"
              />
            </div>

            <GuideBox glossary={[
              { term: 'Mediação', definition: 'Processo voluntário de resolução de conflitos' },
              { term: 'Audiência', definition: 'Processo formal de resolução de disputas' },
            ]}>
              <p><strong>💡 Importante:</strong> Guarde os contatos dos representantes da escola. Eles são os profissionais responsáveis por esclarecer dúvidas dos pais e responsáveis sobre o PEI e podem ajudá-lo se você discordar de alguma decisão.</p>
            </GuideBox>
          </section>
        );

      case 1:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Consentimento Informado</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground">
                ✍️ O consentimento informado é sua autorização para que os serviços do PEI sejam iniciados. Você tem o direito de revisar o documento por até 15 dias antes de decidir.
              </p>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-sm mb-6">
              <p className="text-sm leading-relaxed mb-4">
                <strong>Estado do Rio de Janeiro</strong> — Este formulário é usado quando o PEI proposto deve ser implementado antes que o período de aviso de 15 dias tenha expirado. A assinatura dos pais é necessária para documentar a concordância em iniciar os serviços mais cedo.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Você tem o direito de considerar o PEI proposto por até 15 dias corridos. Para que os serviços do PEI comecem antes dos 15 dias expirarem, você deve assinar abaixo.
              </p>
            </div>

            <div className="border-2 border-foreground p-6 rounded-sm mb-6">
              <p className="text-sm mb-6">
                Eu/Nós recebemos uma cópia do PEI proposto e concordamos em iniciar os serviços do PEI antes que os 15 dias corridos tenham expirado.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    label="Nome do Responsável 1"
                    value={informedConsent.parent1Name}
                    onChange={(v) => updateConsent('parent1Name', v)}
                    placeholder="José Silva"
                  />
                  <FormField
                    label="Data"
                    value={informedConsent.parent1Date}
                    onChange={(v) => updateConsent('parent1Date', v)}
                    placeholder="12/08/2019"
                  />
                </div>
                <div className="space-y-4">
                  <FormField
                    label="Nome do Responsável 2"
                    value={informedConsent.parent2Name}
                    onChange={(v) => updateConsent('parent2Name', v)}
                    placeholder="Maria Silva"
                  />
                  <FormField
                    label="Data"
                    value={informedConsent.parent2Date}
                    onChange={(v) => updateConsent('parent2Date', v)}
                    placeholder="12/08/2019"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer mt-6 p-3 bg-secondary/50 rounded-sm">
                <input
                  type="checkbox"
                  checked={informedConsent.agreed}
                  onChange={(e) => updateConsent('agreed', e.target.checked)}
                  className="w-5 h-5 border-2 border-foreground"
                />
                <span className="text-sm font-medium">Concordo com os termos descritos neste documento do PEI</span>
              </label>
            </div>

            <GuideBox>
              <p className="mb-2"><strong>⚠️ Antes de Assinar:</strong></p>
              <ul className="text-xs space-y-1">
                <li>• Leia todo o documento com atenção</li>
                <li>• Tire todas as suas dúvidas com a equipe</li>
                <li>• Você pode pedir alterações antes de concordar</li>
                <li>• Se discordar, você pode recusar e solicitar uma nova reunião</li>
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
          <h1 className="text-4xl font-black mb-2">Consentimento e Seção Processual</h1>
          <div className="form-divider w-full max-w-2xl" />
        </div>
        <SectionBadge number={8} />
      </div>

      {/* Section Overview */}
      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">📋 Sobre esta Seção</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Esta é a seção final do PEI, onde você confirma que recebeu todas as informações necessárias e autoriza o início dos serviços. Seus direitos são protegidos por lei.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Base Legal</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Lei nº 13.146/2015</strong> - Garante a participação da família nas decisões educacionais</li>
            <li>• <strong>ECA (Lei nº 8.069/1990)</strong> - Protege os direitos da criança e do adolescente</li>
            <li>• <strong>Constituição Federal</strong> - Artigo 205: Educação como direito de todos</li>
          </ul>
        </div>
      </section>

      {renderSubStep()}

      <NavigationButtons />
    </div>
  );
};