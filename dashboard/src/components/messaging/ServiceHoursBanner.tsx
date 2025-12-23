import { Clock, Palmtree, Coffee } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Contact } from "./ContactList";

interface ServiceHoursBannerProps {
  contact: Contact;
}

export function ServiceHoursBanner({ contact }: ServiceHoursBannerProps) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinutes;

  // Check if contact has status
  if (contact.status === "vacation") {
    return (
      <Alert className="mx-3 mt-2 border-warning/20 bg-warning/10 text-warning">
        <Palmtree className="h-4 w-4 text-warning" />
        <AlertDescription className="text-xs">
          <strong>{contact.name.split(" ")[0]}</strong> está de férias. Sua mensagem será respondida após o retorno.
        </AlertDescription>
      </Alert>
    );
  }

  if (contact.status === "recess") {
    return (
      <Alert className="mx-3 mt-2 border-accent/50 bg-accent/30 text-accent-foreground">
        <Coffee className="h-4 w-4 text-accent-foreground" />
        <AlertDescription className="text-xs">
          <strong>{contact.name.split(" ")[0]}</strong> está em recesso escolar. O retorno está previsto para janeiro.
        </AlertDescription>
      </Alert>
    );
  }

  // Check service hours
  if (contact.serviceHours) {
    const [startHour, startMin] = contact.serviceHours.start.split(":").map(Number);
    const [endHour, endMin] = contact.serviceHours.end.split(":").map(Number);
    const startTimeInMinutes = startHour * 60 + startMin;
    const endTimeInMinutes = endHour * 60 + endMin;

    const isOutsideHours = currentTimeInMinutes < startTimeInMinutes || currentTimeInMinutes > endTimeInMinutes;

    if (isOutsideHours) {
      return (
        <Alert className="mx-3 mt-2 border-muted bg-muted/50">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-xs text-muted-foreground">
            Fora do horário de atendimento ({contact.serviceHours.start} - {contact.serviceHours.end}). Sua mensagem será respondida no próximo horário disponível.
          </AlertDescription>
        </Alert>
      );
    }
  }

  return null;
}
