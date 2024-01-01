import * as React from 'react';
import styled from 'styled-components';

import { useCalendarStore, ICalendarStore, ICalendarDayData, ICalendarEventData } from '../stores/calendarStore';

import RenderIf from './RenderIf';

import ActualDate from './ActualDate';
import WeekDays from './WeekDays';

const CalendarDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  align-self: stretch;
  background: #120E13;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
const DayLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`
const CalendarDayBloc = styled.button`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  background: #19151A;

  border: 0;
  border-right: 1px solid rgba(240, 232, 218, 0.10);
  border-bottom: 1px solid rgba(240, 232, 218, 0.10);

  &:hover {
    background: rgba(182, 107, 56, 0.2);
  }
`
const CalendarDayText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const CalendarDayData = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.3125rem;
  flex: 1 0 0;
  align-self: stretch;
  flex-wrap: wrap;
`
const CalendarDataBadge = styled.div`
  display: flex;
  padding: 0.3125rem 0.9375rem;
  align-items: center;

  border-radius: 0.625rem;
`
const CalendarDataBadgeText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const CalendarDayEmpty = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  background: #120E13;

  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
`

const CalendarMonth = () => {
  const calendarMonthData = useCalendarStore((state: ICalendarStore) => state.calendarMonthData);
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);

  const slicedCalendarData = calendarMonthData?.data && [
    calendarMonthData.data.slice(0, 7),
    calendarMonthData.data.slice(7, 14),
    calendarMonthData.data.slice(14, 21),
    calendarMonthData.data.slice(21, 28),
    calendarMonthData.data.slice(28, 31),
  ]

  const handleClickBloc = (day: ICalendarDayData) => {
    setCalendarDate({
      dayOfMonth: day.dayOfMonth,
      month: day.month,
      year: day.year,
    })
    setCalendarType('day')
  }

  return (
    <React.Fragment>

      <ActualDate />

      <WeekDays />

      <CalendarDaysWrapper>
        {slicedCalendarData?.map((week: Array<ICalendarDayData>, index: number) => (
          <DayLine key={index}>
            {week.map((day, index) => (
              <CalendarDayBloc
                key={index}
                style={
                  day.dayOfMonth === new Date().getDate() && day.month === new Date().getMonth() + 1 && day.year === new Date().getFullYear()
                    ? { outline: `1px solid #B66B38`, outlineOffset: `-1px`, }
                    : {}
                }
                onClick={() => handleClickBloc(day)}
              >
                <CalendarDayText>
                  {day.dayOfMonth}
                </CalendarDayText>

                <CalendarDayData>
                  {day.data.map((data: ICalendarEventData, index: number) => (
                    <CalendarDataBadge key={index} style={{ backgroundColor: `${data.color}` }}>
                      <CalendarDataBadgeText>
                        {data.title}
                      </CalendarDataBadgeText>
                    </CalendarDataBadge>
                  ))}
                </CalendarDayData>
              </CalendarDayBloc>
            ))}
            <RenderIf isTrue={week.length < 7}>
              <React.Fragment>
                {Array.from(Array(7 - week.length), (_, i) => <CalendarDayEmpty key={i} />)}
              </React.Fragment>
            </RenderIf>
          </DayLine>
        ))}
      </CalendarDaysWrapper>
    </React.Fragment >
  );
};

export default CalendarMonth;