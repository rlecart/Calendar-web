import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Calendar, Clock } from 'react-feather';

import RenderIf from './RenderIf';

import BackButton from './BackButton';
import ReturnToTodayButton from './ReturnToTodayButton';
import UserDropdown from './UserDropdown';

import LogoInline from '../resources/logo-inline.png';
import LogoCloud from '../resources/logo-cloud.png';

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
  padding: 0 1.875rem;
  align-items: center;
  gap: 0.5rem 1rem;
  flex: 1 0 0;
  flex-wrap: wrap;
`
const MidHeader = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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
const ActualTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 612px) {
    flex-direction: column;
  }
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

  const [logo, setLogo] = React.useState<string>(window.innerWidth > 730 ? 'inline' : 'cloud');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
      setDate(new Date().toLocaleDateString('fr-FR'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const resizeLogo = () => setLogo(window.innerWidth > 730 ? 'inline' : 'cloud')
    window.addEventListener('resize', resizeLogo);
    return () => window.removeEventListener('resize', resizeLogo);
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
            <RenderIf isTrue={logo === 'inline'}>
              <img src={LogoInline} alt='Logo' />
            </RenderIf>

            <RenderIf isTrue={logo === 'cloud'}>
              <img src={LogoCloud} alt='Logo' />
            </RenderIf>

            {/* <HeaderTitleText>
              Calendar Planer
            </HeaderTitleText> */}
          </HeaderTitle>

          <ActualTime>
            <ActualDate>
              <Calendar size={18} color='#F27A7A' />
              <ActualDateText>
                {date}
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