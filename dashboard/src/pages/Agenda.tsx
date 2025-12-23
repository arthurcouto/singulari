import { MainLayout } from "@/components/MainLayout";
import { CalendarApp } from "@/components/calendar/CalendarApp";

export default function Agenda() {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-200px)]">
        <CalendarApp />
      </div>
    </MainLayout>
  );
}
