import * as React from 'react';
import styled from 'styled-components';

const WeekDaysContainer = styled.div`
  display: flex;
  height: 3.25rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;

  background: #19151A;
`
const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
`
const DayText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const WeekDays = () => {
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <React.Fragment>
      <WeekDaysContainer>
        {weekDays.map((day, index) => (
          <DayContainer key={index}>
            <DayText>
              {day}
            </DayText>
          </DayContainer>
        ))}
      </WeekDaysContainer>
    </React.Fragment>
  );
};

export default WeekDays;