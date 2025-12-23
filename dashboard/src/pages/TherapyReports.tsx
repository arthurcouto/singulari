import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Calendar, Brain, MessageCircle, Sparkles } from "lucide-react";

const therapyReports = {
  psicologia: {
    name: "Psicologia",
    professional: "Dra. Maria Santos",
    icon: Brain,
    reports: [
      { id: 1, date: "20/12/2025", title: "Relatório Mensal - Dezembro", summary: "Progresso significativo no controle emocional. Demonstra maior autoconfiança em situações sociais. Recomenda-se continuidade das sessões semanais.", status: "Recente" },
      { id: 2, date: "22/11/2025", title: "Relatório Mensal - Novembro", summary: "Melhoria na interação com colegas. Trabalho focado em técnicas de respiração e mindfulness.", status: "Anterior" },
      { id: 3, date: "20/10/2025", title: "Relatório Mensal - Outubro", summary: "Início do trabalho com autoestima. Boa receptividade às atividades lúdicas.", status: "Anterior" },
      { id: 4, date: "18/09/2025", title: "Relatório Mensal - Setembro", summary: "Avaliação inicial concluída. Plano terapêutico estabelecido com foco em desenvolvimento emocional.", status: "Anterior" },
    ],
  },
  fonoaudiologia: {
    name: "Fonoaudiologia",
    professional: "Dra. Ana Lima",
    icon: MessageCircle,
    reports: [
      { id: 1, date: "19/12/2025", title: "Relatório Mensal - Dezembro", summary: "Articulação do fonema /R/ praticamente corrigida. Fluência de leitura excelente. Foco agora em vocabulário.", status: "Recente" },
      { id: 2, date: "21/11/2025", title: "Relatório Mensal - Novembro", summary: "Grande evolução na pronúncia. Leitura mais fluida e com melhor entonação.", status: "Anterior" },
      { id: 3, date: "19/10/2025", title: "Relatório Mensal - Outubro", summary: "Exercícios de articulação apresentando resultados. Compreensão textual em desenvolvimento.", status: "Anterior" },
    ],
  },
  psicopedagogia: {
    name: "Psicopedagogia",
    professional: "Dra. Carla Oliveira",
    icon: Sparkles,
    reports: [
      { id: 1, date: "18/12/2025", title: "Relatório Mensal - Dezembro", summary: "Organização de estudos melhorou consideravelmente. Uso efetivo de técnicas de memorização visual.", status: "Recente" },
      { id: 2, date: "20/11/2025", title: "Relatório Mensal - Novembro", summary: "Implementação de rotina de estudos. Trabalho com técnicas de concentração.", status: "Anterior" },
      { id: 3, date: "18/10/2025", title: "Relatório Mensal - Outubro", summary: "Avaliação psicopedagógica concluída. Identificadas áreas de foco: organização e atenção.", status: "Anterior" },
    ],
  },
};

export default function TherapyReports() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const therapy = searchParams.get("therapy") || "psicologia";
  
  const currentReports = therapyReports[therapy as keyof typeof therapyReports] || therapyReports.psicologia;
  const Icon = currentReports.icon;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-display font-semibold text-foreground">
                  Relatórios - {currentReports.name}
                </h1>
                <p className="text-sm text-muted-foreground">{currentReports.professional}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(therapyReports).map(([key, value]) => {
            const TabIcon = value.icon;
            return (
              <Button
                key={key}
                variant={therapy === key ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/relatorios/terapias?therapy=${key}`)}
                className="gap-2"
              >
                <TabIcon className="h-4 w-4" />
                {value.name}
              </Button>
            );
          })}
        </div>

        <div className="space-y-4">
          {currentReports.reports.map((report, index) => (
            <Card key={report.id} className={`border-0 shadow-sm ${index === 0 ? "ring-2 ring-primary/20" : ""}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>{report.status}</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{report.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
