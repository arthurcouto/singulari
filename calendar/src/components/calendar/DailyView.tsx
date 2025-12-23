import { motion } from 'framer-motion';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity } from '@/types/calendar';
import { ActivityCard } from './ActivityCard';
import { cn } from '@/lib/utils';

interface DailyViewProps {
  currentDate: Date;
  getActivitiesForHour: (day: Date, hour: number) => Activity[];
  onActivityClick: (activity: Activity) => void;
  onSlotClick?: (hour: number) => void;
}

const hours = Array.from({ length: 14 }, (_, i) => i + 6);

export const DailyView = ({ currentDate, getActivitiesForHour, onActivityClick, onSlotClick }: DailyViewProps) => {
  const today = isToday(currentDate);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full bg-card rounded-xl overflow-hidden">
      <div className={cn('p-6 border-b border-border text-center', today && 'bg-primary/5')}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-medium text-muted-foreground uppercase">
            {format(currentDate, 'EEEE', { locale: ptBR })}
          </p>
          <div
            className={cn(
              'w-16 h-16 mx-auto mt-2 rounded-2xl flex items-center justify-center text-2xl font-bold transition-colors',
              today ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            )}
          >
            {format(currentDate, 'd')}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{format(currentDate, 'MMMM yyyy', { locale: ptBR })}</p>
        </motion.div>
      </div>

      <div className="flex-1 overflow-auto">
        {hours.map((hour, index) => {
          const hourActivities = getActivitiesForHour(currentDate, hour);
          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex border-b border-border min-h-[80px] cursor-pointer hover:bg-muted/30"
              onClick={() => onSlotClick?.(hour)}
            >
              <div className="w-20 flex-shrink-0 p-3 text-right border-r border-border">
                <span className="text-sm font-medium text-muted-foreground">{hour.toString().padStart(2, '0')}:00</span>
              </div>
              <div className="flex-1 p-2">
                <div className="space-y-2">
                  {hourActivities.map((activity, activityIndex) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: activityIndex * 0.05 }}
                    >
                      <ActivityCard
                        activity={activity}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onActivityClick(activity);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
