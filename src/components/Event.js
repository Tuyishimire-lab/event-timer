import React, { useState } from 'react';
import { Col, Button, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CountDownTimer from './CountDownTimer';
import { FaEdit, FaTrash, FaEye, FaCalendar } from 'react-icons/fa';

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

        <Card style={{ margin: '10px', marginLeft:'1px',marginRight: '1px' ,width: '325px', height: '250px', borderLeft: `5px solid ${event.color}` }}>
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    <p style={{margin:'2px',}}><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
                    <p style={{margin:'2px',}}><strong>End:</strong> {new Date(event.endDate).toLocaleString()}</p>
                </Card.Subtitle>
                <CountDownTimer startDate={event.startDate} endDate={event.endDate} isRecurring={event.isRecurring} recurrencePattern={event.recurrencePattern}/>
                <Card.Text>
                    <p>{event.description.length > 50 ? `${event.description.substring(0, 50)}...` : event.description}</p>
                </Card.Text>
        
                <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
                    <Button variant="secondary" onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}><FaEdit/></Button>
                    <Button variant="danger" onClick={() => deleteEvent(event.id)} style={{ marginRight: '10px' }}><FaTrash/></Button>
                    <Button variant="primary" onClick={handleShow}><FaEye/></Button>
                </div>
            </Card.Body>
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
                    <Button variant="secondary" onClick={handleNavigation}><FaCalendar/></Button>
                </Modal.Footer>
            </Modal>
        </Card>

    </Col>
  );
};

export default Event;
