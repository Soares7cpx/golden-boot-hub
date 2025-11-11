import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Tryout {
  id: string;
  title: string;
  tryout_date: string;
  club_profiles?: {
    club_name: string;
  };
  category: string;
  status: string;
}

interface TryoutCalendarProps {
  tryouts: Tryout[];
  onSelectDate?: (date: Date) => void;
}

export const TryoutCalendar = ({ tryouts, onSelectDate }: TryoutCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get tryouts for a specific date
  const getTryoutsForDate = (date: Date) => {
    return tryouts.filter(tryout => 
      isSameDay(new Date(tryout.tryout_date), date)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Calendário de Peneiras
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold min-w-[180px] text-center">
              {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Week days header */}
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map(day => {
            const dayTryouts = getTryoutsForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const hasTryouts = dayTryouts.length > 0;

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`
                  relative min-h-[80px] p-2 rounded-lg border transition-all
                  ${!isSameMonth(day, currentMonth) ? "opacity-30" : ""}
                  ${isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
                  ${hasTryouts ? "bg-accent/20" : ""}
                `}
              >
                <div className="text-sm font-medium mb-1">
                  {format(day, "d")}
                </div>
                {hasTryouts && (
                  <div className="space-y-1">
                    {dayTryouts.slice(0, 2).map(tryout => (
                      <div
                        key={tryout.id}
                        className="text-xs bg-primary text-primary-foreground rounded px-1 py-0.5 truncate"
                        title={tryout.title}
                      >
                        {tryout.club_profiles?.club_name || tryout.title}
                      </div>
                    ))}
                    {dayTryouts.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayTryouts.length - 2} mais
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected date details */}
        {selectedDate && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">
              {format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </h3>
            {getTryoutsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getTryoutsForDate(selectedDate).map(tryout => (
                  <Card key={tryout.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold">{tryout.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tryout.club_profiles?.club_name}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{tryout.category}</Badge>
                            <Badge variant={tryout.status === 'open' ? 'default' : 'secondary'}>
                              {tryout.status === 'open' ? 'Aberta' : 'Encerrada'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma peneira agendada para esta data.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};