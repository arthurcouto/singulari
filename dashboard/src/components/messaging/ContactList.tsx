import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  status?: "available" | "vacation" | "recess";
  serviceHours?: { start: string; end: string };
}

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contactId: string) => void;
  className?: string;
}

export function ContactList({ contacts, selectedContactId, onSelectContact, className }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status?: Contact["status"]) => {
    if (status === "vacation") {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-700 border-amber-200">Férias</Badge>;
    }
    if (status === "recess") {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200">Recesso</Badge>;
    }
    return null;
  };

  return (
    <div className={cn("flex flex-col h-full bg-card", className)}>
      {/* Header */}
      <header className="px-4 pt-5 pb-4 border-b shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Mensagens</h1>
            <p className="text-xs text-muted-foreground">Comunicação com a escola</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contato..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-none h-10 text-sm"
          />
        </div>
      </header>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 hover:bg-accent/50 cursor-pointer transition-colors border-b border-border/50",
              selectedContactId === contact.id && "bg-accent"
            )}
          >
            <div className="relative shrink-0">
              <Avatar className="h-11 w-11 border-2 border-primary/10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                  {contact.initials}
                </AvatarFallback>
              </Avatar>
              {contact.isOnline && !contact.status && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="font-medium text-foreground truncate text-sm">
                    {contact.name}
                  </h3>
                  {getStatusBadge(contact.status)}
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {contact.lastMessageTime}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
