
import { Booking } from '../types.ts';

/**
 * Service to handle Google Calendar integrations
 */

export const generateGoogleCalendarLink = (booking: Booking): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Format dates for Google Calendar (YYYYMMDDTHHmmSSZ)
  // For this demo, we use a simple date format as the booking date is already ISO
  const startDate = new Date(booking.date);
  const startTime = booking.time.split(':');
  startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]), 0);
  
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + booking.duration);

  const formatGSDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const params = new URLSearchParams({
    text: `TutorConnect: ${booking.subject} with ${booking.studentName}`,
    dates: `${formatGSDate(startDate)}/${formatGSDate(endDate)}`,
    details: `Online lesson via TutorConnect SA. Join here: ${booking.meetLink || 'TutorConnect Classroom'}`,
    location: 'Online / TutorConnect Classroom',
    add: booking.studentName,
  });

  return `${baseUrl}&${params.toString()}`;
};

export const syncScheduleToGoogle = async (bookings: Booking[], availability: any): Promise<boolean> => {
  // Simulate API delay
  return new Promise((resolve) => {
    console.log('Syncing the following to Google Calendar:', { bookings, availability });
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
};
