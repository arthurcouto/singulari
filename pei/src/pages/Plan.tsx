import { IEPProvider } from "@/context/IEPContext";
import { IEPForm } from "@/components/iep/IEPForm";

const Plan = () => {
  return (
    <IEPProvider>
      <IEPForm />
    </IEPProvider>
  );
};

export default Plan;
