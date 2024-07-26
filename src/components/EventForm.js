import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const EventForm = ({ addEvent, editEvent, eventToEdit }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState('daily');

  useEffect(() =>{
    if(eventToEdit){
        setTitle(eventToEdit.title);
        setEndDate(eventToEdit.endDate);
        setDescription(eventToEdit.description);
        setColor(eventToEdit.color);
        setIsRecurring(eventToEdit.isRecurring || false);
        setRecurrencePattern(eventToEdit.recurrencePattern || 'daily');
        handleShow();
    }
  }, [eventToEdit]);

  const handleClose = () => {
    setShow(false);
    clearForm();
    };

  const handleShow = () => setShow(true);

  const clearForm = () =>{
    setTitle('');
    setEndDate('');
    setDescription('');
    setColor('#000000');
    setIsRecurring(false);
    setRecurrencePattern('daily');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && endDate) {
      if (eventToEdit) {
        editEvent({ ...eventToEdit, title, endDate, description, color, isRecurring, recurrencePattern });
      } else {
        addEvent({ title, endDate, description, color, isRecurring, recurrencePattern });
      }
      clearForm();
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {eventToEdit ? 'Edit Event':'Add Event'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{eventToEdit ? 'Edit Event' : 'Add New Event'}</Modal.Title>
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
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
                <Form.Group controlId='formRecurrencePattern'>
                    <Form.Label>Recurrence Pattern</Form.Label>
                    <Form.Control
                        as= 'select'
                        value={recurrencePattern}
                        onChange={(e) => setRecurrencePattern(e.target.value)}
                    >
                        <option value= 'daily'>Daily</option>
                        <option value= 'weekly'>Weekly</option>
                        <option value= 'monthly'>Monthly</option>
                        <option value= 'yearly'>Yearly</option>
                        <option value= 'custom'>Custom</option>
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
