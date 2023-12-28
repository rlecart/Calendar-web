import * as React from 'react';
import styled from 'styled-components';
import RenderIf from './RenderIf';
import { CalendarDayDataInterface, CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';

const CalendarDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  align-self: stretch;
  background: #2C2E31;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
const DaysLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`
const DaysLine = styled.div`
  display: flex;
  height: 3.4375rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  background: #333537;
`
const DayNumber = styled.button`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex: 1 0 0;
  align-self: stretch;

  border: 0;
  border-bottom: 1px solid #596474;
  background: #333537;

  &:hover {
    background: #3e526fc4;
    border-radius: 1rem 1rem 0 0;
  }
`
const DayNumberSelected = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex: 1 0 0;
  align-self: stretch;

  border-radius: 0.625rem 0.625rem 0rem 0rem;
  border-top: 1px solid #596474;
  border-right: 1px solid #596474;
  border-left: 1px solid #596474;
  background: #37393C;
`
const DayNumberEmpty = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex: 1 0 0;
  align-self: stretch;

  border-bottom: 1px solid #596474;
  background: #333537;
`
const DayNumberText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

const CalendarDay = () => {
  const allCalendarData = Array.from(Array(31), (_, i) => {
    return {
      dayOfMonth: i + 1,
      month: 3,
      year: 2023,
      data: [
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '10:00',
          endTime: '11:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 2,
          title: 'Sport',
          description: 'Description',
          isAllDay: false,
          startTime: '10:00',
          endTime: '11:00',
          notes: 'Notes',
          color: 'rgba(52, 93, 92, 1)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 3,
          title: 'Étudier',
          description: 'Description',
          isAllDay: false,
          startTime: '10:00',
          endTime: '11:00',
          notes: 'Notes',
          color: 'rgba(94, 94, 55, 1)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
      ]
    }
  });
  const slicedCalendarData = [
    allCalendarData.slice(0, 7),
    allCalendarData.slice(7, 14),
    allCalendarData.slice(14, 21),
    allCalendarData.slice(21, 28),
    allCalendarData.slice(28, 31),
  ]

  const calendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.calendarDayData);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);

  const actualWeek = slicedCalendarData.find((week) => week.some((day) => day.dayOfMonth === calendarDayData.dayOfMonth));

  // console.log(calendarData);

  const handleSelectAnotherDay = (selectedDay: CalendarDayDataInterface) => {
    setCalendarDayData(selectedDay);
  }

  return (
    <React.Fragment>
      <CalendarDaysWrapper>
        <DaysLineWrapper>
          <DaysLine>
            {actualWeek?.map((day, index) => (
              <React.Fragment key={index}>
                <RenderIf isTrue={calendarDayData.dayOfMonth === day.dayOfMonth}>
                  <DayNumberSelected>
                    <DayNumberText>
                      {day.dayOfMonth}
                    </DayNumberText>
                  </DayNumberSelected>
                </RenderIf>

                <RenderIf isTrue={calendarDayData.dayOfMonth !== day.dayOfMonth}>
                  <DayNumber onClick={() => handleSelectAnotherDay(day)}>
                    <DayNumberText>
                      {day.dayOfMonth}
                    </DayNumberText>
                  </DayNumber>
                </RenderIf>

              </React.Fragment>
            ))}
            {actualWeek &&
              <RenderIf isTrue={actualWeek?.length < 7}>
                <React.Fragment>
                  {Array.from(Array(7 - actualWeek?.length), (_, i) => <DayNumberEmpty key={i} />)}
                </React.Fragment>
              </RenderIf>
            }

          </DaysLine>
        </DaysLineWrapper>

      </CalendarDaysWrapper>
    </React.Fragment>
  );
};

export default CalendarDay;