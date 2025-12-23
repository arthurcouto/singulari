import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Download, Calendar } from "lucide-react";

const teacherReports = {
  matematica: {
    name: "Matemática",
    teacher: "Prof. João Silva",
    reports: [
      { id: 1, date: "15/12/2025", title: "Avaliação Bimestral - 4º Bim", summary: "Excelente progresso em resolução de problemas. Demonstra facilidade com operações básicas.", status: "Recente" },
      { id: 2, date: "15/09/2025", title: "Avaliação Bimestral - 3º Bim", summary: "Melhoria significativa em geometria. Necessita reforço em frações.", status: "Anterior" },
      { id: 3, date: "15/06/2025", title: "Avaliação Bimestral - 2º Bim", summary: "Bom desenvolvimento lógico. Participação ativa nas aulas.", status: "Anterior" },
    ],
  },
  portugues: {
    name: "Português",
    teacher: "Profa. Maria Souza",
    reports: [
      { id: 1, date: "14/12/2025", title: "Avaliação Bimestral - 4º Bim", summary: "Excelente desenvolvimento na escrita. Leitura fluente e compreensão textual avançada.", status: "Recente" },
      { id: 2, date: "14/09/2025", title: "Avaliação Bimestral - 3º Bim", summary: "Progresso notável em redação. Gramática em evolução.", status: "Anterior" },
      { id: 3, date: "14/06/2025", title: "Avaliação Bimestral - 2º Bim", summary: "Boa interpretação de textos. Ortografia melhorou consideravelmente.", status: "Anterior" },
    ],
  },
  ciencias: {
    name: "Ciências",
    teacher: "Prof. Pedro Costa",
    reports: [
      { id: 1, date: "13/12/2025", title: "Avaliação Bimestral - 4º Bim", summary: "Grande interesse em experimentos. Compreensão clara dos conceitos de ecologia.", status: "Recente" },
      { id: 2, date: "13/09/2025", title: "Avaliação Bimestral - 3º Bim", summary: "Curiosidade aguçada. Participação excelente nas atividades práticas.", status: "Anterior" },
    ],
  },
  historia: {
    name: "História",
    teacher: "Profa. Ana Oliveira",
    reports: [
      { id: 1, date: "12/12/2025", title: "Avaliação Bimestral - 4º Bim", summary: "Boa compreensão de contextos históricos. Desenvolve bem análise crítica.", status: "Recente" },
      { id: 2, date: "12/09/2025", title: "Avaliação Bimestral - 3º Bim", summary: "Interesse crescente em história do Brasil. Trabalhos bem elaborados.", status: "Anterior" },
    ],
  },
  geografia: {
    name: "Geografia",
    teacher: "Prof. Carlos Lima",
    reports: [
      { id: 1, date: "11/12/2025", title: "Avaliação Bimestral - 4º Bim", summary: "Excelente compreensão de mapas e localização. Interesse por temas ambientais.", status: "Recente" },
      { id: 2, date: "11/09/2025", title: "Avaliação Bimestral - 3º Bim", summary: "Bom desempenho em estudos regionais. Participação ativa.", status: "Anterior" },
    ],
  },
};

export default function SchoolReports() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "matematica";
  
  const currentReports = teacherReports[subject as keyof typeof teacherReports] || teacherReports.matematica;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-display font-semibold text-foreground">
                Relatórios - {currentReports.name}
              </h1>
              <p className="text-sm text-muted-foreground">{currentReports.teacher}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(teacherReports).map(([key, value]) => (
            <Button
              key={key}
              variant={subject === key ? "default" : "outline"}
              size="sm"
              onClick={() => navigate(`/relatorios/escola?subject=${key}`)}
            >
              {value.name}
            </Button>
          ))}
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
