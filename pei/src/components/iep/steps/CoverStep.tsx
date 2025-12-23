import React from 'react';
import { useIEP } from '@/context/IEPContext';
import { FormField } from '../FormField';
import { NavigationButtons } from '../NavigationButtons';
import { GuideBox } from '../GuideBox';
import { BookOpen } from 'lucide-react';

export const CoverStep: React.FC = () => {
  const { data, updateData } = useIEP();

  return (
    <div className="animate-fade-in">
      <div className="min-h-[70vh] flex flex-col justify-center">

        <div className="space-y-2 mb-12 animate-slide-up">
          <div className="max-w-xs">
            <FormField
              label="Ano Letivo"
              value={data.schoolYear}
              onChange={(value) => updateData({ schoolYear: value })}
              placeholder="2020 - 2021"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-12 animate-slide-up stagger-1" style={{ animationFillMode: 'backwards' }}>
          Plano Educacional<br />
          <span className="text-gradient">Individualizado</span>
        </h1>

        <div className="form-divider mb-8 animate-scale-in stagger-2" style={{ animationFillMode: 'backwards' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up stagger-3" style={{ animationFillMode: 'backwards' }}>
          <FormField
            label="Nome da Escola"
            value={data.schoolName}
            onChange={(value) => updateData({ schoolName: value })}
            placeholder="Escola Municipal de Ensino"
          />
          <FormField
            label="Localização"
            value={data.schoolLocation}
            onChange={(value) => updateData({ schoolLocation: value })}
            placeholder="São Paulo, SP"
          />
        </div>

        <div className="mt-12 animate-fade-in stagger-4" style={{ animationFillMode: 'backwards' }}>
          <GuideBox title="🎯 Bem-vindo ao PEI - Plano de Educação Individualizado">
            <div className="space-y-4">
              <p>
                O <strong>Plano de Educação Individualizado (PEI)</strong> é um documento fundamental que define as metas educacionais, adaptações e serviços específicos para seu filho. Este formulário foi desenvolvido para ajudá-lo a construir um PEI completo e eficaz.
              </p>
              <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Base Legal
                </h4>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Lei Brasileira de Inclusão (Lei nº 13.146/2015)</strong> - Garante o direito à educação inclusiva.</li>
                  <li>• <strong>LDB (Lei nº 9.394/1996)</strong> - Artigo 59: Assegura currículos, métodos e recursos específicos.</li>
                  <li>• <strong>Convenção sobre os Direitos das Pessoas com Deficiência (Decreto nº 6.949/2009)</strong></li>
                </ul>
              </div>
              <p className="text-xs italic bg-secondary/50 p-3 rounded-lg">
                💡 <strong>Dica:</strong> Preencha cada seção com calma. Você pode salvar o progresso e voltar depois. Todas as informações inseridas ajudarão a equipe escolar a entender melhor as necessidades do seu filho.
              </p>
            </div>
          </GuideBox>
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
};
