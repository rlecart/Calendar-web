import { create } from 'zustand';

export type CalendarTypeType = 'selector' | 'year' | 'month' | 'day';

export interface CalendarDateInterface {
  dayOfMonth: number,
  month: number,
  year: number,
}

export interface CalendarEventDataInterface {
  id: number,
  title: string,
  description: string,
  isAllDay: boolean,
  startTime: string,
  endTime: string,
  notes: string,
  color: string,
  dayOfMonth: number,
  month: number,
  year: number,
}
export interface CalendarDayDataInterface {
  dayOfMonth: number,
  month: number,
  year: number,
  data: Array<CalendarEventDataInterface>,
}
export interface CalendarMonthDataInterface {
  month: number,
  year: number,
  data: Array<CalendarDayDataInterface>,
}
export interface CalendarYearDataInterface {
  year: number,
  data: Array<CalendarMonthDataInterface>,
}

export interface CalendarStoreInterface {
  calendarType: CalendarTypeType;
  calendarDate: CalendarDateInterface;
  
  calendarDayData: CalendarDayDataInterface;
  calendarMonthData: CalendarMonthDataInterface;
  calendarYearData: CalendarYearDataInterface;

  setCalendarType: (newCalendarType: CalendarTypeType) => void;
  setCalendarDate: (newCalendarType: CalendarDateInterface) => void;

  setCalendarDayData: (newCalendarDayData: CalendarDayDataInterface) => void;
  setCalendarMonthData: (newCalendarMonthData: CalendarMonthDataInterface) => void;
  setCalendarYearData: (newCalendarYearData: CalendarYearDataInterface) => void;
}

export const useCalendarStore = create((set) => ({
  calendarType: 'month',
  calendarDate: {
    dayOfMonth: 0,
    month: 0,
    year: 0,
  },
  calendarDayData: {},
  calendarMonthData: {},
  calendarYearData: {},

  setCalendarType: (newCalendarType: CalendarTypeType) => set(() => ({
    calendarType: newCalendarType,
  })),
  setCalendarDate: (newCalendarDate: CalendarDateInterface) => set(() => ({
    calendarDate: newCalendarDate,
  })),
  setCalendarDayData: (newCalendarDayData: CalendarDayDataInterface) => set(() => ({
    calendarDayData: newCalendarDayData,
  })),
  setCalendarMonthData: (newCalendarMonthData: CalendarMonthDataInterface) => set(() => ({
    calendarMonthData: newCalendarMonthData,
  })),
  setCalendarYearData: (newCalendarYearData: CalendarYearDataInterface) => set(() => ({
    calendarYearData: newCalendarYearData,
  })),
}));