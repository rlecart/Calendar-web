import { create } from 'zustand';

export type CalendarTypeType = 'year' | 'month' | 'day';

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
  calendarDayData: CalendarDayDataInterface;
  calendarMonthData: CalendarMonthDataInterface;
  calendarYearData: CalendarYearDataInterface;

  setCalendarType: (newCalendarType: CalendarTypeType) => void;
  setCalendarDayData: (newCalendarDayData: CalendarDayDataInterface) => void;
  setCalendarMonthData: (newCalendarMonthData: CalendarMonthDataInterface) => void;
  setCalendarYearData: (newCalendarYearData: CalendarYearDataInterface) => void;
}

export const useCalendarStore = create((set) => ({
  calendarType: 'month',
  calendarDayData: {},
  calendarMonthData: {},
  calendarYearData: {},

  setCalendarType: (newCalendarType: CalendarTypeType) => set(() => ({
    calendarType: newCalendarType,
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