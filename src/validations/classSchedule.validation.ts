import { z } from "zod";
import { CalendarDate, Time } from "@internationalized/date";

const calendarDateSchema = z.custom<CalendarDate>((val) => {
  return val && typeof val === 'object' && 'calendar' in val && 'era' in val;
}, {
  message: "Invalid date format"
});


const timeSchema = z.custom<Time>((val) => {
  return val && typeof val === 'object' && 'hour' in val && 'minute' in val;
}, {
  message: "Invalid time format"
});

const transformTimeTo12Hour = (time: Time): string => {
  const hour24 = time.hour;
  const minute = time.minute;
  
  let hour12 = hour24;
  let period = 'AM';
  
  if (hour24 === 0) {
    hour12 = 12; // Midnight
  } else if (hour24 === 12) {
    period = 'PM'; // Noon
  } else if (hour24 > 12) {
    hour12 = hour24 - 12;
    period = 'PM';
  }
  
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
};



export const createClassScheduleSchema = z.object({
  date: calendarDateSchema
    .refine((date) => {
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(date.year, date.month - 1, date.day);
      return inputDate >= today;
    }, {
      message: "Date cannot be in the past"
    })
    .transform((date) => {
    
      return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    }),
  
  startTime: timeSchema
    .refine((time) => {
      
      const hour = time.hour;
      return hour >= 6 && hour <= 22; // 6 AM to 10 PM
    }, {
      message: "Start time must be between 6:00 AM and 10:00 PM"
    })
    .transform(transformTimeTo12Hour), // Use 12-hour format with AM/PM
  
  trainer: z.string().min(1, "Trainer is required"),
  
  description: z.string().optional().or(z.literal("")),
});

