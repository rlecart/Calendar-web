import { create } from 'zustand';

export type TCalendarType = 'selector' | 'year' | 'month' | 'day';

export interface ICalendarDate {
  dayOfMonth: number,
  month: number,
  year: number,
}

export interface ICalendarEventData {
  id: number,
  title: string,
  description: string,
  startTime: number,
  endTime: number,
  notes: string,
  color: string,
  dayOfMonth: number,
  month: number,
  year: number,
}

export interface ICalendarDayData {
  dayOfMonth: number,
  month: number,
  year: number,
  data: Array<ICalendarEventData>,
}

export interface ICalendarMonthData {
  month: number,
  year: number,
  data: Array<ICalendarDayData>,
}

export interface ICalendarYearData {
  year: number,
  data: Array<ICalendarMonthData>,
}

export interface ICalendarStore {
  calendarType: TCalendarType;
  calendarDate: ICalendarDate;

  calendarDayData: ICalendarDayData;
  calendarMonthData: ICalendarMonthData;
  calendarYearData: ICalendarYearData;

  setCalendarType: (newCalendarType: TCalendarType) => void;
  setCalendarDate: (newCalendarType: ICalendarDate) => void;

  setCalendarDayData: (newCalendarDayData: ICalendarDayData) => void;
  setCalendarMonthData: (newCalendarMonthData: ICalendarMonthData) => void;
  setCalendarYearData: (newCalendarYearData: ICalendarYearData) => void;

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

  setCalendarType: (newCalendarType: TCalendarType) => set(() => ({
    calendarType: newCalendarType,
  })),
  setCalendarDate: (newCalendarDate: ICalendarDate) => set(() => ({
    calendarDate: newCalendarDate,
  })),

  setCalendarDayData: (newCalendarDayData: ICalendarDayData) => set(() => ({
    calendarDayData: newCalendarDayData,
  })),
  setCalendarMonthData: (newCalendarMonthData: ICalendarMonthData) => set(() => ({
    calendarMonthData: newCalendarMonthData,
  })),
  setCalendarYearData: (newCalendarYearData: ICalendarYearData) => set(() => ({
    calendarYearData: newCalendarYearData,
  })),

  resetCalendarStore: () => set((state: ICalendarStore) => ({
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