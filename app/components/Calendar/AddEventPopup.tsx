import { useState } from 'react';
import { createPortal } from 'react-dom';
import { EventType } from '@/app/lib/types';
import EventPopupForm from './EventPopupForm';
import { AddEventPopupProps } from '@/app/lib/types';
import ErrorBoundary from '../common/ErrorBoundary';
import SafePortal from '../common/SafePortal';

export default function AddEventPopup({ onClose, onAddEvent, choosenDate }: AddEventPopupProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<EventType>(EventType.WEBINAR);
  const [time, setTime] = useState('10:00');
  const [date] = useState(
    choosenDate
      ? choosenDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
        })
      : new Date().toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
        }),
  );

  const handleSubmit = () => {
    onAddEvent({
      title,
      description,
      location,
      type,
      date: choosenDate || new Date(),
      time,
    });
    onClose();
  };

  const popupContent = (
    <ErrorBoundary>
      <SafePortal>
        <EventPopupForm
          title={title}
          description={description}
          location={location}
          type={type}
          time={time}
          date={date}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onLocationChange={setLocation}
          onTypeChange={setType}
          onTimeChange={setTime}
          onClose={onClose}
          onSubmit={handleSubmit}
          submitButtonText="Add event"
        />
      </SafePortal>
    </ErrorBoundary>
  );

  return createPortal(popupContent, document.body);
}
