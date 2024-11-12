import { useState } from 'react';
import { createPortal } from 'react-dom';
import EventPopupForm from './EventPopupForm';
import SafePortal from '../common/SafePortal';
import { EditEventPopupProps } from '@/app/lib/types';

export default function EditEventPopup({ event, onClose, onEditEvent }: EditEventPopupProps) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [type, setType] = useState(event.type);
  const [time, setTime] = useState(event.time);
  const [date] = useState(
    event.date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
    }),
  );

  const handleSubmit = () => {
    onEditEvent({
      ...event,
      title,
      description,
      location,
      type,
      time,
    });
  };

  const popupContent = (
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
        submitButtonText="Save changes"
      />
    </SafePortal>
  );

  const portalRoot = document.getElementById('portal-root') || document.body;
  return createPortal(popupContent, portalRoot);
}
