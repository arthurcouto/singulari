import React, { memo, useCallback, useMemo } from "react";
import { useIEP } from "@/context/IEPContext";
import { SectionBadge } from "../SectionBadge";
import { GuideBox } from "../GuideBox";
import { NavigationButtons } from "../NavigationButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SPECIAL_EDUCATION_SERVICES = [
  "Fonoaudiologia",
  "Terapia Ocupacional",
  "Fisioterapia",
  "Auxiliar de Apoio Comportamental",
  "Psicologia Escolar",
  "Psicopedagogia",
  "Neuropsicologia",
  "Musicoterapia",
  "Arteterapia",
  "Outro",
];

const SUPPLEMENTARY_SERVICES = [
  "Pausas para Estímulo Sensorial",
  "Sala Silenciosa para Provas",
  "Pausas de Trabalho",
  "Tempo Extra para Atividades",
  "Material Adaptado",
  "Apoio Visual",
  "Intérprete de Libras",
  "Outro",
];

const FREQUENCY_OPTIONS = ["Diário", "Semanal"];

const DAYS_OF_WEEK = [
  { id: "segunda", label: "Segunda" },
  { id: "terca", label: "Terça" },
  { id: "quarta", label: "Quarta" },
  { id: "quinta", label: "Quinta" },
  { id: "sexta", label: "Sexta" },
  { id: "sabado", label: "Sábado" },
];

type ServicesCategory = "specialEducation" | "supplementary" | "transportation";

type RelatedServiceBase = {
  service: string;
  location: string;
  frequency: string;
  beginning: string;
};

type TransportationService = RelatedServiceBase & {
  // Neste projeto, beginning está sendo usado para guardar os dias da semana (csv)
  // para evitar expandir o schema. Mantém o comportamento atual.
  days?: string;
};

type ServiceTableProps = {
  title: string;
  category: Exclude<ServicesCategory, "transportation">;
  services: RelatedServiceBase[];
  serviceOptions: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onFieldChange: (index: number, field: keyof RelatedServiceBase, value: string) => void;
};

const ServiceTable = memo(function ServiceTable({
  title,
  category,
  services,
  serviceOptions,
  onAdd,
  onRemove,
  onFieldChange,
}: ServiceTableProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="text-left py-2 pr-4 font-semibold">Serviço</th>
              <th className="text-left py-2 pr-4 font-semibold">Local</th>
              <th className="text-left py-2 pr-4 font-semibold">Frequência</th>
              <th className="text-left py-2 pr-4 font-semibold">Início</th>
              <th className="text-left py-2 font-semibold w-12"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={`${category}-${index}`} className="border-b border-border">
                <td className="py-2 pr-4">
                  <Select value={service.service} onValueChange={(v) => onFieldChange(index, "service", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-2 pr-4">
                  <Input
                    type="text"
                    value={service.location}
                    onChange={(e) => onFieldChange(index, "location", e.target.value)}
                    placeholder="Sala/Local"
                  />
                </td>
                <td className="py-2 pr-4">
                  <Input
                    type="text"
                    value={service.frequency}
                    onChange={(e) => onFieldChange(index, "frequency", e.target.value)}
                    placeholder="Diário/Semanal"
                  />
                </td>
                <td className="py-2 pr-4">
                  <Input
                    type="text"
                    value={service.beginning}
                    onChange={(e) => onFieldChange(index, "beginning", e.target.value)}
                    placeholder="01/09/2019"
                  />
                </td>
                <td className="py-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onRemove(index)}
                    disabled={services.length <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="outline" onClick={onAdd} className="mt-4 gap-2">
        <Plus className="w-4 h-4" />
        Adicionar Serviço
      </Button>
    </div>
  );
});

type TransportationTableProps = {
  services: TransportationService[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onFieldChange: (index: number, field: keyof RelatedServiceBase, value: string) => void;
  onToggleDay: (index: number, day: string) => void;
};

const TransportationTable = memo(function TransportationTable({
  services,
  onAdd,
  onRemove,
  onFieldChange,
  onToggleDay,
}: TransportationTableProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4">Serviços de Transporte</h3>
      <div className="space-y-6">
        {services.map((service, index) => {
          const selectedDays = service.beginning ? service.beginning.split(",").filter(Boolean) : [];

          return (
            <div key={`transport-${index}`} className="border border-border rounded-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <span className="font-semibold text-sm">Transporte {index + 1}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemove(index)}
                  disabled={services.length <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nome do Responsável</label>
                  <Input
                    type="text"
                    value={service.service}
                    onChange={(e) => onFieldChange(index, "service", e.target.value)}
                    placeholder="Nome do responsável"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Frequência</label>
                  <Select value={service.frequency} onValueChange={(v) => onFieldChange(index, "frequency", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCY_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Destino</label>
                  <Input
                    type="text"
                    value={service.location}
                    onChange={(e) => onFieldChange(index, "location", e.target.value)}
                    placeholder="Escola"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Dias da Semana</label>
                <div className="flex flex-wrap gap-4">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`day-${index}-${day.id}`}
                        checked={selectedDays.includes(day.id)}
                        onCheckedChange={() => onToggleDay(index, day.id)}
                      />
                      <label htmlFor={`day-${index}-${day.id}`} className="text-sm cursor-pointer">
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" onClick={onAdd} className="mt-4 gap-2">
        <Plus className="w-4 h-4" />
        Adicionar Serviço de Transporte
      </Button>
    </div>
  );
});

export const ServicesStep: React.FC = () => {
  const { data, updateData } = useIEP();
  const { relatedServices } = data;

  const handleServiceFieldChange = useCallback(
    (category: ServicesCategory, index: number, field: keyof RelatedServiceBase, value: string) => {
      const currentServices = [...(relatedServices[category] as RelatedServiceBase[])];
      currentServices[index] = { ...currentServices[index], [field]: value };

      updateData({
        relatedServices: {
          ...relatedServices,
          [category]: currentServices,
        },
      });
    },
    [relatedServices, updateData]
  );

  const addService = useCallback(
    (category: ServicesCategory) => {
      const newService =
        category === "transportation"
          ? ({ service: "", location: "", frequency: "", beginning: "", days: "" } as TransportationService)
          : ({ service: "", location: "", frequency: "", beginning: "" } as RelatedServiceBase);

      updateData({
        relatedServices: {
          ...relatedServices,
          [category]: [...relatedServices[category], newService],
        },
      });
    },
    [relatedServices, updateData]
  );

  const removeService = useCallback(
    (category: ServicesCategory, index: number) => {
      if (relatedServices[category].length <= 1) return;
      updateData({
        relatedServices: {
          ...relatedServices,
          [category]: relatedServices[category].filter((_, i) => i !== index),
        },
      });
    },
    [relatedServices, updateData]
  );

  const toggleTransportDay = useCallback(
    (index: number, day: string) => {
      const service = relatedServices.transportation[index] as TransportationService;
      const currentDays = service.beginning ? service.beginning.split(",").filter(Boolean) : [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];

      handleServiceFieldChange("transportation", index, "beginning", updatedDays.join(","));
    },
    [handleServiceFieldChange, relatedServices.transportation]
  );

  const specialEducation = useMemo(
    () => relatedServices.specialEducation as RelatedServiceBase[],
    [relatedServices.specialEducation]
  );
  const supplementary = useMemo(
    () => relatedServices.supplementary as RelatedServiceBase[],
    [relatedServices.supplementary]
  );
  const transportation = useMemo(
    () => relatedServices.transportation as TransportationService[],
    [relatedServices.transportation]
  );

  return (
    <div className="animate-fade-in space-y-16">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black mb-2">Serviços Relacionados</h1>
          <div className="form-divider w-full max-w-md" />
        </div>
        <SectionBadge number={5} />
      </div>

      <section className="bg-secondary/50 p-6 rounded-sm">
        <h3 className="font-bold mb-3">📚 O que são Serviços Relacionados?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Serviços relacionados são apoios adicionais que ajudam seu filho a se beneficiar da educação especial. Eles podem incluir fonoaudiologia, terapia ocupacional, fisioterapia, entre outros. Esses serviços são garantidos por lei e devem ser fornecidos gratuitamente pela escola.
        </p>
        <div className="bg-primary/5 p-4 rounded-sm border-l-4 border-primary">
          <h4 className="font-semibold text-sm mb-2">📖 Base Legal</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              • <strong>Lei Brasileira de Inclusão (Lei nº 13.146/2015)</strong> - Artigo 28: Garante adaptações curriculares e serviços de apoio.
            </li>
            <li>
              • <strong>Política Nacional de Educação Especial</strong> - Define os serviços de atendimento educacional especializado (AEE).
            </li>
            <li>
              • <strong>Resolução CNE/CEB nº 4/2009</strong> - Estabelece diretrizes para o AEE na Educação Básica.
            </li>
          </ul>
        </div>
      </section>

      <section className="pt-6">
        <ServiceTable
          title="Serviços de Educação Especial"
          category="specialEducation"
          services={specialEducation}
          serviceOptions={SPECIAL_EDUCATION_SERVICES}
          onAdd={() => addService("specialEducation")}
          onRemove={(idx) => removeService("specialEducation", idx)}
          onFieldChange={(idx, field, value) =>
            handleServiceFieldChange("specialEducation", idx, field, value)
          }
        />

        <ServiceTable
          title="Serviços Suplementares"
          category="supplementary"
          services={supplementary}
          serviceOptions={SUPPLEMENTARY_SERVICES}
          onAdd={() => addService("supplementary")}
          onRemove={(idx) => removeService("supplementary", idx)}
          onFieldChange={(idx, field, value) =>
            handleServiceFieldChange("supplementary", idx, field, value)
          }
        />

        <TransportationTable
          services={transportation}
          onAdd={() => addService("transportation")}
          onRemove={(idx) => removeService("transportation", idx)}
          onFieldChange={(idx, field, value) =>
            handleServiceFieldChange("transportation", idx, field, value)
          }
          onToggleDay={toggleTransportDay}
        />

        <GuideBox
          glossary={[
            { term: "AEE", definition: "Atendimento Educacional Especializado" },
            { term: "SRM", definition: "Sala de Recursos Multifuncionais" },
            { term: "TO", definition: "Terapia Ocupacional" },
          ]}
        >
          <p className="mb-2">
            <strong>💡 Dica para Pais:</strong>
          </p>
          <p>
            Você tem o direito de solicitar avaliações para determinar se seu filho precisa de serviços adicionais. Se a escola negar um serviço, peça a justificativa por escrito. Você pode contestar essa decisão.
          </p>
        </GuideBox>
      </section>

      <NavigationButtons />
    </div>
  );
};
