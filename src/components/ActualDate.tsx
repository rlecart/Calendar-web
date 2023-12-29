import * as React from 'react';
import { CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';
import styled from 'styled-components';
import RenderIf from './RenderIf';

const ActualDateLine = styled.div`
  display: flex;
  padding: 1.25rem 0rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  background: #2C2E31;
`
const ActualDateText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const ActualDate = () => {
  const calendarType = useCalendarStore((state: CalendarStoreInterface) => state.calendarType);
  const calendarDate = useCalendarStore((state: CalendarStoreInterface) => state.calendarDate);

  const monthList = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septemebre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];

  return (
    <React.Fragment>
      <ActualDateLine>
        <ActualDateText>

          <RenderIf isTrue={calendarType === 'month'}>
            <React.Fragment>
              {`${monthList[calendarDate.month - 1]} ${calendarDate.year}`}
            </React.Fragment>
          </RenderIf>

          <RenderIf isTrue={calendarType === 'day'}>
            <React.Fragment>
              {`${calendarDate.dayOfMonth} ${monthList[calendarDate.month - 1].toLocaleLowerCase()} ${calendarDate.year}`}
            </React.Fragment>
          </RenderIf>

        </ActualDateText>
      </ActualDateLine>
    </React.Fragment>
  );
};

export default ActualDate;