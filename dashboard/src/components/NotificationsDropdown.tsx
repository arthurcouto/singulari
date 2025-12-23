import { Bell, MessageSquare, GraduationCap, Brain, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "message" | "grade" | "therapy" | "health";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Nova mensagem",
    description: "Professora Maria enviou uma mensagem",
    time: "Há 5 min",
    read: false,
  },
  {
    id: "2",
    type: "grade",
    title: "Nova nota registrada",
    description: "Nota de Matemática: 8.5",
    time: "Há 2 horas",
    read: false,
  },
  {
    id: "3",
    type: "therapy",
    title: "Novo relatório de terapia",
    description: "Relatório da sessão de Psicologia",
    time: "Há 1 dia",
    read: false,
  },
  {
    id: "4",
    type: "health",
    title: "Novo exame disponível",
    description: "Resultado do hemograma completo",
    time: "Há 2 dias",
    read: true,
  },
];

export function NotificationsDropdown() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case "message":
        navigate("/mensagens");
        break;
      case "grade":
        navigate("/?tab=escola");
        break;
      case "therapy":
        navigate("/relatorios/terapias");
        break;
      case "health":
        navigate("/relatorios/saude");
        break;
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} />;
      case "grade":
        return <GraduationCap className="h-4 w-4" style={{ color: "hsl(var(--chart-school))" }} />;
      case "therapy":
        return <Brain className="h-4 w-4" style={{ color: "hsl(var(--chart-therapy))" }} />;
      case "health":
        return <FileText className="h-4 w-4" style={{ color: "hsl(var(--chart-health))" }} />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className="flex items-start gap-3 p-3 cursor-pointer"
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="mt-0.5">{getIcon(notification.type)}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{notification.title}</p>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {notification.description}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {notification.time}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
