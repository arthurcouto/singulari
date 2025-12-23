import { MainLayout } from "@/components/MainLayout";
import { IEPProvider } from "@/context/IEPContext";
import { IEPForm } from "@/components/iep/IEPForm";

const PEI = () => {
  return (
    <MainLayout>
      <IEPProvider>
        <IEPForm />
      </IEPProvider>
    </MainLayout>
  );
};

export default PEI;
