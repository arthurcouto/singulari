import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowRight, Copy, FileText, Users, Target, ClipboardCheck } from "lucide-react";

function getOrCreateShareToken(storageKey: string) {
  const existing = localStorage.getItem(storageKey);
  if (existing) return existing;
  const token = crypto.randomUUID();
  localStorage.setItem(storageKey, token);
  return token;
}

const Landing: React.FC = () => {
  useEffect(() => {
    document.title = "Plano Educacional Individualizado (PEI)";
  }, []);

  const [shareToken, setShareToken] = useState<string>("");

  useEffect(() => {
    setShareToken(getOrCreateShareToken("pei_share_token"));
  }, []);

  const shareUrl = useMemo(() => {
    if (!shareToken) return "";
    const url = new URL(window.location.href);
    url.pathname = "/plano";
    url.searchParams.set("share", shareToken);
    return url.toString();
  }, [shareToken]);

  const copyShareLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado para compartilhar.");
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  };

  const features = [
    {
      icon: Users,
      title: "Perfil do Aluno",
      description: "Registre informações do aluno e da equipe multidisciplinar."
    },
    {
      icon: Target,
      title: "Metas e Objetivos",
      description: "Defina metas anuais mensuráveis e acompanhe o progresso."
    },
    {
      icon: ClipboardCheck,
      title: "Serviços e Recursos",
      description: "Documente serviços, adaptações e apoios necessários."
    },
    {
      icon: FileText,
      title: "Documento Final",
      description: "Gere um documento consolidado pronto para impressão."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="animate-fade-in">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              PEI
            </p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
              Plano Educacional<br />
              <span className="text-gradient">Individualizado</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed mb-6">
              Preencha um PEI passo a passo, com orientações para pais e responsáveis, 
              e gere um documento final pronto para impressão.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                ⏱️ Tempo médio de preenchimento: <strong className="text-foreground">30–45 minutos</strong>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2 text-base hover-lift">
                <Link to="/plano">
                  Começar agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="gap-2 text-base hover-lift"
                onClick={copyShareLink}
                disabled={!shareUrl}
              >
                <Copy className="w-4 h-4" />
                Copiar link
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">O que você vai fazer aqui</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Um processo guiado para criar um plano educacional completo e eficaz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 hover-lift animate-slide-up stagger-${index + 1}`}
                style={{ animationFillMode: 'backwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Link de compartilhamento</h2>
            <p className="text-muted-foreground mb-6">
              Use este link para compartilhar o acesso ao preenchimento com outros membros da equipe.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 mb-4">
              <p className="text-sm break-all select-all text-foreground font-mono">
                {shareUrl || "Gerando link..."}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Observação: este link é gerado no seu navegador. Se você limpar o cache/dados do site, um novo link será criado.
            </p>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 border-t border-border bg-secondary/20">
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">💡 Dica</h2>
          <p className="text-muted-foreground">
            Você pode preencher aos poucos e revisar o documento final no fim. 
            Se estiver reunindo informações com profissionais (saúde, terapias, escola), 
            tenha os relatórios em mãos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
