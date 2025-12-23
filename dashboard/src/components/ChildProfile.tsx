import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Phone, User } from "lucide-react";

interface ChildProfileProps {
  name: string;
  birthDate: string;
  age: string;
  school: string;
  grade: string;
  responsible: string;
  phone: string;
  photoUrl?: string;
}

export function ChildProfile({
  name,
  birthDate,
  age,
  school,
  grade,
  responsible,
  phone,
  photoUrl,
}: ChildProfileProps) {
  return (
    <Card className="border-0 shadow-sm bg-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-20 w-20 bg-primary text-primary-foreground text-2xl font-display">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-display">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground">{name}</h2>
              <p className="text-muted-foreground">{grade} • {school}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Nascimento</p>
                  <p className="font-medium text-foreground">{birthDate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Idade</p>
                  <p className="font-medium text-foreground">{age}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Responsável</p>
                  <p className="font-medium text-foreground">{responsible}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Telefone</p>
                  <p className="font-medium text-foreground">{phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
