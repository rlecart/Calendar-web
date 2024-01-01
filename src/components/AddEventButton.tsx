import * as React from 'react';
import styled from 'styled-components';

import { Plus } from 'react-feather';

import ModalEvent from './ModalEvent';

const AddEventButtonWrapper = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;

  border-radius: 6.25rem;
  background: #F18D5E;
  box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.20);

  border: 0;
`

const AddEventButton = () => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <ModalEvent
        show={show}
        type='new'
        eventData={null}
        handleClose={handleClose}
      />

      <AddEventButtonWrapper onClick={handleShow}>
        <Plus size={30} color='rgba(240, 232, 218, 1)' />
      </AddEventButtonWrapper>
    </React.Fragment>
  );
};

export default AddEventButton;