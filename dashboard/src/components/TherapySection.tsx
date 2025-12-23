import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, Heart, MessageCircle, Sparkles, Calendar, CheckCircle2, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const therapyProgress = [
  { month: "Mar", psychology: 3, speech: 2, pedagogy: 2 },
  { month: "Abr", psychology: 4, speech: 3, pedagogy: 3 },
  { month: "Mai", psychology: 5, speech: 4, pedagogy: 4 },
  { month: "Jun", psychology: 6, speech: 5, pedagogy: 5 },
  { month: "Jul", psychology: 7, speech: 6, pedagogy: 6 },
  { month: "Ago", psychology: 8, speech: 7, pedagogy: 7 },
];

const therapies = [
  {
    name: "Psicologia",
    icon: Brain,
    professional: "Dra. Maria Santos",
    frequency: "Semanal",
    nextSession: "25/12/2025",
    status: "Em andamento",
    goals: [
      { id: 1, text: "Desenvolver autoconfiança", completed: true },
      { id: 2, text: "Melhorar interação social", completed: true },
      { id: 3, text: "Controle emocional", completed: false },
      { id: 4, text: "Autonomia nas atividades", completed: false },
    ],
  },
  {
    name: "Fonoaudiologia",
    icon: MessageCircle,
    professional: "Dra. Ana Lima",
    frequency: "2x por semana",
    nextSession: "23/12/2025",
    status: "Em andamento",
    goals: [
      { id: 1, text: "Articulação correta do 'R'", completed: true },
      { id: 2, text: "Fluência na leitura", completed: true },
      { id: 3, text: "Compreensão textual", completed: true },
      { id: 4, text: "Vocabulário ampliado", completed: false },
    ],
  },
  {
    name: "Psicopedagogia",
    icon: Sparkles,
    professional: "Dra. Carla Oliveira",
    frequency: "Semanal",
    nextSession: "24/12/2025",
    status: "Em andamento",
    goals: [
      { id: 1, text: "Organização de estudos", completed: true },
      { id: 2, text: "Técnicas de memorização", completed: false },
      { id: 3, text: "Foco e concentração", completed: false },
      { id: 4, text: "Resolução de problemas", completed: false },
    ],
  },
];

export function TherapySection() {
  const [therapyGoals, setTherapyGoals] = useState(therapies);
  const navigate = useNavigate();

  const toggleGoal = (therapyIndex: number, goalId: number) => {
    setTherapyGoals(prev => 
      prev.map((therapy, idx) => 
        idx === therapyIndex 
          ? {
              ...therapy,
              goals: therapy.goals.map(goal =>
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
              ),
            }
          : therapy
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-chart-therapy/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-chart-therapy" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">Acompanhamento Terapêutico</h2>
            <p className="text-muted-foreground text-sm">Progresso nas terapias e metas</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate("/relatorios/terapias")}
        >
          <FileText className="h-4 w-4" />
          Ver Relatórios
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Evolução Mensal (Escala 1-10)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={therapyProgress}>
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
              <Bar dataKey="psychology" fill="hsl(var(--primary))" name="Psicologia" radius={[4, 4, 0, 0]} />
              <Bar dataKey="speech" fill="hsl(var(--success))" name="Fono" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pedagogy" fill="hsl(var(--warning))" name="Psicopedagogia" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {therapyGoals.map((therapy, therapyIndex) => {
          const completedGoals = therapy.goals.filter(g => g.completed).length;
          const Icon = therapy.icon;
          
          return (
            <Card key={therapy.name} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{therapy.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{therapy.professional}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {therapy.frequency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Próxima sessão: {therapy.nextSession}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Metas</span>
                    <span className="text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 inline mr-1 text-success" />
                      {completedGoals}/{therapy.goals.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {therapy.goals.map((goal) => (
                    <div key={goal.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`${therapy.name}-${goal.id}`}
                        checked={goal.completed}
                        onCheckedChange={() => toggleGoal(therapyIndex, goal.id)}
                        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                      />
                      <label
                        htmlFor={`${therapy.name}-${goal.id}`}
                        className={`text-sm cursor-pointer ${
                          goal.completed ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {goal.text}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
