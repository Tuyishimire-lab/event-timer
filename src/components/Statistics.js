import React, { useContext } from 'react';
import { PomodoroContext } from '../PomodoroContext';
import { Card, ListGroup } from 'react-bootstrap';
import '../App.css';

const PomodoroStatistics = () => {
  const { getStatistics } = useContext(PomodoroContext);
  const { totalPomodoros, tasks, averagePomodorosPerDay } = getStatistics();

  return (
    <Card className="pomodoro-stats mt-4">
      <Card.Header as="h3" className="text-center">Pomodoro Statistics</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Total Pomodoros Completed:</strong> {totalPomodoros}
        </Card.Text>
        <Card.Text>
          <strong>Average Pomodoros Per Day:</strong> {averagePomodorosPerDay.toFixed(2)}
        </Card.Text>
        <h4 className="mt-4">Pomodoros by Task:</h4>
        <ListGroup variant="flush">
          {Object.entries(tasks).map(([task, count]) => (
            <ListGroup.Item key={task}>
              <strong>{task}:</strong> {count}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PomodoroStatistics;
