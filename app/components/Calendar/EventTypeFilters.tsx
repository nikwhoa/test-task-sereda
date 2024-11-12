import { EventType, EventTypeFiltersProps } from '@/app/lib/types';

export default function EventTypeFilters({ onFilterSelect }: EventTypeFiltersProps) {
  const eventStyles = {
    [EventType.EXPERT_MEETING]:
      'bg-[#FF4E6B29] text-main-red hover:bg-[#FF4E6B] active:bg-[#FF4E6B] hover:text-white active:text-white',
    [EventType.QA_SESSION]:
      'bg-[#00B29529] text-main-green hover:bg-[#00B295] active:bg-[#00B295] hover:text-white active:text-white',
    [EventType.CONFERENCE]:
      'bg-[#FFB80029] text-main-yellow hover:bg-[#FFB800] active:bg-[#FFB800] hover:text-white active:text-white',
    [EventType.WEBINAR]:
      'bg-[#007AFF29] text-main-blue hover:bg-[#007AFF] active:bg-[#007AFF] hover:text-white active:text-white',
  };

  return (
    <div className="flex space-x-6">
      {Object.values(EventType).map((type) => (
        <button
          key={type}
          onClick={() => onFilterSelect?.(type)}
          className={`rounded-full ${eventStyles[type]} text-base py-1 px-4 text-center hover:opacity-90 active:opacity-80 transition-opacity`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
