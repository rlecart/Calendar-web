import * as React from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
// import { ToggleSlider } from 'react-toggle-slider';
import { X } from 'react-feather';

import { CalendarDayDataInterface, CalendarEventDataInterface, CalendarStoreInterface, useCalendarStore } from '../stores/calendarStore';

import RenderIf from './RenderIf';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`
const ModalTitle = styled.div`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const FormEvent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
  align-self: stretch;
`
const FormInputText = styled.input`
  display: flex;
  padding: 0.9375rem 1.25rem;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.625rem;
  background: #120E13;
  border: 0;
`
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  align-self: stretch;

  border-radius: 0.625rem;
  background: #120E13;
  padding-left: 1.25rem;
`
const FormInputSlider = styled.div`
  display: flex;
  padding: 0.3125rem 1.25rem;
  padding-left: 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 0.625rem;
`
const FormLabel = styled.div`
  display: flex;
  width: 5.125rem;
  padding: 0.625rem 0rem;
  align-items: center;
`
const FormLabelText = styled.label`
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const FormSeparator = styled.div`
  width: 100%;
  height: 0.0625rem;

  background: rgba(240, 232, 218, 0.10);
`
const FormInputDatePicker = styled.div`
  display: flex;
  padding: 0.3125rem 1.25rem;
  padding-left: 0;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 0.625rem;
`
const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  // align-self: stretch;
`
const DateInput = styled(Form.Control)`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  // align-self: stretch;

  border-radius: 0.3125rem;
  background: #;
  border: 0;
  width: 7.15rem;
  height: 2.25rem;
  // align-self: auto;

  color: rgba(182, 107, 56, 1);
  &::placeholder {
    color: rgba(240, 232, 218, 0.3);
  }
`
const HourInput = styled(Form.Control)`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.3125rem;
  background: #;
  border: 0;
  width: 4.8rem;
  height: 2.25rem;
  // align-self: auto;

  color: rgba(182, 107, 56, 1);
  &::placeholder {
    color: rgba(240, 232, 218, 0.3);
  }
`
const FormInputTextArea = styled.textarea`
  display: flex;
  padding: 0.9375rem 1.25rem;
  align-items: flex-start;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.625rem;
  background: #120E13;
  border: 0;
`
const FormSubmitButton = styled.button`
  display: flex;
  height: 2.8125rem;
  padding: 0.9375rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.625rem;
  background: #B66B38;
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 0;
`

interface ModalNewEventInterface {
  show: boolean;
  type: string;
  eventData: CalendarEventDataInterface | null;
  handleClose: () => void;
}

const ModalEvent = ({ show, type, eventData, handleClose }: ModalNewEventInterface) => {
  const [title, setTitle] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<string>('');
  const [endTime, setEndTime] = React.useState<string>('');
  const [notes, setNotes] = React.useState<string>('');

  const [error, setError] = React.useState<string>('');

  const setCalendarType = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarType);
  const setCalendarDate = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDate);
  const setCalendarDayData = useCalendarStore((state: CalendarStoreInterface) => state.setCalendarDayData);

  const handleCloseModal = () => {
    resetAllFields();
    handleClose();
  }

  const handleSubmitEvent = () => {
    setError('');

    // if (type === 'new')
    //   requete API new event;
    // else if (type === 'edit')
    //   requete API edit event

    const fakeDayData = {
      dayOfMonth: 1,
      month: 3,
      year: 2023,
      data: [
        {
          id: 1,
          title: 'Sortir le chien',
          description: 'Description',
          startTime: '00:00',
          endTime: '03:00',
          notes: 'Notes',
          color: 'rgba(160, 74, 61, 0.5)',
          dayOfMonth: 1,
          month: 3,
          year: 2023,
        },
        {
          id: 2,
          title: 'Sport',
          description: 'Description',
          startTime: '03:30',
          endTime: '05:30',
          notes: 'Notes',
          color: 'rgba(52, 93, 92, 0.5)',
          dayOfMonth: 1,
          month: 3,
          year: 2023,
        },
        {
          id: 3,
          title: 'Étudier',
          description: 'Description',
          startTime: '05:30',
          endTime: '07:30',
          notes: 'Notes',
          color: 'rgba(94, 94, 55, 0.5)',
          dayOfMonth: 1,
          month: 3,
          year: 2023,
        },
      ]
    }

    interface FakeResDayInterface {
      status: number,
      data: CalendarDayDataInterface,
    }
    const fakeResDay: FakeResDayInterface = {
      status: 200,
      data: fakeDayData,
    }

    if (fakeResDay.status !== 200) {
      setError(`Une erreur est survenue : ${fakeResDay.data}`);
      return;
    }
    setCalendarDayData(fakeResDay.data);

    const dateSplitted = date.split('/');
    setCalendarDate({
      dayOfMonth: +(dateSplitted[0]),
      month: +(dateSplitted[1]),
      year: +(dateSplitted[2]),
    })
    setCalendarType('day');

    handleCloseModal();
  }

  const resetAllFields = () => {
    setError('');

    setTitle('');
    setColor('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setNotes('');
  }

  React.useEffect(() => {
    if (show === true && type === 'edit' && eventData) {
      setTitle(eventData.title);
      setColor(eventData.color);
      setDate(`${eventData.dayOfMonth.toString().padStart(2, '0')}/${eventData.month.toString().padStart(2, '0')}/${eventData.year}`);
      setStartTime(eventData.startTime);
      setEndTime(eventData.endTime);
      setNotes(eventData.notes);
    }
  }, [show, type, eventData])

  return (
    <React.Fragment>

      <Modal
        size='lg'
        style={{
          backgroundColor: 'transparent',
        }}
        contentClassName='bg-transparent border-0'
        show={show}
        onHide={handleCloseModal}
        centered
        data-bs-theme='dark'
      >
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0D090F',
            borderRadius: '1rem',
            color: '#F0E8DA',
            padding: '2.5rem',
            gap: '2.5rem',
          }}
        >
          <ModalHeader>
            <ModalTitle>

              <RenderIf isTrue={type === 'new'}>
                Nouvel événement
              </RenderIf>

              <RenderIf isTrue={type === 'edit'}>
                Modifier un événement
              </RenderIf>

            </ModalTitle>
            <X size={24} color='#F0E8DA' onClick={handleCloseModal} />
          </ModalHeader>

          <FormEvent>
            <FormInputText
              placeholder='Titre'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />

            <FormInputText
              placeholder='Couleur'
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
            />

            <FormGroup>
              {/* <FormInputSlider >
                <FormLabel>
                  <FormLabelText>
                    Jour entier
                  </FormLabelText>
                </FormLabel>

                <ToggleSlider
                  // active={false}
                  draggable
                  // onToggle={() => setIsAllDay(!isAllDay)}
                  handleBackgroundColor='#F0E8DA'
                  barBackgroundColor='#19151A'
                  barBackgroundColorActive='#B66B38'
                />
              </FormInputSlider> */}

              {/* <FormSeparator /> */}

              <FormInputDatePicker>
                <FormLabel>
                  <FormLabelText>
                    Début
                  </FormLabelText>
                </FormLabel>

                <DatePickerWrapper>
                  <DateInput
                    placeholder='JJ/MM/AAAA'
                    value={date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                  />
                  <HourInput
                    placeholder='HH:MM'
                    value={startTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                  />
                </DatePickerWrapper>
              </FormInputDatePicker>

              <FormSeparator />

              <FormInputDatePicker>
                <FormLabel>
                  <FormLabelText>
                    Fin
                  </FormLabelText>
                </FormLabel>

                <DatePickerWrapper>
                  {/* <DateInput placeholder='JJ/MM/AAAA' /> */}
                  <HourInput
                    placeholder='HH:MM'
                    value={endTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                  />
                </DatePickerWrapper>
              </FormInputDatePicker>

            </FormGroup>

            <FormInputTextArea
              placeholder='Notes'
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
            />

            <RenderIf isTrue={error !== ''}>
              <Alert
                className='w-100'
                variant='danger'
                data-bs-theme="dark"
              >
                {error}
              </Alert>
            </RenderIf>

            <FormSubmitButton
              onClick={handleSubmitEvent}
            >

              <RenderIf isTrue={type === 'new'}>
                Ajouter
              </RenderIf>

              <RenderIf isTrue={type === 'edit'}>
                Modifier
              </RenderIf>

            </FormSubmitButton>

          </FormEvent>

        </Modal.Body>
      </Modal>

    </React.Fragment>
  );
};

export default ModalEvent;