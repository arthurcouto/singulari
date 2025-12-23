import { Activity, ActivityType, Participant } from '@/types/calendar';
import { addDays, setHours, setMinutes, startOfWeek } from 'date-fns';

const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 1 });

// Sample participants for autocomplete
export const sampleParticipants: Participant[] = [
  { id: 'p1', name: 'Maria Silva', email: 'maria@email.com', phone: '11999001122' },
  { id: 'p2', name: 'João Santos', email: 'joao@email.com', phone: '11998887766' },
  { id: 'p3', name: 'Ana Costa', email: 'ana@email.com', phone: '11997776655' },
  { id: 'p4', name: 'Pedro Lima', email: 'pedro@email.com', phone: '11996665544' },
  { id: 'p5', name: 'Fernanda Oliveira', email: 'fernanda@email.com', phone: '11995554433' },
  { id: 'p6', name: 'Carlos Mendes', email: 'carlos@email.com', phone: '11994443322' },
  { id: 'p7', name: 'Mariana Alves', email: 'mariana@email.com', phone: '11993332211' },
  { id: 'p8', name: 'Ricardo Souza', email: 'ricardo@email.com', phone: '11992221100' },
  { id: 'p9', name: 'Dr. Paulo Terapia', email: 'paulo@clinica.com', phone: '1133334444' },
  { id: 'p10', name: 'Profa. Lucia', email: 'lucia@escola.com', phone: '1122223333' },
];

const createActivity = (
  id: string,
  type: ActivityType,
  dayOffset: number,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  location: string,
  participants: Participant[] = [],
  description?: string,
  notes: { id: string; content: string; createdAt: Date }[] = []
): Activity => {
  const date = addDays(weekStart, dayOffset);
  return {
    id,
    type,
    description,
    date: setMinutes(setHours(date, startHour), startMinute),
    startTime: `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
    endTime: `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
    location,
    participants,
    notes,
    recurrence: 'none',
  };
};

export const sampleActivities: Activity[] = [
  createActivity(
    '1',
    'therapy',
    0,
    9,
    0,
    10,
    0,
    'Clínica',
    [sampleParticipants[8]],
    'Sessão de terapia ocupacional',
    [{ id: 'n1', content: 'Levar relatório da escola', createdAt: new Date() }]
  ),
  createActivity(
    '2',
    'school_event',
    1,
    8,
    0,
    12,
    0,
    'Escola',
    [sampleParticipants[9], sampleParticipants[0]],
    'Reunião de pais e mestres'
  ),
  createActivity(
    '3',
    'extracurricular',
    2,
    14,
    0,
    15,
    30,
    'Centro Esportivo',
    [sampleParticipants[3]],
    'Aula de natação',
    [{ id: 'n2', content: 'Levar toalha e óculos', createdAt: new Date() }]
  ),
  createActivity(
    '4',
    'birthday',
    5,
    15,
    0,
    18,
    0,
    'Casa',
    [sampleParticipants[0], sampleParticipants[1], sampleParticipants[2]],
    'Aniversário do Lucas'
  ),
  createActivity(
    '5',
    'medical',
    3,
    10,
    0,
    11,
    0,
    'Hospital',
    [sampleParticipants[4]],
    'Consulta com pediatra',
    [
      { id: 'n3', content: 'Levar carteirinha do plano', createdAt: new Date() },
      { id: 'n4', content: 'Levar exame de sangue atualizado', createdAt: new Date() }
    ]
  ),
  createActivity(
    '6',
    'sports',
    0,
    16,
    0,
    17,
    30,
    'Academia',
    [sampleParticipants[5]],
    'Treino de futebol'
  ),
  createActivity(
    '7',
    'music',
    4,
    14,
    0,
    15,
    0,
    'Estúdio de Música',
    [sampleParticipants[6]],
    'Aula de piano'
  ),
  createActivity(
    '8',
    'art',
    6,
    10,
    0,
    12,
    0,
    'Estúdio de Arte',
    [sampleParticipants[7]],
    'Aula de pintura'
  ),
  createActivity(
    '9',
    'therapy',
    2,
    9,
    0,
    10,
    0,
    'Online / Virtual',
    [sampleParticipants[8]],
    'Sessão de fonoaudiologia'
  ),
  createActivity(
    '10',
    'extracurricular',
    4,
    16,
    0,
    17,
    0,
    'Escola',
    [sampleParticipants[9]],
    'Aula de inglês'
  ),
];
