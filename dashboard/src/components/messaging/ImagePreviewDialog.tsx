import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption?: string;
}

export function ImagePreviewDialog({ isOpen, onClose, imageUrl, caption }: ImagePreviewDialogProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = caption || "imagem";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast({
        title: "Download iniciado",
        description: "A imagem está sendo baixada.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar a imagem.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleDownload}
              className="h-10 w-10 rounded-full bg-card/90 hover:bg-card shadow-lg"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-card/90 hover:bg-card shadow-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <img
            src={imageUrl}
            alt={caption || "Imagem"}
            className="w-full max-h-[85vh] object-contain rounded-xl"
          />
          
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl">
              <p className="text-white text-sm">{caption}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
