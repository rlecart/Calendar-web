import * as React from 'react';
import styled from 'styled-components';

import { ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import { ChevronRight } from 'react-feather';

import RenderIf from './RenderIf';

const ReturnToTodayButtonElem = styled.button`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #F0E8DA;
  border: 0;
`
const ReturnToTodayButtonText = styled.div`
  color: #B66B38;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const ReturnToTodayButton = () => {
  const calendarType = useCalendarStore((state: ICalendarStore) => state.calendarType);
  const calendarDayData = useCalendarStore((state: ICalendarStore) => state.calendarDayData);
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);

  const handleReturnToTodayButton = () => {
    const today = new Date();

    setCalendarDate({
      dayOfMonth: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    })
    setCalendarType('day');
  }

  return (
    <RenderIf isTrue={!(
      calendarType === 'day' &&
      calendarDayData.dayOfMonth === new Date().getDate() &&
      calendarDayData.month === new Date().getMonth() + 1 &&
      calendarDayData.year === new Date().getFullYear()
    )}>
      <React.Fragment>
        <ReturnToTodayButtonElem onClick={handleReturnToTodayButton}>
          <ReturnToTodayButtonText>
            Aujourd'hui
          </ReturnToTodayButtonText>
          <ChevronRight size={18} color='#B66B38' />
        </ReturnToTodayButtonElem>
      </React.Fragment>
    </RenderIf>
  )
};

export default ReturnToTodayButton;