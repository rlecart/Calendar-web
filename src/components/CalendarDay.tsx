import * as React from 'react';
import styled from 'styled-components';

import { ICalendarDayData, ICalendarEventData, ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import RenderIf from './RenderIf';

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

  background: #120e13;
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

  color: rgb(240, 232, 218, 0.5);

  border-radius: 1rem 1rem 0 0;
  &:hover {
    background: rgba(182, 107, 56, 0.2);
    color: rgb(240, 232, 218, 1);
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

  color: rgb(240, 232, 218, 1);
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
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  align-items: center;
  // background: blue;
`
const ActualTimeCursorLine = styled.div`
  position: absolute;
  left: 0rem;
  right: 2.5rem;
  height: 3px;
  background: #EF3636;
  border-radius: 2rem;
`

const CalendarDay = () => {
  const calendarMonthData = useCalendarStore((state: ICalendarStore) => state.calendarMonthData);
  const calendarDayData = useCalendarStore((state: ICalendarStore) => state.calendarDayData);
  const setCalendarDayData = useCalendarStore((state: ICalendarStore) => state.setCalendarDayData);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);

  const eventsTimeScaleRef = React.useRef<HTMLDivElement>(null);
  const [timeLineHeightPerHour, setTimeLineHeightPerHour] = React.useState<number>(0);
  const [actualTimeCursorPosition, setActualTimeCursorPosition] = React.useState<number>(-1000);

  const [showModalEvent, setShowModalEvent] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<ICalendarEventData | null>(null);

  const slicedCalendarData = calendarMonthData?.data && [
    calendarMonthData.data.slice(0, 7),
    calendarMonthData.data.slice(7, 14),
    calendarMonthData.data.slice(14, 21),
    calendarMonthData.data.slice(21, 28),
    calendarMonthData.data.slice(28, 31),
  ]
  const actualWeek = slicedCalendarData?.find((week) => week.some((day: ICalendarDayData) => day.dayOfMonth === calendarDayData.dayOfMonth));

  const handleSelectAnotherDay = (selectedDay: ICalendarDayData) => {
    setCalendarDate({
      dayOfMonth: selectedDay.dayOfMonth,
      month: selectedDay.month,
      year: selectedDay.year,
    })
    setCalendarDayData(selectedDay);
  }

  const handleCloseModalEvent = () => setShowModalEvent(false);
  const handleShowModalEvent = () => setShowModalEvent(true);

  const handleEditEvent = (event: ICalendarEventData) => {
    setSelectedEvent(event);
    handleShowModalEvent();
  }

  React.useEffect(() => {
    const timeLineHeight = eventsTimeScaleRef.current?.clientHeight
    setTimeLineHeightPerHour(timeLineHeight ? (timeLineHeight - 40) / 24 : 0);
    console.log(timeLineHeightPerHour)
  }, [eventsTimeScaleRef?.current?.clientHeight])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActualTimeCursorPosition((new Date().getHours() * timeLineHeightPerHour) + 52 + (new Date().getMinutes() / 60 * timeLineHeightPerHour) - 9);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLineHeightPerHour]);

  return (
    <React.Fragment>
      <ModalEvent
        show={showModalEvent}
        type='edit'
        eventData={selectedEvent}
        handleClose={handleCloseModalEvent}
      />

      <ActualDate />

      <WeekDays />

      <DaysLineWrapper>
        <DaysLine>
          {actualWeek?.map((day: ICalendarDayData, index: number) => (
            <React.Fragment key={index}>
              <RenderIf isTrue={calendarDayData.dayOfMonth === day.dayOfMonth}>
                <DayNumberSelected>
                  <DayNumberText>
                    {day.dayOfMonth}
                  </DayNumberText>
                </DayNumberSelected>
              </RenderIf>

              <RenderIf isTrue={calendarDayData.dayOfMonth !== day.dayOfMonth}>
                <DayNumber
                  style={day.dayOfMonth === new Date().getDate() && day.month === new Date().getMonth() + 1 && day.year === new Date().getFullYear() ? {
                    borderLeft: `1px solid #B66B38`,
                    borderTop: `1px solid #B66B38`,
                    borderRight: `1px solid #B66B38`,
                  } : {}}
                  onClick={() => handleSelectAnotherDay(day)}
                >
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
            {calendarDayData?.data?.map((event: ICalendarEventData, index: number) => {
              const realStartTime = new Date(event.startTime);
              const realEndTime = new Date(event.endTime);

              return (
                <EventCard
                  key={index}
                  style={{
                    backgroundColor: `${event.color}`,
                    top: `${(realStartTime.getHours() * timeLineHeightPerHour) + 52 + (realStartTime.getMinutes() / 60 * timeLineHeightPerHour)}px`,
                    bottom: `${(24 - realEndTime.getHours()) * timeLineHeightPerHour - 9 - (realEndTime.getMinutes()) / 60 * timeLineHeightPerHour}px`
                  }}
                  onClick={() => handleEditEvent(event)}
                >
                  <EventElems>
                    <EventTitle>
                      {event.title}
                    </EventTitle>
                    <EventTime>
                      {realStartTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - {realEndTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </EventTime>
                  </EventElems>
                </EventCard>
              )
            })}
          </EventsListWrapperAbsolute>

          <RenderIf isTrue={new Date().getDate() === calendarDayData.dayOfMonth && new Date().getMonth() + 1 === calendarDayData.month && new Date().getFullYear() === calendarDayData.year}>
            <ActualTimeCursor style={{ top: `${actualTimeCursorPosition}px`, }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
                <path d="M12.5 6.75L0 0.783122V15.2169L12.5 9.25V6.75ZM1 9.25C1.69036 9.25 2.25 8.69036 2.25 8C2.25 7.30964 1.69036 6.75 1 6.75V9.25Z" fill="#EF3636" />
              </svg>
              <ActualTimeCursorLine />
            </ActualTimeCursor>
          </RenderIf>

        </EventsWrapper>

      </CalendarDaysWrapper>
    </React.Fragment >
  );
};

export default CalendarDay;