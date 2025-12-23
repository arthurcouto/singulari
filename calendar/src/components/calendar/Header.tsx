import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ViewMode, ActivityType, activityTypeConfig } from '@/types/calendar';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  formattedDate: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNewActivity: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  filterType: ActivityType | null;
  onFilterChange: (type: ActivityType | null) => void;
}

const viewModes: { value: ViewMode; label: string }[] = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
];

const colorDot: Record<string, string> = {
  blue: 'bg-event-blue',
  pink: 'bg-event-pink',
  green: 'bg-event-green',
  yellow: 'bg-event-yellow',
  purple: 'bg-event-purple',
  orange: 'bg-event-orange',
};

export const Header = ({
  formattedDate,
  viewMode,
  onViewModeChange,
  onNewActivity,
  onPrev,
  onNext,
  onToday,
  filterType,
  onFilterChange,
}: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Agenda</h1>
            <p className="text-sm text-muted-foreground">Atividades</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Navigation */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
            <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8 rounded-lg">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <motion.span
              key={formattedDate}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-foreground capitalize min-w-[140px] text-center"
            >
              {formattedDate}
            </motion.span>
            <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8 rounded-lg">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={onToday} className="rounded-xl">
            Hoje
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted/50 rounded-xl p-1">
            {viewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onViewModeChange(mode.value)}
                className={cn(
                  'px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                  viewMode === mode.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={filterType ? "secondary" : "outline"} 
                size="sm" 
                className={cn("gap-2 rounded-xl", filterType && "bg-primary/10 text-primary border-primary/20")}
              >
                <Filter className="w-4 h-4" />
                {filterType ? activityTypeConfig[filterType].label : 'Filtrar'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {filterType && (
                <>
                  <DropdownMenuItem onClick={() => onFilterChange(null)}>
                    <span className="text-muted-foreground">Limpar filtro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {Object.entries(activityTypeConfig).map(([key, config]) => (
                <DropdownMenuItem 
                  key={key} 
                  onClick={() => onFilterChange(key as ActivityType)}
                  className={cn(filterType === key && "bg-primary/10")}
                >
                  <div className={cn('w-3 h-3 rounded-full mr-2', colorDot[config.color])} />
                  {config.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={onNewActivity} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl shadow-md">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Atividade</span>
          </Button>
        </motion.div>
      </div>

      {/* Mobile controls */}
      <div className="flex lg:hidden items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onPrev} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold capitalize">{formattedDate}</span>
          <Button variant="ghost" size="sm" onClick={onNext} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Filter className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {filterType && (
                <>
                  <DropdownMenuItem onClick={() => onFilterChange(null)}>
                    <span className="text-muted-foreground">Limpar filtro</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {Object.entries(activityTypeConfig).map(([key, config]) => (
                <DropdownMenuItem key={key} onClick={() => onFilterChange(key as ActivityType)}>
                  <div className={cn('w-3 h-3 rounded-full mr-2', colorDot[config.color])} />
                  {config.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            {viewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onViewModeChange(mode.value)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-all',
                  viewMode === mode.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
