import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Calendar, Stethoscope, FlaskConical, AlertTriangle, Pill } from "lucide-react";

const healthReports = {
  exames: {
    name: "Exames",
    icon: FlaskConical,
    reports: [
      { id: 1, date: "10/12/2025", title: "Hemograma Completo", summary: "Todos os valores dentro da normalidade. Hemoglobina: 13.2 g/dL, Leucócitos: 7.500/mm³, Plaquetas: 250.000/mm³.", status: "Recente" },
      { id: 2, date: "10/12/2025", title: "Glicemia de Jejum", summary: "Resultado: 85 mg/dL - Dentro dos valores de referência.", status: "Recente" },
      { id: 3, date: "15/06/2025", title: "Hemograma Completo", summary: "Resultados normais. Acompanhamento de rotina.", status: "Anterior" },
      { id: 4, date: "15/06/2025", title: "Exame de Urina", summary: "Sem alterações. pH: 6.0, Densidade: 1.020.", status: "Anterior" },
      { id: 5, date: "20/12/2024", title: "Hemograma Completo", summary: "Todos os parâmetros dentro da normalidade.", status: "Anterior" },
    ],
  },
  alergias: {
    name: "Alergias",
    icon: AlertTriangle,
    reports: [
      { id: 1, date: "05/03/2024", title: "Teste Alérgico - Painel Alimentar", summary: "Identificada alergia leve a frutos do mar (camarão). Recomenda-se evitar consumo. Sem outras alergias alimentares detectadas.", status: "Recente" },
      { id: 2, date: "05/03/2024", title: "Teste Alérgico - Painel Respiratório", summary: "Sensibilidade a ácaros. Recomendações: limpeza frequente, capas antialérgicas, ambiente ventilado.", status: "Recente" },
      { id: 3, date: "10/01/2023", title: "Avaliação Alérgica Inicial", summary: "Histórico de rinite alérgica. Encaminhado para testes específicos.", status: "Anterior" },
    ],
  },
  medicamentos: {
    name: "Medicamentos",
    icon: Pill,
    reports: [
      { id: 1, date: "15/11/2025", title: "Prescrição - Vitamina D", summary: "Vitamina D3 2000 UI - 1x ao dia, pela manhã. Uso contínuo por 6 meses. Próxima avaliação em 05/2026.", status: "Em uso" },
      { id: 2, date: "15/11/2025", title: "Prescrição - Antialérgico", summary: "Loratadina 10mg - Em caso de crise alérgica, 1x ao dia. Uso conforme necessidade.", status: "Em uso" },
      { id: 3, date: "20/08/2025", title: "Prescrição - Antibiótico (finalizado)", summary: "Amoxicilina 250mg - Tratamento de amigdalite. Curso de 7 dias completado com sucesso.", status: "Finalizado" },
    ],
  },
  consultas: {
    name: "Consultas",
    icon: Stethoscope,
    reports: [
      { id: 1, date: "15/11/2025", title: "Consulta de Rotina - Pediatria", summary: "Desenvolvimento adequado para idade. Peso e altura dentro do esperado. Próxima consulta em 3 meses.", status: "Recente" },
      { id: 2, date: "15/08/2025", title: "Consulta de Rotina - Pediatria", summary: "Criança saudável. Orientações sobre alimentação balanceada. Vacinas em dia.", status: "Anterior" },
      { id: 3, date: "15/05/2025", title: "Consulta - Oftalmologia", summary: "Acuidade visual normal. Sem necessidade de correção. Reavaliação em 1 ano.", status: "Anterior" },
      { id: 4, date: "20/03/2025", title: "Consulta - Otorrinolaringologia", summary: "Avaliação de rinite. Prescrição de tratamento preventivo. Melhora significativa relatada.", status: "Anterior" },
    ],
  },
};

export default function HealthReports() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "exames";
  
  const currentReports = healthReports[category as keyof typeof healthReports] || healthReports.exames;
  const Icon = currentReports.icon;

  const getStatusVariant = (status: string) => {
    if (status === "Recente" || status === "Em uso") return "default";
    if (status === "Finalizado") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-health/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-chart-health" />
              </div>
              <div>
                <h1 className="text-xl font-display font-semibold text-foreground">
                  Relatórios Médicos - {currentReports.name}
                </h1>
                <p className="text-sm text-muted-foreground">Histórico de saúde</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(healthReports).map(([key, value]) => {
            const TabIcon = value.icon;
            return (
              <Button
                key={key}
                variant={category === key ? "default" : "outline"}
                size="sm"
                onClick={() => navigate(`/relatorios/saude?category=${key}`)}
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
            <Card key={report.id} className={`border-0 shadow-sm ${index === 0 ? "ring-2 ring-chart-health/20" : ""}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-health/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-chart-health" />
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
                    <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
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
