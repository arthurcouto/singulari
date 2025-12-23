import { motion } from 'framer-motion';
import { Activity, activityTypeConfig } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onClick?: (e?: React.MouseEvent) => void;
  compact?: boolean;
  isDragging?: boolean;
}

const colorClasses: Record<string, string> = {
  blue: 'bg-event-blue-light border-l-4 border-event-blue text-foreground',
  pink: 'bg-event-pink-light border-l-4 border-event-pink text-foreground',
  green: 'bg-event-green-light border-l-4 border-event-green text-foreground',
  yellow: 'bg-event-yellow-light border-l-4 border-event-yellow text-foreground',
  purple: 'bg-event-purple-light border-l-4 border-event-purple text-foreground',
  orange: 'bg-event-orange-light border-l-4 border-event-orange text-foreground',
};

export const ActivityCard = ({ activity, onClick, compact = false, isDragging = false }: ActivityCardProps) => {
  const config = activityTypeConfig[activity.type];
  const colorClass = colorClasses[config.color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => onClick?.(e)}
      className={cn(
        'rounded-lg px-3 cursor-pointer transition-all duration-200 shadow-event',
        colorClass,
        isDragging && 'opacity-50 shadow-lg',
        compact ? 'py-1' : 'py-2'
      )}
    >
      <p className={cn('font-medium truncate', compact ? 'text-xs' : 'text-sm')}>
        {config.label}
      </p>
      {!compact && (
        <p className="text-xs text-muted-foreground mt-0.5">
          {activity.startTime} - {activity.endTime}
        </p>
      )}
      {!compact && activity.participants.length > 0 && (
        <div className="flex -space-x-2 mt-2">
          {activity.participants.slice(0, 3).map((participant) => (
            <div
              key={participant.id}
              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium ring-2 ring-card"
              title={participant.name}
            >
              {participant.avatar ? (
                <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
          ))}
          {activity.participants.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium ring-2 ring-card">
              +{activity.participants.length - 3}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
