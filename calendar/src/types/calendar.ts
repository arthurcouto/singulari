export type ActivityType = 
  | 'therapy'
  | 'school_event'
  | 'extracurricular'
  | 'birthday'
  | 'medical'
  | 'sports'
  | 'music'
  | 'art'
  | 'other';

export type RecurrenceType = 
  | 'none'
  | 'weekly'
  | 'monthly'
  | 'bimonthly'
  | 'semiannual'
  | 'annual';

export interface Participant {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface ActivityNote {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  participants: Participant[];
  notes: ActivityNote[];
  recurrence: RecurrenceType;
}

export type ViewMode = 'weekly' | 'monthly';

export interface CalendarState {
  currentDate: Date;
  viewMode: ViewMode;
  activities: Activity[];
  selectedActivity: Activity | null;
}

// Activity type metadata (color, label)
export const activityTypeConfig: Record<ActivityType, { label: string; color: string }> = {
  therapy: { label: 'Terapia', color: 'purple' },
  school_event: { label: 'Evento Escolar', color: 'blue' },
  extracurricular: { label: 'Atividade Extra', color: 'green' },
  birthday: { label: 'Aniversário', color: 'pink' },
  medical: { label: 'Médico', color: 'orange' },
  sports: { label: 'Esportes', color: 'green' },
  music: { label: 'Música', color: 'yellow' },
  art: { label: 'Arte', color: 'purple' },
  other: { label: 'Outro', color: 'blue' },
};

export const recurrenceOptions: { value: RecurrenceType; label: string }[] = [
  { value: 'none', label: 'Sem recorrência' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'bimonthly', label: 'Bimestral' },
  { value: 'semiannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' },
];

export const locationOptions = [
  'Casa',
  'Escola',
  'Clínica',
  'Hospital',
  'Parque',
  'Academia',
  'Estúdio de Música',
  'Estúdio de Arte',
  'Centro Esportivo',
  'Shopping',
  'Restaurante',
  'Online / Virtual',
  'Outro',
];
