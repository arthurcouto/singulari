import { IEPProvider } from "@/context/IEPContext";
import { IEPForm } from "@/components/iep/IEPForm";

const Index = () => {
  return (
    <IEPProvider>
      <IEPForm />
    </IEPProvider>
  );
};

export default Index;
