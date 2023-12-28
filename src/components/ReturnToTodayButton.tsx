import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeft, ChevronRight } from 'react-feather';

import { CalendarDayDataInterface, CalendarMonthDataInterface, CalendarStoreInterface, CalendarYearDataInterface, useCalendarStore } from '../stores/calendarStore';
import RenderIf from './RenderIf';

const ReturnToTodayButton = styled.button`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #D3D3D3;
  border: 0;
`
const ReturnToTodayButtonText = styled.div`
  color: #3E526F;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`


const BackToTodayButton = () => {
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);
  const setCalendarType = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarType);

  const calendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.calendarDayData);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);

  const handleBackToTodayButton = () => {
    const today = new Date();

    // API request to get today

    const fakeRes = {
      status: 200,
      data: {
        dayOfMonth: 28,
        month: 12,
        year: 2023,
        data: [],
      }
    }

    if (fakeRes.status !== 200) {
      // TODO: handle fetch error
      return;
    }

    setCalendarDayData(fakeRes.data);
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
        <ReturnToTodayButton onClick={handleBackToTodayButton}>
          <ReturnToTodayButtonText>
            Aujourd'hui
          </ReturnToTodayButtonText>
          <ChevronRight size={18} color='#3E526F' />
        </ReturnToTodayButton>);
      </React.Fragment>
    </RenderIf>
  )
};

export default BackToTodayButton;