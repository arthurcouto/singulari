import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactList, Contact } from "@/components/messaging/ContactList";
import { ChatHeader } from "@/components/messaging/ChatHeader";
import { MessageInput } from "@/components/messaging/MessageInput";
import { MessageList } from "@/components/messaging/MessageList";
import { FilesSidebar } from "@/components/messaging/FilesSidebar";
import { ServiceHoursBanner } from "@/components/messaging/ServiceHoursBanner";
import { Message } from "@/components/messaging/MessageBubble";
import { MessageCircle } from "lucide-react";

const contacts: Contact[] = [
  {
    id: "1",
    name: "Prof. Maria Santos",
    role: "Professora - 5º Ano",
    initials: "MS",
    isOnline: true,
    lastMessage: "Segue o Pix para pagamento do material...",
    lastMessageTime: "10:00",
    unreadCount: 3,
    serviceHours: { start: "07:30", end: "17:00" },
  },
  {
    id: "2",
    name: "Dr. Carlos Oliveira",
    role: "Psicólogo Escolar",
    initials: "CO",
    isOnline: false,
    lastMessage: "O Lucas está evoluindo muito bem!",
    lastMessageTime: "Ontem",
    status: "vacation",
  },
  {
    id: "3",
    name: "Coord. Ana Paula",
    role: "Coordenadora Pedagógica",
    initials: "AP",
    isOnline: true,
    lastMessage: "Reunião de pais confirmada para sexta",
    lastMessageTime: "Ontem",
    serviceHours: { start: "08:00", end: "18:00" },
  },
  {
    id: "4",
    name: "Prof. João Pedro",
    role: "Professor de Educação Física",
    initials: "JP",
    isOnline: false,
    lastMessage: "O treino de amanhã será no ginásio",
    lastMessageTime: "Seg",
    status: "recess",
  },
  {
    id: "5",
    name: "Escola Santa Maria",
    role: "Secretaria",
    initials: "SM",
    isOnline: true,
    lastMessage: "Documentos disponíveis para retirada",
    lastMessageTime: "12/12",
    serviceHours: { start: "07:00", end: "19:00" },
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    type: "text",
    content: "Olá! Tudo bem? Gostaria de informar que o Lucas participou muito bem da aula de hoje.",
    timestamp: "09:30",
    isOwn: false,
    status: "read",
  },
  {
    id: "2",
    type: "text",
    content: "Que ótima notícia! Ele estava muito animado para ir à escola hoje. 😊",
    timestamp: "09:32",
    isOwn: true,
    status: "read",
  },
  {
    id: "3",
    type: "image",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    caption: "Lucas fazendo atividade de artes com os colegas",
    timestamp: "09:35",
    isOwn: false,
    status: "read",
  },
  {
    id: "4",
    type: "document",
    fileName: "Relatório_Mensal_Lucas.pdf",
    fileSize: "1.2 MB",
    fileType: "PDF",
    timestamp: "09:40",
    isOwn: false,
    status: "read",
  },
  {
    id: "5",
    type: "text",
    content: "Muito obrigada pelo relatório! Vou ler com atenção.",
    timestamp: "09:42",
    isOwn: true,
    status: "read",
  },
  {
    id: "6",
    type: "audio",
    duration: "0:45",
    timestamp: "09:45",
    isOwn: false,
    status: "read",
  },
  {
    id: "7",
    type: "video",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300&fit=crop",
    duration: "0:10",
    caption: "Vídeo da apresentação do Lucas",
    timestamp: "09:48",
    isOwn: false,
    status: "read",
  },
  {
    id: "8",
    type: "location",
    address: "Colégio Santa Maria - Rua das Flores, 123 - Centro, São Paulo",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    timestamp: "09:50",
    isOwn: false,
    status: "read",
  },
  {
    id: "9",
    type: "text",
    content: "Aqui está a localização do evento de amanhã. Será no salão principal.",
    timestamp: "09:50",
    isOwn: false,
    status: "read",
  },
  {
    id: "10",
    type: "pix",
    pixCode: "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540125.005802BR5925COLEGIO SANTA MARIA6009SAO PAULO62140510EVENTO2024630437B2",
    amount: "R$ 125,00",
    recipient: "Colégio Santa Maria",
    timestamp: "09:55",
    isOwn: false,
    status: "read",
  },
  {
    id: "11",
    type: "text",
    content: "Segue o Pix para pagamento do material da feira de ciências.",
    timestamp: "09:55",
    isOwn: false,
    status: "read",
  },
  {
    id: "12",
    type: "video",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: "0:12",
    timestamp: "10:00",
    isOwn: true,
    status: "delivered",
  },
  {
    id: "13",
    type: "audio",
    duration: "0:15",
    timestamp: "10:02",
    isOwn: true,
    status: "delivered",
  },
];

const MessagingLayout = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filesOpen, setFilesOpen] = useState(false);

  const selectedContact = contacts.find((c) => c.id === contactId) || null;

  const handleSelectContact = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "text",
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendAudio = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "audio",
      duration: "0:08",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendImage = (file: File) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "image",
      imageUrl: URL.createObjectURL(file),
      caption: file.name,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendDocument = (file: File) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "document",
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileType: file.name.split('.').pop()?.toUpperCase() || "DOC",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendVideo = (file: File) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "video",
      videoUrl: URL.createObjectURL(file),
      duration: "0:00",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setMessages([...messages, newMessage]);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Contact List - Hidden on mobile when chat is open */}
      <div className={`
        w-full md:w-80 lg:w-96 border-r shrink-0
        ${contactId ? "hidden md:flex md:flex-col" : "flex flex-col"}
      `}>
        <ContactList
          contacts={contacts}
          selectedContactId={contactId}
          onSelectContact={handleSelectContact}
        />
      </div>

      {/* Chat Area */}
      {contactId && selectedContact ? (
        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader
            name={selectedContact.name}
            role={selectedContact.role}
            initials={selectedContact.initials}
            isOnline={selectedContact.isOnline}
            status={selectedContact.status}
            onBack={handleBack}
            onOpenFiles={() => setFilesOpen(true)}
            showBackOnDesktop={false}
          />
          
          <ServiceHoursBanner contact={selectedContact} />
          
          <MessageList messages={messages} />
          
          <MessageInput
            onSendMessage={handleSendMessage}
            onSendAudio={handleSendAudio}
            onSendImage={handleSendImage}
            onSendDocument={handleSendDocument}
            onSendVideo={handleSendVideo}
          />

          <FilesSidebar
            isOpen={filesOpen}
            onClose={() => setFilesOpen(false)}
            messages={messages}
            contactName={selectedContact.name}
          />
        </div>
      ) : (
        // Empty state for desktop
        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/30">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-1">Selecione uma conversa</h2>
            <p className="text-sm text-muted-foreground">Escolha um contato para iniciar a conversa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingLayout;
