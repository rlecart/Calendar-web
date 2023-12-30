import * as React from 'react';
import styled from 'styled-components';
import RenderIf from './RenderIf';
import { CalendarDayDataInterface, CalendarEventDataInterface, CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';
import ActualDate from './ActualDate';
import WeekDays from './WeekDays';
import ModalEvent from './ModalEvent';

const CalendarDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  align-self: stretch;
  background: #19151A;
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

  background: #19151A;
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
  border-bottom: 1px solid rgba(240, 232, 218, 0.10);
  background: #120E13;

  &:hover {
    background: rgba(182, 107, 56, 0.2);
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
  border-top: 1px solid rgba(240, 232, 218, 0.10);
  border-right: 1px solid rgba(240, 232, 218, 0.10);
  border-left: 1px solid rgba(240, 232, 218, 0.10);
  background: #19151A;
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

  border-bottom: 1px solid rgba(240, 232, 218, 0.10);
  background: #120E13;
`
const DayNumberText = styled.div`
  color: #F0E8DA;
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
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const TimeLine = styled.div`
  height: 0.6875rem;
  flex: 1 0 0;

  border-bottom: 1px solid rgba(240, 232, 218, 0.10);
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
const EventCard = styled.button`
  position: absolute;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  right: 5rem;
  left: 8rem;
  
  background: rgba(160, 74, 61, 0.50);

  border: 0;
`
const EventElems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;
`
const EventTitle = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const EventTime = styled.div`
  color: #D3D3D3;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const ActualTimeCursor = styled.div`
  position: absolute;
  left: 6rem;
  right: 0rem;
  display: flex;
  // background: blue;
`


const CalendarDay = () => {
  const setCalendarDate = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDate);

  const calendarMonthData = useCalendarStore((state: CalendarStoreInterface) => state.calendarMonthData);

  const calendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.calendarDayData);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);

  const slicedCalendarData = calendarMonthData?.data && [
    calendarMonthData.data.slice(0, 7),
    calendarMonthData.data.slice(7, 14),
    calendarMonthData.data.slice(14, 21),
    calendarMonthData.data.slice(21, 28),
    calendarMonthData.data.slice(28, 31),
  ]

  const actualWeek = slicedCalendarData.find((week) => week.some((day: CalendarDayDataInterface) => day.dayOfMonth === calendarDayData.dayOfMonth));
  console.log('actual week', actualWeek)

  const eventsTimeScaleRef = React.useRef<HTMLDivElement>(null);

  const handleSelectAnotherDay = (selectedDay: CalendarDayDataInterface) => {
    setCalendarDate({
      dayOfMonth: selectedDay.dayOfMonth,
      month: selectedDay.month,
      year: selectedDay.year,
    })
    setCalendarDayData(selectedDay);
  }

  const [timeLineHeightPerHour, setTimeLineHeightPerHour] = React.useState<number>(0);

  React.useEffect(() => {
    const timeLineHeight = eventsTimeScaleRef.current?.clientHeight
    setTimeLineHeightPerHour(timeLineHeight ? (timeLineHeight - 40) / 24 : 0);
    console.log(timeLineHeightPerHour)
  }, [eventsTimeScaleRef?.current?.clientHeight])

  const [actualTimeCursorPosition, setActualTimeCursorPosition] = React.useState<number>(-1000);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActualTimeCursorPosition((new Date().getHours() * timeLineHeightPerHour) + 52 + (new Date().getMinutes() / 60 * timeLineHeightPerHour) - 9);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLineHeightPerHour]);

  const [show, setShow] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventDataInterface | null>(null);

  const handleClose = () => {
    // resetAllFields();
    setShow(false)
  };
  const handleShow = () => {
    // resetAllFields();
    setShow(true)
  };

  const handleEditEvent = (event: CalendarEventDataInterface) => {
    setSelectedEvent(event);
    handleShow();
  }

  return (
    <React.Fragment>
      <ModalEvent
        show={show}
        type='edit'
        eventData={selectedEvent}
        handleClose={handleClose}
      />

      <ActualDate />

      <WeekDays />

      <DaysLineWrapper>
        <DaysLine>
          {actualWeek?.map((day: CalendarDayDataInterface, index: number) => (
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
            {calendarDayData?.data?.map((event: CalendarEventDataInterface, index: number) => (
              <EventCard
                key={index}
                style={{
                  backgroundColor: `${event.color}`,
                  top: `${(parseInt(event.startTime.split(':')[0]) * timeLineHeightPerHour) + 52 + (parseInt(event.startTime.split(':')[1]) / 60 * timeLineHeightPerHour)}px`,
                  bottom: `${(24 - parseInt(event.endTime.split(':')[0])) * timeLineHeightPerHour - 9 - (parseInt(event.endTime.split(':')[1]) / 60 * timeLineHeightPerHour)}px`
                }}
                onClick={() => handleEditEvent(event)}
              >
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

          <ActualTimeCursor
            style={{
              top: `${actualTimeCursorPosition}px`,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1812" height="18" viewBox="0 0 1812 18" fill="none">
              <path d="M15 7.5L0 0.339746V17.6603L15 10.5V7.5ZM5082 10.5C5082.83 10.5 5083.5 9.82843 5083.5 9C5083.5 8.17157 5082.83 7.5 5082 7.5V10.5ZM13.5 10.5H5082V7.5H13.5V10.5Z" fill="#EF3636" />
            </svg>
          </ActualTimeCursor>
        </EventsWrapper>

      </CalendarDaysWrapper>
    </React.Fragment >
  );
};

export default CalendarDay;