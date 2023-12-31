import * as React from 'react';
import styled from 'styled-components';

import { useCalendarStore, ICalendarStore } from '../stores/calendarStore';

import ActualDate from './ActualDate';

const CalendarMonthsWrapper = styled.div`
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
const ActualYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`
const ActualYearText = styled.div`
  color: #F18D5E;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
`
const MonthLine = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
`
const SingleMonth = styled.button`
  display: flex;
  padding: 1.25rem 1.875rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex: 1 0 0;
  align-self: stretch;

  border: 0;
  border-right: 1px solid rgba(240, 232, 218, 0.10);
  border-bottom: 1px solid rgba(240, 232, 218, 0.10);
  background: #19151A;

  &:hover {
    background: rgba(182, 107, 56, 0.2);
  }
`
const SingleMonthText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

const CalendarYear = () => {
  const calendarDate = useCalendarStore((state: ICalendarStore) => state.calendarDate);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);

  const monthList = [
    ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    ['Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  ]

  const handleClickBloc = (month: number) => {
    setCalendarDate({
      dayOfMonth: -1,
      month: month,
      year: calendarDate.year,
    })
    setCalendarType('month')
  }

  return (
    <React.Fragment>
      <CalendarMonthsWrapper>

        <ActualDate />

        <MonthList>
          {monthList.map((monthLine, lineIndex) => (
            <MonthLine key={lineIndex}>
              {monthLine.map((month, monthIndex) => (
                <SingleMonth key={monthIndex} onClick={() => handleClickBloc(monthIndex + 1 + (6 * lineIndex))}>
                  <SingleMonthText>
                    {month}
                  </SingleMonthText>
                </SingleMonth>
              ))}
            </MonthLine>
          ))}
        </MonthList>
      </CalendarMonthsWrapper>
    </React.Fragment>
  );
};

export default CalendarYear;