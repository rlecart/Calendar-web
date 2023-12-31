import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import { Dropdown } from 'react-bootstrap';

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

  const resetCalendarStore = useCalendarStore((state: ICalendarStore) => state.resetCalendarStore);

  const handleSelect = async (e: string) => {
    if (e === '1') {
      // console.log('Profil');
    }
    else if (e === '2') {
      const logoutRes = await axios.delete(`${API}/user/logout`)
      console.log('Déconnexion');
      localStorage.removeItem('authentificated');
      localStorage.removeItem('username');
      resetCalendarStore();
      navigate('/login');
    }
  }

  return (
    <React.Fragment>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle style={{ background: 'transparent', border: 'none' }}>
          <UserDropdownWrapper>
            <UserDropdownText>
              {localStorage.getItem('username')?.charAt(0).toUpperCase()}
            </UserDropdownText>
          </UserDropdownWrapper>
        </Dropdown.Toggle>

        <Dropdown.Menu
          data-bs-theme={'dark'}
          style={{ background: '#120E13', }}
        >
          <Dropdown.Item eventKey="1">
            Profil
          </Dropdown.Item>
          <Dropdown.Divider />
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