// EventForm.js
import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const EventForm = ({ addEvent, editEvent, eventToEdit }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState('daily');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setStartDate(eventToEdit.startDate);
      setEndDate(eventToEdit.endDate);
      setDescription(eventToEdit.description);
      setColor(eventToEdit.color);
      setIsRecurring(eventToEdit.isRecurring);
      setRecurrencePattern(eventToEdit.recurrencePattern);
      setShow(true);
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = { title, startDate, endDate, description, color, isRecurring, recurrencePattern };
    if (eventToEdit) {
      editEvent({ ...event, id: eventToEdit.id });
    } else {
      addEvent(event);
    }
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setTitle('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setColor('#000000');
    setIsRecurring(false);
    setRecurrencePattern('daily');
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{margin:'5px', textAlign:'center'}}>
        <FaPlus/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{eventToEdit ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formIsRecurring">
              <Form.Check
                type="checkbox"
                label="Recurring Event"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            </Form.Group>

            {isRecurring && (
              <Form.Group controlId="formRecurrencePattern">
                <Form.Label>Recurrence Pattern</Form.Label>
                <Form.Control
                  as="select"
                  value={recurrencePattern}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="custom">Custom</option>
                </Form.Control>
              </Form.Group>
            )}

            <Button variant="primary" type="submit">
              {eventToEdit ? 'Save Changes' : 'Add Event'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventForm;
