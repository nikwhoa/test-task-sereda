import { FC } from 'react';
import Day from './Day';
import { MonthProps } from '@/app/lib/types';

const Month: FC<MonthProps> = ({ month, year, events = [], onDayClick, onDateClick }) => {
  const firstDay = new Date(year, month, 1);
  const startingDayIndex = firstDay.getDay();

  const dates = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - startingDayIndex + 1;
    const date = new Date(year, month, dayNumber);
    const isCurrentMonth = date.getMonth() === month;

    return {
      date,
      isCurrentMonth,
      events: events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      ),
    };
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="pt-6 pb-12 month-container relative px-4 border-t border-[#FF4E6B29]">
      <h3 className="text-3xl font-light mb-6">{firstDay.toLocaleString('en-US', { month: 'long' })}</h3>
      <div className="grid grid-cols-7 gap-1 month">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-base font-light text-main-gray">
            {day}
          </div>
        ))}
        {dates.map(({ date, isCurrentMonth, events }) => (
          <Day
            key={date.toISOString()}
            date={date}
            events={events}
            isCurrentMonth={isCurrentMonth}
            onDayClick={onDayClick}
            onDateClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Month;
