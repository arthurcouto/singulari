import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';

export const FinalDocumentStep: React.FC = () => {
  const { data, setCurrentStep } = useIEP();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in">
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-8 no-print">
        <Button variant="outline" onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Imprimir
        </Button>
        <Button onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Baixar PDF
        </Button>
      </div>

      {/* Cover Page */}
      <div className="mb-16 page-break-after">
        <div className="flex justify-end mb-12">
          <div className="section-badge-large">
            <span className="text-lg font-black">{data.studentInfo.name || 'Nome do Aluno'}</span>
            <span className="text-xs text-primary-foreground/80 mt-1">
              {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-2xl font-light">{data.schoolYear || '2020 - 2021'}</p>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-12">
          Plano Educacional<br />Individualizado
        </h1>

        <div className="form-divider mb-6" />

        <div>
          <p className="font-bold">{data.schoolName || 'Nome da Escola'}</p>
          <p className="text-muted-foreground">{data.schoolLocation || 'Localização'}</p>
        </div>
      </div>

      {/* Section 1: Student Profile */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Perfil do Aluno</h1>
            <div className="form-divider w-full max-w-md" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">1</span>
          </div>
        </div>

        {/* Student Information */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Informações do Aluno</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div><span className="font-semibold">Nome:</span> {data.studentInfo.name || '-'}</div>
            <div><span className="font-semibold">Data de Nascimento:</span> {data.studentInfo.dateOfBirth || '-'}</div>
            <div><span className="font-semibold">Telefone:</span> {data.studentInfo.phone || '-'}</div>
            <div><span className="font-semibold">Idade:</span> {data.studentInfo.age || '-'}</div>
            <div><span className="font-semibold">Pai/Mãe/Responsável:</span> {data.studentInfo.parentGuardians || '-'}</div>
            <div><span className="font-semibold">Escola de Origem:</span> {data.studentInfo.incomingSchool || '-'}</div>
            <div><span className="font-semibold">Endereço:</span> {data.studentInfo.studentAddress || '-'}</div>
            <div><span className="font-semibold">Idioma Nativo:</span> {data.studentInfo.nativeLanguage || '-'}</div>
            <div><span className="font-semibold">Escola Atual:</span> {data.studentInfo.currentSchool || '-'}</div>
            <div><span className="font-semibold">Gênero:</span> {data.studentInfo.gender || '-'}</div>
            <div><span className="font-semibold">ID do Aluno:</span> {data.studentInfo.studentId || '-'}</div>
            <div><span className="font-semibold">Classificação:</span> {data.studentInfo.classification || '-'}</div>
          </div>
        </div>

        {/* IEP Team */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Equipe do PEI</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="text-left py-2">Cargo</th>
                <th className="text-left py-2">Participante</th>
                <th className="text-left py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {data.teamMembers.map((member, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-2">{member.title}</td>
                  <td className="py-2">{member.participant || '-'}</td>
                  <td className="py-2">{member.date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Learner Profile */}
        <div>
          <h2 className="text-xl font-bold mb-4">Perfil do Aluno</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-bold mb-2 border-b border-foreground pb-1">Aluno</h3>
              <p><span className="font-semibold">Nome:</span> {data.learnerProfile.studentName || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Matéria Favorita:</span> {data.learnerProfile.favoriteSubject || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Matéria Menos Favorita:</span> {data.learnerProfile.leastFavoriteSubject || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Eu amo quando meu professor:</span> {data.learnerProfile.loveWhenTeacher || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Este ano, quero aprender:</span> {data.learnerProfile.wantToLearn || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Algo que gostaria de fazer:</span> {data.learnerProfile.wouldLikeToDo || '-'}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 border-b border-foreground pb-1">Pai/Mãe/Responsável</h3>
              <p><span className="font-semibold">Nome:</span> {data.learnerProfile.parentName || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Os pontos fortes do meu filho são:</span> {data.learnerProfile.childStrengths || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Meu filho precisa de ajuda com:</span> {data.learnerProfile.childNeedsHelp || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Este ano, gostaria que meu filho:</span> {data.learnerProfile.wouldLikeChildTo || '-'}</p>
              <p className="mt-2"><span className="font-semibold">Os professores devem saber:</span> {data.learnerProfile.teachersToKnow || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Performance */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Nível Atual de Desempenho Acadêmico</h1>
            <div className="form-divider w-full max-w-2xl" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">2</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Avaliações dos Professores</h2>
          {data.teacherEvaluations.map((evaluation, index) => (
            <div key={index} className="mb-6 border-l-4 border-foreground pl-4">
              <h3 className="font-bold">{evaluation.subject}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {evaluation.teacher && `Professor: ${evaluation.teacher}`} {evaluation.date && `| ${evaluation.date}`}
              </p>
              <p className="text-sm">{evaluation.evaluation || '-'}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Pontos Fortes e Limitações</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Pontos Fortes</h3>
              <ul className="text-sm space-y-1">
                {data.strengthsLimitations.strengths.filter(s => s).map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Limitações</h3>
              <ul className="text-sm space-y-1">
                {data.strengthsLimitations.limitations.filter(l => l).map((l, i) => (
                  <li key={i}>• {l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Goals */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Metas Anuais</h1>
            <div className="form-divider w-full max-w-md" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">3</span>
          </div>
        </div>

        {data.academicGoals.map((goal, index) => (
          <div key={index} className="mb-8">
            <h3 className="font-bold mb-2">Meta S.M.A.R.T. {index + 1}: {goal.subject}</h3>
            <p className="text-sm mb-4">{goal.goal || '-'}</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-secondary/30 p-3 rounded-sm">
                <span className="font-bold">Mensurável:</span> {goal.measurable || '-'}
              </div>
              <div className="bg-secondary/30 p-3 rounded-sm">
                <span className="font-bold">Alcançável:</span> {goal.attainable || '-'}
              </div>
              <div className="bg-secondary/30 p-3 rounded-sm">
                <span className="font-bold">Relevante:</span> {goal.relevant || '-'}
              </div>
              <div className="bg-secondary/30 p-3 rounded-sm">
                <span className="font-bold">Temporal:</span> {goal.timeBased || '-'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 4: Progress */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Relatório de Progresso</h1>
            <div className="form-divider w-full max-w-md" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">4</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-2">Avaliações de Desenvolvimento</h3>
          <ul className="text-sm space-y-1">
            {data.progressChecklist.items.filter(i => i).map((item, i) => (
              <li key={i}>☐ {item}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div><span className="font-semibold">Frequência:</span> {data.progressChecklist.frequency || '-'}</div>
          <div><span className="font-semibold">Canal de Comunicação:</span> {data.progressChecklist.reportingChannel || '-'}</div>
        </div>
      </div>

      {/* Section 5: Services */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Serviços Relacionados</h1>
            <div className="form-divider w-full max-w-md" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">5</span>
          </div>
        </div>

        {/* Special Education and Supplementary Services */}
        {(['specialEducation', 'supplementary'] as const).map((category) => {
          const categoryLabels = {
            specialEducation: 'Serviços de Educação Especial',
            supplementary: 'Serviços Suplementares',
          };
          return (
            <div key={category} className="mb-8">
              <h3 className="font-bold mb-2">{categoryLabels[category]}</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-foreground">
                    <th className="text-left py-1">Serviço</th>
                    <th className="text-left py-1">Local</th>
                    <th className="text-left py-1">Frequência</th>
                    <th className="text-left py-1">Início</th>
                  </tr>
                </thead>
                <tbody>
                  {data.relatedServices[category].map((service, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="py-1">{service.service}</td>
                      <td className="py-1">{service.location || '-'}</td>
                      <td className="py-1">{service.frequency || '-'}</td>
                      <td className="py-1">{service.beginning || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}

        {/* Transportation Services - Different columns */}
        <div className="mb-8">
          <h3 className="font-bold mb-2">Serviços de Transporte</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-foreground">
                <th className="text-left py-1">Nome do Responsável</th>
                <th className="text-left py-1">Frequência</th>
              </tr>
            </thead>
            <tbody>
              {data.relatedServices.transportation.map((service, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-1">{service.service || '-'}</td>
                  <td className="py-1">{service.frequency || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6: Supplementary Aids */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Recursos e Modificações Suplementares</h1>
            <div className="form-divider w-full max-w-2xl" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">6</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-2">Modificações Ambientais</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-foreground">
                <th className="text-left py-1">Local</th>
                <th className="text-left py-1">Propósito</th>
                <th className="text-left py-1">Compartilhado?</th>
              </tr>
            </thead>
            <tbody>
              {data.supplementaryAids.environmentalModifications.filter(m => m.location).map((mod, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-1">{mod.location}</td>
                  <td className="py-1">{mod.purpose || '-'}</td>
                  <td className="py-1">{mod.shared || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-2">Equipamentos Especiais</h3>
            <ul className="space-y-1">
              {data.supplementaryAids.specialEquipment.filter(e => e).map((eq, i) => (
                <li key={i}>• {eq}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Estratégias de Ensino</h3>
            <p className="text-xs font-semibold mb-1">Para Compreensão:</p>
            <ul className="space-y-1 mb-2">
              {data.supplementaryAids.comprehensionStrategies.filter(s => s).map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
            <p className="text-xs font-semibold mb-1">Para Comportamento:</p>
            <ul className="space-y-1">
              {data.supplementaryAids.behaviorStrategies.filter(s => s).map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 7: Participation */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Participação e Extensão da Não Participação</h1>
            <div className="form-divider w-full max-w-2xl" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">7</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-semibold">Tipo de Participação:</span> {data.participation.frequency || '-'}</div>
          <div><span className="font-semibold">Assistência:</span> {data.participation.assistance || '-'}</div>
        </div>
      </div>

      {/* Attachments - Before Consent */}
      {data.progressChecklist.attachments && data.progressChecklist.attachments.length > 0 && (
        <div className="mb-16 page-break-before">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black mb-2">Relatórios Anexados</h1>
              <div className="form-divider w-full max-w-md" />
            </div>
          </div>
          <div className="space-y-4">
            {data.progressChecklist.attachments.map((attachment, i) => (
              <div key={i} className="border border-border p-4 rounded-sm page-break-inside-avoid">
                <p className="text-sm font-medium mb-2">{attachment.name}</p>
                <iframe 
                  src={attachment.url} 
                  className="w-full h-[600px] border border-border"
                  title={attachment.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 8: Consent - Always Last */}
      <div className="mb-16">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Consentimento e Seção Processual</h1>
            <div className="form-divider w-full max-w-2xl" />
          </div>
          <div className="section-badge-large">
            <span className="text-xs font-semibold">Seção</span>
            <span className="section-number">8</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-bold mb-2">Representantes da Escola</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>{data.proceduralSafeguards.representative1Name || '-'}</div>
            <div>{data.proceduralSafeguards.representative1Title || '-'}</div>
            <div>{data.proceduralSafeguards.representative1Contact || '-'}</div>
            <div>{data.proceduralSafeguards.representative2Name || '-'}</div>
            <div>{data.proceduralSafeguards.representative2Title || '-'}</div>
            <div>{data.proceduralSafeguards.representative2Contact || '-'}</div>
          </div>
        </div>

        <div className="border-2 border-foreground p-4 rounded-sm">
          <h3 className="font-bold mb-4">Consentimento Informado</h3>
          <p className="text-xs mb-4">
            Eu/Nós recebemos uma cópia do PEI proposto e concordamos em iniciar os serviços do PEI antes que os 15 dias corridos tenham expirado.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Responsável 1:</p>
              <p>{data.informedConsent.parent1Name || '-'}</p>
              <p className="text-xs text-muted-foreground">{data.informedConsent.parent1Date || '-'}</p>
            </div>
            <div>
              <p className="font-semibold">Responsável 2:</p>
              <p>{data.informedConsent.parent2Name || '-'}</p>
              <p className="text-xs text-muted-foreground">{data.informedConsent.parent2Date || '-'}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm">
              <span className="font-semibold">Concordância:</span> {data.informedConsent.agreed ? '✓ Concordo com os termos' : '✗ Não concordou'}
            </p>
          </div>
        </div>
      </div>

      {/* Final Download Button */}
      <div className="flex justify-center gap-4 mt-12 pt-8 border-t border-border no-print">
        <Button variant="outline" onClick={handlePrint} size="lg" className="gap-2">
          <Printer className="w-5 h-5" />
          Imprimir Documento
        </Button>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Baixar como PDF
        </Button>
      </div>
    </div>
  );
};
