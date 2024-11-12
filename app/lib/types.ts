export enum EventType {
  EXPERT_MEETING = 'Meeting with an expert',
  QA_SESSION = 'Question-answer',
  CONFERENCE = 'Conference',
  WEBINAR = 'Webinar',
}

export interface NavigationLink {
  href: string;
  label: string;
}

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: Date;
  time: string;
  description: string;
  location: string;
}

export interface DayProps {
  date: Date;
  events?: Event[];
  isCurrentMonth: boolean;
  onDayClick?: (date: Date, events: Event[], e: React.MouseEvent) => void;
  onDateClick?: (date: Date) => void;
}

export interface AddEventPopupProps {
  onClose: () => void;
  position: { x: number; y: number } | null;
  onAddEvent: (event: {
    title: string;
    type: EventType;
    date: Date;
    time: string;
    description: string;
    location: string;
  }) => void;
  choosenDate: Date | null;
}
export interface EventPopupFormProps {
  title: string;
  description: string;
  location: string;
  type: EventType;
  time: string;
  date: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onTypeChange: (value: EventType) => void;
  onTimeChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  submitButtonText: string;
}

export interface EventPopupProps {
  events: Event[];
  position: { x: number; y: number } | null;
  onClose: () => void;
  onOpenAddEventPopup: () => void;
  onOpenEditEventPopup: (event: Event) => void;
}

export interface EventTypeFiltersProps {
  onFilterSelect?: (type: EventType) => void;
}

export interface MonthProps {
  month: number;
  year: number;
  events?: Event[];
  onDayClick?: (date: Date, events: Event[], e: React.MouseEvent) => void;
  onDateClick?: (date: Date) => void;
}

export interface LogoProps {
  className?: string;
}

export interface EditEventPopupProps {
  event: Event;
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  position: { x: number; y: number } | null;
}
