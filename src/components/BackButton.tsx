import * as React from 'react';

import styled from 'styled-components';

import { ChevronLeft } from 'react-feather';

import { CalendarDayDataInterface, CalendarMonthDataInterface, CalendarStoreInterface, CalendarYearDataInterface, useCalendarStore } from '../stores/calendarStore';
import RenderIf from './RenderIf';

const BackButtonWrapper = styled.button`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #3E526F;
  border: 0;
`
const BackButtonText = styled.div`
  color: #D3D3D3;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const BackButton = () => {
  const setCalendarType = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarType);
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);

  const calendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.calendarDayData);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);
  const calendarMonthData = useCalendarStore((state: CalendarStoreInterface) => state.calendarMonthData);

  const monthsList = [
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
    'Décembre',
  ];

  const handleBackButton = () => {
    if (calendarType === 'day')
      setCalendarType('month');
    else if (calendarType === 'month')
      setCalendarType('year');
  }

  return (
    <RenderIf isTrue={calendarType !== 'year'}>
      <BackButtonWrapper onClick={handleBackButton}>
        <ChevronLeft size={18} color='#D3D3D3' />
        <BackButtonText>
          <RenderIf isTrue={calendarType === 'month'}>
            <span>
              {calendarMonthData?.year}
            </span>
          </RenderIf>

          <RenderIf isTrue={calendarType === 'day'}>
            <span>
              {calendarDayData?.month !== undefined && calendarDayData?.month !== null && monthsList[calendarDayData?.month - 1]}
            </span>
          </RenderIf>
        </BackButtonText>
      </BackButtonWrapper>
    </RenderIf>
  );
};

export default BackButton;