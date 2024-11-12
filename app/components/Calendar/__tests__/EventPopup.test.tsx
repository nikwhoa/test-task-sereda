import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import EventPopup from '../EventPopup';
import { Event, EventType } from '@/app/lib/types';

describe('EventPopup Component', () => {
  const mockEvent: Event = {
    id: '1',
    title: 'Test Event',
    type: EventType.WEBINAR,
    date: new Date(2024, 3, 15),
    time: '10:00',
    description: 'Test Description',
    location: 'Test Location'
  };

  const mockProps = {
    events: [mockEvent],
    position: { x: 100, y: 100 },
    onClose: jest.fn(),
    onOpenAddEventPopup: jest.fn(),
    onOpenEditEventPopup: jest.fn(),
  };

  let portalRoot: HTMLElement;

  beforeEach(() => {
    // Clean up any existing portal root
    cleanup();
    
    // Create a fresh portal root for each test
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up the portal root
    if (portalRoot && portalRoot.parentNode) {
      portalRoot.parentNode.removeChild(portalRoot);
    }
    jest.clearAllMocks();
  });

  it('renders event details correctly', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    const backdrop = document.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockProps.onClose).toHaveBeenCalled();
    }
  });

  it('calls onOpenEditEventPopup when edit button is clicked', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    const editButton = screen.getByLabelText('Edit event');
    fireEvent.click(editButton);
    expect(mockProps.onOpenEditEventPopup).toHaveBeenCalledWith(mockEvent);
  });

  it('displays correct event type styling', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    const eventTypeElement = screen.getByText(EventType.WEBINAR);
    expect(eventTypeElement).toHaveClass('bg-[#007AFF29]');
    expect(eventTypeElement).toHaveClass('text-[#4DB4FF]');
  });

  it('formats date and time correctly', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    expect(screen.getByText(/April 15/)).toBeInTheDocument();
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
  });

  it('positions popup correctly based on props', () => {
    render(<EventPopup {...mockProps} />, {
      container: document.getElementById('portal-root')!
    });
    
    const popup = document.querySelector('.relative.bg-second-bg');
    expect(popup).toHaveStyle({
      marginLeft: '100px',
      marginTop: '100px'
    });
  });
}); 