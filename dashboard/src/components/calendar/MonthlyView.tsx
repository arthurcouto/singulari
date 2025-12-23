import { motion } from 'framer-motion';
import { format, isToday, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity } from '@/types/calendar';
import { ActivityCard } from './ActivityCard';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';

interface MonthlyViewProps {
  monthDays: Date[];
  currentDate: Date;
  getActivitiesForDay: (day: Date) => Activity[];
  onActivityClick: (activity: Activity) => void;
  onDayClick: (day: Date) => void;
}

const weekDayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const DroppableDay = ({ 
  day, 
  children, 
  dayId 
}: { 
  day: Date; 
  children: React.ReactNode; 
  dayId: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: dayId });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'transition-colors',
        isOver && 'bg-primary/10 ring-2 ring-primary ring-inset'
      )}
    >
      {children}
    </div>
  );
};

export const MonthlyView = ({
  monthDays,
  currentDate,
  getActivitiesForDay,
  onActivityClick,
  onDayClick,
}: MonthlyViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-card rounded-xl overflow-hidden"
    >
      <div className="grid grid-cols-7 border-b border-border">
        {weekDayNames.map((day, index) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="p-3 text-center border-r border-border last:border-r-0"
          >
            <span className="text-sm font-medium text-muted-foreground uppercase">{day}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {monthDays.map((day, index) => {
          const dayActivities = getActivitiesForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const today = isToday(day);
          const dayId = `day-${format(day, 'yyyy-MM-dd')}`;

          return (
            <DroppableDay key={day.toISOString()} day={day} dayId={dayId}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => onDayClick(day)}
                className={cn(
                  'min-h-[100px] border-b border-r border-border last:border-r-0 p-2 cursor-pointer transition-colors hover:bg-muted/50',
                  !isCurrentMonth && 'bg-muted/30',
                  today && 'bg-primary/5'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
                      today
                        ? 'bg-primary text-primary-foreground'
                        : isCurrentMonth
                        ? 'text-foreground hover:bg-muted'
                        : 'text-muted-foreground'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  {dayActivities.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{dayActivities.length - 2}</span>
                  )}
                </div>
                <div className="space-y-1">
                  {dayActivities.slice(0, 2).map((activity, activityIndex) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: activityIndex * 0.05 }}
                    >
                      <ActivityCard
                        activity={activity}
                        compact
                        onClick={(e) => {
                          e?.stopPropagation();
                          onActivityClick(activity);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </DroppableDay>
          );
        })}
      </div>
    </motion.div>
  );
};
