import { create } from 'zustand';

export type CalendarTypeType = 'year' | 'month' | 'day';
export type CalendarDataType = CalendarDayInterface | Array<CalendarDataInterface>;

export interface CalendarDataInterface {
  id: number,
  title: string,
  description: string,
  isAllDay: boolean,
  startTime: string,
  endTime: string,
  notes: string,
  color: string,
}
export interface CalendarDayInterface {
  dayOfMonth: number,
  month: number,
  year: number,
  data: Array<CalendarDataInterface>,
}

export interface CalendarStoreInterface {
  calendarType: CalendarTypeType;
  calendarData: CalendarDataType;

  setCalendarType: (newCalendarType: CalendarTypeType) => void;
  setCalendarData: (newCalendarData: CalendarDataType) => void;
}

export const useCalendarStore = create((set) => ({
  calendarType: 'month',
  calendarData: {},

  setCalendarType: (newCalendarType: CalendarTypeType) => set(() => ({
    calendarType: newCalendarType,
  })),
  setCalendarData: (newCalendarData: CalendarDataType) => set(() => ({
    calendarData: newCalendarData,
  })),
}));