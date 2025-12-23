import { Check, CheckCheck, Play, Pause, MapPin, Copy, Download, FileText } from "lucide-react";
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ImagePreviewDialog } from "./ImagePreviewDialog";

export type MessageType = "text" | "image" | "document" | "audio" | "video" | "location" | "pix";

interface BaseMessage {
  id: string;
  type: MessageType;
  timestamp: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
}

interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

interface ImageMessage extends BaseMessage {
  type: "image";
  imageUrl: string;
  caption?: string;
}

interface DocumentMessage extends BaseMessage {
  type: "document";
  fileName: string;
  fileSize: string;
  fileType: string;
}

interface AudioMessage extends BaseMessage {
  type: "audio";
  duration: string;
}

interface VideoMessage extends BaseMessage {
  type: "video";
  videoUrl: string;
  thumbnailUrl?: string;
  duration: string;
  caption?: string;
}

interface LocationMessage extends BaseMessage {
  type: "location";
  address: string;
  coordinates?: { lat: number; lng: number };
}

interface PixMessage extends BaseMessage {
  type: "pix";
  pixCode: string;
  amount: string;
  recipient: string;
}

export type Message = TextMessage | ImageMessage | DocumentMessage | AudioMessage | VideoMessage | LocationMessage | PixMessage;

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const bubbleClass = message.isOwn
    ? "message-bubble-sent ml-auto"
    : "message-bubble-received mr-auto";

  const StatusIcon = () => {
    if (!message.isOwn) return null;
    
    if (message.status === "read") {
      return <CheckCheck className="h-3.5 w-3.5 text-primary-foreground/70" />;
    }
    if (message.status === "delivered") {
      return <CheckCheck className="h-3.5 w-3.5 text-primary-foreground/50" />;
    }
    return <Check className="h-3.5 w-3.5 text-primary-foreground/50" />;
  };

  const handleCopyPix = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código Pix copiado!",
      description: "O código foi copiado para a área de transferência.",
    });
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case "text":
        return (
          <p className="text-sm leading-relaxed">{message.content}</p>
        );

      case "image":
        return (
          <>
            <div className="space-y-1.5">
              <div 
                className="relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setImagePreviewOpen(true)}
              >
                <img
                  src={message.imageUrl}
                  alt="Imagem enviada"
                  className="w-full max-w-[240px] object-cover hover:opacity-90 transition-opacity"
                />
              </div>
              {message.caption && (
                <p className="text-sm leading-relaxed">{message.caption}</p>
              )}
            </div>
            <ImagePreviewDialog
              isOpen={imagePreviewOpen}
              onClose={() => setImagePreviewOpen(false)}
              imageUrl={message.imageUrl}
              caption={message.caption}
            />
          </>
        );

      case "document":
        return (
          <div className="flex items-center gap-2.5 min-w-[180px]">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              message.isOwn ? "bg-primary-foreground/20" : "bg-primary/10"
            }`}>
              <FileText className={`h-4 w-4 ${message.isOwn ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{message.fileName}</p>
              <p className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {message.fileType} • {message.fileSize}
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className={`shrink-0 h-8 w-8 ${message.isOwn ? "text-primary-foreground hover:bg-primary-foreground/20" : "text-primary hover:bg-primary/10"}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        );

      case "audio":
        return (
          <div className="flex items-center gap-2.5 min-w-[180px]">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleAudio}
              className={`shrink-0 h-9 w-9 rounded-full ${
                message.isOwn 
                  ? "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30" 
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <div className="flex-1 space-y-1">
              <div className={`h-1 rounded-full overflow-hidden ${
                message.isOwn ? "bg-primary-foreground/30" : "bg-muted"
              }`}>
                <div
                  className={`h-full transition-all duration-100 ${
                    message.isOwn ? "bg-primary-foreground" : "bg-primary"
                  }`}
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <p className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {message.duration}
              </p>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-1.5 min-w-[200px] max-w-[280px]">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={message.videoUrl}
                poster={message.thumbnailUrl}
                className="w-full aspect-video object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                controls={isVideoPlaying}
              />
              {!isVideoPlaying && (
                <button
                  onClick={() => videoRef.current?.play()}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-5 w-5 text-foreground ml-0.5" />
                  </div>
                </button>
              )}
              <div className={`absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                message.isOwn ? "bg-black/50 text-white" : "bg-black/50 text-white"
              }`}>
                {message.duration}
              </div>
            </div>
            {message.caption && (
              <p className="text-sm leading-relaxed">{message.caption}</p>
            )}
          </div>
        );

      case "location":
        const lat = message.coordinates?.lat || -23.5505;
        const lng = message.coordinates?.lng || -46.6333;
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=300x150&scale=2&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;
        
        return (
          <div className="space-y-1.5 min-w-[200px]">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative h-28 rounded-lg overflow-hidden">
                <img 
                  src={mapUrl}
                  alt="Localização"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className={`hidden absolute inset-0 flex items-center justify-center ${
                  message.isOwn ? "bg-primary-foreground/10" : "bg-muted"
                }`}>
                  <MapPin className={`h-8 w-8 ${message.isOwn ? "text-primary-foreground" : "text-primary"}`} />
                </div>
              </div>
            </a>
            <div className="flex items-start gap-1.5">
              <MapPin className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`} />
              <p className="text-xs leading-relaxed">{message.address}</p>
            </div>
          </div>
        );

      case "pix":
        return (
          <div className="space-y-2.5 min-w-[220px]">
            <div className="text-center space-y-0.5">
              <p className={`text-xs font-medium ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                Pagamento Pix
              </p>
              <p className="text-xl font-bold">{message.amount}</p>
              <p className={`text-xs ${message.isOwn ? "text-primary-foreground/80" : "text-foreground"}`}>
                Para: {message.recipient}
              </p>
            </div>
            
            <div className={`mx-auto w-28 h-28 rounded-lg flex items-center justify-center p-2 ${
              message.isOwn ? "bg-white" : "bg-white border"
            }`}>
              <QRCodeSVG 
                value={message.pixCode}
                size={96}
                level="M"
                includeMargin={false}
              />
            </div>
            
            <Button
              variant={message.isOwn ? "secondary" : "outline"}
              size="sm"
              className="w-full gap-1.5 h-8 text-xs"
              onClick={() => handleCopyPix(message.pixCode)}
            >
              <Copy className="h-3.5 w-3.5" />
              Copiar código Pix
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`max-w-[75%] animate-fade-in ${message.isOwn ? "ml-auto" : "mr-auto"}`}>
      <div className={`${bubbleClass} px-3 py-2`}>
        {renderContent()}
        <div className={`flex items-center justify-end gap-1 mt-1 ${
          message.isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
        }`}>
          <span className="text-[10px]">{message.timestamp}</span>
          <StatusIcon />
        </div>
      </div>
    </div>
  );
}
