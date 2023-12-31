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

  resetCalendarStore: () => void;
}

export const useCalendarStore = create((set) => ({
  calendarType: 'month',
  calendarDate: {
    dayOfMonth: -1,
    month: -1,
    year: -1,
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

  resetCalendarStore: () => set((state: CalendarStoreInterface) => ({
    calendarType: 'month',
    calendarDate: {
      dayOfMonth: -1,
      month: -1,
      year: -1,
    },
    calendarDayData: {},
    calendarMonthData: {},
    calendarYearData: {},
  })),
}));