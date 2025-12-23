import { CalendarApp } from "@/components/calendar/CalendarApp";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kapan Calendar - Gerencie sua Agenda</title>
        <meta name="description" content="Aplicativo de calendário moderno para gerenciar seus eventos, reuniões e compromissos de forma eficiente." />
      </Helmet>
      <CalendarApp />
    </>
  );
};

export default Index;
