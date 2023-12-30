import * as React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'react-feather';
import styled from 'styled-components';
import BackButton from './BackButton';
import ReturnToTodayButton from './ReturnToTodayButton';
import UserDropdown from './UserDropdown';
import { useNavigate } from 'react-router-dom';

const HeaderWrapper = styled.div`
  display: flex;
  height: 7.5rem;
  padding: 0.625rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-bottom: 1px solid #F18D5E;
  background: #0E0A10;
`
const LeftHeader = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
`
const MidHeader = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  align-self: stretch;

  border: 0;
  background: transparent;
`
const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HeaderTitleText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 2.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.27625rem;
  text-align: center;
`
const ActualTime = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const ActualDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.46875rem;
`
const ActualDateText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const ActualHour = styled.div`
  display: flex;
  align-items: center;
  gap: 0.46875rem;
`
const ActualHourText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
const RightHeader = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.9375rem;
  flex: 1 0 0;
  align-self: stretch;
`


const Header = () => {
  const navigate = useNavigate();
  
  const [date, setDate] = React.useState<string>(new Date().toLocaleDateString('fr-FR'));
  const [time, setTime] = React.useState<string>(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      setDate(new Date().toLocaleDateString('fr-FR'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <HeaderWrapper>
        <LeftHeader>

          <BackButton />

          <ReturnToTodayButton />

        </LeftHeader>

        <MidHeader onClick={() => navigate('/')}>
          <HeaderTitle>
            <HeaderTitleText>
              Calendar Planer
            </HeaderTitleText>
          </HeaderTitle>

          <ActualTime>
            <ActualDate>
              <Calendar size={18} color='#F27A7A' />
              <ActualDateText>
                {new Date().toLocaleDateString('fr-FR')}
              </ActualDateText>
            </ActualDate>

            <ActualHour>
              <Clock size={18} color='#F4DF74' />
              <ActualHourText>
                {time}
              </ActualHourText>
            </ActualHour>

          </ActualTime>

        </MidHeader>

        <RightHeader>

          <UserDropdown />

        </RightHeader>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;