import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { ICalendarDayData, ICalendarEventData, ICalendarStore, useCalendarStore } from '../stores/calendarStore';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import { X } from 'react-feather';
// import { ToggleSlider } from 'react-toggle-slider';

import RenderIf from './RenderIf';

import { API } from '../api';

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
`
const DateInput = styled(Form.Control)`
  display: flex;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  border-radius: 0.3125rem;
  background: #;
  border: 0;
  width: 7.15rem;
  height: 2.25rem;

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
const FormDeleteButton = styled.button`
  display: flex;
  height: 2.8125rem;
  padding: 0.9375rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;

  border-radius: 0.625rem;
  background: rgb(160, 74, 61, 0.5);
  color: #F0E8DA;
  font-family: Inter;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 0;
`

interface IModalNewEvent {
  show: boolean;
  type: string;
  eventData: ICalendarEventData | null;
  handleClose: () => void;
}

const ModalEvent = ({ show, type, eventData, handleClose }: IModalNewEvent) => {
  const calendarDayData = useCalendarStore((state: ICalendarStore) => state.calendarDayData);
  const setCalendarDate = useCalendarStore((state: ICalendarStore) => state.setCalendarDate);
  const setCalendarType = useCalendarStore((state: ICalendarStore) => state.setCalendarType);
  const setCalendarDayData = useCalendarStore((state: ICalendarStore) => state.setCalendarDayData);

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [date, setDate] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<string>('');
  const [endTime, setEndTime] = React.useState<string>('');
  const [notes, setNotes] = React.useState<string>('');

  const [error, setError] = React.useState<string>('');

  const handleCloseModal = () => {
    resetAllFields();
    handleClose();
  }

  const handleSubmitEvent = async () => {
    setError('');

    try {
      const splittedDate = date.split('/');
      const splittedStartTime = startTime.split(':');
      const splittedEndTime = endTime.split(':');

      const formattedStartTime = new Date(+splittedDate[2], +splittedDate[1] - 1, +splittedDate[0], +splittedStartTime[0], +splittedStartTime[1]).getTime();
      const formattedEndTime = new Date(+splittedDate[2], +splittedDate[1] - 1, +splittedDate[0], +splittedEndTime[0], +splittedEndTime[1]).getTime();

      if (type === 'new') {
        const newEventRes = await axios.post(`${API}/event`, {
          title,
          description,
          color,
          date,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          notes,
          dayOfMonth: +splittedDate[0],
          month: +splittedDate[1],
          year: +splittedDate[2],
        });
        if (newEventRes.status !== 200)
          throw (newEventRes.status)

        if (calendarDayData.dayOfMonth === +splittedDate[0]
          && calendarDayData.month === +splittedDate[1]
          && calendarDayData.year === +splittedDate[2]) {
          const newDayData: ICalendarDayData = {
            dayOfMonth: +splittedDate[0],
            month: +splittedDate[1],
            year: +splittedDate[2],
            data: [
              ...calendarDayData.data,
              newEventRes.data
            ]
          }
          setCalendarDayData(newDayData);
        }
      }
      else if (type === 'edit') {
        if (!eventData)
          throw ('eventData is null')

        const editEventRes = await axios.put(`${API}/event/${eventData.id}`, {
          title,
          description,
          color,
          date,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          notes,
          dayOfMonth: +splittedDate[0],
          month: +splittedDate[1],
          year: +splittedDate[2],
        });
        if (editEventRes.status !== 200)
          throw (editEventRes.status)

        if (calendarDayData.dayOfMonth === +splittedDate[0]
          && calendarDayData.month === +splittedDate[1]
          && calendarDayData.year === +splittedDate[2]) {
          const newDayData: ICalendarDayData = {
            dayOfMonth: +splittedDate[0],
            month: +splittedDate[1],
            year: +splittedDate[2],
            data: [
              ...calendarDayData.data,
              editEventRes.data
            ]
          }
          setCalendarDayData(newDayData);
        }
      }

      setCalendarDate({
        dayOfMonth: +splittedDate[0],
        month: +splittedDate[1],
        year: +splittedDate[2],
      })
      setCalendarType('day');

      handleCloseModal();
    }
    catch (err) {
      setError(`Une erreur est survenue : ${err}`);
    }
  }

  const handleDeleteEvent = async () => {
    try {
      if (!eventData)
        throw ('eventData is null')

      const deletedEventRes = await axios.delete(`${API}/event/${eventData.id}`);
      if (deletedEventRes.status !== 200)
        throw (deletedEventRes.status);

      const newCalendarDayData = {
        ...calendarDayData,
        data: calendarDayData.data.filter((event: ICalendarEventData) => event.id !== eventData.id)
      }
      setCalendarDayData(newCalendarDayData);
      handleCloseModal();
    }
    catch (err) {
      setError(`Une erreur est survenue : ${err}`);
    }
  }

  const resetAllFields = () => {
    setError('');

    setTitle('');
    setDescription('');
    setColor('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setNotes('');
  }

  React.useEffect(() => {
    if (show === true && type === 'edit' && eventData) {
      const formattedStartTime = new Date(eventData.startTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const formattedEndTime = new Date(eventData.endTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

      setTitle(eventData.title);
      setDescription(eventData.description);
      setColor(eventData.color);
      setDate(`${eventData.dayOfMonth.toString().padStart(2, '0')}/${eventData.month.toString().padStart(2, '0')}/${eventData.year}`);
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);
      setNotes(eventData.notes);
    }
  }, [show, type, eventData])

  return (
    <React.Fragment>
      <Modal
        size='lg'
        style={{ backgroundColor: 'transparent', }}
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
              placeholder='Description'
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
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

            <FormInputText
              placeholder='Couleur'
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
            />

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

            <RenderIf isTrue={type === 'edit' && eventData !== null}>
              <FormDeleteButton onClick={handleDeleteEvent}>
                Supprimer
              </FormDeleteButton>
            </RenderIf>

            <FormSubmitButton onClick={handleSubmitEvent}>
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