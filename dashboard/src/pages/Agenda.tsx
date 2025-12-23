import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function Agenda() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Agenda
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe os compromissos e eventos
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              Em breve você poderá gerenciar a agenda de compromissos aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
