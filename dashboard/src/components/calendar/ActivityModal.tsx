import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Activity,
  ActivityType,
  Participant,
  ActivityNote,
  activityTypeConfig,
  recurrenceOptions,
  locationOptions,
  RecurrenceType,
} from '@/types/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, Clock, MapPin, Users, Trash2, Plus, X, StickyNote, Repeat, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id'>) => void;
  onUpdate: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
  mode: 'view' | 'create' | 'edit';
  defaultDate?: Date;
  defaultStartTime?: string;
  defaultEndTime?: string;
  onRequestEdit?: () => void;
  participants: Participant[];
  onAddParticipant: (participant: Participant) => void;
}

const colorClasses: Record<string, string> = {
  blue: 'bg-event-blue-light border-event-blue',
  pink: 'bg-event-pink-light border-event-pink',
  green: 'bg-event-green-light border-event-green',
  yellow: 'bg-event-yellow-light border-event-yellow',
  purple: 'bg-event-purple-light border-event-purple',
  orange: 'bg-event-orange-light border-event-orange',
};

const colorDot: Record<string, string> = {
  blue: 'bg-event-blue',
  pink: 'bg-event-pink',
  green: 'bg-event-green',
  yellow: 'bg-event-yellow',
  purple: 'bg-event-purple',
  orange: 'bg-event-orange',
};

export const ActivityModal = ({
  activity,
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  mode,
  defaultDate,
  defaultStartTime,
  defaultEndTime,
  onRequestEdit,
  participants: allParticipants,
  onAddParticipant,
}: ActivityModalProps) => {
  const initialForm = useMemo<Partial<Activity>>(() => {
    if ((mode === 'edit' || mode === 'view') && activity) return activity;
    return {
      type: 'other',
      description: '',
      date: defaultDate ?? new Date(),
      startTime: defaultStartTime ?? '09:00',
      endTime: defaultEndTime ?? '10:00',
      location: 'Casa',
      participants: [],
      notes: [],
      recurrence: 'none',
    };
  }, [mode, activity, defaultDate, defaultStartTime, defaultEndTime]);

  const [formData, setFormData] = useState<Partial<Activity>>(initialForm);
  const [participantSearch, setParticipantSearch] = useState('');
  const [participantPopoverOpen, setParticipantPopoverOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [showNewParticipantForm, setShowNewParticipantForm] = useState(false);
  const [newParticipantData, setNewParticipantData] = useState({ name: '', email: '', phone: '' });

  // Reset form when modal opens or mode/activity changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
      setNewNote('');
      setParticipantSearch('');
      setShowNewParticipantForm(false);
      setNewParticipantData({ name: '', email: '', phone: '' });
    }
  }, [isOpen, initialForm]);

  const filteredParticipants = useMemo(() => {
    const search = participantSearch.toLowerCase();
    const selectedIds = new Set((formData.participants || []).map((p) => p.id));
    return allParticipants.filter(
      (p) =>
        !selectedIds.has(p.id) &&
        (p.name.toLowerCase().includes(search) ||
          p.email?.toLowerCase().includes(search) ||
          p.phone?.includes(search))
    );
  }, [participantSearch, formData.participants, allParticipants]);

  const addParticipantToForm = useCallback((participant: Participant) => {
    setFormData((prev) => ({
      ...prev,
      participants: [...(prev.participants || []), participant],
    }));
    setParticipantPopoverOpen(false);
    setParticipantSearch('');
    setShowNewParticipantForm(false);
  }, []);

  const createAndAddParticipant = useCallback(() => {
    if (!newParticipantData.name.trim()) return;
    
    const newParticipant: Participant = {
      id: `new-${Date.now()}`,
      name: newParticipantData.name.trim(),
      email: newParticipantData.email.trim() || undefined,
      phone: newParticipantData.phone.trim() || undefined,
    };
    
    onAddParticipant(newParticipant);
    addParticipantToForm(newParticipant);
    setNewParticipantData({ name: '', email: '', phone: '' });
  }, [newParticipantData, onAddParticipant, addParticipantToForm]);

  const removeParticipant = useCallback((participantId: string) => {
    setFormData((prev) => ({
      ...prev,
      participants: (prev.participants || []).filter((p) => p.id !== participantId),
    }));
  }, []);

  const addNote = useCallback(() => {
    if (!newNote.trim()) return;
    const note: ActivityNote = {
      id: Date.now().toString(),
      content: newNote.trim(),
      createdAt: new Date(),
    };
    setFormData((prev) => ({
      ...prev,
      notes: [...(prev.notes || []), note],
    }));
    setNewNote('');
  }, [newNote]);

  const removeNote = useCallback((noteId: string) => {
    setFormData((prev) => ({
      ...prev,
      notes: (prev.notes || []).filter((n) => n.id !== noteId),
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && activity) {
      onUpdate({ ...activity, ...formData } as Activity);
    } else {
      onSave(formData as Omit<Activity, 'id'>);
    }
    onClose();
  };

  const isViewMode = mode === 'view';
  const typeConfig = activityTypeConfig[formData.type || 'other'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'view' && (
              <>
                <div className={cn('w-3 h-3 rounded-full', colorDot[typeConfig.color])} />
                Detalhes da Atividade
              </>
            )}
            {mode === 'create' && 'Nova Atividade'}
            {mode === 'edit' && 'Editar Atividade'}
          </DialogTitle>
        </DialogHeader>

        {isViewMode && activity ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className={cn('p-4 rounded-xl border-l-4', colorClasses[activityTypeConfig[activity.type].color])}>
              <h3 className="text-lg font-semibold text-foreground">{activityTypeConfig[activity.type].label}</h3>
              {activity.description && <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm">{format(new Date(activity.date), "EEEE, d 'de' MMMM", { locale: ptBR })}</span>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm">{activity.startTime} - {activity.endTime}</span>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm">{activity.location}</span>
              </div>

              {activity.recurrence !== 'none' && (
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Repeat className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm">{recurrenceOptions.find((r) => r.value === activity.recurrence)?.label}</span>
                </div>
              )}

              {activity.participants.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activity.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                          {participant.avatar ? (
                            <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            participant.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <span className="text-sm text-foreground">{participant.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activity.notes.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <StickyNote className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2 flex-1">
                    {activity.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-muted rounded-lg text-sm text-foreground">
                        {note.content}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={onRequestEdit}>
                Editar
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  onDelete(activity.id);
                  onClose();
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activity Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de Atividade</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ActivityType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {Object.entries(activityTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div className={cn('w-3 h-3 rounded-full', colorDot[config.color])} />
                        {config.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                <Input
                  id="date"
                  type="date"
                  className="h-10"
                  value={formData.date ? format(new Date(formData.date), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium">Início</Label>
                <Input
                  id="startTime"
                  type="time"
                  className="h-10"
                  value={formData.startTime ?? '09:00'}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium">Fim</Label>
                <Input
                  id="endTime"
                  type="time"
                  className="h-10"
                  value={formData.endTime ?? '10:00'}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Local</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurrence */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Recorrência</Label>
              <Select
                value={formData.recurrence}
                onValueChange={(value: RecurrenceType) => setFormData({ ...formData, recurrence: value })}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione a recorrência" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {recurrenceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.recurrence && formData.recurrence !== 'none' && (
                <p className="text-xs text-muted-foreground">
                  Serão criadas atividades recorrentes automaticamente
                </p>
              )}
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Participantes</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(formData.participants || []).map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                      {participant.avatar ? (
                        <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        participant.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <span className="text-sm">{participant.name}</span>
                    <button
                      type="button"
                      onClick={() => removeParticipant(participant.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Popover open={participantPopoverOpen} onOpenChange={setParticipantPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Adicionar participante
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-popover z-50" align="start">
                  {!showNewParticipantForm ? (
                    <Command>
                      <CommandInput
                        placeholder="Buscar por nome, email ou telefone..."
                        value={participantSearch}
                        onValueChange={setParticipantSearch}
                      />
                      <CommandList>
                        <CommandEmpty>
                          <div className="p-2 text-center">
                            <p className="text-sm text-muted-foreground mb-2">Nenhum participante encontrado</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                setShowNewParticipantForm(true);
                                setNewParticipantData({ name: participantSearch, email: '', phone: '' });
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Criar "{participantSearch}"
                            </Button>
                          </div>
                        </CommandEmpty>
                        <CommandGroup>
                          {filteredParticipants.map((participant) => (
                            <CommandItem
                              key={participant.id}
                              onSelect={() => addParticipantToForm(participant)}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                                  {participant.avatar ? (
                                    <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                                  ) : (
                                    participant.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{participant.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {participant.email || participant.phone}
                                  </p>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        {filteredParticipants.length > 0 && participantSearch && (
                          <div className="border-t border-border p-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="w-full gap-2 justify-start"
                              onClick={() => {
                                setShowNewParticipantForm(true);
                                setNewParticipantData({ name: participantSearch, email: '', phone: '' });
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Criar novo participante
                            </Button>
                          </div>
                        )}
                      </CommandList>
                    </Command>
                  ) : (
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Novo Participante</h4>
                        <button
                          type="button"
                          onClick={() => setShowNewParticipantForm(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <Input
                        placeholder="Nome *"
                        value={newParticipantData.name}
                        onChange={(e) => setNewParticipantData({ ...newParticipantData, name: e.target.value })}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={newParticipantData.email}
                        onChange={(e) => setNewParticipantData({ ...newParticipantData, email: e.target.value })}
                      />
                      <Input
                        placeholder="Telefone"
                        value={newParticipantData.phone}
                        onChange={(e) => setNewParticipantData({ ...newParticipantData, phone: e.target.value })}
                      />
                      <Button
                        type="button"
                        className="w-full"
                        disabled={!newParticipantData.name.trim()}
                        onClick={createAndAddParticipant}
                      >
                        Adicionar
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Descrição (opcional)</Label>
              <Textarea
                id="description"
                value={formData.description ?? ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Adicione uma descrição..."
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Anotações</Label>
              <div className="space-y-2">
                {(formData.notes || []).map((note) => (
                  <div key={note.id} className="flex items-center gap-2 p-2.5 bg-muted rounded-lg">
                    <span className="flex-1 text-sm">{note.content}</span>
                    <button
                      type="button"
                      onClick={() => removeNote(note.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Ex: Não esquecer de levar o exame"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addNote();
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={addNote}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {mode === 'edit' ? 'Salvar' : 'Criar'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
