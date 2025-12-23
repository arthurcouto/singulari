import { MainLayout } from "@/components/MainLayout";
import { CalendarApp } from "@/components/calendar/CalendarApp";

export default function Agenda() {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-180px)] -m-8 ml-0 mr-0">
        <CalendarApp />
      </div>
    </MainLayout>
  );
}
