import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { Header } from './Header';
import { WeeklyView } from './WeeklyView';
import { MonthlyView } from './MonthlyView';
import { DailyView } from './DailyView';
import { ActivityModal } from './ActivityModal';
import { Activity } from '@/types/calendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const CalendarApp = () => {
  const {
    currentDate,
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
    filterType,
    setFilterType,
    participants,
    addParticipant,
  } = useCalendar();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'create' | 'edit'>('view');

  // Daily sidebar (desktop) state
  const [dailyOpen, setDailyOpen] = useState(false);
  const [dailyDate, setDailyDate] = useState<Date>(new Date());

  // Defaults for "Nova Atividade" (use current view date or clicked slot)
  const [draftDate, setDraftDate] = useState<Date>(new Date());
  const [draftStartTime, setDraftStartTime] = useState('09:00');
  const [draftEndTime, setDraftEndTime] = useState('10:00');

  const openActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalMode('view');
    setModalOpen(true);
  };

  const openEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalMode('edit');
    setModalOpen(true);
  };

  const openCreateActivity = (date: Date, startTime = '09:00', endTime = '10:00') => {
    setSelectedActivity(null);
    setDraftDate(date);
    setDraftStartTime(startTime);
    setDraftEndTime(endTime);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleNewActivity = () => {
    openCreateActivity(currentDate, draftStartTime, draftEndTime);
  };

  const handleDayClick = (day: Date) => {
    setDailyDate(day);
    setDailyOpen(true);
    setDraftDate(day);
  };

  const handleSlotClick = (day: Date, hour: number) => {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    setDraftDate(day);
    setDraftStartTime(start);
    setDraftEndTime(end);
    openCreateActivity(day, start, end);
  };

  return (
    <div className="flex h-full bg-background overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          formattedDate={formattedDate}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNewActivity={handleNewActivity}
          onPrev={navigatePrev}
          onNext={navigateNext}
          onToday={goToToday}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <main className="flex-1 p-3 lg:p-5 overflow-auto">
          <AnimatePresence mode="wait">
            {viewMode === 'weekly' && (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full bg-card rounded-xl shadow-soft overflow-hidden"
              >
                <WeeklyView
                  weekDays={weekDays}
                  activities={activities}
                  getActivitiesForHour={getActivitiesForHour}
                  onActivityClick={openActivityDetails}
                  onMoveActivity={moveActivity}
                  onResizeActivity={resizeActivity}
                  onDayClick={handleDayClick}
                  onSlotClick={handleSlotClick}
                  filterType={filterType}
                />
              </motion.div>
            )}

            {viewMode === 'monthly' && (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <MonthlyView
                  monthDays={monthDays}
                  currentDate={currentDate}
                  getActivitiesForDay={getActivitiesForDay}
                  onActivityClick={openActivityDetails}
                  onDayClick={handleDayClick}
                  filterType={filterType}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Daily sidebar */}
      <Sheet open={dailyOpen} onOpenChange={setDailyOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md lg:max-w-lg p-0">
          <SheetHeader className="px-6 py-4 border-b border-border">
            <SheetTitle className="text-foreground capitalize">
              {format(dailyDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-73px)]">
            <DailyView
              currentDate={dailyDate}
              getActivitiesForHour={getActivitiesForHour}
              onActivityClick={openActivityDetails}
              onSlotClick={(hour) => handleSlotClick(dailyDate, hour)}
              filterType={filterType}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Activity Modal */}
      <ActivityModal
        activity={selectedActivity}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedActivity(null);
        }}
        onSave={addActivity}
        onUpdate={updateActivity}
        onDelete={deleteActivity}
        mode={modalMode}
        defaultDate={draftDate}
        defaultStartTime={draftStartTime}
        defaultEndTime={draftEndTime}
        onRequestEdit={() => {
          if (selectedActivity) openEditActivity(selectedActivity);
        }}
        participants={participants}
        onAddParticipant={addParticipant}
      />
    </div>
  );
};
