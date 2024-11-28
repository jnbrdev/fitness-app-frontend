import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faDumbbell, faRunning, faHeart } from "@fortawesome/free-solid-svg-icons";
import AddWorkout from "./AddWorkout";

// Helper function to map workout names to icons
const getIconForWorkout = (name) => {
  if (name.toLowerCase().includes("jogging") || name.toLowerCase().includes("running") || name.toLowerCase().includes("marathon")) {
    return faRunning; // Running man icon
  } else if (name.toLowerCase().includes("body building") || name.toLowerCase().includes("strength")) {
    return faDumbbell; // Dumbbell icon
  } else if (name.toLowerCase().includes("yoga")) {
    return faHeart; // Heart icon for yoga as a placeholder
  }
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
