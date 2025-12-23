import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { SectionBadge } from '../SectionBadge';
import { FormField } from '../FormField';
import { GuideBox } from '../GuideBox';
import { NavigationButtons } from '../NavigationButtons';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TEAM_ROLES = [
  'Pai/Mãe',
  'Representante do Distrito',
  'Professor de Educação Especial',
  'Professor de Educação Regular',
  'Psicólogo Escolar',
  'Coordenador de Caso',
  'Membro da Equipe de Estudo',
  'Fonoaudiólogo',
  'Terapeuta Ocupacional',
  'Outro',
];

export const StudentProfileStep: React.FC = () => {
  const { data, updateData, currentSubStep } = useIEP();
  const { studentInfo, teamMembers, learnerProfile } = data;

  const updateStudentInfo = (field: string, value: string) => {
    updateData({
      studentInfo: { ...studentInfo, [field]: value },
    });
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    updateData({ teamMembers: newTeamMembers });
  };

  const addTeamMember = () => {
    updateData({
      teamMembers: [...teamMembers, { title: '', participant: '', date: '' }],
    });
  };

  const removeTeamMember = (index: number) => {
    if (teamMembers.length > 1) {
      const newTeamMembers = teamMembers.filter((_, i) => i !== index);
      updateData({ teamMembers: newTeamMembers });
    }
  };

  const updateLearnerProfile = (field: string, value: string) => {
    updateData({
      learnerProfile: { ...learnerProfile, [field]: value },
    });
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 0:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Informações do Aluno</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground">
                📝 Preencha os dados básicos do aluno. Estas informações são essenciais para identificação e contato com a família durante o ano letivo.
              </p>
            </div>

            <div className="section-badge inline-block mb-6">Aluno</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <FormField
                label="Nome"
                value={studentInfo.name}
                onChange={(v) => updateStudentInfo('name', v)}
                placeholder="João Silva"
              />
              <FormField
                label="Data de Nascimento"
                value={studentInfo.dateOfBirth}
                onChange={(v) => updateStudentInfo('dateOfBirth', v)}
                placeholder="01/10/2010"
              />
              <FormField
                label="Telefone"
                value={studentInfo.phone}
                onChange={(v) => updateStudentInfo('phone', v)}
                placeholder="(11) 99999-9999"
              />
              <FormField
                label="Idade"
                value={studentInfo.age}
                onChange={(v) => updateStudentInfo('age', v)}
                placeholder="13 (13 anos, 2 meses)"
              />
              <FormField
                label="Pai/Mãe/Responsável"
                value={studentInfo.parentGuardians}
                onChange={(v) => updateStudentInfo('parentGuardians', v)}
                placeholder="José e Maria Silva"
              />
              <FormField
                label="Escola de Origem"
                value={studentInfo.incomingSchool}
                onChange={(v) => updateStudentInfo('incomingSchool', v)}
                placeholder="Escola Municipal de Ensino"
              />
              <FormField
                label="Endereço do Aluno"
                value={studentInfo.studentAddress}
                onChange={(v) => updateStudentInfo('studentAddress', v)}
                placeholder="Rua das Flores, 123, São Paulo, SP"
              />
              <FormField
                label="Idioma Nativo"
                value={studentInfo.nativeLanguage}
                onChange={(v) => updateStudentInfo('nativeLanguage', v)}
                placeholder="Português"
              />
              <FormField
                label="Escola Atual"
                value={studentInfo.currentSchool}
                onChange={(v) => updateStudentInfo('currentSchool', v)}
                placeholder="Escola Municipal de Ensino"
              />
              <FormField
                label="Gênero"
                value={studentInfo.gender}
                onChange={(v) => updateStudentInfo('gender', v)}
                placeholder="Masculino"
              />
              <FormField
                label="ID do Aluno"
                value={studentInfo.studentId}
                onChange={(v) => updateStudentInfo('studentId', v)}
                placeholder="5597-234"
              />
              <FormField
                label="Classificação"
                value={studentInfo.classification}
                onChange={(v) => updateStudentInfo('classification', v)}
                placeholder="Autista"
              />
            </div>

            <GuideBox>
              <p>Esta página contém informações básicas sobre você e seu filho. Esses dados são usados para comunicação e identificação durante todo o processo educacional.</p>
            </GuideBox>
          </section>
        );
      
      case 1:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Equipe do PEI</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                👥 A equipe do PEI é formada por profissionais que trabalharão juntos para apoiar seu filho. Você, como pai ou responsável, é membro essencial dessa equipe.
              </p>
              <div className="bg-primary/5 p-3 rounded-sm border-l-4 border-primary mt-3">
                <p className="text-xs">
                  <strong>📖 Direito Legal:</strong> A Lei nº 13.146/2015 garante a participação ativa da família nas decisões educacionais. Você tem o direito de estar presente em todas as reuniões e de discordar de qualquer proposta.
                </p>
              </div>
            </div>

            <div className="section-badge inline-block mb-6">Participantes da Reunião</div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold border-b-2 border-foreground pb-2">
                <div className="col-span-3">Cargo</div>
                <div className="col-span-4">Participante</div>
                <div className="col-span-3">Data</div>
                <div className="col-span-2 text-center">Ações</div>
              </div>
              
              {teamMembers.map((member, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <Select
                      value={member.title}
                      onValueChange={(value) => updateTeamMember(index, 'title', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      className="iep-input"
                      value={member.participant}
                      onChange={(e) => updateTeamMember(index, 'participant', e.target.value)}
                      placeholder="Nome"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      className="iep-input"
                      value={member.date}
                      onChange={(e) => updateTeamMember(index, 'date', e.target.value)}
                      placeholder="12/08/2019"
                    />
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                      disabled={teamMembers.length <= 1}
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
                onClick={addTeamMember}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Participante
              </Button>
            </div>

            <GuideBox>
              <p><strong>💡 Dica:</strong> Anote o nome de todos os participantes da reunião. Isso é importante para referência futura e para garantir que as decisões sejam documentadas corretamente.</p>
            </GuideBox>
          </section>
        );
      
      case 2:
        return (
          <section className="animate-fade-in pt-8">
            <h2 className="text-2xl font-bold mb-4">Perfil do Aluno</h2>
            
            <div className="bg-secondary/50 p-4 rounded-sm mb-6">
              <p className="text-sm text-muted-foreground">
                🌟 Esta é uma das seções mais importantes! Aqui você e seu filho podem compartilhar informações pessoais que ajudarão os professores a conhecê-lo melhor. Não há respostas certas ou erradas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Student Column */}
              <div>
                <div className="section-badge inline-block mb-6">Aluno</div>
                <div className="space-y-4">
                  <FormField
                    label="Nome"
                    value={learnerProfile.studentName}
                    onChange={(v) => updateLearnerProfile('studentName', v)}
                    placeholder="João Silva"
                  />
                  <FormField
                    label="Minha Matéria Favorita"
                    value={learnerProfile.favoriteSubject}
                    onChange={(v) => updateLearnerProfile('favoriteSubject', v)}
                    type="textarea"
                    placeholder="Aula de artes e ciências quando fazemos experimentos"
                    rows={2}
                  />
                  <FormField
                    label="Matéria Menos Favorita"
                    value={learnerProfile.leastFavoriteSubject}
                    onChange={(v) => updateLearnerProfile('leastFavoriteSubject', v)}
                    type="textarea"
                    placeholder="Matemática e leitura"
                    rows={2}
                  />
                  <FormField
                    label="Eu amo quando meu professor..."
                    value={learnerProfile.loveWhenTeacher}
                    onChange={(v) => updateLearnerProfile('loveWhenTeacher', v)}
                    type="textarea"
                    placeholder="Me ajuda a aprender e me deixa brincar com meus amigos"
                    rows={2}
                  />
                  <FormField
                    label="Este ano, quero aprender..."
                    value={learnerProfile.wantToLearn}
                    onChange={(v) => updateLearnerProfile('wantToLearn', v)}
                    type="textarea"
                    placeholder="Como fazer mais amigos e como fazer um vulcão em ciências"
                    rows={2}
                  />
                  <FormField
                    label="Algo que gostaria de fazer este ano é..."
                    value={learnerProfile.wouldLikeToDo}
                    onChange={(v) => updateLearnerProfile('wouldLikeToDo', v)}
                    type="textarea"
                    placeholder="Entrar no time de futebol e ter um peixe de estimação"
                    rows={2}
                  />
                </div>
              </div>

              {/* Parent/Guardian Column */}
              <div>
                <div className="section-badge inline-block mb-6">Pai/Mãe/Responsável</div>
                <div className="space-y-4">
                  <FormField
                    label="Nome"
                    value={learnerProfile.parentName}
                    onChange={(v) => updateLearnerProfile('parentName', v)}
                    placeholder="José Silva, Pai de João Silva"
                  />
                  <FormField
                    label="Os pontos fortes do meu filho são"
                    value={learnerProfile.childStrengths}
                    onChange={(v) => updateLearnerProfile('childStrengths', v)}
                    type="textarea"
                    placeholder="Atividades práticas, onde ele pode aprender fazendo..."
                    rows={4}
                  />
                  <FormField
                    label="Meu filho precisa de ajuda com"
                    value={learnerProfile.childNeedsHelp}
                    onChange={(v) => updateLearnerProfile('childNeedsHelp', v)}
                    type="textarea"
                    placeholder="Compreender significados mais profundos do que reconhece..."
                    rows={4}
                  />
                  <FormField
                    label="Este ano, gostaria que meu filho..."
                    value={learnerProfile.wouldLikeChildTo}
                    onChange={(v) => updateLearnerProfile('wouldLikeChildTo', v)}
                    type="textarea"
                    placeholder="Gostaria de ver João dar passos maiores em sua capacidade..."
                    rows={3}
                  />
                  <FormField
                    label="Gostaria que os professores do meu filho soubessem que..."
                    value={learnerProfile.teachersToKnow}
                    onChange={(v) => updateLearnerProfile('teachersToKnow', v)}
                    type="textarea"
                    placeholder="Meu filho é uma criança especialmente doce..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <GuideBox>
              <p><strong>💡 Por que isso importa?</strong> Os professores usarão essas informações para criar um ambiente de aprendizagem mais acolhedor e personalizado. Quanto mais detalhes você fornecer, melhor será o suporte oferecido.</p>
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
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Perfil do Aluno</h1>
          <div className="form-divider w-full max-w-md" />
        </div>
        <SectionBadge number={1} />
      </div>

      {/* Guide for Parents */}
      <GuideBox>
        <p className="mb-2"><strong>📋 Guia para Pais e Responsáveis</strong></p>
        <p>Esta seção reúne todas as informações sobre seu filho: dados pessoais, a equipe que o acompanhará, e seu perfil como estudante. Essas informações são a base para todo o planejamento educacional.</p>
      </GuideBox>

      {renderSubStep()}

      <NavigationButtons />
    </div>
  );
};