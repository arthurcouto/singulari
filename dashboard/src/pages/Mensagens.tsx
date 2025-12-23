import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";

const Mensagens = () => {
  return (
    <MainLayout>
      <motion.div
        className="min-h-[60vh] flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-sm bg-card max-w-md w-full">
          <CardContent className="p-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
              Mensagens
            </h2>
            <p className="text-muted-foreground">
              Esta seção está em desenvolvimento. Em breve você poderá trocar
              mensagens com os profissionais aqui.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </MainLayout>
  );
};

export default Mensagens;
