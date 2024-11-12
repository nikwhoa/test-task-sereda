import { render, screen } from '@testing-library/react'
import Month from '../Month'
import { Event, EventType } from '@/app/lib/types'

describe('Month Component', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Test Event',
      type: EventType.WEBINAR,
      date: new Date(2024, 3, 15),
      time: '10:00',
      description: 'Test Description',
      location: 'Test Location'
    }
  ]

  it('renders month name correctly', () => {
    render(<Month month={3} year={2024} events={mockEvents} />)
    expect(screen.getByText('April')).toBeInTheDocument()
  })

  it('renders weekday headers', () => {
    render(<Month month={3} year={2024} events={mockEvents} />)
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Mon')).toBeInTheDocument()
    // ... test other weekdays
  })

  it('renders correct number of days', () => {
    const { container } = render(<Month month={3} year={2024} events={mockEvents} />)
    const days = container.querySelectorAll('button')
    expect(days.length).toBe(42) // 6 weeks × 7 days
  })

  it('passes events to Day component correctly', () => {
    render(<Month month={3} year={2024} events={mockEvents} />)
    // Find the day with the event and verify it has the event indicator
    const dayWithEvent = screen.getAllByRole('button')[14] // 15th day
    expect(dayWithEvent).toHaveClass('font-light')
  })
}) 