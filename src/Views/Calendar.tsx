import * as React from 'react';

import WithAuthentication from '../containers/WithAuthentication';

import Header from '../components/Header';
import CalendarMonth from '../components/CalendarMonth';
import styled from 'styled-components';
import RenderIf from '../components/RenderIf';
import CalendarDay from '../components/CalendarDay';
import { CalendarDayDataInterface, CalendarMonthDataInterface, CalendarStoreInterface, CalendarYearDataInterface, useCalendarStore } from '../stores/calendarStore';
import AddEventButton from '../components/AddEventButton';
import CalendarSelector from '../components/CalendarSelector';
import CalendarYear from '../components/CalendarYear';

const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Calendar = () => {
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);
  const calendarDate = useCalendarStore((state: CalendarStoreInterface) => state.calendarDate);
  const setCalendarDate = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDate);

  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);
  const setCalendarMonthData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarMonthData);
  const setCalendarYearData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarYearData);


  React.useEffect(() => {
    console.log('ca useEffect []')
    if (calendarDate.dayOfMonth === -1
      && calendarDate.month === -1
      && calendarDate.year === -1) {
      const today = new Date();

      setCalendarDate({
        dayOfMonth: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      })
    }
  }, [])

  React.useEffect(() => {
    console.log('ca useEffect getCalendarData ')
    getCalendarData();
  }, [calendarType, calendarDate])

  const getCalendarData = async () => {
    console.log('ca va fetch', calendarType, calendarDate)
    if (calendarType === 'day') {
      // call API avec calendarType et calendarDate
      const fakeDayData = {
        dayOfMonth: calendarDate.dayOfMonth,
        month: calendarDate.month,
        year: calendarDate.year,
        data: [
          {
            id: 1,
            title: 'Sortir le chien',
            description: 'Description',
            isAllDay: false,
            startTime: '00:00',
            endTime: '03:00',
            notes: 'Notes',
            color: 'rgba(160, 74, 61, 0.5)',
            dayOfMonth: 1,
            month: 3,
            year: 2023,
          },
          {
            id: 2,
            title: 'Sport',
            description: 'Description',
            isAllDay: false,
            startTime: '03:30',
            endTime: '05:30',
            notes: 'Notes',
            color: 'rgba(52, 93, 92, 0.5)',
            dayOfMonth: 1,
            month: 3,
            year: 2023,
          },
          {
            id: 3,
            title: 'Étudier',
            description: 'Description',
            isAllDay: false,
            startTime: '05:30',
            endTime: '07:30',
            notes: 'Notes',
            color: 'rgba(94, 94, 55, 0.5)',
            dayOfMonth: 1,
            month: 3,
            year: 2023,
          },
        ]
      }

      interface FakeResDayInterface {
        status: number,
        data: CalendarDayDataInterface,
      }
      const fakeResDay: FakeResDayInterface = {
        status: 200,
        data: fakeDayData,
      }

      if (fakeResDay.status !== 200) {
        //TODO: handle fetch error
        return;
      }
      setCalendarDayData(fakeResDay.data);
    }
    else if (calendarType === 'month') {
      // call API avec calendarType et calendarDate
      const fakeMonthData = {
        month: calendarDate.month,
        year: calendarDate.year,
        data: Array.from(Array(31), (_, i) => {
          return {
            dayOfMonth: i + 1,
            month: calendarDate.month,
            year: calendarDate.year,
            data: [
              {
                id: 1,
                title: 'Sortir le chien',
                description: 'Description',
                isAllDay: false,
                startTime: '00:00',
                endTime: '03:00',
                notes: 'Notes',
                color: 'rgba(160, 74, 61, 0.5)',
                dayOfMonth: i + 1,
                month: calendarDate.month,
                year: calendarDate.year,
              },
              {
                id: 2,
                title: 'Sport',
                description: 'Description',
                isAllDay: false,
                startTime: '03:30',
                endTime: '05:30',
                notes: 'Notes',
                color: 'rgba(52, 93, 92, 0.5)',
                dayOfMonth: i + 1,
                month: calendarDate.month,
                year: calendarDate.year,
              },
              {
                id: 3,
                title: 'Étudier',
                description: 'Description',
                isAllDay: false,
                startTime: '05:30',
                endTime: '07:30',
                notes: 'Notes',
                color: 'rgba(94, 94, 55, 0.5)',
                dayOfMonth: i + 1,
                month: calendarDate.month,
                year: calendarDate.year,
              },
            ]
          }
        })
      }

      interface FakeResMonthInterface {
        status: number,
        data: CalendarMonthDataInterface,
      }
      const fakeResMonth: FakeResMonthInterface = {
        status: 200,
        data: fakeMonthData,
      }

      if (fakeResMonth.status !== 200) {
        //TODO: handle fetch error
        return;
      }
      setCalendarMonthData(fakeResMonth.data);
    }
    else if (calendarType === 'year') {
      // call API avec calendarType et calendarDate
      const fakeYearData = {
        year: calendarDate.year,
        data: Array.from(Array(12), (_, i) => {
          return {
            month: i + 1,
            year: calendarDate.year,
            data: Array.from(Array(31), (_, j) => {
              return {
                dayOfMonth: j + 1,
                month: i + 1,
                year: calendarDate.year,
                data: [
                  {
                    id: 1,
                    title: 'Sortir le chien',
                    description: 'Description',
                    isAllDay: false,
                    startTime: '00:00',
                    endTime: '03:00',
                    notes: 'Notes',
                    color: 'rgba(160, 74, 61, 0.5)',
                    dayOfMonth: j + 1,
                    month: i + 1,
                    year: calendarDate.year,
                  },
                  {
                    id: 2,
                    title: 'Sport',
                    description: 'Description',
                    isAllDay: false,
                    startTime: '03:30',
                    endTime: '05:30',
                    notes: 'Notes',
                    color: 'rgba(52, 93, 92, 0.5)',
                    dayOfMonth: j + 1,
                    month: i + 1,
                    year: calendarDate.year,
                  },
                  {
                    id: 3,
                    title: 'Étudier',
                    description: 'Description',
                    isAllDay: false,
                    startTime: '05:30',
                    endTime: '07:30',
                    notes: 'Notes',
                    color: 'rgba(94, 94, 55, 0.5)',
                    dayOfMonth: j + 1,
                    month: i + 1,
                    year: calendarDate.year,
                  },
                ]
              }
            })
          }
        })
      }

      interface FakeResYearInterface {
        status: number,
        data: CalendarYearDataInterface,
      }
      const fakeResYear: FakeResYearInterface = {
        status: 200,
        data: fakeYearData,
      }

      if (fakeResYear.status !== 200) {
        //TODO: handle fetch error
        return;
      }
      setCalendarYearData(fakeResYear.data);
    }
  }

  return (
    <WithAuthentication>
      <CalendarWrapper>
        <Header />

        <RenderIf isTrue={calendarType === 'selector'}>
          <CalendarSelector />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'year'}>
          <CalendarYear />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'month'}>
          <CalendarMonth />
        </RenderIf>

        <RenderIf isTrue={calendarType === 'day'}>
          <CalendarDay />
        </RenderIf>

        <AddEventButton />

      </CalendarWrapper>
    </WithAuthentication>
  );
};

export default Calendar;