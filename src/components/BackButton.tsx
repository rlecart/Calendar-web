import * as React from 'react';
import styled from 'styled-components';

import { ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import { ChevronLeft } from 'react-feather';

import RenderIf from './RenderIf';

const BackButtonWrapper = styled.button`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #B66B38;
  border: 0;
`
const BackButtonText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const BackButton = () => {
  const calendarType = useCalendarStore((state: ICalendarStore) => state.calendarType);
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);
  const calendarDayData = useCalendarStore((state: ICalendarStore) => state.calendarDayData);
  const calendarMonthData = useCalendarStore((state: ICalendarStore) => state.calendarMonthData);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);
  const resetCalendarStore = useCalendarStore((state: ICalendarStore) => state.resetCalendarStore);

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
    resetCalendarStore();

    if (calendarType === 'day') {
      setCalendarDate({
        dayOfMonth: -1,
        month: calendarDayData?.month,
        year: calendarDayData?.year,
      })
      setCalendarType('month');
    }
    else if (calendarType === 'month') {
      setCalendarDate({
        dayOfMonth: -1,
        month: -1,
        year: calendarMonthData?.year,
      })
      setCalendarType('year');
    }
    else if (calendarType === 'year') {
      setCalendarDate({
        dayOfMonth: -1,
        month: -1,
        year: -1,
      })
      setCalendarType('selector');
    }
  }

  return (
    <RenderIf isTrue={calendarType !== 'selector'}>
      <BackButtonWrapper onClick={handleBackButton}>
        <ChevronLeft size={18} color='#D3D3D3' />
        <BackButtonText>

          <RenderIf isTrue={calendarType === 'year'}>
            <span>
              {`Personnaliser`}
            </span>
          </RenderIf>

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