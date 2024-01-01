import * as React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';
import axios from 'axios';
import { API } from '../api';

const UserDropdownWrapper = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0rem 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 6.25rem;
  background: #B66B38;
`
const UserDropdownText = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const UserDropdown = () => {
  const navigate = useNavigate();

  const resetCalendarStore = useCalendarStore((state: CalendarStoreInterface) => state.resetCalendarStore);

  const handleSelect = async (e: string) => {
    if (e === '1') {
      console.log('Profil');
    }
    else if (e === '2') {
      const logoutRes = axios.delete(`${API}/user/logout`)
      console.log('Déconnexion');
      localStorage.removeItem('authenticated');
      resetCalendarStore();
      navigate('/login');
    }
  }

  return (
    <React.Fragment>
      <Dropdown
        onSelect={handleSelect}
      >
        <Dropdown.Toggle
          style={{ background: 'transparent', border: 'none' }}
        >
          <UserDropdownWrapper>
            <UserDropdownText>
              R
            </UserDropdownText>
          </UserDropdownWrapper>
        </Dropdown.Toggle>

        <Dropdown.Menu
          data-bs-theme={'dark'}
          style={{
            background: '#120E13',
          }}
        >
          <Dropdown.Item
            eventKey="1"
          >
            Profil
          </Dropdown.Item>
          <Dropdown.Divider
          />
          <Dropdown.Item
            eventKey="2"
            bsPrefix={'dropdown-item text-danger'}
          >
            Déconnexion
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default UserDropdown;