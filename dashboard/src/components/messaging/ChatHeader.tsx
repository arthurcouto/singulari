import { ArrowLeft, FolderOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  isOnline?: boolean;
  status?: "available" | "vacation" | "recess";
  onBack?: () => void;
  onOpenFiles?: () => void;
  showBackOnDesktop?: boolean;
}

export function ChatHeader({ 
  name, 
  role, 
  avatar, 
  initials, 
  isOnline = false, 
  status,
  onBack, 
  onOpenFiles,
  showBackOnDesktop = false 
}: ChatHeaderProps) {
  const getStatusBadge = () => {
    if (status === "vacation") {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200">Férias</Badge>;
    }
    if (status === "recess") {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200">Recesso</Badge>;
    }
    return null;
  };

  return (
    <header className="flex items-center gap-3 px-3 py-2.5 bg-card border-b shadow-sm shrink-0">
      <Button 
        variant="ghost" 
        size="icon" 
        className={`shrink-0 text-muted-foreground hover:text-foreground h-9 w-9 ${showBackOnDesktop ? "" : "md:hidden"}`}
        onClick={onBack}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-medium text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isOnline && !status && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-card" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-foreground truncate text-sm">{name}</h1>
          {getStatusBadge()}
        </div>
        <p className="text-xs text-muted-foreground truncate">{role}</p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="shrink-0 text-muted-foreground hover:text-foreground h-9 w-9"
        onClick={onOpenFiles}
      >
        <FolderOpen className="h-5 w-5" />
      </Button>
    </header>
  );
}
