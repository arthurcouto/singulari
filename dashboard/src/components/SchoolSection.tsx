import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, TrendingUp, Award, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
const gradeData = [
  { month: "Mar", math: 7.5, portuguese: 8.0, science: 7.0 },
  { month: "Abr", math: 7.8, portuguese: 8.2, science: 7.5 },
  { month: "Mai", math: 8.0, portuguese: 8.5, science: 7.8 },
  { month: "Jun", math: 8.5, portuguese: 8.3, science: 8.2 },
  { month: "Jul", math: 8.2, portuguese: 8.7, science: 8.0 },
  { month: "Ago", math: 8.8, portuguese: 9.0, science: 8.5 },
];

const subjects = [
  { name: "Matemática", grade: 8.8, progress: 88, trend: "+0.6" },
  { name: "Português", grade: 9.0, progress: 90, trend: "+0.3" },
  { name: "Ciências", grade: 8.5, progress: 85, trend: "+0.5" },
  { name: "História", grade: 8.0, progress: 80, trend: "+0.2" },
  { name: "Geografia", grade: 7.8, progress: 78, trend: "+0.4" },
];

export function SchoolSection() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">Desempenho Escolar</h2>
            <p className="text-muted-foreground text-sm">Acompanhamento de notas e evolução</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate("/relatorios/escola")}
        >
          <FileText className="h-4 w-4" />
          Ver Relatórios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Evolução das Notas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="math"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Matemática"
                />
                <Line
                  type="monotone"
                  dataKey="portuguese"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                  name="Português"
                />
                <Line
                  type="monotone"
                  dataKey="science"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--warning))", strokeWidth: 2 }}
                  name="Ciências"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Notas por Matéria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{subject.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{subject.grade}</span>
                    <span className="text-xs text-success font-medium">{subject.trend}</span>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
