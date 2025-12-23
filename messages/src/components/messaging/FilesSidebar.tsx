import { X, FileText, Image as ImageIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./MessageBubble";

interface FileItem {
  id: string;
  type: "image" | "document";
  name: string;
  sender: string;
  date: string;
  url?: string;
  fileType?: string;
  fileSize?: string;
}

interface FilesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  contactName: string;
}

export function FilesSidebar({ isOpen, onClose, messages, contactName }: FilesSidebarProps) {
  const files: FileItem[] = messages
    .filter((m) => m.type === "image" || m.type === "document")
    .map((m) => {
      if (m.type === "image") {
        return {
          id: m.id,
          type: "image" as const,
          name: m.caption || "Imagem",
          sender: m.isOwn ? "Você" : contactName,
          date: m.timestamp,
          url: m.imageUrl,
        };
      }
      if (m.type === "document") {
        return {
          id: m.id,
          type: "document" as const,
          name: m.fileName,
          sender: m.isOwn ? "Você" : contactName,
          date: m.timestamp,
          fileType: m.fileType,
          fileSize: m.fileSize,
        };
      }
      return null;
    })
    .filter(Boolean) as FileItem[];

  const handleDownload = (file: FileItem) => {
    if (file.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_blank";
      link.click();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l shadow-xl z-50 flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="font-semibold text-foreground">Arquivos</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {files.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">
                Nenhum arquivo na conversa
              </p>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    file.type === "image" ? "bg-primary/10" : "bg-accent"
                  }`}>
                    {file.type === "image" ? (
                      <ImageIcon className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-accent-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 py-0.5">
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.sender} • {file.date}
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
