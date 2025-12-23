import { useState, useCallback, useMemo } from 'react';
import {
  addDays,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  format,
  setHours,
  setMinutes,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity, ActivityType, ViewMode, RecurrenceType } from '@/types/calendar';
import { sampleActivities, sampleParticipants as initialParticipants } from '@/data/sampleActivities';
import { Participant } from '@/types/calendar';

// Helper to calculate next recurrence date
const getNextRecurrenceDate = (date: Date, recurrence: RecurrenceType): Date | null => {
  switch (recurrence) {
    case 'weekly':
      return addDays(date, 7);
    case 'monthly':
      return addMonths(date, 1);
    case 'bimonthly':
      return addMonths(date, 2);
    case 'semiannual':
      return addMonths(date, 6);
    case 'annual':
      return addMonths(date, 12);
    default:
      return null;
  }
};

// Generate recurring activities
const generateRecurringActivities = (activity: Omit<Activity, 'id'>, count: number = 12): Omit<Activity, 'id'>[] => {
  if (activity.recurrence === 'none') return [activity];
  
  const activities: Omit<Activity, 'id'>[] = [activity];
  let currentDate = new Date(activity.date);
  
  for (let i = 0; i < count; i++) {
    const nextDate = getNextRecurrenceDate(currentDate, activity.recurrence);
    if (!nextDate) break;
    
    activities.push({
      ...activity,
      date: nextDate,
    });
    currentDate = nextDate;
  }
  
  return activities;
};

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [filterType, setFilterType] = useState<ActivityType | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);

  const navigateNext = useCallback(() => {
    switch (viewMode) {
      case 'weekly':
        setCurrentDate((prev) => addWeeks(prev, 1));
        break;
      case 'monthly':
        setCurrentDate((prev) => addMonths(prev, 1));
        break;
    }
  }, [viewMode]);

  const navigatePrev = useCallback(() => {
    switch (viewMode) {
      case 'weekly':
        setCurrentDate((prev) => subWeeks(prev, 1));
        break;
      case 'monthly':
        setCurrentDate((prev) => subMonths(prev, 1));
        break;
    }
  }, [viewMode]);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const getActivitiesForDay = useCallback(
    (day: Date) => {
      return activities.filter((activity) => isSameDay(new Date(activity.date), day));
    },
    [activities]
  );

  const getActivitiesForHour = useCallback(
    (day: Date, hour: number) => {
      return activities.filter((activity) => {
        const activityDate = new Date(activity.date);
        const activityHour = parseInt(activity.startTime.split(':')[0]);
        return isSameDay(activityDate, day) && activityHour === hour;
      });
    },
    [activities]
  );

  const addActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    const recurringActivities = generateRecurringActivities(activity);
    
    const newActivities: Activity[] = recurringActivities.map((act, index) => ({
      ...act,
      id: `${Date.now()}-${index}`,
    }));
    
    setActivities((prev) => [...prev, ...newActivities]);
  }, []);

  const updateActivity = useCallback((updatedActivity: Activity) => {
    setActivities((prev) =>
      prev.map((activity) => (activity.id === updatedActivity.id ? updatedActivity : activity))
    );
  }, []);

  const deleteActivity = useCallback((activityId: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== activityId));
  }, []);

  const moveActivity = useCallback((activityId: string, newDate: Date, newHour?: number) => {
    setActivities((prev) =>
      prev.map((activity) => {
        if (activity.id === activityId) {
          let updatedDate = newDate;
          if (newHour !== undefined) {
            const [_, minutes] = activity.startTime.split(':').map(Number);
            updatedDate = setMinutes(setHours(newDate, newHour), minutes);
          }
          const newStartTime = newHour !== undefined 
            ? `${newHour.toString().padStart(2, '0')}:${activity.startTime.split(':')[1]}`
            : activity.startTime;
          
          // Calculate end time offset
          const startParts = activity.startTime.split(':').map(Number);
          const endParts = activity.endTime.split(':').map(Number);
          const durationHours = endParts[0] - startParts[0];
          const durationMinutes = endParts[1] - startParts[1];
          
          const newEndHour = (newHour ?? startParts[0]) + durationHours;
          const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${(startParts[1] + durationMinutes).toString().padStart(2, '0')}`;
          
          return { ...activity, date: updatedDate, startTime: newStartTime, endTime: newEndTime };
        }
        return activity;
      })
    );
  }, []);

  const resizeActivity = useCallback((activityId: string, newEndTime: string) => {
    setActivities((prev) =>
      prev.map((activity) => 
        activity.id === activityId ? { ...activity, endTime: newEndTime } : activity
      )
    );
  }, []);

  const addParticipant = useCallback((participant: Participant) => {
    setParticipants((prev) => [...prev, participant]);
  }, []);

  const formattedDate = useMemo(() => {
    return format(currentDate, 'MMMM yyyy', { locale: ptBR });
  }, [currentDate]);

  return {
    currentDate,
    setCurrentDate,
    viewMode,
    setViewMode,
    activities,
    selectedActivity,
    setSelectedActivity,
    navigateNext,
    navigatePrev,
    goToToday,
    weekDays,
    monthDays,
    getActivitiesForDay,
    getActivitiesForHour,
    addActivity,
    updateActivity,
    deleteActivity,
    moveActivity,
    resizeActivity,
    formattedDate,
    isSameDay,
    isSameMonth: (day: Date) => isSameMonth(day, currentDate),
    filterType,
    setFilterType,
    participants,
    addParticipant,
  };
};
