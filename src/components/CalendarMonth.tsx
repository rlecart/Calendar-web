import * as React from 'react';
import styled from 'styled-components';
import RenderIf from './RenderIf';
import { useCalendarStore, CalendarStoreInterface, CalendarDayDataInterface, CalendarEventDataInterface } from '../stores/calendarStore';
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
  background: #120E13;

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
  background: #100C12;

  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
`

const CalendarMonth = () => {
  const setCalendarDate = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDate);
  const setCalendarType = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarType);

  const calendarMonthData = useCalendarStore((state: CalendarStoreInterface) => state.calendarMonthData);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);

  const slicedCalendarData = calendarMonthData?.data && [
    calendarMonthData.data.slice(0, 7),
    calendarMonthData.data.slice(7, 14),
    calendarMonthData.data.slice(14, 21),
    calendarMonthData.data.slice(21, 28),
    calendarMonthData.data.slice(28, 31),
  ]

  const handleClickBloc = (day: CalendarDayDataInterface) => {
    // console.log(day)
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
        {slicedCalendarData?.map((week: Array<CalendarDayDataInterface>, index: number) => (
          <DayLine key={index}>
            {week.map((day, index) => (
              <CalendarDayBloc key={index} onClick={() => handleClickBloc(day)}>
                <CalendarDayText>
                  {day.dayOfMonth}
                </CalendarDayText>

                <CalendarDayData>
                  {day.data.map((data: CalendarEventDataInterface, index: number) => (
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
    </React.Fragment>
  );
};

export default CalendarMonth;