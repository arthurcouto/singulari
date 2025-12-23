import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildProfile } from "@/components/ChildProfile";
import { SchoolSection } from "@/components/SchoolSection";
import { TherapySection } from "@/components/TherapySection";
import { HealthSection } from "@/components/HealthSection";
import { MainLayout } from "@/components/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Heart, Activity } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("escola");
  const { childData } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Child Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChildProfile {...childData} />
        </motion.div>

        {/* Divider with accent */}
        <motion.div
          className="h-1 w-24 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-lg grid-cols-3 bg-muted p-1 rounded-xl">
              <TabsTrigger
                value="escola"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Escola</span>
              </TabsTrigger>
              <TabsTrigger
                value="terapias"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Terapias</span>
              </TabsTrigger>
              <TabsTrigger
                value="saude"
                className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg transition-all duration-300"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Saúde</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="escola" className="mt-6">
              <motion.div
                key="escola"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SchoolSection />
              </motion.div>
            </TabsContent>

            <TabsContent value="terapias" className="mt-6">
              <motion.div
                key="terapias"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TherapySection />
              </motion.div>
            </TabsContent>

            <TabsContent value="saude" className="mt-6">
              <motion.div
                key="saude"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <HealthSection />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Index;
