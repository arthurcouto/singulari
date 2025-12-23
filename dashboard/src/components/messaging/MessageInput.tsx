import { useState, useRef } from "react";
import { Send, Paperclip, Mic, Image, FileText, X, Square, Smile, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendAudio: () => void;
  onSendImage?: (file: File) => void;
  onSendDocument?: (file: File) => void;
  onSendVideo?: (file: File) => void;
}

const commonEmojis = ["😊", "❤️", "👍", "😂", "🙏", "😍", "🎉", "👏", "💪", "🤗", "😢", "😮", "🤔", "✨", "🔥", "💯"];

export function MessageInput({ onSendMessage, onSendAudio, onSendImage, onSendDocument, onSendVideo }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 100)}px`;
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setEmojiOpen(false);
    inputRef.current?.focus();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendImage) {
      onSendImage(file);
    }
    e.target.value = "";
  };

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendDocument) {
      onSendDocument(file);
    }
    e.target.value = "";
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendVideo) {
      onSendVideo(file);
    }
    e.target.value = "";
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onSendAudio();
    setRecordingTime(0);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isRecording) {
    return (
      <div className="flex items-center gap-2 px-3 py-3 bg-card border-t shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={cancelRecording}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 w-10"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-accent rounded-full">
          <div className="w-2.5 h-2.5 bg-destructive rounded-full recording-pulse" />
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-0.5 bg-primary rounded-full waveform-bar"
                style={{ height: "3px" }}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground ml-1">
            {formatTime(recordingTime)}
          </span>
        </div>
        
        <Button
          size="icon"
          onClick={stopRecording}
          className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-soft"
        >
          <Square className="h-4 w-4 fill-current" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-card border-t shrink-0">
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        className="hidden"
        onChange={handleDocumentSelect}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleVideoSelect}
      />

      {/* Attachment Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-primary hover:bg-accent h-10 w-10"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem 
            className="gap-2.5 cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Image className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm">Imagem</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="gap-2.5 cursor-pointer"
            onClick={() => videoInputRef.current?.click()}
          >
            <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Video className="h-3.5 w-3.5 text-purple-500" />
            </div>
            <span className="text-sm">Vídeo</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="gap-2.5 cursor-pointer"
            onClick={() => documentInputRef.current?.click()}
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <FileText className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
            <span className="text-sm">Documento</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Input Field */}
      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl min-h-[44px]">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none scrollbar-thin leading-5"
          style={{ minHeight: "20px", maxHeight: "80px" }}
        />
        
        {/* Emoji Button */}
        <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-primary h-8 w-8"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <div className="grid grid-cols-8 gap-1">
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="w-8 h-8 text-lg hover:bg-accent rounded transition-colors flex items-center justify-center"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Send or Record Button */}
      {message.trim() ? (
        <Button
          size="icon"
          onClick={handleSend}
          className="shrink-0 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-soft transition-all"
        >
          <Send className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          size="icon"
          onClick={startRecording}
          className="shrink-0 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shadow-soft transition-all"
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
