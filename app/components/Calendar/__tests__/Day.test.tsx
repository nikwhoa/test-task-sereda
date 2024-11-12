import { render, fireEvent, screen } from '@testing-library/react'
import Day from '../Day'
import { EventType } from '@/app/lib/types'
import '@testing-library/jest-dom';

describe('Day Component', () => {
  const mockDate = new Date(2024, 3, 15)
  const mockEvents = [
    {
      id: '1',
      title: 'Test Event',
      type: EventType.WEBINAR,
      date: mockDate,
      time: '10:00',
      description: 'Test Description',
      location: 'Test Location'
    }
  ]

  it('renders day number correctly', () => {
    render(<Day date={mockDate} events={[]} isCurrentMonth={true} />)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('applies correct styles for current month', () => {
    const { container } = render(<Day date={mockDate} events={[]} isCurrentMonth={true} />)
    expect(container.firstChild).toHaveClass('text-main-text')
  })

  it('applies correct styles for other months', () => {
    const { container } = render(<Day date={mockDate} events={[]} isCurrentMonth={false} />)
    expect(container.firstChild).toHaveClass('text-main-gray')
  })

  it('renders event indicators when events exist', () => {
    render(<Day date={mockDate} events={mockEvents} isCurrentMonth={true} />)
    expect(screen.getByRole('button')).toHaveClass('font-medium')
  })

  it('calls onClick handlers when clicked', () => {
    const mockDayClick = jest.fn()
    const mockDateClick = jest.fn()

    render(
      <Day 
        date={mockDate} 
        events={mockEvents} 
        isCurrentMonth={true}
        onDayClick={mockDayClick}
        onDateClick={mockDateClick}
      />
    )

    fireEvent.click(screen.getByRole('button'))
    expect(mockDayClick).toHaveBeenCalledWith(mockDate, mockEvents, expect.any(Object))
    expect(mockDateClick).toHaveBeenCalledWith(mockDate)
  })
}) 