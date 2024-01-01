import * as React from 'react';

import WithAuthentication from '../containers/WithAuthentication';

import Header from '../components/Header';
import CalendarMonth from '../components/CalendarMonth';
import styled from 'styled-components';
import RenderIf from '../components/RenderIf';
import CalendarDay from '../components/CalendarDay';
import { CalendarDayDataInterface, CalendarEventDataInterface, CalendarMonthDataInterface, CalendarStoreInterface, CalendarYearDataInterface, useCalendarStore } from '../stores/calendarStore';
import AddEventButton from '../components/AddEventButton';
import CalendarSelector from '../components/CalendarSelector';
import CalendarYear from '../components/CalendarYear';
import { API } from '../api';
import axios from 'axios';

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
    try {
      console.log('ca va fetch', calendarType, calendarDate)
      if (calendarType === 'day') {
        const dayRes = await axios.get(`${API}/event/year/${calendarDate.year}/month/${calendarDate.month}/day/${calendarDate.dayOfMonth}`);
        console.log('dayRes', dayRes)
        if (dayRes.status !== 200)
          throw (dayRes.status)

        const dayData = {
          dayOfMonth: calendarDate.dayOfMonth,
          month: calendarDate.month,
          year: calendarDate.year,
          data: dayRes.data,
        }

        // call API avec calendarType et calendarDate
        // const fakeDayData = {
        //   dayOfMonth: calendarDate.dayOfMonth,
        //   month: calendarDate.month,
        //   year: calendarDate.year,
        //   data: [
        //     {
        //       id: 1,
        //       title: 'Sortir le chien',
        //       description: 'Description',
        //       startTime: '00:00',
        //       endTime: '03:00',
        //       notes: 'Notes',
        //       color: 'rgba(160, 74, 61, 0.5)',
        //       dayOfMonth: 1,
        //       month: 3,
        //       year: 2023,
        //     },
        //     {
        //       id: 2,
        //       title: 'Sport',
        //       description: 'Description',
        //       startTime: '03:30',
        //       endTime: '05:30',
        //       notes: 'Notes',
        //       color: 'rgba(52, 93, 92, 0.5)',
        //       dayOfMonth: 1,
        //       month: 3,
        //       year: 2023,
        //     },
        //     {
        //       id: 3,
        //       title: 'Étudier',
        //       description: 'Description',
        //       startTime: '05:30',
        //       endTime: '07:30',
        //       notes: 'Notes',
        //       color: 'rgba(94, 94, 55, 0.5)',
        //       dayOfMonth: 1,
        //       month: 3,
        //       year: 2023,
        //     },
        //   ]
        // }

        // interface FakeResDayInterface {
        //   status: number,
        //   data: CalendarDayDataInterface,
        // }
        // const fakeResDay: FakeResDayInterface = {
        //   status: 200,
        //   data: fakeDayData,
        // }

        setCalendarDayData(dayData);
      }
      if (calendarType === 'month' || calendarType === 'day') {
        const monthRes = await axios.get(`${API}/event/year/${calendarDate.year}/month/${calendarDate.month}`);
        console.log('monthRes', monthRes)
        if (monthRes.status !== 200)
          throw (monthRes.status)

        const monthData = {
          month: calendarDate.month,
          year: calendarDate.year,
          data: Array.from(Array(31), (_, i) => {
            return {
              dayOfMonth: i + 1,
              month: calendarDate.month,
              year: calendarDate.year,
              data: monthRes.data.filter((event: CalendarEventDataInterface) => event.dayOfMonth === i + 1)
            }
          })
        }

        setCalendarMonthData(monthData);
      }
      // else if (calendarType === 'year') {
      //   // call API avec calendarType et calendarDate
      //   const fakeYearData = {
      //     year: calendarDate.year,
      //     data: Array.from(Array(12), (_, i) => {
      //       return {
      //         month: i + 1,
      //         year: calendarDate.year,
      //         data: Array.from(Array(31), (_, j) => {
      //           return {
      //             dayOfMonth: j + 1,
      //             month: i + 1,
      //             year: calendarDate.year,
      //             data: [
      //               {
      //                 id: 1,
      //                 title: 'Sortir le chien',
      //                 description: 'Description',
      //                 startTime: '00:00',
      //                 endTime: '03:00',
      //                 notes: 'Notes',
      //                 color: 'rgba(160, 74, 61, 0.5)',
      //                 dayOfMonth: j + 1,
      //                 month: i + 1,
      //                 year: calendarDate.year,
      //               },
      //               {
      //                 id: 2,
      //                 title: 'Sport',
      //                 description: 'Description',
      //                 startTime: '03:30',
      //                 endTime: '05:30',
      //                 notes: 'Notes',
      //                 color: 'rgba(52, 93, 92, 0.5)',
      //                 dayOfMonth: j + 1,
      //                 month: i + 1,
      //                 year: calendarDate.year,
      //               },
      //               {
      //                 id: 3,
      //                 title: 'Étudier',
      //                 description: 'Description',
      //                 startTime: '05:30',
      //                 endTime: '07:30',
      //                 notes: 'Notes',
      //                 color: 'rgba(94, 94, 55, 0.5)',
      //                 dayOfMonth: j + 1,
      //                 month: i + 1,
      //                 year: calendarDate.year,
      //               },
      //             ]
      //           }
      //         })
      //       }
      //     })
      //   }

      //   interface FakeResYearInterface {
      //     status: number,
      //     data: CalendarYearDataInterface,
      //   }
      //   const fakeResYear: FakeResYearInterface = {
      //     status: 200,
      //     data: fakeYearData,
      //   }

      //   if (fakeResYear.status !== 200) {
      //     //TODO: handle fetch error
      //     return;
      //   }
      //   setCalendarYearData(fakeResYear.data);
      // }
    } catch (err) {
      console.log('getCalendarData err', err)
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