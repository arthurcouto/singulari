import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Ruler, Scale, Syringe, Stethoscope, CalendarCheck, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const growthData = [
  { age: "6", height: 115, weight: 20 },
  { age: "7", height: 122, weight: 23 },
  { age: "8", height: 128, weight: 26 },
  { age: "9", height: 133, weight: 29 },
  { age: "10", height: 138, weight: 32 },
  { age: "11", height: 143, weight: 36 },
];

const initialVaccines = [
  { id: 1, name: "Hepatite B", dose: "3ª dose", date: "15/03/2020", completed: true },
  { id: 2, name: "Tríplice Viral", dose: "2ª dose", date: "10/06/2021", completed: true },
  { id: 3, name: "DTP", dose: "Reforço", date: "22/09/2022", completed: true },
  { id: 4, name: "HPV", dose: "1ª dose", date: "05/04/2024", completed: true },
  { id: 5, name: "HPV", dose: "2ª dose", date: "Prevista: 05/10/2025", completed: false },
  { id: 6, name: "Meningocócica", dose: "Reforço", date: "Prevista: 03/2026", completed: false },
];

const healthMetrics = [
  { label: "Altura Atual", value: "143 cm", icon: Ruler, change: "+5 cm (último ano)" },
  { label: "Peso Atual", value: "36 kg", icon: Scale, change: "+4 kg (último ano)" },
  { label: "IMC", value: "17.6", icon: Activity, status: "Normal" },
  { label: "Última Consulta", value: "15/11/2025", icon: Stethoscope, next: "Próxima: 15/02/2026" },
];

export function HealthSection() {
  const [vaccines, setVaccines] = useState(initialVaccines);
  const navigate = useNavigate();

  const toggleVaccine = (vaccineId: number) => {
    setVaccines(prev =>
      prev.map(vaccine =>
        vaccine.id === vaccineId ? { ...vaccine, completed: !vaccine.completed } : vaccine
      )
    );
  };

  const completedVaccines = vaccines.filter(v => v.completed).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-chart-health/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-chart-health" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">Saúde & Desenvolvimento</h2>
            <p className="text-muted-foreground text-sm">Acompanhamento pediátrico e vacinas</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate("/relatorios/saude")}
        >
          <FileText className="h-4 w-4" />
          Ver Relatórios
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-chart-health/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-chart-health" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="text-xl font-semibold text-foreground">{metric.value}</p>
                    <p className="text-xs text-success">
                      {metric.change || metric.status || metric.next}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Ruler className="h-4 w-4 text-chart-health" />
              Curva de Crescimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="age" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  label={{ value: 'Idade (anos)', position: 'bottom', offset: -5 }}
                />
                <YAxis 
                  yAxisId="height"
                  stroke="hsl(var(--primary))" 
                  fontSize={12}
                  label={{ value: 'Altura (cm)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="weight"
                  orientation="right"
                  stroke="hsl(var(--warning))" 
                  fontSize={12}
                  label={{ value: 'Peso (kg)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  yAxisId="height"
                  type="monotone"
                  dataKey="height"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Altura (cm)"
                />
                <Line
                  yAxisId="weight"
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--warning))", strokeWidth: 2 }}
                  name="Peso (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Syringe className="h-4 w-4 text-chart-health" />
                Carteira de Vacinação
              </CardTitle>
              <Badge variant="secondary">
                <CalendarCheck className="h-3 w-3 mr-1" />
                {completedVaccines}/{vaccines.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vaccines.map((vaccine) => (
                <div
                  key={vaccine.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    vaccine.completed ? "bg-success/5" : "bg-warning/5"
                  }`}
                >
                  <Checkbox
                    id={`vaccine-${vaccine.id}`}
                    checked={vaccine.completed}
                    onCheckedChange={() => toggleVaccine(vaccine.id)}
                    className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`vaccine-${vaccine.id}`}
                        className={`text-sm font-medium cursor-pointer ${
                          vaccine.completed ? "text-foreground" : "text-foreground"
                        }`}
                      >
                        {vaccine.name}
                      </label>
                      <Badge variant={vaccine.completed ? "default" : "outline"} className="text-xs">
                        {vaccine.dose}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{vaccine.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
