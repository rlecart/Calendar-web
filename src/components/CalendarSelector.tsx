import * as React from 'react';
import styled from 'styled-components';

import { ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import { ChevronRight } from 'react-feather';

const YearBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const YearSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
`
const MonthSelect = styled.select`
  display: flex;
  padding: 1rem 1.5rem;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  border-radius: 0.625rem;
  border: 0;
  background: #F0E8DA;
  color: rgba(6, 2, 9, 1);
  width: 10rem;
  justify-content: center;
`
const YearInput = styled.input`
  display: flex;
  padding: 1rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex: 1 0 0;
  width: 6rem;

  border-radius: 0.625rem;
  border: 0;
  background: #F0E8DA;

  color: rgba(6, 2, 9, 1);

  &::placeholder {
    color: rgba(6, 2, 9, 0.50);
  }
`

const SubmitYearButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #B66B38;

  align-self: stretch;

  border-radius: 0.625rem;
  border: 0;
  color: #FFF;

  &:hover {
    background: #F18D5E;
  }

`

const CalendarSelector = () => {
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);

  const [year, setYear] = React.useState<string>('');
  const [month, setMonth] = React.useState<number>(0);

  const monthList = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Julliet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ]

  const handleSubmitDate = () => {
    setCalendarDate({
      dayOfMonth: -1,
      month: month + 1,
      year: +year,
    })
    setCalendarType('month');
  }

  return (
    <React.Fragment>
      <YearBackground>
        <YearSelector>
          <MonthSelect
            value={month}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMonth(+e.target.value)}
          >
            {monthList.map((month, index) => <option key={index} value={index}>{month}</option>)}
          </MonthSelect>
          <YearInput
            placeholder="2023"
            value={year}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
          />
          <SubmitYearButton onClick={handleSubmitDate}>
            <ChevronRight />
          </SubmitYearButton>
        </YearSelector>
      </YearBackground>
    </React.Fragment>
  );
};

export default CalendarSelector;