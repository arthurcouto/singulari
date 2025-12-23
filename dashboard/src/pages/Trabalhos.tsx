import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, MessageCircle } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "escola" | "terapia";
  therapyType?: string;
  dueDate: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Lição de Matemática",
    description: "Completar páginas 45-47 do livro de matemática",
    type: "escola",
    dueDate: "2025-01-10",
    completed: false,
  },
  {
    id: "2",
    title: "Leitura do livro",
    description: "Ler capítulo 3 do livro 'O Pequeno Príncipe'",
    type: "escola",
    dueDate: "2025-01-12",
    completed: true,
  },
  {
    id: "3",
    title: "Exercício de respiração",
    description: "Praticar exercício de respiração diafragmática 3x ao dia",
    type: "terapia",
    therapyType: "Psicologia",
    dueDate: "2025-01-15",
    completed: false,
  },
  {
    id: "4",
    title: "Treino de fonemas",
    description: "Repetir os sons 'R' e 'L' com as palavras da lista",
    type: "terapia",
    therapyType: "Fonoaudiologia",
    dueDate: "2025-01-08",
    completed: false,
  },
  {
    id: "5",
    title: "Jogo de memória",
    description: "Jogar o jogo de memória educativo por 15 minutos",
    type: "terapia",
    therapyType: "Psicopedagogia",
    dueDate: "2025-01-09",
    completed: true,
  },
];

export default function Trabalhos() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const escolaTasks = tasks.filter(t => t.type === "escola");
  const terapiaTasks = tasks.filter(t => t.type === "terapia");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Trabalhos e Tarefas
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe as tarefas de casa e objetivos das terapias
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tarefas da Escola */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Deveres de Casa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {escolaTasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                    task.completed ? "bg-muted/50 opacity-60" : "bg-card"
                  }`}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Prazo: {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tarefas das Terapias */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Objetivos das Terapias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {terapiaTasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                    task.completed ? "bg-muted/50 opacity-60" : "bg-card"
                  }`}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {task.therapyType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Prazo: {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
