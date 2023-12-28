import * as React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'react-feather';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  height: 7.5rem;
  padding: 0.625rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  background: #2C2E31;
`
const LeftHeader = styled.div`
  display: flex;
  padding: 1.25rem 1.875rem;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
`
const BackButton = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #3E526F;
`
const BackButtonText = styled.div`
  color: #D3D3D3;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ReturnToTodayButton = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  border-radius: 0.625rem;
  background: #D3D3D3;
`
const ReturnToTodayButtonText = styled.div`
  color: #3E526F;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const MidHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  align-self: stretch;
`
const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HeaderTitleText = styled.div`
  color: #D3D3D3;
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
  color: #D3D3D3;
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
  color: #D3D3D3;
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
const UserDropdown = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0rem 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 6.25rem;
  background: #3680EF;
`
const UserDropdownText = styled.div`
  color: #FFF;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const Header = () => {
  return (
    <React.Fragment>
      <HeaderWrapper>
        <LeftHeader>

          {/* COMPOSANT */}
          <BackButton>
            <ChevronLeft size={18} color='#D3D3D3' />
            <BackButtonText>
              2023
            </BackButtonText>
          </BackButton>


          {/* COMPOSANT */}
          <ReturnToTodayButton>
            <ReturnToTodayButtonText>
              Aujourd'hui
            </ReturnToTodayButtonText>
            <ChevronRight size={18} color='#3E526F' />
          </ReturnToTodayButton>

        </LeftHeader>

        <MidHeader>
          <HeaderTitle>
            <HeaderTitleText>
              Calendar Planer
            </HeaderTitleText>
          </HeaderTitle>

          <ActualTime>
            <ActualDate>
              <Calendar size={18} color='#F27A7A' />
              <ActualDateText>
                27/12/2023
              </ActualDateText>
            </ActualDate>

            <ActualHour>
              <Clock size={18} color='#F4DF74' />
              <ActualHourText>
                21:19
              </ActualHourText>
            </ActualHour>

          </ActualTime>

        </MidHeader>

        <RightHeader>

          {/* COMPOSANT */}
          <UserDropdown>
            <UserDropdownText>
              R
            </UserDropdownText>
          </UserDropdown>
        </RightHeader>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;