'use client';
import { DayProps, EventType } from '@/app/lib/types';
import { FC } from 'react';

const Day: FC<DayProps> = ({ date, events = [], isCurrentMonth, onDayClick, onDateClick }) => {
  const dayNumber = date.getDate();
  const hasEvents = events.length > 0;
  const eventStyles = {
    [EventType.WEBINAR]: 'bg-main-blue',
    [EventType.CONFERENCE]: 'bg-main-yellow',
    [EventType.EXPERT_MEETING]: 'bg-main-red',
    [EventType.QA_SESSION]: 'bg-main-green',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onDayClick) {
      onDayClick(date, events, e);
    }
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`${date.toLocaleDateString()}, ${events.length} events`}
      aria-pressed={hasEvents}
      role="button"
      className={`
        w-full aspect-square p-1 flex flex-col items-center justify-center relative
        ${isCurrentMonth ? 'text-main-text' : 'text-main-gray'}
        ${hasEvents ? 'font-medium' : 'font-light'}
      `}
    >
      {dayNumber}
      <div className="w-full flex relative flex-row justify-center gap-1 flex-wrap">
        {events.map((event) => (
          <span key={event.id} className={`block w-1 h-1 rounded-full ${eventStyles[event.type]}`} />
        ))}
      </div>
    </button>
  );
};

export default Day;
