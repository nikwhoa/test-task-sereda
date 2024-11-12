import { EventPopupFormProps, EventType } from '@/app/lib/types';
import { useEventFormValidation } from '@/app/hoooks/FormValidation';
import ErrorBoundary from '../common/ErrorBoundary';
import { useEffect } from 'react';

export default function EventPopupForm({
  title,
  description,
  location,
  type,
  time,
  date,
  onTitleChange,
  onDescriptionChange,
  onLocationChange,
  onTypeChange,
  onTimeChange,
  onClose,
  onSubmit,
  submitButtonText,
}: EventPopupFormProps) {
  const { errors, validateForm } = useEventFormValidation();

  useEffect(() => {
    window.scrollTo({ top: 20, behavior: 'smooth' });
  }, []);

  const handleSubmit = () => {
    const isValid = validateForm({ title, description, location });
    if (isValid) {
      onSubmit();
    }
  };

  return (
    <ErrorBoundary>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="pop-up absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-second-bg p-8 z-50 w-full max-w-[552px] add-event-popup flex gap-3 flex-col">
        <div className="flex justify-between py-4 mb-6 border-b border-[#FF4E6B29] items-center">
          <h2 className="text-2xl font-light text-white">
            {submitButtonText === 'Add event' ? 'Add event' : 'Edit event'}
          </h2>
          <span onClick={onClose} className="cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.639864 13.3599C0.789863 13.5099 0.979863 13.5799 1.16986 13.5799C1.35986 13.5799 1.55986 13.5099 1.69986 13.3599L6.99986 8.05986L12.2999 13.3599C12.4499 13.5099 12.6399 13.5799 12.8299 13.5799C13.0199 13.5799 13.2099 13.5099 13.3599 13.3599C13.6499 13.0699 13.6499 12.5899 13.3599 12.2999L8.05986 6.99986L13.3599 1.69986C13.6499 1.40986 13.6499 0.929864 13.3599 0.639864C13.0699 0.349863 12.5899 0.349863 12.2999 0.639864L6.99986 5.93986L1.69986 0.639864C1.40986 0.349863 0.929864 0.349863 0.639864 0.639864C0.349863 0.929864 0.349863 1.40986 0.639864 1.69986L5.93986 6.99986L0.639864 12.2999C0.349863 12.5899 0.349863 13.0699 0.639864 13.3599Z"
                fill="#FF4E6B"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Event name..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={`mb-2 p-2 w-full ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <textarea
            placeholder="Event description..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className={`mb-2 p-2 w-full ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className={`mb-2 p-2 w-full ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
        </div>
        <div className="flex mb-2 items-center">
          <div className="w-1/2 h-full">
            <span className="text-main-text text-xl">{date} at</span>
          </div>
          <div className="w-full relative">
            <select
              value={time.slice(0, 2)}
              onChange={(e) => onTimeChange(e.target.value + ':00')}
              className="p-2 bg-main-bg w-full appearance-none pr-8"
            >
              {Array.from({ length: 24 }, (_, index) => (
                <option key={index} value={index.toString().padStart(2, '0')}>
                  {index.toString().padStart(2, '0')}:00
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.99977 14.0001C9.41644 14.0001 8.83311 13.7751 8.39144 13.3334L2.95811 7.90006C2.71644 7.65839 2.71644 7.25839 2.95811 7.01673C3.19977 6.77506 3.59977 6.77506 3.84144 7.01673L9.27477 12.4501C9.67477 12.8501 10.3248 12.8501 10.7248 12.4501L16.1581 7.01673C16.3998 6.77506 16.7998 6.77506 17.0414 7.01673C17.2831 7.25839 17.2831 7.65839 17.0414 7.90006L11.6081 13.3334C11.1664 13.7751 10.5831 14.0001 9.99977 14.0001Z"
                  fill="#FFFAFB"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative">
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as EventType)}
            className="mb-2 p-2 bg-main-bg w-full appearance-none pr-8"
          >
            {Object.values(EventType).map((eventType) => (
              <option key={eventType} value={eventType} className="text-main-text">
                {eventType}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.99977 14.0001C9.41644 14.0001 8.83311 13.7751 8.39144 13.3334L2.95811 7.90006C2.71644 7.65839 2.71644 7.25839 2.95811 7.01673C3.19977 6.77506 3.59977 6.77506 3.84144 7.01673L9.27477 12.4501C9.67477 12.8501 10.3248 12.8501 10.7248 12.4501L16.1581 7.01673C16.3998 6.77506 16.7998 6.77506 17.0414 7.01673C17.2831 7.25839 17.2831 7.65839 17.0414 7.90006L11.6081 13.3334C11.1664 13.7751 10.5831 14.0001 9.99977 14.0001Z"
                fill="#FFFAFB"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="hover:bg-[#FF3555] hover:text-main-text hover:border-main-red text-main-red px-4 py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#FF4E6B] hover:bg-[#FF3555] hover:text-main-text hover:border-main-red border border-main-red text-second-text px-4 py-2 transition-colors"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}
