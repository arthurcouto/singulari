import React from 'react';
import { Lightbulb } from 'lucide-react';

interface GuideBoxProps {
  title?: string;
  children: React.ReactNode;
  glossary?: { term: string; definition: string }[];
  variant?: 'default' | 'tip' | 'info';
}

export const GuideBox: React.FC<GuideBoxProps> = ({ 
  title = "Guia para Pais e Responsáveis", 
  children,
  glossary,
  variant = 'default'
}) => {
  return (
    <div className="guide-box animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
      {glossary && glossary.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border/50 flex flex-wrap gap-4 text-xs">
          {glossary.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-secondary"
            >
              <span className="font-bold text-primary">{item.term}</span>
              <span className="text-muted-foreground">{item.definition}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
