import { render, fireEvent, screen } from '@testing-library/react'
import EventTypeFilters from '../EventTypeFilters'
import { EventType } from '@/app/lib/types'

describe('EventTypeFilters Component', () => {
  it('renders all event type buttons', () => {
    render(<EventTypeFilters onFilterSelect={() => {}} />)
    
    Object.values(EventType).forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument()
    })
  })

  it('calls onFilterSelect with correct event type when clicked', () => {
    const mockOnFilterSelect = jest.fn()
    render(<EventTypeFilters onFilterSelect={mockOnFilterSelect} />)

    fireEvent.click(screen.getByText(EventType.WEBINAR))
    expect(mockOnFilterSelect).toHaveBeenCalledWith(EventType.WEBINAR)
  })

  it('applies correct styles to buttons', () => {
    render(<EventTypeFilters onFilterSelect={() => {}} />)
    
    const webinarButton = screen.getByText(EventType.WEBINAR)
    expect(webinarButton).toHaveClass('bg-[#007AFF29]')
    expect(webinarButton).toHaveClass('text-main-blue')
  })
}) 