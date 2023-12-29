import * as React from 'react';
import styled from 'styled-components';
import RenderIf from './RenderIf';
import { CalendarDayDataInterface, CalendarEventDataInterface, CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';

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

const EventsWrapper = styled.div`
  display: flex;
  // padding: 2.5rem;
  flex-direction: column;
  align-items: center;
  // gap: 2.5rem;
  flex: 1 0 0;
  align-self: stretch;
  position: relative;
`
const EventsTimeScale = styled.div`
  display: flex;
  padding: 2.5rem;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  flex: 1 0 0;
  align-self: stretch;
`
const EventsTimeScaleLine = styled.div`
  display: flex;
  height: 3.8125rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`
const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TimeText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const TimeLine = styled.div`
  height: 0.6875rem;
  flex: 1 0 0;

  border-bottom: 1px solid #545E6C;
`

const EventsListWrapperAbsolute = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding-left: 8rem;
    padding-right: 5rem;
    padding-top: 3.25rem;
`
const EventCard = styled.div`
  position: absolute;
  display: flex;
  padding: 1.875rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  right: 5rem;
  left: 8rem;
  
  background: rgba(160, 74, 61, 0.50);
`
const EventElems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`
const EventTitle = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const EventTime = styled.div`
  color: #D3D3D3;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
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
          startTime: '00:00',
          endTime: '01:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '01:00',
          endTime: '02:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '02:00',
          endTime: '03:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '03:00',
          endTime: '04:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '04:00',
          endTime: '05:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: i + 1,
          month: 3,
          year: 2023,
        },
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          isAllDay: false,
          startTime: '05:00',
          endTime: '06:00',
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
          startTime: '11:00',
          endTime: '12:00',
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
          startTime: '13:00',
          endTime: '14:00',
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

  const eventsTimeScaleRef = React.useRef<HTMLDivElement>(null);

  // console.log(calendarData);

  const handleSelectAnotherDay = (selectedDay: CalendarDayDataInterface) => {
    setCalendarDayData(selectedDay);
  }

  const [timeLineHeightPerHour, setTimeLineHeightPerHour] = React.useState<number>(0);

  React.useEffect(() => {
    const timeLineHeight = eventsTimeScaleRef.current?.clientHeight
    setTimeLineHeightPerHour(timeLineHeight ? (timeLineHeight - 40) / 24 : 0);
    console.log(timeLineHeightPerHour)
  }, [eventsTimeScaleRef?.current?.clientHeight])

  return (
    <React.Fragment>
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

      <CalendarDaysWrapper>

        <EventsWrapper>

          <EventsTimeScale ref={eventsTimeScaleRef}>
            {Array(24).fill(0).map((_, i) => (
              <EventsTimeScaleLine key={i}>
                <TimeWrapper>
                  <TimeText>
                    {i < 10 ? `0${i}:00` : `${i}:00`}
                  </TimeText>
                </TimeWrapper>

                <TimeLine />
              </EventsTimeScaleLine>
            ))}
          </EventsTimeScale>

          <EventsListWrapperAbsolute>
            {calendarDayData.data.map((event: CalendarEventDataInterface, index: number) => (
              <EventCard key={index} style={{
                backgroundColor: `${event.color}`,
                top: `${(parseInt(event.startTime.split(':')[0]) * timeLineHeightPerHour) + 52}px`,
              }}>
                <EventElems>
                  <EventTitle>
                    {event.title}
                  </EventTitle>
                  <EventTime>
                    {event.startTime} - {event.endTime}
                  </EventTime>
                </EventElems>
              </EventCard>
            ))}
          </EventsListWrapperAbsolute>

        </EventsWrapper>

      </CalendarDaysWrapper>
    </React.Fragment >
  );
};

export default CalendarDay;