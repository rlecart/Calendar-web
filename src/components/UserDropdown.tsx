import * as React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleSelect = (e: string) => {
    if (e === '1') {
      console.log('Profil');
    }
    else if (e === '2') {
      console.log('Déconnexion');
      localStorage.removeItem('jwt');
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
        >
          <Dropdown.Item
            eventKey="1"
          >
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