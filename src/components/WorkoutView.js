import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faDumbbell, faRunning, faHeart, faBicycle, faFlask, faSwimmer, faFistRaised, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

import AddWorkout from "./AddWorkout";

// Helper function to map workout names to icons
const getIconForWorkout = (name) => {
  const workoutName = name.toLowerCase();

  // Running and cardio exercises
  if (workoutName.includes("jogging") || workoutName.includes("running") || workoutName.includes("marathon")) {
    return faRunning; // Running man icon
  } else if (workoutName.includes("body building") || workoutName.includes("strength") || workoutName.includes("powerlifting")) {
    return faDumbbell;
  } else if (workoutName.includes("yoga")) {
    return faHeart;
  } else if (workoutName.includes("cycling") || workoutName.includes("biking")) {
    return faBicycle;
  } else if (workoutName.includes("crossfit") || workoutName.includes("hiit")) {
    return faFlask; 
  } else if (workoutName.includes("swimming")) {
    return faSwimmer;
  } else if (workoutName.includes("boxing") || workoutName.includes("kickboxing")) {
    return faFistRaised; // Raised fist icon for boxing or kickboxing

  // Flexibility and mobility
  } else if (workoutName.includes("stretching") || workoutName.includes("mobility")) {
    return faArrowsAltH; // Horizontal arrow icon for flexibility
  }
  // If none of the above, return default icon (heart)
  return faHeart; // Default to heart if no match
};


export default function WorkoutView({ workoutsData, fetchData }) {
  return (
    <Container>
      <Row>
        <Col>
          <h3 className="mt-3 text-center">Workouts</h3>
        </Col>
      </Row>

      <Row className="d-flex justify-content-between align-items-center">
        <Col className="text-end">
          <AddWorkout fetchData={fetchData} />
        </Col>
      </Row>

      <Row className="mt-2">
        {workoutsData.length > 0 ? (
          workoutsData.map((workout, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body className="d-flex">
                  <Col xs={2} className="d-flex justify-content-center align-items-center me-3">
                    <FontAwesomeIcon icon={getIconForWorkout(workout.name)} className="fa-3x" />
                  </Col>
                  <Col xs={7}>
                    <Card.Title className="mb-0">{workout.name}</Card.Title>
                    <Card.Text>
                      <strong>Duration:</strong> {workout.duration}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary" size="sm">Edit</Button>
                      <Button variant="danger" size="sm">Delete</Button>
                    </div>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No workouts available</p>
        )}
      </Row>
    </Container>
  );
}
