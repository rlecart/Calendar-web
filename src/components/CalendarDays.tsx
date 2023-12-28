import * as React from 'react';
import styled from 'styled-components';
import RenderIf from './RenderIf';

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
const DayLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`
const CalendarDay = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  background: #37393C;

  border-right: 1px solid #596474;
  border-bottom: 1px solid #596474;
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
  background: #2C2E31;

  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
`

interface CalendarDaysProps {
  type: string;
}

const CalendarDays = ({ type }: CalendarDaysProps) => {
  const allCalendarData = Array.from(Array(31), (_, i) => {
    return {
      dayOfMonth: i + 1,
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

  return (
    <React.Fragment>
      <CalendarDaysWrapper>
        {slicedCalendarData.map((week, index) => (
          <DayLine key={index}>
            {week.map((day, index) => (
              <CalendarDay key={index}>
                <CalendarDayText>
                  {day.dayOfMonth}
                </CalendarDayText>

                <CalendarDayData>
                  {day.data.map((data, index) => (
                    <CalendarDataBadge key={index} style={{ backgroundColor: `${data.color}`}}>
                      <CalendarDataBadgeText>
                        {data.title}
                      </CalendarDataBadgeText>
                    </CalendarDataBadge>
                  ))}
                </CalendarDayData>
              </CalendarDay>
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

export default CalendarDays;