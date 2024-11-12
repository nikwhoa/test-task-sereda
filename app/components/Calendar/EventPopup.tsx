'use client';

import { useEffect, useRef } from 'react';
import { EventPopupProps, EventType } from '@/app/lib/types';
import { createPortal } from 'react-dom';
import ErrorBoundary from '../common/ErrorBoundary';

export default function EventPopup({
  events,
  position,
  onClose,
  onOpenAddEventPopup,
  onOpenEditEventPopup,
}: EventPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (popupRef.current && typeof popupRef.current.scrollIntoView === 'function') {
      popupRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [position]);

  if (!position) return null;

  const eventStyles = {
    [EventType.EXPERT_MEETING]: 'text-main-red',
    [EventType.QA_SESSION]: 'text-main-green',
    [EventType.CONFERENCE]: 'text-main-yellow',
    [EventType.WEBINAR]: 'text-main-blue',
  };

  const handleOpenAddEventPopup = () => {
    onClose();
    onOpenAddEventPopup();
  };

  const popupContent = (
    <ErrorBoundary>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto" onClick={handleBackdropClick}>
        <div
          ref={popupRef}
          className="pop-up relative bg-second-bg p-4 max-w-[360px] mx-auto my-8"
          style={{
            marginLeft: `${position.x}px`,
            marginTop: `${position.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-light mb-8 border-b border-[#FF4E6B29] pb-6 text-white">Events</h2>

          {events.map((event) => (
            <div key={event.id} className="border-b border-[#FF4E6B29] py-6 first:border-b">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium text-white">{event.title}</h3>
                <button
                  className="text-main-gray hover:text-main-red mt-1"
                  onClick={() => onOpenEditEventPopup(event)}
                  aria-label="Edit event"
                >
                  <svg width="17" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                  </svg>
                </button>
              </div>
              <p className="text-main-text font-light text-sm mb-2">{event.description}</p>
              <p className="text-main-gray font-light text-sm mb-6">{event.location}</p>
              <div className="space-y-1 flex flex-row justify-between text-sm">
                <div className={`flex items-center gap-2 ${eventStyles[event.type]}`}>
                  <span className="">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                    })}
                    ,{' '}
                  </span>
                  <span className="">{event.time}</span>
                </div>
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-normal ${
                    event.type === 'Meeting with an expert'
                      ? 'bg-[#FF4E6B29] text-[#FF4E6B]'
                      : event.type === 'Webinar'
                      ? 'bg-[#007AFF29] text-[#4DB4FF]'
                      : event.type === 'Conference'
                      ? 'bg-[#FFB80029] text-[#FFBB33]'
                      : 'bg-[#00B29529] text-[#00CC66]'
                  }`}
                >
                  {event.type}
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleOpenAddEventPopup}
              className="bg-[#FF4E6B] hover:bg-[#FF3555] hover:text-main-text hover:border-main-red border border-main-red text-second-text px-4 py-2 transition-colors"
            >
              Add event
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );

  // Create a stable portal container
  const portalRoot = document.getElementById('portal-root') || document.body;
  return createPortal(popupContent, portalRoot);
}
