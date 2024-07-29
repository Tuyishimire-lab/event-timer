import React, { useState } from 'react';
import { Col, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CountDownTimer from './CountDownTimer';

const Event = ({ event, handleEdit, deleteEvent, navigateToEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleNavigation = () => {
    navigate('./Calendar');

    setTimeout(()=>{
        navigateToEvent(event.id);
    }, 100)
    handleClose();
  };


  return (
    <Col >
        <div style={{ borderLeft: `5px solid ${event.color}`,width: '350px', padding: '10px', margin: '10px 0', height: '250px', overflow: 'hidden', position: 'relative' }}>
            <h4>{event.title}</h4>
            <p><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(event.endDate).toLocaleString()}</p>
            <CountDownTimer startDate={event.startDate} endDate={event.endDate} isRecurring={event.isRecurring} recurrencePattern={event.recurrencePattern}/>
            <p>{event.description.length > 50 ? `${event.description.substring(0, 50)}...` : event.description}</p>
            <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
                <Button variant="secondary" onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>Edit</Button>
                <Button variant="danger" onClick={() => deleteEvent(event.id)} style={{ marginRight: '10px' }}>Delete</Button>
                <Button variant="primary" onClick={handleShow}>View Details</Button>
            </div>
        </div>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{event.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(event.endDate).toLocaleString()}</p>
                <p>{event.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleNavigation}>Go to Event</Button>
            </Modal.Footer>
        </Modal>
    </Col>
  );
};

export default Event;
