import { Event, EventType } from './types';

export function getUpcomingEvents(
  events: Event[],
  selectedType?: EventType,
  startDate: Date = new Date(),
  monthsAhead: number = 6
): Event[] {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + monthsAhead);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    const isInDateRange = eventDate >= startDate && eventDate <= endDate;
    const matchesType = selectedType ? event.type === selectedType : true;
    
    return isInDateRange && matchesType;
  });
}

export function getEventsForDate(events: Event[], date: Date): Event[] {
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
} 