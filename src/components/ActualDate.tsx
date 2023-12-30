import * as React from 'react';
import { CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';
import styled from 'styled-components';
import RenderIf from './RenderIf';
import { ChevronLeft, ChevronRight } from 'react-feather';

const ActualDateLine = styled.div`
  display: flex;
  // padding: 1.25rem 0rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  background: #100C12;
`
const ActualDateText = styled.div`
  color: #F18D5E;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  min-width: 10rem;
  text-align: center;
`

const YearLineSelector = styled.div`
  display: flex;
  height: 3.8125rem;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-shrink: 0;
  align-self: stretch;

  background: #100C12;
`
const SelectorButton = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.9375rem;

  border: 0;
  border-radius: 0.625rem;
  background: #F0E8DA;
`


const ActualDate = () => {
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);
  const calendarDate = useCalendarStore((state: CalendarStoreInterface) => state.calendarDate);
  const setCalendarDate = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDate);

  const monthList = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];

  const handleChangeDate = (add: number) => {
    console.log('avant', calendarDate)

    if (calendarType === 'day') {
      const oneMonthBefore = new Date(calendarDate.year, calendarDate.month - 1, 0);
      oneMonthBefore.setDate(oneMonthBefore.getDate() - 1);
      const maxDayOneMonthBefore = oneMonthBefore.getDate() + 1;

      const actualMonth = new Date(calendarDate.year, calendarDate.month, 0);
      actualMonth.setDate(actualMonth.getDate() - 1);
      const maxDayActualMonth = actualMonth.getDate() + 1;

      const newDay = calendarDate.dayOfMonth + add > maxDayActualMonth ? 1 : calendarDate.dayOfMonth + add < 1 ? maxDayOneMonthBefore : calendarDate.dayOfMonth + add;
      const newMonth = calendarDate.dayOfMonth + add > maxDayActualMonth ? calendarDate.month + 1 > 12 ? 1 : calendarDate.month + 1 : calendarDate.dayOfMonth + add < 1 ? calendarDate.month - 1 < 1 ? 12 : calendarDate.month - 1 : calendarDate.month;
      const newYear = calendarDate.dayOfMonth + add > maxDayActualMonth ? calendarDate.month + 1 > 12 ? calendarDate.year + 1 : calendarDate.year : calendarDate.dayOfMonth + add < 1 ? calendarDate.month - 1 < 1 ? calendarDate.year - 1 : calendarDate.year : calendarDate.year;

      setCalendarDate({
        dayOfMonth: newDay,
        month: newMonth,
        year: newYear,
      })
    }
    else if (calendarType === 'month') {
      const newMonth = calendarDate.month + add > 12 ? 1 : calendarDate.month + add < 1 ? 12 : calendarDate.month + add;
      const newYear = calendarDate.month + add > 12 ? calendarDate.year + 1 : calendarDate.month + add < 1 ? calendarDate.year - 1 : calendarDate.year;

      setCalendarDate({
        dayOfMonth: -1,
        month: newMonth,
        year: newYear,
      })
    }
    else if (calendarType === 'year') {
      const newYear = calendarDate.year + add;

      setCalendarDate({
        dayOfMonth: -1,
        month: -1,
        year: newYear,
      })
    }
    console.log('apres', calendarDate)
  }

  return (
    <React.Fragment>
      <ActualDateLine>
        <YearLineSelector>
          <SelectorButton onClick={() => handleChangeDate(-1)}>
            <ChevronLeft size={18} color='rgba(182, 107, 56, 1)' />
          </SelectorButton>

          <ActualDateText>

            <RenderIf isTrue={calendarType === 'year'}>
              <React.Fragment>
                {`${calendarDate.year}`}
              </React.Fragment>
            </RenderIf>

            <RenderIf isTrue={calendarType === 'month'}>
              <React.Fragment>
                {`${monthList[calendarDate.month - 1]} ${calendarDate.year}`}
              </React.Fragment>
            </RenderIf>

            <RenderIf isTrue={calendarType === 'day'}>
              <React.Fragment>
                {`${calendarDate.dayOfMonth} ${monthList[calendarDate.month - 1]?.toLocaleLowerCase()} ${calendarDate.year}`}
              </React.Fragment>
            </RenderIf>

          </ActualDateText>

          <SelectorButton onClick={() => handleChangeDate(1)}>
            <ChevronRight size={18} color='rgba(182, 107, 56, 1)' />
          </SelectorButton>

        </YearLineSelector>
      </ActualDateLine>
    </React.Fragment>
  );
};

export default ActualDate;