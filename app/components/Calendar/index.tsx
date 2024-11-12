'use client';

import { useState } from 'react';
import EventTypeFilters from './EventTypeFilters';
import Month from './Month';
import EventPopup from './EventPopup';
import { Event, EventType } from '@/app/lib/types';
import { MOCK_EVENTS } from '@/app/lib/mocks/events';
import { getUpcomingEvents } from '@/app/lib/eventUtils';
import AddEventPopup from './AddEventPopup';
import EditEventPopup from './EditEventPopup';
import ErrorBoundary from '../common/ErrorBoundary';

export default function Calendar() {
  const [selectedType, setSelectedType] = useState<EventType | undefined>(undefined);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAddEventPopupOpen, setIsAddEventPopupOpen] = useState(false);
  const [choosenDate, setChoosenDate] = useState<Date | null>(null);
  const [isEditEventPopupOpen, setIsEditEventPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredEvents = getUpcomingEvents(MOCK_EVENTS, selectedType);

  const months = Array.from({ length: 6 }, (_, index) => {
    const monthIndex = (currentMonth + index) % 12;
    const yearOffset = Math.floor((currentMonth + index) / 12);
    return {
      month: monthIndex,
      year: currentYear + yearOffset,
    };
  });

  const handleDayClick = (date: Date, events: Event[], e: React.MouseEvent) => {
    if (events.length === 0) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const popupWidth = 360;

    let newX = rect.left + rect.width / 2;
    newX = Math.max(10, Math.min(newX, window.innerWidth - popupWidth - 10));

    let newY = rect.bottom + window.scrollY;
    newY = Math.max(10, newY);

    setPopupPosition({ x: newX, y: newY });

    setSelectedEvents(events);
  };

  const handleClosePopup = () => {
    setSelectedEvents([]);
    setPopupPosition(null);
  };

  const handleOpenAddEventPopup = () => {
    setIsAddEventPopupOpen(true);
  };

  const handleCloseAddEventPopup = () => {
    setIsAddEventPopupOpen(false);
  };

  const handleAddEvent = (newEvent: any) => {
    console.log('New Event:', newEvent);
  };

  const handleOpenEditEventPopup = (event: Event) => {
    setSelectedEvent(event);
    setIsEditEventPopupOpen(true);
    handleClosePopup();
  };

  const handleCloseEditEventPopup = () => {
    setIsEditEventPopupOpen(false);
    setSelectedEvent(null);
  };

  return (
    <ErrorBoundary>
      <section className="flex-1 my-8 border-b border-[#FF4E6B29]">
        <div className="text-[40px] font-light">Calendar</div>
        <div className="mb-10">
          <EventTypeFilters onFilterSelect={setSelectedType} />
        </div>
        <div className="grid grid-cols-3 border-t border-[#FF4E6B29]">
          {months.map(({ month, year }) => (
            <Month
              key={`${year}-${month}`}
              month={month}
              year={year}
              events={filteredEvents}
              onDayClick={handleDayClick}
              onDateClick={setChoosenDate}
            />
          ))}
        </div>
        <EventPopup
          events={selectedEvents}
          position={popupPosition}
          onClose={handleClosePopup}
          onOpenAddEventPopup={handleOpenAddEventPopup}
          onOpenEditEventPopup={handleOpenEditEventPopup}
        />
        {isAddEventPopupOpen && (
          <AddEventPopup
            onClose={handleCloseAddEventPopup}
            onAddEvent={handleAddEvent}
            choosenDate={choosenDate}
            position={popupPosition}
          />
        )}
        {isEditEventPopupOpen && selectedEvent && (
          <EditEventPopup
            event={selectedEvent}
            position={popupPosition}
            onClose={handleCloseEditEventPopup}
            onEditEvent={(updatedEvent) => {
              console.log('Updated Event:', updatedEvent);
              handleCloseEditEventPopup();
            }}
          />
        )}
      </section>
    </ErrorBoundary>
  );
}
