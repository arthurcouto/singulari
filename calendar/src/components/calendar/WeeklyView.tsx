import { motion } from 'framer-motion';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity, ActivityType, activityTypeConfig } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor, useDroppable, useDraggable } from '@dnd-kit/core';
import { useState, useRef, useCallback } from 'react';
import { GripVertical } from 'lucide-react';

interface WeeklyViewProps {
  weekDays: Date[];
  activities: Activity[];
  getActivitiesForHour: (day: Date, hour: number) => Activity[];
  onActivityClick: (activity: Activity) => void;
  onMoveActivity: (activityId: string, newDate: Date, newHour?: number) => void;
  onResizeActivity: (activityId: string, newEndTime: string) => void;
  onDayClick: (day: Date) => void;
  onSlotClick: (day: Date, hour: number) => void;
  filterType: ActivityType | null;
}

const hours = Array.from({ length: 13 }, (_, i) => i + 7); // 7:00 to 19:00

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-event-blue-light', border: 'border-event-blue', text: 'text-event-blue' },
  pink: { bg: 'bg-event-pink-light', border: 'border-event-pink', text: 'text-event-pink' },
  green: { bg: 'bg-event-green-light', border: 'border-event-green', text: 'text-event-green' },
  yellow: { bg: 'bg-event-yellow-light', border: 'border-event-yellow', text: 'text-event-yellow' },
  purple: { bg: 'bg-event-purple-light', border: 'border-event-purple', text: 'text-event-purple' },
  orange: { bg: 'bg-event-orange-light', border: 'border-event-orange', text: 'text-event-orange' },
};

// Calculate activity duration in hours
const getActivityDuration = (startTime: string, endTime: string) => {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  return (endH * 60 + endM - (startH * 60 + startM)) / 60;
};

// Activity Block Component with resize handle
const ActivityBlock = ({
  activity,
  onClick,
  onResize,
  isFiltered,
}: {
  activity: Activity;
  onClick: (e?: React.MouseEvent) => void;
  onResize: (activityId: string, newEndTime: string) => void;
  isFiltered: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: activity.id,
    data: { activity },
  });

  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const config = activityTypeConfig[activity.type];
  const colors = colorClasses[config.color] || colorClasses.blue;
  const duration = getActivityDuration(activity.startTime, activity.endTime);
  const heightPx = Math.max(duration * 60, 40); // 60px per hour, min 40px

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 100 }
    : undefined;

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);

    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startHeight = heightPx;
    const [startH] = activity.startTime.split(':').map(Number);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = currentY - startY;
      const newHeight = Math.max(40, startHeight + deltaY);
      const newDurationHours = Math.round((newHeight / 60) * 2) / 2; // Round to nearest 0.5 hour
      const newEndHour = startH + Math.floor(newDurationHours);
      const newEndMinutes = (newDurationHours % 1) * 60;
      const newEndTime = `${Math.min(23, newEndHour).toString().padStart(2, '0')}:${newEndMinutes.toString().padStart(2, '0')}`;
      onResize(activity.id, newEndTime);
    };

    const handleEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  }, [activity, heightPx, onResize]);

  return (
    <motion.div
      ref={setNodeRef}
      style={{ ...style, height: `${heightPx}px` }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isFiltered ? 0.3 : 1, scale: 1 }}
      className={cn(
        'absolute left-1 right-1 rounded-lg border-l-4 px-2 py-1.5 cursor-pointer transition-all overflow-hidden group',
        colors.bg,
        colors.border,
        isDragging && 'opacity-50 shadow-lg z-50',
        isResizing && 'z-50'
      )}
      onClick={(e) => {
        if (!isDragging && !isResizing) onClick(e);
      }}
    >
      {/* Drag handle */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-60 cursor-grab active:cursor-grabbing transition-opacity"
      >
        <GripVertical className="w-3 h-3 text-muted-foreground" />
      </div>

      <p className={cn('text-xs font-semibold truncate', colors.text)}>
        {config.label}
      </p>
      <p className="text-[10px] text-muted-foreground">
        {activity.startTime} - {activity.endTime}
      </p>
      {duration >= 1.5 && activity.location && (
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
          📍 {activity.location}
        </p>
      )}
      {duration >= 2 && activity.participants.length > 0 && (
        <div className="flex -space-x-1 mt-1">
          {activity.participants.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[8px] font-medium ring-1 ring-card"
              title={p.name}
            >
              {p.avatar ? (
                <img src={p.avatar} alt={p.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                p.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
          ))}
          {activity.participants.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-[8px] font-medium ring-1 ring-card">
              +{activity.participants.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Resize handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
        className={cn(
          'absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity',
          'hover:bg-primary/20 rounded-b-lg',
          colors.border,
          'border-t-2'
        )}
      />
    </motion.div>
  );
};

const DroppableSlot = ({
  day,
  hour,
  children,
  onClick,
}: {
  day: Date;
  hour: number;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const slotId = `${format(day, 'yyyy-MM-dd')}-${hour}`;
  const { setNodeRef, isOver } = useDroppable({ id: slotId, data: { day, hour } });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        'h-[60px] border-b border-border/50 relative transition-colors',
        isOver && 'bg-primary/10 ring-1 ring-primary ring-inset'
      )}
    >
      {children}
    </div>
  );
};

export const WeeklyView = ({
  weekDays,
  activities,
  getActivitiesForHour,
  onActivityClick,
  onMoveActivity,
  onResizeActivity,
  onDayClick,
  onSlotClick,
  filterType,
}: WeeklyViewProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.data.current) {
      const { day, hour } = over.data.current as { day: Date; hour: number };
      onMoveActivity(active.id as string, day, hour);
    }
  };

  const activeActivity = activities.find((a) => a.id === activeId);

  // Group activities by day to prevent duplicates
  const getActivitiesStartingAtHour = (day: Date, hour: number) => {
    return activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      const [activityHour] = activity.startTime.split(':').map(Number);
      return (
        activityDate.toDateString() === day.toDateString() &&
        activityHour === hour
      );
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
        {/* Header */}
        <div className="grid grid-cols-8 border-b border-border bg-card sticky top-0 z-10">
          <div className="p-2 border-r border-border" />
          {weekDays.map((day, index) => (
            <motion.button
              type="button"
              key={day.toISOString()}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onDayClick(day)}
              className={cn(
                'p-2 text-center border-r border-border last:border-r-0 transition-colors hover:bg-muted/50',
                isToday(day) && 'bg-primary/5'
              )}
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {format(day, 'EEE', { locale: ptBR })}
              </p>
              <div
                className={cn(
                  'w-8 h-8 mx-auto mt-1 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                  isToday(day) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                )}
              >
                {format(day, 'd')}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Time Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-8 min-h-full">
            {/* Hour labels */}
            <div className="border-r border-border bg-card/50">
              {hours.map((hour) => (
                <div key={hour} className="h-[60px] border-b border-border/50 px-2 flex items-start pt-1">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cn('border-r border-border last:border-r-0 relative', isToday(day) && 'bg-primary/[0.02]')}
              >
                {hours.map((hour) => {
                  const hourActivities = getActivitiesStartingAtHour(day, hour);
                  return (
                    <DroppableSlot
                      key={`${day.toISOString()}-${hour}`}
                      day={day}
                      hour={hour}
                      onClick={() => onSlotClick(day, hour)}
                    >
                      {hourActivities.map((activity) => (
                        <ActivityBlock
                          key={activity.id}
                          activity={activity}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onActivityClick(activity);
                          }}
                          onResize={onResizeActivity}
                          isFiltered={filterType !== null && activity.type !== filterType}
                        />
                      ))}
                    </DroppableSlot>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <DragOverlay>
        {activeActivity ? (
          <div className={cn(
            'rounded-lg border-l-4 px-2 py-1.5 shadow-lg',
            colorClasses[activityTypeConfig[activeActivity.type].color].bg,
            colorClasses[activityTypeConfig[activeActivity.type].color].border
          )}>
            <p className="text-xs font-semibold">
              {activityTypeConfig[activeActivity.type].label}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {activeActivity.startTime} - {activeActivity.endTime}
            </p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
